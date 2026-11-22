import React, { useState } from 'react';
import { Check } from 'lucide-react';

const DEFAULT_SLOTS = [
  {
    id: 'senin',
    day: 'Sen',
    time: '19.00',
    fullLabel: 'Senin, 21 Oktober · 19.00–20.00',
    recommended: false,
  },
  {
    id: 'selasa',
    day: 'Sel',
    time: '20.00',
    fullLabel: 'Selasa, 22 Oktober · 20.00–21.00',
    recommended: true,
  },
  {
    id: 'rabu',
    day: 'Rab',
    time: '16.00',
    fullLabel: 'Rabu, 23 Oktober · 16.00–17.00',
    recommended: false,
  },
];

export default function PilihWaktuDiskusi({
  title = 'Pilih waktu diskusi',
  subtitle = 'Slot terpilih akan dikirim ke kalender semua anggota.',
  slots = DEFAULT_SLOTS,
  initialSelectedId = 'selasa',
  buttonText = 'Konfirmasi jadwal',
  confirmedButtonText = 'Jadwal dikonfirmasi',
  isConfirmed = false,
  onSelect = () => {},
  onConfirm = () => {},
}) {
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  const selectedSlot =
    slots.find((slot) => slot.id === selectedId) || slots[0] || null;

  const handleSelect = (slot) => {
    setSelectedId(slot.id);
    onSelect(slot);
  };

  const handleConfirm = () => {
    if (!selectedSlot) return;
    onConfirm(selectedSlot);
  };

  return (
    <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#EFE4E9] bg-[#FAF4F7] p-5 shadow-xs sm:p-6 lg:flex-row lg:items-center">
      {/* Sisi Kiri: Judul & Deskripsi */}
      <div className="min-w-0">
        <h2 className="text-lg font-bold tracking-tight text-[#1E1D24] sm:text-xl">
          {title}
        </h2>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">{subtitle}</p>
      </div>

      {/* Sisi Kanan: Pilihan Slot & Tombol Konfirmasi */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
        {/* Daftar Kartu Slot */}
        <div
          role="radiogroup"
          aria-label={title}
          className="grid grid-cols-3 gap-2.5 sm:flex sm:items-stretch sm:gap-3"
        >
          {slots.map((slot) => {
            const isSelected = selectedId === slot.id;

            return (
              <button
                key={slot.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelect(slot)}
                className={`flex min-w-[92px] cursor-pointer flex-col items-center justify-center rounded-xl border px-3.5 py-2.5 text-center transition sm:min-w-[104px] sm:px-4 sm:py-3 ${
                  isSelected
                    ? 'border-[#9E164B] bg-[#F4FAFD] shadow-2xs'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-[#FAFAFB]'
                }`}
              >
                <span
                  className={`text-[11px] font-medium ${
                    isSelected ? 'text-[#9E164B]' : 'text-gray-500'
                  }`}
                >
                  {slot.day}
                </span>

                <span
                  className={`mt-0.5 text-sm font-bold sm:text-base ${
                    isSelected ? 'text-[#9E164B]' : 'text-[#1E1D24]'
                  }`}
                >
                  {slot.time}
                </span>

                {slot.recommended && (
                  <span className="mt-0.5 text-[10px] font-semibold text-[#15803D]">
                    Direkomendasikan
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tombol Konfirmasi Jadwal */}
        <button
          type="button"
          onClick={handleConfirm}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#9E164B] px-6 py-3.5 text-xs font-semibold text-white transition hover:bg-[#82113D] sm:text-sm"
        >
          {isConfirmed && <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} />}
          <span>{isConfirmed ? confirmedButtonText : buttonText}</span>
        </button>
      </div>
    </section>
  );
}