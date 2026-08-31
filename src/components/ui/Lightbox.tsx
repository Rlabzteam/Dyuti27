import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#071A33]/95 backdrop-blur-md p-4 sm:p-8 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      onClick={onClose}
    >
      {/* Top Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/15 transition-all z-20 cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev Button */}
      {hasPrev && onPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/15 transition-all z-20 cursor-pointer"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Button */}
      {hasNext && onNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/15 transition-all z-20 cursor-pointer"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Content */}
      <div
        className="max-w-5xl max-h-[90vh] flex flex-col items-center justify-center relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-[20px] overflow-hidden border border-white/20 shadow-2xl bg-black/40">
          <img
            src={imageUrl}
            alt={title}
            onError={(e) => {
              const target = e.currentTarget;
              const filename = imageUrl.split('/').pop();
              if (filename && !target.src.startsWith('https://dyuti.in')) {
                target.src = `https://dyuti.in/uploads/gallery/${filename}`;
              }
            }}
            className="max-w-full max-h-[75vh] object-contain"
          />
        </div>
        {title && (
          <div className="mt-5 text-center px-4">
            <p className="text-white/95 text-base sm:text-lg font-heading font-semibold tracking-normal max-w-2xl m-0 leading-relaxed">
              {title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
