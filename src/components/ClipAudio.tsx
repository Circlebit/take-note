import { AudioHTMLAttributes } from "react";

type AudioClipProps = {
  src: string;
  className?: string;
} & AudioHTMLAttributes<HTMLAudioElement>;

export function ClipAudio(
  { src, ...otherProps }: AudioClipProps,
) {
  return (
    <>
      <audio src={src} {...otherProps} className="w-full" controls />
    </>
  );
}
