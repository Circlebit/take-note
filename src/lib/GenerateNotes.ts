import { ClipTranscript } from "./Clip.ts";
import OpenAI from "@openai/openai";

export async function generateNotesFromTranscripts(
  transcripts: ClipTranscript[],
): Promise<string> {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // Combine all transcripts into a single text
  const combinedTranscript = transcripts
    .map((transcript) => `${transcript.text}`)
    .join("\n\n ---- \n\n");

  //TODO send existing notes as context so they don't change completely

  // Create a prompt for OpenAI
  const prompt = `
        Please create concise, well-organized bullet point notes from the following transcripts:
        
        ${combinedTranscript}
        
        Format as bullet points with main ideas and key details.
        Group related concepts together.
        Use the language(s) the transcripts are written in.
    `;

  try {
    // Make API call to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that creates clear bullet point notes from transcripts. Use the language of the transcripts.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2, // Lower temperature for more focused output
      max_tokens: 2000,
    });

    // Extract and return the notes
    return response.choices[0]?.message?.content ||
      "No notes could be generated.";
  } catch (error) {
    console.error("Error generating notes:", error);
    throw new Error("Failed to generate notes from transcripts.");
  }
}
