import { OpenAI } from "@openai/openai";

export async function transcribeAudio(audioUrl: string): Promise<string> {
  // Initialize OpenAI client with API key from environment variable
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  async function fetchAudioFile(url: string): Promise<Uint8Array> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

  try {
    // Get audio content from URL
    const audioData = await fetchAudioFile(audioUrl);
    
    // Call OpenAI's transcription API with the audio data
    const transcription = await openai.audio.transcriptions.create({
      file: new File([audioData], 'audio.mp3', { type: 'audio/mpeg' }),
      model: 'whisper-1',
    });
    
    return transcription.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error(`Failed to transcribe audio: ${error instanceof Error ? error.message : String(error)}`);
  }
}