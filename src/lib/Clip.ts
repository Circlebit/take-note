export interface Clip {
  id: string;
  audio: ClipAudio;
  transcript?: ClipTranscript;
}

export interface ClipAudio {
  url: string;
}

export interface ClipTranscript {
  text?: string;
  status: "idle" | "pending" | "success" | "error";
  error?: string;
}
