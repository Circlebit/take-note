import { useAudioRecorder } from "./useAudioRecorder.ts";

export function AudioRecorder() {
  const { isRecording, audioUrl, startRecording, stopRecording } = useAudioRecorder();
  
  return (
    <div>
      <button type="button" onClick={isRecording ? stopRecording : startRecording}>
        <div className={isRecording ? "text-red-600" : ""}>
          ⏺ Rec
        </div>
      </button>
      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
}