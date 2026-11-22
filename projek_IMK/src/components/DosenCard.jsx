import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const AVATAR_VARIANTS = {
  gray: 'bg-[#E9E7EC] text-[#1E1D24]',
  pink: 'bg-[#FCE7F3] text-[#9E164B]',
  amber: 'bg-[#FFEDD5] text-[#9E164B]',
  teal: 'bg-[#CCFBF1] text-[#0F766E]',
  purple: 'bg-[#F3E8FF] text-[#7E22CE]',
};

function getInitials(name = '') {
  const cleaned = name
    .replace(/\b(Dr|Prof|Ir|H|Hj)\.\s*/gi, '')
    .trim();

  return cleaned
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

export default function DosenCard({
  initials = '',
  avatarVariant = 'gray',
  name = 'Dr. Maya Anggraini',
  matchPercentage = 92,
  role = 'Dosen · Product & Business',
  skills = ['Product Strategy', 'Business Model'],
  isQuotaAvailable = true,
  quotaText = '',
  actionText = 'Lihat profil',
  isSelected = false,
  onSelect = () => {},
  onViewProfile = () => {},
}) {
  const displayInitials = initials || getInitials(name);
  const avatarClass = isSelected
    ? AVATAR_VARIANTS.pink
    : AVATAR_VARIANTS[avatarVariant] || AVATAR_VARIANTS.gray;

  const statusLabel =
    quotaText || (isQuotaAvailable ? 'Kuota tersedia' : 'Kuota penuh');

  return (
    <article
      onClick={onSelect}
      aria-selected={isSelected}
      className={`flex cursor-pointer flex-col justify-between gap-5 rounded-2xl border bg-white p-5 transition sm:flex-row sm:items-stretch sm:p-6 ${
        isSelected
          ? 'border-[#9E164B] ring-1 ring-[#9E164B]/20 shadow-[0_6px_20px_rgba(158,22,75,0.12)]'
          : 'border-gray-200 shadow-xs hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {/* Sisi Kiri: Avatar & Informasi Dosen */}
      <div className="flex items-start gap-4 sm:items-center">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition sm:h-14 sm:w-14 sm:text-base ${avatarClass}`}
        >
          {displayInitials}
        </div>

        <div className="min-w-0">
          {/* Nama & Badge Kecocokan */}
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-base font-bold tracking-tight text-[#1E1D24] sm:text-lg">
              {name}
            </h3>

            {matchPercentage !== undefined && matchPercentage !== null && (
              <span className="inline-flex items-center rounded-full border border-[#FAD4E2] bg-[#FFF5F8] px-3 py-1 text-xs font-bold text-[#9E164B]">
                {matchPercentage}% sesuai
              </span>
            )}
          </div>

          {/* Peran & Bidang */}
          {role && (
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">{role}</p>
          )}

          {/* Daftar Keahlian */}
          {skills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-lg border border-gray-200 bg-[#FAFAFB] px-3 py-1 text-xs font-medium text-gray-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sisi Kanan: Status Kuota & Aksi Lihat Profil */}
      <div className="flex flex-row items-center justify-between gap-3 border-t border-gray-100 pt-4 sm:flex-col sm:items-end sm:justify-between sm:border-t-0 sm:pt-1">
        <span
          className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${
            isQuotaAvailable
              ? 'border-[#BBF7D0] bg-[#EEFBF3] text-[#15803D]'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {isQuotaAvailable ? (
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <XCircle className="h-3.5 w-3.5 shrink-0" />
          )}
          <span>{statusLabel}</span>
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewProfile();
          }}
          className="mt-0 cursor-pointer text-sm font-bold text-[#9E164B] transition hover:text-[#82113D] hover:underline sm:mt-8"
        >
          {actionText}
        </button>
      </div>
    </article>
  );
}