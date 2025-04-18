import { AudioRecorder } from "./components/AudioRecorder.tsx";
import { AppProvider } from "./components/AppContext.tsx";

function App() {
  return (
    <>
      <AppProvider>
        <AudioRecorder />
      </AppProvider>
    </>
  );
}

export default App;
