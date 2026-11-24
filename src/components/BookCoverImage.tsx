import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface BookCoverImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function BookCoverImage({ src, alt, className = '', fallbackTitle }: BookCoverImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white p-3 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <BookOpen className="w-6 h-6 text-slate-300 mb-2 shrink-0" />
        <span className="text-[11px] font-semibold leading-snug line-clamp-3 text-slate-100">
          {fallbackTitle ?? alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
