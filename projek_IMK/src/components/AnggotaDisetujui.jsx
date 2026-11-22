import React from 'react';
import { Check, CheckCircle2, Lock } from 'lucide-react';

const AVATAR_VARIANTS = {
  amber: 'bg-[#FFEDD5] text-[#9E164B]',
  pink: 'bg-[#FCE7F3] text-[#9E164B]',
  gray: 'bg-[#E5E7EB] text-[#1E1D24]',
  teal: 'bg-[#CCFBF1] text-[#0F766E]',
  purple: 'bg-[#F3E8FF] text-[#7E22CE]',
};

const DEFAULT_MEMBERS = [
  {
    id: 1,
    initials: 'NP',
    avatarVariant: 'amber',
    name: 'Nadia Putri',
    role: 'Ketua Tim · Product Designer',
    status: 'Disetujui',
  },
  {
    id: 2,
    initials: 'RM',
    avatarVariant: 'pink',
    name: 'Raka Mahendra',
    role: 'Frontend Developer',
    status: 'Disetujui',
  },
  {
    id: 3,
    initials: 'SA',
    avatarVariant: 'gray',
    name: 'Sarah Azzahra',
    role: 'Business Strategist',
    status: 'Disetujui',
  },
];

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

export default function AnggotaDisetujui({
  title = 'Anggota disetujui',
  members = DEFAULT_MEMBERS,
  totalPositions = 3,
  isLocked = false,
  lockedDate = '20 Oktober 2024',
  onLockTeam = () => {},
}) {
  const filledCount = members.length;
  const isComplete = filledCount >= totalPositions;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-7">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#1E1D24] sm:text-xl">
            {title}
          </h2>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {filledCount} dari {totalPositions} posisi telah terisi.
          </p>
        </div>

        <span
          className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${
            isComplete
              ? 'border-[#BBF7D0] bg-[#EEFBF3] text-[#15803D]'
              : 'border-amber-200 bg-amber-50 text-amber-700'
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          <span>{isComplete ? 'Tim lengkap' : 'Menunggu anggota'}</span>
        </span>
      </div>

      {/* Daftar Anggota */}
      <div className="mt-5 divide-y divide-gray-100 border-t border-gray-100">
        {members.map((member, index) => {
          const avatarClass =
            AVATAR_VARIANTS[member.avatarVariant] || AVATAR_VARIANTS.gray;

          return (
            <div
              key={member.id ?? index}
              className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold sm:h-12 sm:w-12 ${avatarClass}`}
                >
                  {member.initials || getInitials(member.name)}
                </div>

                <div>
                  <p className="text-sm font-bold text-[#1E1D24] sm:text-base">
                    {member.name}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                    {member.role}
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[#BBF7D0] bg-[#EEFBF3] px-3.5 py-1.5 text-xs font-semibold text-[#15803D]">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span>{member.status || 'Disetujui'}</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Kotak Status Bawah: Berubah otomatis saat isLocked true */}
      {isLocked ? (
        <div className="mt-4 flex items-start gap-3.5 rounded-2xl border border-[#86EFAC] bg-[#EEFBF3] px-5 py-4 sm:items-center sm:px-6 sm:py-5">
          <Check
            className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D] sm:mt-0"
            strokeWidth={2.5}
          />
          <div>
            <p className="text-sm font-bold text-[#15803D]">
              Tim telah dikunci
            </p>
            <p className="mt-0.5 text-xs text-gray-500">
              Susunan final dikonfirmasi pada {lockedDate}.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-[#F9F8FA] p-4 sm:flex-row sm:items-center sm:px-6 sm:py-5">
          <div className="flex items-start gap-3.5 sm:items-center">
            <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#9E164B] sm:mt-0" />
            <div>
              <p className="text-sm font-bold text-[#1E1D24]">
                Siap mengunci susunan tim?
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                Pastikan semua data anggota sudah benar.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLockTeam}
            className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#9E164B] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#82113D] sm:text-sm"
          >
            <Lock className="h-4 w-4 shrink-0" />
            <span>Lock Team</span>
          </button>
        </div>
      )}
    </section>
  );
}