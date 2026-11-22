import React, { useEffect } from 'react';
import { X, Lock, AlertTriangle } from 'lucide-react';

export default function KunciTimDialog({
  isOpen = false,
  onClose = () => {},
  onConfirm = () => {},
  title = 'Kunci & Konfirmasi Tim?',
  description = 'Setelah dikunci, susunan anggota tidak dapat diubah tanpa persetujuan admin. Pastikan seluruh anggota dan perannya sudah benar.',
  warningTitle = 'Tindakan ini memengaruhi seluruh tim',
  warningDescription = 'Undangan yang masih tertunda akan otomatis dibatalkan.',
  cancelText = 'Batal',
  confirmText = 'Ya, kunci tim',
}) {
  // Tutup dengan tombol Escape & kunci scroll halaman belakang
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kunci-tim-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-7"
      >
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup dialog"
          className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Ikon Gembok */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCE7F3] text-[#9E164B]">
          <Lock className="h-5 w-5" />
        </div>

        {/* Judul & Deskripsi */}
        <h2
          id="kunci-tim-title"
          className="mt-5 text-xl font-bold tracking-tight text-[#1E1D24] sm:text-2xl"
        >
          {title}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
          {description}
        </p>

        {/* Kotak Peringatan */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3.5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#B45309]" />
          <div>
            <p className="text-xs font-bold text-[#B45309] sm:text-sm">
              {warningTitle}
            </p>
            <p className="mt-0.5 text-xs text-[#B45309]/90">
              {warningDescription}
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Tombol Aksi */}
        <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold text-[#1E1D24] transition hover:bg-gray-50 sm:text-sm"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#B91C1C] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#991B1B] sm:text-sm"
          >
            <Lock className="h-4 w-4 shrink-0" />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}