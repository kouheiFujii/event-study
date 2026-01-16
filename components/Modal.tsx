"use client";

import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: モーダルオーバーレイのクリックデモ用
    // biome-ignore lint/a11y/noStaticElementInteractions: モーダルオーバーレイのクリックデモ用
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: stopPropagationデモ用 */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: stopPropagationデモ用 */}
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
