import { AudioClip } from "./AudioClip.tsx";
import { useAudioRecorder } from "./useAudioRecorder.ts";

export function AudioRecorder() {
  const {
    isRecording,
    audioUrls,
    setAudioUrls,
    startRecording,
    stopRecording,
  } = useAudioRecorder();

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
            <AudioClip
              key={index}
              src={url}
              onDelete={() => {
                const newAudioUrls = [...audioUrls];
                newAudioUrls.splice(index, 1);
                // Assuming your hook has a setAudioUrls function
                setAudioUrls(newAudioUrls);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
