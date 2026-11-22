import React from 'react';
import { GraduationCap, CheckCircle2, MessageSquare } from 'lucide-react';

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

export default function DosenPembimbing({
  initials = '',
  name = 'Dr. Budi Santoso',
  department = 'Teknik Informatika',
  specialty = 'Smart City & IoT',
  statusText = 'Aktif membimbing',
  responseTime = '< 1 hari',
  guidedTeams = '4 tim',
  buttonText = 'Hubungi dosen',
  onContactClick = () => {},
}) {
  const displayInitials = initials || getInitials(name);

  return (
    <aside className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
      {/* Banner Atas Gelap dengan Aksen Maroon */}
      <div className="relative h-24 border-t-4 border-[#9E164B] bg-[#1E1D24]">
        <div className="flex h-full items-start justify-center pt-3">
          <GraduationCap
            className="h-14 w-14 text-[#9E164B]/45"
            strokeWidth={1.6}
          />
        </div>
      </div>

      {/* Konten Profil */}
      <div className="flex flex-1 flex-col items-center px-6 pb-8 text-center">
        {/* Avatar Inisial Overlapping di atas banner */}
        <div className="relative z-10 -mt-10 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-[#FCE7F3] text-xl font-bold text-[#9E164B] shadow-xs">
          {displayInitials}
        </div>

        {/* Badge Status */}
        {statusText && (
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#BBF7D0] bg-[#EEFBF3] px-3.5 py-1.5 text-xs font-semibold text-[#15803D]">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>{statusText}</span>
          </span>
        )}

        {/* Nama & Bidang */}
        <h3 className="mt-4 text-lg font-bold tracking-tight text-[#1E1D24] sm:text-xl">
          {name}
        </h3>

        {(department || specialty) && (
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {department}
            {department && specialty ? ' · ' : ''}
            {specialty}
          </p>
        )}

        {/* Kotak Statistik 2 Kolom (garis pemisah penuh atas-bawah) */}
        <div className="mt-6 grid w-full grid-cols-2 divide-x divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          <div className="px-3 py-4">
            <p className="text-[11px] text-gray-500">Respons rata-rata</p>
            <p className="mt-1 text-sm font-bold text-[#1E1D24]">
              {responseTime}
            </p>
          </div>

          <div className="px-3 py-4">
            <p className="text-[11px] text-gray-500">Tim dibimbing</p>
            <p className="mt-1 text-sm font-bold text-[#1E1D24]">
              {guidedTeams}
            </p>
          </div>
        </div>

        {/* Tombol Hubungi Dosen */}
        <button
          type="button"
          onClick={onContactClick}
          className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-xs font-semibold text-[#1E1D24] transition hover:bg-gray-50 sm:text-sm"
        >
          <MessageSquare className="h-4 w-4 shrink-0" />
          <span>{buttonText}</span>
        </button>
      </div>
    </aside>
  );
}