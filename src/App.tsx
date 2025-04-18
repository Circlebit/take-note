import { ClipRecorder } from "./components/ClipRecorder.tsx";
import { AppProvider } from "./components/AppContext.tsx";
import { NotesEditor } from "./components/NotesEditor.tsx";

function App() {
  return (
    <AppProvider>
        <main className="flex flex-1 w-full">
          <div className="w-1/3  border-r border-stone-700">
            <ClipRecorder />
          </div>
          <div className="w-2/3 p-4">
            <NotesEditor />
          </div>
        </main>
    </AppProvider>
  );
}

export default App;
