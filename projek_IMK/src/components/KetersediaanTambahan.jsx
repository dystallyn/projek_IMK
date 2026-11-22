import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';

const DEFAULT_SLOTS = [
  { id: 'senin', label: 'Senin, 19.00–20.00' },
  { id: 'selasa', label: 'Selasa, 20.00–21.00' },
  { id: 'rabu', label: 'Rabu, 16.00–17.00' },
  { id: 'kamis', label: 'Kamis, 19.00–20.00' },
];

const DEFAULT_SELECTED_IDS = ['senin', 'selasa', 'kamis'];

export default function KetersediaanTambahan({
  title = 'Ketersediaan tambahan',
  subtitle = 'Tambahkan kesibukan di luar jadwal kuliah.',
  initialDateRange = '21–24 Oktober 2024',
  slots = DEFAULT_SLOTS,
  initialSelectedIds = DEFAULT_SELECTED_IDS,
  helperText = 'Kamu dapat memilih lebih dari satu waktu.',
  buttonText = 'Simpan ketersediaan',
  onSave = () => {},
}) {
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [selectedIds, setSelectedIds] = useState(initialSelectedIds);

  const handleToggleSlot = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedSlots = slots.filter((slot) => selectedIds.includes(slot.id));
    onSave({
      dateRange,
      selectedIds,
      selectedSlots,
    });
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-7">
      {/* Header Komponen */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3] text-[#9E164B]">
          <Clock className="h-5 w-5" strokeWidth={2} />
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

      {/* Form Ketersediaan */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Rentang Tanggal */}
        <div>
          <label
            htmlFor="rentang-tanggal"
            className="block text-sm font-bold text-[#1E1D24]"
          >
            Rentang tanggal
          </label>

          <div className="relative mt-2.5">
            <Calendar
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              strokeWidth={1.8}
            />
            <input
              id="rentang-tanggal"
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-600 transition focus:border-[#9E164B] focus:text-[#1E1D24] focus:outline-none focus:ring-2 focus:ring-[#9E164B]/20"
            />
          </div>
        </div>

        {/* Waktu yang Tersedia */}
        <div>
          <p className="text-sm font-bold text-[#1E1D24]">
            Waktu yang tersedia
          </p>

          <div className="mt-2.5 space-y-2.5">
            {slots.map((slot) => {
              const isChecked = selectedIds.includes(slot.id);

              return (
                <button
                  key={slot.id}
                  type="button"
                  role="checkbox"
                  aria-checked={isChecked}
                  onClick={() => handleToggleSlot(slot.id)}
                  className="flex w-full cursor-pointer items-center gap-3.5 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-left transition hover:border-gray-300 hover:bg-[#FAFAFB]"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition ${
                      isChecked
                        ? 'border-[#9E164B] bg-[#9E164B]'
                        : 'border-gray-400 bg-white'
                    }`}
                  />

                  <span className="text-sm font-semibold text-[#1E1D24]">
                    {slot.label}
                  </span>
                </button>
              );
            })}
          </div>

          {helperText && (
            <p className="mt-3 text-xs text-gray-500">{helperText}</p>
          )}
        </div>

        {/* Tombol Simpan */}
        <button
          type="submit"
          className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-[#1E1D24] transition hover:bg-gray-50"
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}