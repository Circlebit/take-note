import { AudioHTMLAttributes } from "react";

type AudioClipProps = {
  src: string;
  className?: string;
  onDelete: () => void;
} & AudioHTMLAttributes<HTMLAudioElement>;

export function AudioClip(
  { src, className = "", ...otherProps }: AudioClipProps,
) {
  return (
    <div
      className={`flex my-3 p-2 border-2 border-amber-400 rounded-none ${className}`}
    >
      <audio src={src} {...otherProps} className="w-full" controls />
      <button className="hover:text-red-600" type="button">✕</button>
    </div>
  );
}
