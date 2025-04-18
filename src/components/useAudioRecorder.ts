// useAudioRecorder.ts
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../components/AppContext.tsx";
import { Clip } from "../lib/Clip.ts";

/**
 * Custom hook for handling audio recording functionality
 */
export function useAudioRecorder() {
  const { addClip } = useAppContext();
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // Refs for recording resources
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Cleanup function
  useEffect(() => {
    return () => {
      // Stop all audio tracks when the component unmounts
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  /**
   * Starts the audio recording process
   */
  const startRecording = async (): Promise<void> => {
    // Reset chunks for a new recording
    audioChunksRef.current = [];

    try {
      // Request microphone access from the browser
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      // Create a new MediaRecorder instance with the stream
      const recorder = new MediaRecorder(stream);

      // Event handler for when data becomes available
      recorder.ondataavailable = (event: BlobEvent): void => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = (): void => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mp3",
        });

        const url = URL.createObjectURL(audioBlob);

        // Create a new clip and add it to the context
        const newClip: Clip = {
          id: Date.now().toString(),
          audio: {
            url,
          },
          transcription: undefined,
        };

        addClip(newClip);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  /**
   * Stops the current audio recording
   */
  const stopRecording = (): void => {
    if (!mediaRecorderRef.current || !isRecording) return;

    mediaRecorderRef.current.stop();

    // Stop all tracks to release the microphone
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    setIsRecording(false);
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
}
