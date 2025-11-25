import { SemanticSearchAgent } from "./SearchService";
import { OpenAIService } from "./OpenAIService";
import fs from "fs/promises";
import path from "path";

// Inicjalizacja danych oraz osobna funkcja do zapytań użytkownika.

// Ścieżka do pliku tekstowego (najpierw z ENV, inaczej domyślna)
const FILE_PATH = "./textfile.md";
// Nazwa kolekcji w wektorowej bazie
const COLLECTION = "demo_collection";
// Limit tokenów dla dokumentu (już nie chunkujemy na wiele fragmentów, ale przechowujemy wartość)
const CHUNK_TOKENS = 800;

async function readFileIfExists(filePath: string): Promise<string> {
  const abs = path.resolve(filePath);
  return fs.readFile(abs, "utf-8");
}

// Funkcja inicjalizująca dane (wcześniej main)
export async function initData() {
  console.log("[semantic-search] Start initData");
  console.log(`Plik: ${FILE_PATH}`);
  console.log(`Kolekcja: ${COLLECTION}`);
  const agent = new SemanticSearchAgent();
  let text: string;
  try {
    text = await readFileIfExists(FILE_PATH);
  } catch (e) {
    console.error(`Nie udało się odczytać pliku '${FILE_PATH}':`, e);
    throw e;
  }
  const result = await agent.ingestDocument({
    text,
    collection: COLLECTION,
    chunkTokens: CHUNK_TOKENS,
  });
  console.log(
    `Zapisano ${result.chunks} dokument(ów) do kolekcji '${result.collection}'.`
  );
  console.log("[semantic-search] Zakończono initData");
}

// Domyślne pytanie użytkownika
const QUESTION = "Jak wygląda architektura aplikacji agenta?";

// Funkcja obsługująca zapytanie użytkownika i wyszukująca dane w bazie wektorowej
export async function userAnswer(question: string) {
  console.log("[semantic-search] Start userAnswer");
  console.log(`Kolekcja: ${COLLECTION}`);
  console.log(`Pytanie: ${question}`);
  const agent = new SemanticSearchAgent();
  const { answer, usedChunks } = await agent.answerQuery({
    query: question,
    collection: COLLECTION,
    topK: 8,
  });
  //   console.log(
  //     "\n[semantic-search] Wynik pierwszego etapu (raw context / rerank)"
  //   );
  //   console.log("Odpowiedź (surowy kontekst lub null):\n", answer);
  //   console.log("\nŹródła (skrót):");
  //   console.table(
  //     usedChunks.map((c, i) => ({
  //       idx: i,
  //       score: c.score,
  //       preview: c.text.replace(/\n/g, " ") + "...",
  //     }))
  //   );

  // Jeśli brak kontekstu uznanego za relewantny, zakończ.
  if (!answer) {
    console.log("Brak wystarczającego kontekstu do generowania odpowiedzi.");
    console.log("[semantic-search] Zakończono userAnswer");
    return;
  }

  // Etap 2: Streszczenie każdego chunku (redukcja szumu, wyrównanie stylu)
  // Używamy mniejszego modelu dla oszczędności (gpt-4o-mini)
  const openai = new OpenAIService();
  const summaries: string[] = [];
  console.log("\n[semantic-search] Etap 2: Generowanie streszczeń chunków...");
  for (let i = 0; i < usedChunks.length; i++) {
    const chunk = usedChunks[i];
    try {
      const completion = await openai.completion({
        model: "gpt-4o-mini",
        maxTokens: 300,
        messages: [
          {
            role: "system",
            content:
              "Jesteś asystentem podsumowującym fragmenty dokumentów. Zwrot formatu: bez wstępów, w 1-2 zdaniach, tylko esencja techniczna / faktograficzna. Jeśli fragment jest powtórzeniem, połącz informacje z poprzednich chunków (nie duplikuj).",
          },
          {
            role: "user",
            content: `Fragment (#${i}):\n${chunk.text}\n\nPytanie użytkownika: ${question}\nPodsumuj fragment kontekstowo względem pytania.`,
          },
        ],
      });
      const summary = (completion as any).choices[0].message.content.trim();
      summaries.push(summary);
      console.log(`✔ Chunk ${i} podsumowany.`);
    } catch (e) {
      console.warn(`⚠ Nie udało się podsumować chunku ${i}:`, e);
    }
  }

  // Etap 3: Syntetyczna odpowiedź końcowa na podstawie streszczeń.
  console.log("\n[semantic-search] Etap 3: Synteza odpowiedzi końcowej...");
  let finalAnswer: string | null = null;
  try {
    const synthesis = await openai.completion({
      model: "gpt-4o-mini",
      maxTokens: 600,
      messages: [
        {
          role: "system",
          content:
            "Jesteś ekspertem od systemów i architektury. Na podstawie streszczeń fragmentów wygeneruj zwartą, poprawną merytorycznie odpowiedź na pytanie użytkownika. Użyj list wypunktowanych jeśli to pomaga. Jeśli informacje są niepełne – wskaż czego brakuje zamiast wymyślać.",
        },
        {
          role: "user",
          content: `Pytanie: ${question}\n\nStreszczenia fragmentów:\n${summaries
            .map((s, idx) => `(${idx}) ${s}`)
            .join("\n")}\n\nZsyntetyzuj końcową odpowiedź (PL).`,
        },
      ],
    });
    finalAnswer = (synthesis as any).choices[0].message.content.trim();
  } catch (e) {
    console.error("Błąd w syntezie odpowiedzi końcowej:", e);
  }

  console.log("\n[semantic-search] Odpowiedź końcowa:\n");
  console.log(finalAnswer || "(Brak odpowiedzi)\n");
  console.log("\n[semantic-search] Podsumowania wykorzystane w syntezie:");
  summaries.forEach((s, i) => console.log(`(${i}) ${s}`));
  console.log("[semantic-search] Zakończono userAnswer");
}

// Jeśli plik uruchamiany bezpośrednio, wykonaj inicjalizację i przykładowe zapytanie
// initData()
//   .then(() => console.log("Inicjalizacja danych zakończona."))
//   .catch((err) => {
//     console.error("Błąd w semantic-search:", err);
//     process.exit(1);
//   });

userAnswer(QUESTION).catch((err) => {
  console.error("Błąd w semantic-search:", err);
  process.exit(1);
});
