"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";

export default function Modal({
  children,
  closeFunc,
}: {
  children: React.ReactNode;
  closeFunc: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFunc();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeFunc]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      closeFunc();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 w-full h-full bg-slate-900/50 backdrop-blur-md z-100 flex items-center justify-center"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className="relative z-110 mx-4 w-full max-w-2xl rounded-xl bg-background p-4 shadow-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 grid size-8 place-items-center text-text transition-colors hover:bg-zinc-100 rounded-full"
          onClick={closeFunc}
          aria-label="Close modal"
        >
          <LuX className="size-5" />
        </button>

        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
