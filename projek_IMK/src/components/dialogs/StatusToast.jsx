import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

export default function StatusToast({
  isOpen = false,
  onClose = () => {},
  title = 'Team Locked',
  message = 'Susunan Tim Aurora berhasil dikunci dan dikonfirmasi.',
  autoClose = true,
  duration = 4000,
}) {
  useEffect(() => {
    if (!isOpen || !autoClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, autoClose, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-24 z-50 px-3 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl justify-end">
        <div className="pointer-events-auto flex w-full items-center justify-between gap-4 rounded-2xl border border-gray-200/90 bg-white px-4 py-3.5 shadow-[0_8px_28px_rgba(0,0,0,0.08)] sm:w-auto sm:max-w-lg sm:px-5">
          <div className="flex items-center gap-3">
            {/* Ikon Centang Hijau */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-white">
              <Check className="h-4 w-4" strokeWidth={2.5} />
            </div>

            {/* Teks Status */}
            <div className="min-w-0">
              <p className="text-sm font-bold leading-snug text-[#1E1D24]">
                {title}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-gray-500 sm:whitespace-nowrap">
                {message}
              </p>
            </div>
          </div>

          {/* Tombol Tutup */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup notifikasi"
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}