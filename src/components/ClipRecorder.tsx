import { ClipAudio } from "./ClipAudio.tsx";
import { useRecorder } from "./useRecorder.ts";
import { useAppContext } from "./AppContext.tsx";
import { ClipTranscript } from "./ClipTranscript.tsx";

export function ClipRecorder() {
  const { isRecording, startRecording, stopRecording } = useRecorder();
  const { clips, removeClip } = useAppContext();

  return (
    <div className="flex flex-col space-y-2">
      {/* Recording button section */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          className="bg-stone-800 hover:bg-stone-700 transition-colors"
        >
          <div
            className={`flex items-center space-x-2 ${
              isRecording ? "text-red-600" : ""
            }`}
          >
            <span className="text-xl">⏺</span>
            <span>{isRecording ? "Stop" : "Rec"}</span>
          </div>
        </button>
      </div>

      {/* Clips container - has min-height even when empty */}
      <div className="min-h-[200px] w-full bg-stone-800/30 p-2">
        {clips.length === 0
          ? (
            <div className="text-center text-stone-500 py-4">
              No recordings yet. Click Rec to start.
            </div>
          )
          : (
            <div className="space-y-3">
              {clips.map((clip, index) => (
                <div key={clip.id} className="p-2 border-2 w-full border-amber-400">
                  <div className="flex">
                    <ClipAudio
                      src={clip.audio.url}
                      className="flex-1"
                    />
                    <button
                      onClick={() =>
                        removeClip(index)}
                      type="button"
                      className="border-0 hover:text-red-600 flex-none"
                    >
                      ✕
                    </button>
                  </div>
                  <ClipTranscript clip={clip} />
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
