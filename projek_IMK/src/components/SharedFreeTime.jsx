import React from 'react';
import { Users, Check, X, Sparkles, CheckCircle2 } from 'lucide-react';

const DEFAULT_SLOTS = [
  {
    id: 'senin',
    day: 'Sen',
    time: '19.00',
    fullLabel: 'Senin, 21 Oktober · 19.00–20.00',
  },
  {
    id: 'selasa',
    day: 'Sel',
    time: '20.00',
    fullLabel: 'Selasa, 22 Oktober · 20.00–21.00',
  },
  {
    id: 'rabu',
    day: 'Rab',
    time: '16.00',
    fullLabel: 'Rabu, 23 Oktober · 16.00–17.00',
  },
  {
    id: 'kamis',
    day: 'Kam',
    time: '19.00',
    fullLabel: 'Kamis, 24 Oktober · 19.00–20.00',
  },
];

const DEFAULT_MEMBERS = [
  {
    id: 'arya',
    initials: 'AR',
    name: 'Arya (Kamu)',
    syncedInfo: '5 MK tersinkron',
    availableSlots: ['senin', 'selasa', 'kamis'],
  },
  {
    id: 'nadia',
    initials: 'NP',
    name: 'Nadia',
    syncedInfo: '6 MK tersinkron',
    availableSlots: ['senin', 'selasa', 'rabu'],
  },
  {
    id: 'raka',
    initials: 'RM',
    name: 'Raka',
    syncedInfo: '5 MK tersinkron',
    availableSlots: ['selasa', 'rabu', 'kamis'],
  },
];

function getSlotCellStyle(isAvailable, count, total) {
  if (!isAvailable) {
    return 'bg-[#FEF2F2] text-[#B91C1C]';
  }
  if (total > 0 && count === total) {
    return 'bg-[#9E164B] text-white';
  }
  if (total > 0 && count >= Math.ceil(total / 2)) {
    return 'bg-[#FCE7F3] text-[#9E164B]';
  }
  return 'bg-[#FFF5F8] text-[#9E164B]/80';
}

export default function SharedFreeTime({
  title = 'Shared free-time',
  subtitle = 'Semakin gelap, semakin banyak anggota tersedia.',
  slots = DEFAULT_SLOTS,
  members = DEFAULT_MEMBERS,
}) {
  const totalMembers = members.length;

  // Hitung jumlah anggota tersedia untuk tiap slot
  const slotCounts = slots.reduce((acc, slot) => {
    acc[slot.id] = members.filter((member) =>
      member.availableSlots.includes(slot.id)
    ).length;
    return acc;
  }, {});

  // Cari slot terbaik (jumlah anggota tersedia paling banyak)
  const bestSlot = slots.reduce((best, current) => {
    if (!best) return current;
    return slotCounts[current.id] > slotCounts[best.id] ? current : best;
  }, null);

  const bestCount = bestSlot ? slotCounts[bestSlot.id] : 0;

  return (
    <section className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-7">
      {/* Header Komponen */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3] text-[#9E164B]">
          <Users className="h-5 w-5" strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight text-[#1E1D24] sm:text-xl">
            {title}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Tabel Matriks Ketersediaan */}
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[460px]">
          {/* Header Kolom */}
          <div className="grid grid-cols-[minmax(150px,1.6fr)_repeat(4,minmax(64px,1fr))] items-center border-b border-gray-100 pb-3.5">
            <span className="text-xs font-semibold text-gray-500 sm:text-sm">
              Anggota
            </span>

            {slots.map((slot) => (
              <div key={slot.id} className="text-center">
                <p className="text-xs font-bold text-[#1E1D24] sm:text-sm">
                  {slot.day}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500">{slot.time}</p>
              </div>
            ))}
          </div>

          {/* Daftar Baris Anggota */}
          <div className="divide-y divide-gray-100">
            {members.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-[minmax(150px,1.6fr)_repeat(4,minmax(64px,1fr))] items-center py-4"
              >
                {/* Identitas Anggota */}
                <div className="flex items-center gap-3 pr-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3] text-xs font-bold text-[#9E164B]">
                    {member.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#1E1D24]">
                      {member.name}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-gray-500">
                      {member.syncedInfo}
                    </p>
                  </div>
                </div>

                {/* Status Ketersediaan per Hari */}
                {slots.map((slot) => {
                  const isAvailable = member.availableSlots.includes(slot.id);
                  const availableCount = slotCounts[slot.id] || 0;
                  const cellClass = getSlotCellStyle(
                    isAvailable,
                    availableCount,
                    totalMembers
                  );

                  return (
                    <div key={slot.id} className="flex justify-center">
                      <span
                        title={`${member.name} - ${slot.day} ${slot.time}: ${
                          isAvailable ? 'Tersedia' : 'Tidak tersedia'
                        }`}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${cellClass}`}
                      >
                        {isAvailable ? (
                          <Check className="h-4 w-4" strokeWidth={2.5} />
                        ) : (
                          <X className="h-4 w-4" strokeWidth={2.2} />
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banner Rekomendasi Slot Terbaik */}
      {bestSlot && bestCount > 0 && (
        <div className="mt-5 flex flex-col justify-between gap-3 rounded-2xl border border-[#86EFAC] bg-[#EEFBF3] px-5 py-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3.5 sm:items-center">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D] sm:mt-0" />
            <div>
              <p className="text-sm font-bold text-[#15803D]">
                Slot terbaik ditemukan
              </p>
              <p className="mt-0.5 text-xs font-medium text-[#166534] sm:text-sm">
                {bestSlot.fullLabel}
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[#86EFAC] bg-white/75 px-3.5 py-1.5 text-xs font-semibold text-[#15803D]">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>
              {bestCount}/{totalMembers} tersedia
            </span>
          </span>
        </div>
      )}
    </section>
  );
}