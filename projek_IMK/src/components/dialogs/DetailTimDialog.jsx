import React, { useEffect } from 'react';
import {
  X,
  Users,
  Check,
  CheckCircle2,
  ArrowRight,
  Search,
} from 'lucide-react';

const AVATAR_COLORS = [
  'bg-[#FCE7F3] text-[#9E164B]',
  'bg-[#FFEDD5] text-[#9A3412]',
  'bg-[#E5E7EB] text-[#374151]',
  'bg-[#CCFBF1] text-[#0F766E]',
  'bg-[#F3E8FF] text-[#7E22CE]',
];

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

export default function DetailTimDialog({
  isOpen = false,
  onClose = () => {},
  tim = null,
  isApplied = false,
  onApply = () => {},
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

  if (!isOpen || !tim) return null;

  const positions = tim.positions || [];
  const members = tim.members || [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-tim-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl"
      >
        {/* Garis Aksen Atas */}
        <div className="h-1.5 w-full bg-[#ECEBF0]" />

        {/* Header Dialog */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-6 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3] text-[#9E164B] sm:h-14 sm:w-14">
              <Users className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#9E164B] sm:text-xs">
                {tim.competition}
              </p>
              <h2
                id="detail-tim-title"
                className="mt-1 text-xl font-bold tracking-tight text-[#1E1D24] sm:text-2xl"
              >
                {tim.name}
              </h2>
              <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">
                Dibuka oleh {tim.creatorName} · {tim.creatorRole}
              </p>
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

        {/* Konten Utama */}
        <div className="px-6 py-6 sm:px-8">
          {/* Banner Status Dosen Pembimbing */}
          {tim.advisor ? (
            <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-[#BBF7D0] bg-[#EEFBF3] px-5 py-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3.5">
                <Check
                  className="h-5 w-5 shrink-0 text-[#15803D]"
                  strokeWidth={2.5}
                />
                <div>
                  <p className="text-sm font-bold text-[#15803D]">
                    Sudah memiliki dosen pembimbing
                  </p>
                  <p className="mt-0.5 text-xs text-[#15803D]/90">
                    {tim.advisor}
                  </p>
                </div>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#86EFAC] bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-[#15803D]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Terkonfirmasi</span>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3.5 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
              <Search className="h-5 w-5 shrink-0 text-amber-700" />
              <div>
                <p className="text-sm font-bold text-amber-800">
                  Mencari dosen pembimbing
                </p>
                <p className="mt-0.5 text-xs text-amber-700/90">
                  Tim ini belum memiliki dosen pembimbing terkonfirmasi.
                </p>
              </div>
            </div>
          )}

          {/* Grid 2 Kolom: Tentang & Posisi (Kiri) + Anggota Tim (Kanan) */}
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Kolom Kiri */}
            <div className="md:col-span-5">
              <div>
                <h3 className="text-sm font-bold text-[#1E1D24] sm:text-base">
                  Tentang tim
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                  {tim.description || 'Deskripsi tim belum tersedia.'}
                </p>
              </div>

              <hr className="my-5 border-gray-200" />

              <div>
                <h3 className="text-sm font-bold text-[#1E1D24] sm:text-base">
                  Posisi yang dibutuhkan
                </h3>

                {positions.length > 0 ? (
                  <ul className="mt-3 divide-y divide-gray-200/80 border-y border-gray-200/80">
                    {positions.map((pos, index) => (
                      <li
                        key={`${pos.role}-${index}`}
                        className="flex items-center justify-between gap-3 py-3 text-xs sm:text-sm"
                      >
                        <span className="font-bold text-[#1E1D24]">
                          {pos.role}
                        </span>
                        <span className="shrink-0 font-bold text-[#15803D]">
                          {pos.count} orang
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xs text-gray-400">
                    Tidak ada posisi terbuka saat ini.
                  </p>
                )}
              </div>
            </div>

            {/* Kolom Kanan: Anggota Tim */}
            <div className="md:col-span-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-[#1E1D24] sm:text-base">
                    Anggota tim
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Peran yang sudah terisi.
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-[#ECEBF0] px-3 py-1 text-xs font-semibold text-[#1E1D24]">
                  {tim.currentMembers}/{tim.maxMembers} anggota
                </span>
              </div>

              <div className="mt-3 divide-y divide-gray-200/80 overflow-hidden rounded-xl border border-gray-200 bg-white">
                {members.length > 0 ? (
                  members.map((member, index) => {
                    const colorClass =
                      AVATAR_COLORS[index % AVATAR_COLORS.length];

                    return (
                      <div
                        key={`${member.name}-${index}`}
                        className="flex items-center gap-3.5 p-4"
                      >
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${colorClass}`}
                        >
                          {member.initials || getInitials(member.name)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-bold text-[#1E1D24]">
                              {member.name}
                            </p>
                            {member.isLeader && (
                              <span className="rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[10px] font-bold text-[#B45309]">
                                Ketua
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs font-semibold text-[#1E1D24]">
                            {member.role}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {member.major}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="p-4 text-xs text-gray-400">
                    Data anggota tim belum tersedia.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Aksi */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-[#FAFAFB] px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold text-[#1E1D24] transition hover:bg-gray-50 sm:text-sm"
          >
            Tutup
          </button>

          {isApplied ? (
            <button
              type="button"
              disabled
              className="inline-flex cursor-default items-center justify-center gap-2 rounded-xl bg-[#9E164B] px-5 py-2.5 text-xs font-semibold text-white sm:text-sm"
            >
              <Check className="h-4 w-4" strokeWidth={2.5} />
              <span>Pengajuan terkirim</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onApply(tim)}
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#9E164B] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#82113D] sm:text-sm"
            >
              <span>Ajukan bergabung</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}