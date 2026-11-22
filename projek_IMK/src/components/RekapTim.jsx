import React from 'react';
import { Check } from 'lucide-react';

const AVATAR_VARIANTS = {
  pink: 'bg-[#FCE7F3] text-[#9E164B]',
  gray: 'bg-[#E5E7EB] text-[#1E1D24]',
  amber: 'bg-[#FFEDD5] text-[#9E164B]',
  teal: 'bg-[#CCFBF1] text-[#0F766E]',
  purple: 'bg-[#F3E8FF] text-[#7E22CE]',
};

const DEFAULT_MEMBERS = [
  {
    id: 1,
    initials: 'NP',
    avatarVariant: 'pink',
    name: 'Nadia Putri',
    role: 'Ketua Tim',
    isApproved: true,
  },
  {
    id: 2,
    initials: 'RM',
    avatarVariant: 'pink',
    name: 'Raka Mahendra',
    role: 'Frontend Developer',
    isApproved: true,
  },
  {
    id: 3,
    initials: 'SA',
    avatarVariant: 'gray',
    name: 'Sarah Azzahra',
    role: 'Business Strategist',
    isApproved: true,
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

export default function RekapTim({
  stepNumber = 2,
  title = 'Rekap tim',
  subtitle = 'Tim Aurora · GEMASTIK',
  members = DEFAULT_MEMBERS,
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-7">
      {/* Header Kartu */}
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3] text-sm font-bold text-[#9E164B]">
          {stepNumber}
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight text-[#1E1D24] sm:text-xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Daftar Anggota */}
      <div className="mt-5 divide-y divide-gray-100 border-t border-gray-100">
        {members.map((member, index) => {
          const avatarClass =
            AVATAR_VARIANTS[member.avatarVariant] || AVATAR_VARIANTS.gray;

          return (
            <div
              key={member.id ?? index}
              className="flex items-center justify-between gap-3 py-4 last:pb-1"
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${avatarClass}`}
                >
                  {member.initials || getInitials(member.name)}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#1E1D24]">
                    {member.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {member.role}
                  </p>
                </div>
              </div>

              {member.isApproved !== false && (
                <Check
                  className="h-4 w-4 shrink-0 text-[#15803D]"
                  strokeWidth={2.5}
                  aria-label="Anggota terkonfirmasi"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}