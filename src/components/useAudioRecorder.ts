// useAudioRecorder.ts
import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for handling audio recording functionality
 * @returns Recording state and control functions
 */
export function useAudioRecorder() {
  // State for UI feedback (causes re-renders when changed)
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>("");

  // Refs for recording resources (don't cause re-renders when changed)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Cleanup function that runs on unmount
  useEffect(() => {
    return () => {
      // Stop all audio tracks when the component unmounts
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      // Release memory allocated for audio URLs
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]); // Only re-run if audioUrl changes

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

      // Event handler for when recording stops
      recorder.onstop = (): void => {
        // Combine all audio chunks into a single blob
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        // Create a URL for the audio blob
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      // Save recorder reference and start recording
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

    // Stop the media recorder
    mediaRecorderRef.current.stop();

    // Stop all tracks to release the microphone
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Update recording state
    setIsRecording(false);
  };

  // Return the state and functions that components will use
  return {
    isRecording,
    audioUrl,
    startRecording,
    stopRecording,
  };
}
