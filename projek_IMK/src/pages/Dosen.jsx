import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import Header from '../components/Header';
import DosenCard from '../components/DosenCard';
import FormPengajuanPembimbing from '../components/FormPengajuanPembimbing';
import RekapTim from '../components/RekapTim';
import StatusPengajuan from '../components/StatusPengajuan';
import BuatTimButton from '../components/BuatTimButton';
import Footer from '../components/Footer';

import StatusToast from '../components/dialogs/StatusToast';
import BuatTimDialog from '../components/dialogs/BuatTimDialog';

const DOSEN_LIST = [
  {
    id: 1,
    initials: 'BS',
    avatarVariant: 'pink',
    name: 'Dr. Budi Santoso',
    department: 'Teknik Informatika',
    matchPercentage: 96,
    role: 'Dosen · Smart City & IoT',
    skills: ['Internet of Things', 'Smart City'],
    isQuotaAvailable: true,
  },
  {
    id: 2,
    initials: 'MA',
    avatarVariant: 'gray',
    name: 'Dr. Maya Anggraini',
    department: 'Sistem Informasi',
    matchPercentage: 92,
    role: 'Dosen · Product & Business',
    skills: ['Product Strategy', 'Business Model'],
    isQuotaAvailable: true,
  },
];

const TEAM_RECAP = {
  subtitle: 'Tim Aurora · GEMASTIK',
  members: [
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
  ],
};

const LOMBA_OPTIONS = [
  'GEMASTIK XVII',
  "L'Oréal Brandstorm",
  'Kreasi UI/UX Nasional',
];

export default function Dosen({
  activeNav = 'dosen',
  onNavChange = () => {},
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDosenId, setSelectedDosenId] = useState(DOSEN_LIST[0].id);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAt, setSubmittedAt] = useState('');
  const [isBuatTimOpen, setIsBuatTimOpen] = useState(false);
  const [toast, setToast] = useState({
    isOpen: false,
    title: '',
    message: '',
  });

  const filteredDosen = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return DOSEN_LIST;

    return DOSEN_LIST.filter((dosen) => {
      const searchableText = [
        dosen.name,
        dosen.department,
        dosen.role,
        ...dosen.skills,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(keyword);
    });
  }, [searchQuery]);

  const selectedDosen =
    DOSEN_LIST.find((dosen) => dosen.id === selectedDosenId) || DOSEN_LIST[0];

  const handleSelectDosen = (id) => {
    if (isSubmitted) return;
    setSelectedDosenId(id);
  };

  const handleSubmitPengajuan = (formData) => {
    const now = new Date();
    const tanggal = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
    });
    const jam = String(now.getHours()).padStart(2, '0');
    const menit = String(now.getMinutes()).padStart(2, '0');

    setSubmittedAt(`${tanggal} · ${jam}.${menit}`);
    setIsSubmitted(true);
    setToast({
      isOpen: true,
      title: 'Pengajuan terkirim',
      message: `Permohonan pembimbing berhasil dikirim ke ${selectedDosen.name}.`,
    });

    console.log('Data pengajuan pembimbing:', formData);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFB] text-[#1E1D24]">
      {/* Header Navigasi */}
      <Header
        activeNav={activeNav}
        onNavChange={onNavChange}
        onNotprofClick={() => console.log('Notifikasi / Profil diklik')}
      />

      <main className="flex-1 pb-6">
        {/* Header Halaman */}
        <section className="mx-auto mt-8 max-w-6xl px-3 sm:px-6">
          <div className="border-b border-gray-200 pb-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#9E164B] sm:text-xs">
              DOSEN PEMBIMBING
            </p>
            <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-[#1E1D24] sm:text-4xl">
              Temukan dosen pembimbing.
            </h1>
            <p className="mt-1.5 text-xs text-gray-500 sm:text-sm">
              Pilih berdasarkan bidang, kuota, dan kecocokan.
            </p>
          </div>
        </section>

        {/* Bagian Rekomendasi Dosen + Pencarian */}
        <section className="mx-auto mt-6 max-w-6xl px-3 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#1E1D24] sm:text-xl">
                Rekomendasi dosen
              </h2>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Berdasarkan topik GEMASTIK dan kebutuhan Tim Aurora.
              </p>
            </div>

            {/* Input Pencarian */}
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau bidang..."
                aria-label="Cari nama atau bidang dosen"
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs text-[#1E1D24] placeholder:text-gray-400 transition focus:border-[#9E164B] focus:outline-none focus:ring-2 focus:ring-[#9E164B]/20 sm:text-sm"
              />
            </div>
          </div>

          {/* Grid Kartu Dosen */}
          {filteredDosen.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {filteredDosen.map((dosen) => (
                <DosenCard
                  key={dosen.id}
                  initials={dosen.initials}
                  avatarVariant={dosen.avatarVariant}
                  name={dosen.name}
                  matchPercentage={dosen.matchPercentage}
                  role={dosen.role}
                  skills={dosen.skills}
                  isQuotaAvailable={dosen.isQuotaAvailable}
                  isSelected={selectedDosenId === dosen.id}
                  onSelect={() => handleSelectDosen(dosen.id)}
                  onViewProfile={() => {
                    handleSelectDosen(dosen.id);
                    console.log('Lihat profil dosen:', dosen.name);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-gray-300 bg-white py-10 text-center">
              <p className="text-sm font-semibold text-[#1E1D24]">
                Dosen tidak ditemukan
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Coba kata kunci nama, bidang, atau keahlian lain.
              </p>
            </div>
          )}
        </section>

        {/* Grid Utama: Form Pengajuan (Kiri) + Rekap & Status (Kanan) */}
        <section className="mx-auto mt-6 max-w-6xl px-3 sm:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Kolom Kiri: Form Pengajuan Pembimbing */}
            <div className="lg:col-span-7">
              <FormPengajuanPembimbing
                dosenTujuan={`${selectedDosen.name} · ${selectedDosen.department}`}
                isSubmitted={isSubmitted}
                onSubmit={handleSubmitPengajuan}
              />
            </div>

            {/* Kolom Kanan: Rekap Tim & Status Pengajuan */}
            <div className="space-y-6 lg:col-span-5">
              <RekapTim
                subtitle={TEAM_RECAP.subtitle}
                members={TEAM_RECAP.members}
              />

              <StatusPengajuan
                isSubmitted={isSubmitted}
                formedAt="18 Okt · 14.32"
                submittedAt={submittedAt}
              />
            </div>
          </div>

          {/* Tombol Buat Tim */}
          <div className="mt-8 flex justify-end">
            <BuatTimButton
              floating={false}
              onClick={() => setIsBuatTimOpen(true)}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Notifikasi Status */}
      <StatusToast
        isOpen={toast.isOpen}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
        title={toast.title}
        message={toast.message}
      />

      {/* Dialog Buat Tim Baru */}
      <BuatTimDialog
        isOpen={isBuatTimOpen}
        onClose={() => setIsBuatTimOpen(false)}
        lombaOptions={LOMBA_OPTIONS}
        onSubmit={(data) => console.log('Tim baru dibuat:', data)}
      />
    </div>
  );
}