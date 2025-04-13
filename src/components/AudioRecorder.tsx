import { useAudioRecorder } from "./useAudioRecorder.ts";

export function AudioRecorder() {
  const { isRecording, audioUrls, startRecording, stopRecording } =
    useAudioRecorder();

  return (
    <div>
      <button
        type="button"
        onClick={isRecording ? stopRecording : startRecording}
      >
        <div className={isRecording ? "text-red-600" : ""}>
          ⏺ Rec
        </div>
      </button>

      {audioUrls.length > 0 && (
        <div>
          {audioUrls.map((url, index) => (
            <div key={index}>
              <audio src={url} controls />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
