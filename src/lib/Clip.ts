export interface Clip {
  id: string;
  audio: ClipAudio;
  transcription?: ClipTranscription;
}

export interface ClipAudio {
  url: string;
}

export interface ClipTranscription {
  text: string;
}
