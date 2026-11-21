import React, { useState, useEffect } from 'react';
import {
  X,
  Users,
  Plus,
  Check,
  Search,
  Trash2,
  ChevronDown,
} from 'lucide-react';

const DEFAULT_LOMBA_OPTIONS = [
  'GEMASTIK XVII',
  "L'Oréal Brandstorm",
  'Kreasi UI/UX Nasional',
];

const PEMBUKA_OPTIONS = [
  'Saya sebagai mahasiswa',
  'Saya sebagai dosen',
];

export default function BuatTimDialog({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  lombaOptions = DEFAULT_LOMBA_OPTIONS,
}) {
  const [namaTim, setNamaTim] = useState('');
  const [lomba, setLomba] = useState(lombaOptions[0] || 'GEMASTIK XVII');
  const [positions, setPositions] = useState([
    { id: 1, nama: '', jumlah: 1 },
  ]);
  const [pembukaTim, setPembukaTim] = useState(PEMBUKA_OPTIONS[0]);
  const [kondisiDosen, setKondisiDosen] = useState('belum');

  // Tutup dialog dengan tombol Escape & kunci scroll halaman belakang
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

  if (!isOpen) return null;

  const handleAddPosition = () => {
    setPositions((prev) => [
      ...prev,
      { id: Date.now(), nama: '', jumlah: 1 },
    ]);
  };

  const handleRemovePosition = (id) => {
    if (positions.length <= 1) return;
    setPositions((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePositionChange = (id, field, value) => {
    setPositions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === 'jumlah' ? Math.max(1, Number(value) || 1) : value,
            }
          : item
      )
    );
  };

  const handleReset = () => {
    setNamaTim('');
    setLomba(lombaOptions[0] || 'GEMASTIK XVII');
    setPositions([{ id: 1, nama: '', jumlah: 1 }]);
    setPembukaTim(PEMBUKA_OPTIONS[0]);
    setKondisiDosen('belum');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      namaTim,
      lomba,
      positions,
      pembukaTim,
      kondisiDosen,
    });
    handleReset();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="buat-tim-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup dialog"
          className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Dialog */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCE7F3] text-[#9E164B]">
          <Users className="h-5 w-5" />
        </div>

        <h2
          id="buat-tim-title"
          className="mt-4 text-xl font-bold tracking-tight text-[#1E1D24] sm:text-2xl"
        >
          Buat tim baru
        </h2>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Lengkapi identitas tim dan kebutuhan anggota. Tim akan langsung muncul
          di &ldquo;Tim Saya&rdquo;.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Nama Tim */}
          <div>
            <label
              htmlFor="nama-tim"
              className="block text-xs font-bold text-[#1E1D24] sm:text-sm"
            >
              Nama tim
            </label>
            <input
              id="nama-tim"
              type="text"
              required
              value={namaTim}
              onChange={(e) => setNamaTim(e.target.value)}
              placeholder="Contoh: Tim Aurora"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1E1D24] placeholder:text-gray-400 focus:border-[#9E164B] focus:outline-none focus:ring-2 focus:ring-[#9E164B]/20"
            />
          </div>

          {/* Lomba yang Diikuti */}
          <div>
            <label
              htmlFor="lomba-diikuti"
              className="block text-xs font-bold text-[#1E1D24] sm:text-sm"
            >
              Lomba yang diikuti
            </label>
            <div className="relative mt-2">
              <select
                id="lomba-diikuti"
                value={lomba}
                onChange={(e) => setLomba(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-[#1E1D24] focus:border-[#9E164B] focus:outline-none focus:ring-2 focus:ring-[#9E164B]/20"
              >
                {lombaOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Posisi yang Dibutuhkan */}
          <div>
            <p className="text-xs font-bold text-[#1E1D24] sm:text-sm">
              Posisi yang dibutuhkan
            </p>

            {/* Label Kolom */}
            <div className="mt-2.5 flex items-center gap-3">
              <span className="flex-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Nama Posisi
              </span>
              <span className="w-24 text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:w-28">
                Jumlah
              </span>
              {positions.length > 1 && <span className="w-9" />}
            </div>

            {/* Daftar Input Posisi */}
            <div className="mt-1.5 space-y-2.5">
              {positions.map((pos) => (
                <div key={pos.id} className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    value={pos.nama}
                    onChange={(e) =>
                      handlePositionChange(pos.id, 'nama', e.target.value)
                    }
                    placeholder="Contoh: Backend Developer"
                    className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1E1D24] placeholder:text-gray-400 focus:border-[#9E164B] focus:outline-none focus:ring-2 focus:ring-[#9E164B]/20"
                  />

                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={pos.jumlah}
                    onChange={(e) =>
                      handlePositionChange(pos.id, 'jumlah', e.target.value)
                    }
                    className="w-24 rounded-xl border border-gray-200 bg-white px-4 py-3 text-center text-sm text-[#1E1D24] focus:border-[#9E164B] focus:outline-none focus:ring-2 focus:ring-[#9E164B]/20 sm:w-28"
                  />

                  {positions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePosition(pos.id)}
                      aria-label="Hapus posisi"
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-rose-50 hover:text-[#9E164B]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Tombol Tambah Posisi */}
            <button
              type="button"
              onClick={handleAddPosition}
              className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-2.5 text-xs font-semibold text-[#9E164B] transition hover:border-[#9E164B] hover:bg-[#FFF4F8]"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah posisi</span>
            </button>
          </div>

          {/* Siapa yang Membuka Tim */}
          <div>
            <label
              htmlFor="pembuka-tim"
              className="block text-xs font-bold text-[#1E1D24] sm:text-sm"
            >
              Siapa yang membuka tim?
            </label>
            <div className="relative mt-2">
              <select
                id="pembuka-tim"
                value={pembukaTim}
                onChange={(e) => setPembukaTim(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-[#1E1D24] focus:border-[#9E164B] focus:outline-none focus:ring-2 focus:ring-[#9E164B]/20"
              >
                {PEMBUKA_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Kondisi Dosen Pembimbing */}
          <div>
            <p className="text-xs font-bold text-[#1E1D24] sm:text-sm">
              Kondisi dosen pembimbing
            </p>

            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Pilihan: Sudah ada */}
              <button
                type="button"
                onClick={() => setKondisiDosen('sudah')}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left text-xs font-semibold transition sm:text-sm ${
                  kondisiDosen === 'sudah'
                    ? 'border-[#E885AA] bg-[#FFF4F8] text-[#9E164B]'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    kondisiDosen === 'sudah'
                      ? 'border-[#9E164B]'
                      : 'border-gray-400'
                  }`}
                >
                  {kondisiDosen === 'sudah' && (
                    <span className="h-2 w-2 rounded-full bg-[#9E164B]" />
                  )}
                </span>
                <Check className="h-4 w-4 shrink-0" />
                <span>Sudah ada</span>
              </button>

              {/* Pilihan: Belum ada */}
              <button
                type="button"
                onClick={() => setKondisiDosen('belum')}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left text-xs font-semibold transition sm:text-sm ${
                  kondisiDosen === 'belum'
                    ? 'border-[#E885AA] bg-[#FFF4F8] text-[#9E164B]'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    kondisiDosen === 'belum'
                      ? 'border-[#9E164B]'
                      : 'border-gray-400'
                  }`}
                >
                  {kondisiDosen === 'belum' && (
                    <span className="h-2 w-2 rounded-full bg-[#9E164B]" />
                  )}
                </span>
                <Search className="h-4 w-4 shrink-0" />
                <span>Belum ada</span>
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              {kondisiDosen === 'belum'
                ? 'Tim akan ditandai "Mencari dosen pembimbing".'
                : 'Tim akan ditandai sudah memiliki dosen pembimbing.'}
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* Aksi Bawah */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-gray-200 bg-white px-5 py-3 text-xs font-semibold text-[#1E1D24] transition hover:bg-gray-50 sm:text-sm"
            >
              Batal
            </button>

            <button
              type="submit"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#9E164B] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#82113D] sm:text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Buat tim &amp; buka workspace</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}