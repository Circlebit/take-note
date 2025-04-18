import { createContext, useContext, useState } from "react";
import { Clip } from "../lib/Clip.ts";

interface AppContextType {
  clips: Clip[];
  setClips: (clips: Clip[]) => void;
  notes: string;
  setNotes: (clips: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [clips, setClips] = useState<Clip[]>([]);
  const [notes, setNotes] = useState<string>("");

  return (
    <AppContext.Provider value={{ clips, setClips, notes, setNotes }}>
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
