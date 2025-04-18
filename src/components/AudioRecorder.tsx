import { AudioClip } from "./AudioClip.tsx";
import { useAudioRecorder } from "./useAudioRecorder.ts";
import { useAppContext } from "./AppContext.tsx";

export function AudioRecorder() {
  const { isRecording, startRecording, stopRecording } = useAudioRecorder();
  const { clips, removeClip } = useAppContext();
  
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

      {clips.length > 0 && (
        <div>
          {clips.map((clip, index) => (
            <AudioClip
              key={clip.id}
              src={clip.audio.url}
              onDelete={() => removeClip(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
