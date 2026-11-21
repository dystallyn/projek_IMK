import React from 'react';
import { Users, Check, Search, ArrowRight } from 'lucide-react';

const VARIANT_STYLES = {
  teal: {
    border: 'border-[#14B8A6]',
    topAccent: 'bg-[#14B8A6]',
    iconBg: 'bg-[#CCFBF1] text-[#0F766E]',
    badge: 'bg-[#CCFBF1] text-[#0F766E]',
  },
  amber: {
    border: 'border-[#F59E0B]',
    topAccent: 'bg-[#F59E0B]',
    iconBg: 'bg-[#FEF3C7] text-[#B45309]',
    badge: 'bg-[#FEF3C7] text-[#B45309]',
  },
  purple: {
    border: 'border-[#A855F7]',
    topAccent: 'bg-[#A855F7]',
    iconBg: 'bg-[#F3E8FF] text-[#7E22CE]',
    badge: 'bg-[#F3E8FF] text-[#7E22CE]',
  },
};

export default function Tim({
  competition = 'GEMASTIK XVII',
  name = 'Nama Tim',
  creatorName = 'Nama Ketua',
  creatorRole = 'Mahasiswa',
  advisor = '',
  currentMembers = 0,
  maxMembers = 5,
  positions = [],
  buttonText = 'Lihat tim',
  variant = 'teal',
  onButtonClick = () => {},
}) {
  const theme = VARIANT_STYLES[variant] || VARIANT_STYLES.teal;

  return (
    <article
      className={`flex h-full flex-col justify-between overflow-hidden rounded-[22px] border bg-white shadow-sm transition hover:shadow-md ${theme.border}`}
    >
      {/* Garis Aksen Atas */}
      <div className={`h-1.5 w-full ${theme.topAccent}`} />

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Baris Atas: Ikon Tim & Badge Lomba */}
          <div className="flex items-center justify-between gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${theme.iconBg}`}
            >
              <Users className="h-5 w-5" />
            </div>

            <span
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide ${theme.badge}`}
            >
              {competition}
            </span>
          </div>

          {/* Nama Tim & Pembuat */}
          <div className="mt-5">
            <h3 className="text-xl font-bold tracking-tight text-[#1E1D24]">
              {name}
            </h3>
            <p className="mt-1 text-xs text-gray-600 sm:text-sm">
              Dibuka oleh{' '}
              <span className="font-bold text-[#1E1D24]">{creatorName}</span>
              {' · '}
              <span>{creatorRole}</span>
            </p>
          </div>

          <hr className="my-4 border-gray-200/80" />

          {/* Status Dosen Pembimbing */}
          {advisor ? (
            <div className="flex items-center gap-2.5 text-xs font-semibold text-[#15803D] sm:text-sm">
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} />
              <span>Pembimbing: {advisor}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 text-xs font-semibold text-amber-600 sm:text-sm">
              <Search className="h-4 w-4 shrink-0" />
              <span>Mencari dosen pembimbing</span>
            </div>
          )}

          <hr className="my-4 border-gray-200/80" />

          {/* Anggota Saat Ini */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Anggota Saat Ini
            </span>
            <span className="text-sm font-bold text-[#1E1D24] sm:text-base">
              {currentMembers}/{maxMembers} anggota
            </span>
          </div>

          <hr className="my-4 border-gray-200/80" />

          {/* Daftar Posisi Dibutuhkan */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Posisi Dibutuhkan
            </p>

            {positions.length > 0 ? (
              <ul className="mt-2 divide-y divide-gray-100">
                {positions.map((pos, index) => (
                  <li
                    key={`${pos.role}-${index}`}
                    className="flex items-center justify-between gap-3 py-2.5 text-xs sm:text-sm"
                  >
                    <span className="font-bold text-[#1E1D24]">{pos.role}</span>
                    <span className="shrink-0 font-bold text-[#15803D]">
                      {pos.count} orang
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-gray-400">
                Belum ada posisi terbuka.
              </p>
            )}
          </div>
        </div>

        {/* Bagian Bawah: Divider & Tombol Aksi */}
        <div className="mt-4">
          <hr className="mb-4 border-gray-100" />

          <button
            type="button"
            onClick={onButtonClick}
            className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-[#9E164B] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#82113D]"
          >
            <span>{buttonText}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}