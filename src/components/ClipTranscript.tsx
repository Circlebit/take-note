import { Clip } from "../lib/Clip.ts";

export function ClipTranscript({ clip }: { clip: Clip }) {
  return (
    <div >
      {clip.transcript
        ? <textarea className="w-full" value={clip.transcript.text} readOnly />
        : <h4>no transcript</h4>}
    </div>
  );
}
