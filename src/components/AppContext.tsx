import { createContext, useCallback, useContext, useState } from "react";
import { Clip } from "../lib/Clip.ts";

interface AppContextType {
  clips: Clip[];
  addClip: (clips: Clip) => void;
  removeClip: (index: number) => void;
  notes: string;
  setNotes: (clips: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [clips, setClips] = useState<Clip[]>([]);
  const [notes, setNotes] = useState<string>("");

  const addClip = useCallback((clip: Clip) => {
    setClips((prevClips) => [...prevClips, clip]);
  }, []);

  const removeClip = useCallback((index: number) => {
    if (index < 0 || index >= clips.length) return;

    if (clips[index].audio.url)
    URL.revokeObjectURL(clips[index].audio.url.toString());

    setClips((prevClips) => prevClips.filter((_, i) => i !== index));
  }, [clips]);

  return (
    <AppContext.Provider
      value={{
        clips,
        addClip,
        removeClip,
        notes,
        setNotes,
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
