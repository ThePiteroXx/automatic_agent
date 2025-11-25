import { QdrantClient } from "@qdrant/js-client-rest";
import { v4 as uuidv4 } from "uuid";
import { OpenAIService } from "./OpenAIService";
import fs from "fs/promises";
import path from "path";

export class VectorService {
  private client: QdrantClient;
  private openAIService: OpenAIService;
  private memory: Record<
    string,
    Array<{ id: string; vector: number[]; payload: any }>
  > = {};
  private useMemory = false;

  constructor(openAIService: OpenAIService) {
    this.client = new QdrantClient({
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
    });
    this.openAIService = openAIService;
  }

  async ensureCollection(name: string) {
    if (this.useMemory) return;
    try {
      const collections = await this.client.getCollections();
      if (!collections.collections.some((c) => c.name === name)) {
        await this.client.createCollection(name, {
          vectors: { size: 1024, distance: "Cosine" },
        });
      }
    } catch (e: any) {
      console.warn(
        "[VectorService] Qdrant unreachable, switching to in-memory mode.",
        e?.message
      );
      this.useMemory = true;
      this.memory[name] = this.memory[name] || [];
    }
  }

  async initializeCollectionWithData(
    name: string,
    points: Array<{
      id?: string;
      text: string;
      metadata?: Record<string, any>;
    }>
  ) {
    const collections = await this.client.getCollections();
    if (!collections.collections.some((c) => c.name === name)) {
      await this.ensureCollection(name);
      await this.addPoints(name, points);
    }
  }

  async addPoints(
    collectionName: string,
    points: Array<{
      id?: string;
      text: string;
      metadata?: Record<string, any>;
    }>
  ) {
    const pointsToUpsert = await Promise.all(
      points.map(async (point) => {
        const embedding = await this.openAIService.createEmbedding(point.text);
        // Defensive: ensure 1024 dimensions (collection defined with size 1024)
        if (embedding.length !== 1024) {
          if (embedding.length > 1024) {
            embedding.splice(1024); // truncate in-place
          } else if (embedding.length < 1024) {
            embedding.push(...new Array(1024 - embedding.length).fill(0));
          }
        }
        return {
          id: point.id || uuidv4(),
          vector: embedding,
          payload: { text: point.text, ...point.metadata },
        };
      })
    );
    if (this.useMemory) {
      this.memory[collectionName] = this.memory[collectionName] || [];
      this.memory[collectionName].push(...pointsToUpsert);
      return;
    }
    try {
      const pointsFilePath = path.join(__dirname, "points.json");
      await fs.writeFile(
        pointsFilePath,
        JSON.stringify(pointsToUpsert, null, 2)
      );
      await this.client.upsert(collectionName, {
        wait: true,
        points: pointsToUpsert,
      });
    } catch (e: any) {
      // Enhanced diagnostics for 400 errors (dimension mismatch, schema issues, etc.)
      const firstVecLen = pointsToUpsert[0]?.vector?.length;
      const errPayload = e?.response?.data || e?.data || null;
      console.warn("[VectorService] Upsert failed.");
      console.warn("  Collection:", collectionName);
      console.warn("  Points count:", pointsToUpsert.length);
      console.warn("  First vector length:", firstVecLen);
      if (errPayload) {
        console.warn("  Response data:", JSON.stringify(errPayload));
      }
      console.warn("  Error message:", e?.message);
      console.warn(
        "[VectorService] Switching to in-memory mode as fallback (performance/features reduced)."
      );
      this.useMemory = true;
      this.memory[collectionName] = this.memory[collectionName] || [];
      this.memory[collectionName].push(...pointsToUpsert);
    }
  }

  async performSearch(
    collectionName: string,
    query: string,
    filter: Record<string, any> = {},
    limit: number = 5
  ): Promise<Array<{ id: string; payload: any; score: number }>> {
    const queryEmbedding = await this.openAIService.createEmbedding(query);
    if (this.useMemory) {
      const all = this.memory[collectionName] || [];
      // cosine similarity
      const norm = (v: number[]) => Math.sqrt(v.reduce((s, x) => s + x * x, 0));
      const qn = norm(queryEmbedding);
      const scored = all
        .map((p) => {
          const dot = p.vector.reduce(
            (s, x, i) => s + x * queryEmbedding[i],
            0
          );
          const score = dot / (qn * norm(p.vector));
          return { ...p, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
      return scored.map((r) => ({
        id: r.id,
        payload: r.payload,
        score: r.score,
      }));
    }
    try {
      const qdrantResults = await this.client.search(collectionName, {
        vector: queryEmbedding,
        limit,
        with_payload: true,
        filter,
      });
      return qdrantResults.map((r) => ({
        id: String(r.id),
        payload: r.payload,
        score: r.score,
      }));
    } catch (e: any) {
      console.warn(
        "[VectorService] Search failed, switching to in-memory mode.",
        e?.message
      );
      this.useMemory = true;
      return this.performSearch(collectionName, query, filter, limit);
    }
  }

  async hasPointWithHash(
    collectionName: string,
    contentHash: string
  ): Promise<boolean> {
    // In-memory mode check
    if (this.useMemory) {
      const all = this.memory[collectionName] || [];
      return all.some((p) => p.payload?.content_hash === contentHash);
    }
    try {
      // Qdrant filter query for exact match on content_hash
      const results = await this.client.search(collectionName, {
        vector: new Array(1024).fill(0), // dummy vector (Qdrant requires a vector); better approach would be a dedicated scroll/search by filter but using zero vector with limit=1
        limit: 1,
        with_payload: true,
        filter: {
          must: [
            {
              key: "content_hash",
              match: { value: contentHash },
            },
          ],
        },
      });
      return results.length > 0;
    } catch (e: any) {
      console.warn(
        "[VectorService] hasPointWithHash failed, switching to in-memory mode.",
        e?.message
      );
      this.useMemory = true;
      return this.hasPointWithHash(collectionName, contentHash);
    }
  }
}
