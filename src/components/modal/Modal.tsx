import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;

      modalRef.current?.focus();

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        previousFocus.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed max-h-screen overflow-auto inset-0 z-50 flex items-center justify-center bg-background/20"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        className="relative w-full max-w-lg mt-8 mx-auto mb-auto bg-foreground border border-background/10 rounded-2xl shadow-2xl outline-none"
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-foreground/10">
          <h2
            id="modal-title"
            className="text-background text-xl font-semibold tracking-tight"
          >
            {title}
          </h2>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-lg text-background/40 hover:text-accent hover:bg-background/10 transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>
        <main className="px-6 py-5 text-background/80">{children}</main>
      </div>
    </div>,
    modalRoot
  );
};
