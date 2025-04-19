import { Clip } from "../lib/Clip.ts";

export function ClipTranscriptDisplay({ clip }: { clip: Clip }) {
  //TODO indicator for when it's loading, also for errors
  const isPending = clip.transcript?.status === "pending";

  return (
    <div>
      {isPending
        ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-500 border-t-transparent">
            </div>
          </div>
        )
        : clip.transcript
        ? <textarea className="w-full" value={clip.transcript.text} readOnly />
        : (
          <>
            <h4>no transcript</h4>
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-500 border-t-transparent">
              </div>
            </div>
          </>
        )}
    </div>
  );
}
