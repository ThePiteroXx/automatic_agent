import { OpenAIService } from "./OpenAIService";
// Klucze metadanych, które mogą być użyte do filtrowania wyszukiwania.
export const FILTERABLE_METADATA_KEYS = ["source", "author"] as const;
/**
 * SemanticSearchAgent
 * Wersja z dynamicznym filtrowaniem metadanych.
 * Przed zapytaniem wektorowym model językowy próbuje wywnioskować wartości metadanych (source, author)
 * na podstawie treści zapytania. Jeśli nie jest pewny – nie zwraca tych kluczy i wyszukiwanie
 * odbywa się bez filtrowania. Dzięki temu ograniczamy przestrzeń wyszukiwania gdy zapytanie
 * sugeruje źródło lub autora.
 */
import { TextSplitter } from "./TextService";
import { VectorService } from "./VectorService";

export interface IngestResult {
  chunks: number;
  collection: string;
}

export class SemanticSearchAgent {
  private openai = new OpenAIService();
  private vectorService = new VectorService(this.openai);
  private splitter: TextSplitter;

  constructor(model: string = "gpt-4o") {
    this.splitter = new TextSplitter(model);
  }

  // Analizuje zapytanie użytkownika i próbuje wywnioskować wartości metadanych do filtrowania.
  // Zwraca obiekt np. { source: "newsletter", author: "Jan Kowalski" } lub pusty {} jeśli brak.
  // Jeśli model zwróci cokolwiek poza poprawnym JSON -> ignorujemy i zwracamy {}.
  //   private async deriveMetadataFilter(
  //     query: string
  //   ): Promise<Record<string, any>> {
  //     const allowedKeys = FILTERABLE_METADATA_KEYS.join(", ");
  //     const system = `Jesteś parserem metadanych. Na podstawie zapytania użytkownika spróbuj wywnioskować wartości pól do filtrowania dokumentów.
  // Dopuszczalne klucze: ${allowedKeys}.
  // Zwróć WYŁĄCZNIE poprawny JSON bez komentarzy i tekstu dodatkowego.
  // Jeśli nie masz pewności co do danej wartości, nie umieszczaj jej w JSON.
  // Przykłady zapytania:
  // - "Pokaż artykuły z bloga firmowego o wektorach" -> { "source": "blog" },
  // - "Pokaż artykuły autorstwa Jana Kowalskiego" -> { "author": "Jan Kowalski" }
  // Jeśli brak pewnych metadanych zwróć {}.`;

  //     // TODO: Rozszerz listę dopuszczalnych kluczy (np. year, topic) gdy dane będą indeksowane.

  //     const completion = await this.openai.completion({
  //       messages: [
  //         { role: "system", content: system },
  //         { role: "user", content: query },
  //       ],
  //       model: "gpt-4o-mini",
  //       maxTokens: 150,
  //     });
  //     try {
  //       const raw = (completion as any).choices[0].message.content.trim();
  //       // Usuń możliwe znaczniki kodu
  //       const cleaned = raw.replace(/^```json\n?|```$/g, "");
  //       const parsed = JSON.parse(cleaned);
  //       if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
  //         // Filtrowanie tylko dozwolonych kluczy z FILTERABLE_METADATA_KEYS
  //         const out: Record<string, any> = {};
  //         for (const k of FILTERABLE_METADATA_KEYS) {
  //           if (typeof parsed[k] === "string" && parsed[k].trim()) {
  //             out[k] = parsed[k].trim();
  //           }
  //         }
  //         return out;
  //       }
  //     } catch (e) {
  //       // ignorujemy błędy parsowania
  //     }
  //     return {};
  //   }

  async ingestDocument({
    text,
    collection,
    chunkTokens = 800,
  }: {
    text: string;
    collection: string;
    chunkTokens?: number;
  }): Promise<IngestResult> {
    const docs = await this.splitter.split(text, chunkTokens);
    await this.vectorService.ensureCollection(collection);
    await this.vectorService.addPoints(
      collection,
      docs.map((doc) => ({
        text: doc.text,
        metadata: {
          tokens: doc.metadata.tokens,
          headers: doc.metadata.headers,
          urls: doc.metadata.urls,
          images: doc.metadata.images,
        },
      }))
    );
    return { chunks: docs.length, collection };
  }

  async answerQuery({
    query,
    collection,
    topK = 8,
  }: {
    query: string;
    collection: string;
    topK?: number;
  }): Promise<{
    answer: string | null;
    usedChunks: Array<{ text: string; score: number }>;
  }> {
    // Najpierw spróbuj wydobyć metadane i zbudować filtr
    // const metaFilter = await this.deriveMetadataFilter(query);

    // Qdrant filter format: { must: [ { key: "source", match: { value: "..." } }, ... ] }
    // let qdrantFilter: Record<string, any> | undefined = undefined;
    // if (Object.keys(metaFilter).length > 0) {
    //   qdrantFilter = {
    //     must: Object.entries(metaFilter).map(([key, value]) => ({
    //       key,
    //       match: { value },
    //     })),
    //   };
    // }

    const results = await this.vectorService.performSearch(
      collection,
      query,
      {},
      topK
    );
    // Build context string
    const context = results
      .map((r) => r.payload?.text)
      .filter(Boolean)
      .join("\n---\n");

    const completion = await this.openai.completion({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that determines if a given text is relevant to a query. Respond with 1 if relevant, 0 if not relevant.",
        },
        { role: "user", content: `Context:\n${context}\n\nQuestion: ${query}` },
      ],
      model: "gpt-4o-mini",
    });

    const rerank = (completion as any).choices[0].message.content as string;

    return {
      answer: rerank === "1" ? context : null,
      usedChunks: results.map((r) => {
        const rawText = (r as any).payload?.text;
        const text: string =
          typeof rawText === "string" ? rawText : JSON.stringify(rawText || "");
        return { text: text.slice(0, 200), score: (r as any).score };
      }),
    };
  }
}
