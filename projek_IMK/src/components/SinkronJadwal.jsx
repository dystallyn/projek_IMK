import React from 'react';
import { Calendar, Check, RefreshCw } from 'lucide-react';

const DEFAULT_SYNCED_MEMBERS = [
  { id: 1, initials: 'AR', name: 'Anggota AR', isSynced: true },
  { id: 2, initials: 'NP', name: 'Nadia Putri', isSynced: true },
  { id: 3, initials: 'RM', name: 'Raka Mahendra', isSynced: true },
];

export default function SinkronJadwal({
  eyebrow = 'PORTAL AKADEMIK UB',
  title = 'Jadwal kuliah anggota tersinkronisasi',
  description = 'Slot yang bentrok dengan kuliah otomatis tidak tersedia.',
  members = DEFAULT_SYNCED_MEMBERS,
  lastSyncedText = 'Hari ini, 09.42',
  buttonText = 'Sinkron ulang',
  isSyncing = false,
  onResync = () => {},
}) {
  return (
    <section className="flex flex-col justify-between gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs sm:p-6 lg:flex-row lg:items-center">
      {/* Sisi Kiri: Ikon & Informasi Sinkronisasi */}
      <div className="flex items-start gap-4 sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FCE7F3] text-[#9E164B] sm:h-14 sm:w-14">
          <Calendar className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#9E164B] sm:text-xs">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-base font-bold tracking-tight text-[#1E1D24] sm:text-lg">
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
            {description}
          </p>
        </div>
      </div>

      {/* Sisi Kanan: Avatar Anggota & Aksi Sinkron Ulang */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-4 sm:justify-end lg:shrink-0 lg:border-t-0 lg:pt-0">
        {/* Deretan Avatar Anggota Tersinkron */}
        <div className="flex items-center -space-x-1.5">
          {members.map((member, index) => (
            <div
              key={member.id ?? index}
              title={member.name || member.initials}
              className="relative"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#F1F0F4] text-xs font-bold text-[#1E1D24]">
                {member.initials}
              </div>

              {member.isSynced !== false && (
                <span
                  aria-label="Tersinkronisasi"
                  className="absolute bottom-0 right-0 z-10 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#15803D]"
                />
              )}
            </div>
          ))}
        </div>

        {/* Waktu Sinkron & Tombol */}
        <div className="flex flex-col items-end gap-1.5">
          <p className="text-[11px] text-gray-500">
            Terakhir sinkron · {lastSyncedText}
          </p>

          <button
            type="button"
            disabled={isSyncing}
            onClick={onResync}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold text-[#1E1D24] transition hover:bg-gray-50 disabled:cursor-wait disabled:opacity-70 sm:text-sm"
          >
            {isSyncing ? (
              <>
                <RefreshCw className="h-4 w-4 shrink-0 animate-spin text-[#9E164B]" />
                <span>Menyinkronkan...</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                <span>{buttonText}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}