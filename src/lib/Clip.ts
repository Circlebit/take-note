export interface Clip {
  audio: ClipAudio;
  transcription: ClipTranscription;
}

export interface ClipAudio {
  audioUrl: URL;
}

export interface ClipTranscription {
  text: string;
}
