import { useEffect } from "react";
import { useAppContext } from "./AppContext.tsx";
import { generateNotesFromTranscripts } from "../lib/GenerateNotes.ts";

export function NotesEditor() {
  const { transcripts, notes, setNotes } = useAppContext();

  useEffect(() => {
    const generateNotes = async () => {
      if (transcripts.length === 0) {
        return;
      }

      try {
        const newNotes = await generateNotesFromTranscripts(
          transcripts.map(item => item.transcript)
        );
        setNotes(newNotes);
      } catch (error) {
        console.error("Error generating notes:", error);
      }
    };

    generateNotes();
  }, [transcripts, setNotes]);

  return (
    <div>
      <textarea 
        value={notes} 
        className="w-full h-96 bg-stone-900 text-amber-400 p-4" 
        readOnly
      />
    </div>
  );
}
