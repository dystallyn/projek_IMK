import React, { useEffect } from 'react';
import { X, Clock, Users, Briefcase } from 'lucide-react';

const VARIANT_STYLES = {
  teal: {
    cardBorder: 'border-[#14B8A6]',
    topBar: 'bg-[#14B8A6]',
    badge: 'bg-[#CCFBF1] text-[#0F766E]',
    iconBg: 'bg-[#CCFBF1] text-[#0F766E]',
    statIcon: 'text-[#0F766E]',
    summaryBox: 'border-[#99F6E4] bg-[#CCFBF1]/70 divide-[#99F6E4]',
    summaryTitle: 'text-[#0F766E]',
  },
  amber: {
    cardBorder: 'border-[#F59E0B]',
    topBar: 'bg-[#F59E0B]',
    badge: 'bg-[#FEF3C7] text-[#B45309]',
    iconBg: 'bg-[#FCE7F3] text-[#9E164B]',
    statIcon: 'text-[#B45309]',
    summaryBox: 'border-[#FDE68A] bg-[#FEF3C7]/70 divide-[#FDE68A]',
    summaryTitle: 'text-[#B45309]',
  },
  purple: {
    cardBorder: 'border-[#A855F7]',
    topBar: 'bg-[#A855F7]',
    badge: 'bg-[#F3E8FF] text-[#7E22CE]',
    iconBg: 'bg-[#F3E8FF] text-[#7E22CE]',
    statIcon: 'text-[#7E22CE]',
    summaryBox: 'border-[#E9D5FF] bg-[#F3E8FF]/70 divide-[#E9D5FF]',
    summaryTitle: 'text-[#7E22CE]',
  },
};

export default function DetailLombaDialog({
  isOpen = false,
  onClose = () => {},
  lomba = null,
  footer = null,
}) {
  // Tutup dialog dengan tombol Escape & kunci scroll halaman belakang
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

  if (!isOpen || !lomba) return null;

  const theme = VARIANT_STYLES[lomba.variant] || VARIANT_STYLES.teal;
  const Icon = lomba.icon;
  const requirements = lomba.requirements || [];
  const roles = lomba.roles || [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-lomba-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border bg-white shadow-2xl ${theme.cardBorder}`}
      >
        {/* Garis Aksen Atas */}
        <div className={`h-1.5 w-full ${theme.topBar}`} />

        {/* Header Dialog */}
        <div className="flex items-start justify-between gap-4 px-6 py-6 sm:px-8">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 ${theme.iconBg}`}
            >
              {Icon ? <Icon className="h-5 w-5 sm:h-6 sm:w-6" /> : null}
            </div>

            <div>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${theme.badge}`}
              >
                {lomba.category}
              </span>
              <h2
                id="dialog-lomba-title"
                className="mt-1.5 text-xl font-bold tracking-tight text-[#1E1D24] sm:text-2xl"
              >
                {lomba.title}
              </h2>
              <p className="mt-0.5 text-sm text-gray-600">{lomba.organizer}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Baris Statistik 3 Kolom */}
        <div className="grid grid-cols-1 divide-y divide-gray-200 border-y border-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex items-center gap-3 px-6 py-4 sm:px-8">
            <Clock className={`h-5 w-5 shrink-0 ${theme.statIcon}`} />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Batas Pendaftaran
              </p>
              <p className="mt-0.5 text-sm font-bold text-[#1E1D24]">
                {lomba.deadlineText}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 sm:px-8">
            <Users className={`h-5 w-5 shrink-0 ${theme.statIcon}`} />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Tim Terbentuk
              </p>
              <p className="mt-0.5 text-sm font-bold text-[#1E1D24]">
                {lomba.teamsFormed} tim
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 sm:px-8">
            <Briefcase className={`h-5 w-5 shrink-0 ${theme.statIcon}`} />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Posisi Terbuka
              </p>
              <p className="mt-0.5 text-sm font-bold text-[#1E1D24]">
                {lomba.openPositions} posisi
              </p>
            </div>
          </div>
        </div>

        {/* Konten Utama: Tentang Kompetisi & Ketentuan Tim */}
        <div className="px-6 py-6 sm:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm font-bold text-[#1E1D24] sm:text-base">
                Tentang kompetisi
              </h3>
              <p className="mt-2.5 text-xs leading-relaxed text-gray-600 sm:text-sm">
                {lomba.description || 'Deskripsi kompetisi belum tersedia.'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#1E1D24] sm:text-base">
                Ketentuan tim
              </h3>
              <ul className="mt-2.5 space-y-2 pl-4 text-xs leading-relaxed text-gray-600 sm:text-sm">
                {requirements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Kotak Ringkasan Tim & Posisi */}
          <div
            className={`mt-7 grid grid-cols-1 divide-y rounded-xl border sm:grid-cols-2 sm:divide-x sm:divide-y-0 ${theme.summaryBox}`}
          >
            <div className="px-5 py-4">
              <p className={`text-sm font-bold sm:text-base ${theme.summaryTitle}`}>
                {lomba.teamsFormed} tim
              </p>
              <p className="mt-0.5 text-xs text-gray-600">dapat dijelajahi</p>
            </div>

            <div className="px-5 py-4">
              <p className={`text-sm font-bold sm:text-base ${theme.summaryTitle}`}>
                {lomba.openPositions} posisi
              </p>
              <p className="mt-0.5 text-xs text-gray-600">
                {roles.join(' · ')}
              </p>
            </div>
          </div>
        </div>

        {/* Area Footer Dialog */}
        <div className="min-h-[64px] border-t border-gray-200 bg-[#FAFAFB] px-6 py-4 sm:px-8">
          {footer}
        </div>
      </div>
    </div>
  );
}