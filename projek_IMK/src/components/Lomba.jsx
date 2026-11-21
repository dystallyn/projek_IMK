import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

const VARIANT_STYLES = {
  teal: {
    topAccent: 'bg-[#14B8A6]',
    badge: 'bg-[#CCFBF1] text-[#0F766E]',
    iconBg: 'bg-[#CCFBF1] text-[#0F766E]',
  },
  amber: {
    topAccent: 'bg-[#F59E0B]',
    badge: 'bg-[#FEF3C7] text-[#B45309]',
    iconBg: 'bg-[#FCE7F3] text-[#9E164B]',
  },
  purple: {
    topAccent: 'bg-[#A855F7]',
    badge: 'bg-[#F3E8FF] text-[#7E22CE]',
    iconBg: 'bg-[#F3E8FF] text-[#7E22CE]',
  },
};

export default function Lomba({
  icon: Icon = null,
  category = 'Kategori',
  title = 'Nama Lomba',
  organizer = 'Penyelenggara',
  deadlineLabel = 'Pendaftaran ditutup',
  deadlineText = '0 hari lagi',
  teamsFormed = 0,
  openPositions = 0,
  roles = ['Posisi 1', 'Posisi 2'],
  buttonText = 'Lihat tim',
  detailText = 'Detail lomba',
  variant = 'teal',
  onButtonClick = () => {},
  onDetailClick = () => {},
}) {
  const theme = VARIANT_STYLES[variant] || VARIANT_STYLES.teal;

  return (
    <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Garis Aksen Warna di Bagian Atas Kartu */}
      <div className={`h-[3px] w-full ${theme.topAccent}`} />

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Baris Atas: Ikon & Badge Kategori */}
          <div className="flex items-center justify-between gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${theme.iconBg}`}
            >
              {Icon ? <Icon className="h-5 w-5" /> : null}
            </div>

            <span
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${theme.badge}`}
            >
              {category}
            </span>
          </div>

          {/* Judul & Penyelenggara */}
          <div className="mt-5">
            <h3 className="text-xl font-bold tracking-tight text-[#1E1D24]">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-700">{organizer}</p>
          </div>

          <hr className="my-5 border-gray-100" />

          {/* Info Batas Pendaftaran */}
          <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
            <span className="flex items-center gap-2 text-gray-500">
              <Clock className="h-4 w-4 shrink-0 text-gray-500" />
              <span>{deadlineLabel}</span>
            </span>
            <span className="font-bold text-[#B45309]">{deadlineText}</span>
          </div>

          <hr className="my-5 border-gray-100" />

          {/* Statistik Tim Terbentuk & Posisi Terbuka */}
          <div className="grid grid-cols-2 divide-x divide-gray-200">
            <div className="pr-4">
              <p className="text-2xl font-bold text-[#1E1D24]">{teamsFormed}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Tim Terbentuk
              </p>
            </div>

            <div className="pl-5">
              <p className="text-2xl font-bold text-[#15803D]">
                {openPositions}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Posisi Terbuka
              </p>
            </div>
          </div>

          {/* Posisi yang Dicari */}
          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Dicari
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold text-[#1E1D24]">
              {roles.map((role, index) => (
                <React.Fragment key={`${role}-${index}`}>
                  <span>{role}</span>
                  {index < roles.length - 1 && (
                    <span className="text-gray-300">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Bagian Bawah: Divider & Aksi */}
        <div>
          <hr className="my-5 border-gray-100" />

          <button
            type="button"
            onClick={onButtonClick}
            className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-[#9E164B] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#82113D]"
          >
            <span>{buttonText}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onDetailClick}
            className="mt-4 cursor-pointer text-xs font-semibold text-[#9E164B] transition hover:underline sm:text-sm"
          >
            {detailText}
          </button>
        </div>
      </div>
    </article>
  );
}