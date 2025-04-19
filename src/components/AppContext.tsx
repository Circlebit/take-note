import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Clip, ClipTranscript } from "../lib/Clip.ts";
import { transcribeAudio } from "../lib/Transcribe.ts";

interface AppContextType {
  clips: Clip[];
  addClip: (clips: Clip) => void;
  removeClip: (index: number) => void;
  transcribeClip: (clipId: string) => void;
  notes: string;
  setNotes: (clips: string) => void;
  transcripts: { id: string; transcript: ClipTranscript }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [clips, setClips] = useState<Clip[]>([]);
  const [notes, setNotes] = useState<string>("");

  const addClip = useCallback((clip: Clip) => {
    setClips((prevClips) => [...prevClips, clip]);
  }, []);

  const updateClip = useCallback((clipId: string, updates: Partial<Clip>) => {
    setClips((prevClips) =>
      prevClips.map((clip) =>
        clip.id === clipId ? { ...clip, ...updates } : clip
      )
    );
  }, []);

  const removeClip = useCallback((index: number) => {
    if (index < 0 || index >= clips.length) return;

    if (clips[index].audio.url) {
      URL.revokeObjectURL(clips[index].audio.url.toString());
    }

    setClips((prevClips) => prevClips.filter((_, i) => i !== index));
  }, [clips]);

  const transcribeClip = useCallback((clipId: string) => {
    // Mark clip as transcribing
    updateClip(clipId, { transcript: { status: "pending" } });

    setClips((prevClips) => {
      const clip = prevClips.find((clip) => clip.id === clipId);

      if (!clip?.audio.url) {
        console.error(`Clip not found or has no URL: ${clipId}`);
        return prevClips;
      }

      (async () => {
        try {
          const transcriptText = await transcribeAudio(clip.audio.url);
          updateClip(clipId, {
            transcript: {
              text: transcriptText,
              status: "success",
            },
          });
        } catch (error) {
          console.error("Transcription error:", error);
          updateClip(clipId, {
            transcript: {
              status: "error",
            },
          });
        }
      })();
      return prevClips;
    });
  }, []);

  const transcripts = useMemo(() => {
    return clips
      .filter((clip) => clip.transcript)
      .map((clip) => ({
        id: clip.id,
        transcript: clip.transcript!,
      }));
  }, [clips]);

  return (
    <AppContext.Provider
      value={{
        clips,
        addClip,
        removeClip,
        transcribeClip,
        notes,
        setNotes,
        transcripts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
