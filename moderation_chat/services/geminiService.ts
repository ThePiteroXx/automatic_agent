import OpenAI from "openai";

// Ensure the API key is available from environment variables.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

// Initialize the OpenAI client with the API key.
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * Sends a message to the OpenAI API for content moderation.
 * @param message The user's message text.
 * @returns A string indicating the moderation status: "CLEAN" or "OFFENSIVE".
 */
export const moderateMessage = async (
  message: string
): Promise<"CLEAN" | "OFFENSIVE"> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
<objective>
Twoim celem jest działanie jako surowy, ale sprawiedliwy moderator treści. Będziesz analizować wiadomość użytkownika i klasyfikować ją jako "CLEAN" lub "OFFENSIVE".
</objective>

<rules>
1.  MUSISZ odpowiedzieć jednym słowem: "CLEAN" lub "OFFENSIVE".
2.  Twoja odpowiedź NIE MOŻE zawierać żadnego innego tekstu, wyjaśnień ani znaków interpunkcyjnych.
3.  Opieraj swoją decyzję wyłącznie na treści dostarczonej wiadomości.
</rules>

<context>
Moderujesz aplikację czatu w czasie rzeczywistym dla ogólnej publiczności. Głównym celem jest utrzymanie pełnego szacunku i bezpiecznego środowiska.
</context>

<instructions>
1.  Uważnie przeczytaj wiadomość użytkownika.
2.  Określ, czy wiadomość zawiera którąkolwiek z poniższych treści:
    -   Przekleństwa lub wulgarny język.
    -   Mowa nienawiści, dyskryminacja lub obelgi skierowane do jakiejkolwiek grupy lub osoby.
    -   Osobiste zniewagi, nękanie lub bezpośrednie ataki.
    -   Groźby przemocy lub wyrządzenia krzywdy.
    -   Treści o charakterze jednoznacznie seksualnym.
    -   Promowanie nielegalnych działań.
3.  Jeśli wiadomość zawiera KTÓRYKOLWIEK z powyższych elementów, twoja odpowiedź MUSI brzmieć "OFFENSIVE".
4.  Jeśli wiadomość jest wolna od wszystkich powyższych naruszeń, twoja odpowiedź MUSI brzmieć "CLEAN".
</instructions>

<examples>
-   Wiadomość użytkownika: "To fantastyczny punkt widzenia!" -> Twoja odpowiedź: CLEAN
-   Wiadomość użytkownika: "Nie zgadzam się, ale rozumiem twoją perspektywę." -> Twoja odpowiedź: CLEAN
-   Wiadomość użytkownika: "Jesteś idiotą, że tak myślisz." -> Twoja odpowiedź: OFFENSIVE
-   Wiadomość użytkownika: "To najgorsza rzecz, jaką kiedykolwiek widziałem." -> Twoja odpowiedź: CLEAN (mocna opinia, ale nie atak)
-   Wiadomość użytkownika: "Zrobię ci krzywdę." -> Twoja odpowiedź: OFFENSIVE
-   Wiadomość użytkownika: "Co do kurwy?" -> Twoja odpowiedź: OFFENSIVE (przekleństwo)
</examples>

<constrains>
-   Nie bądź pobłażliwy. Jeśli zasada jest złamana, sklasyfikuj wiadomość jako "OFFENSIVE".
-   Nie analizuj intencji użytkownika. "Żart", który zawiera obelgę, nadal jest "OFFENSIVE".
-   Odpowiedz tylko jednym słowem klasyfikującym.
</constrains>
`,
        },
        {
          role: "user",
          content: `Wiadomość użytkownika: "${message}"`,
        },
      ],
      temperature: 0,
    });

    const result = response.choices[0]?.message?.content?.trim().toUpperCase();
    if (result === "OFFENSIVE") {
      return "OFFENSIVE";
    }

    return "CLEAN";
  } catch (error) {
    console.error("Error during message moderation:", error);
    // Fail closed: if moderation fails, block the message to be safe.
    return "OFFENSIVE";
  }
};
