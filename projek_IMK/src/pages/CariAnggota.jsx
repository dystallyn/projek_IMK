import React, { useState } from 'react';
import {
  Users,
  Search,
  GraduationCap,
  Send,
  ChevronDown,
} from 'lucide-react';

import Header from '../components/Header';
import Pencarian from '../components/Pencarian';
import Kandidat from '../components/Kandidat';
import BuatTimButton from '../components/BuatTimButton';
import BuatTimDialog from '../components/dialogs/BuatTimDialog';
import Footer from '../components/Footer';

const DOSEN_LIST = [
  {
    id: 'dosen-1',
    initials: 'BS',
    avatarVariant: 'pink',
    name: 'Dr. Budi Santoso',
    matchText: '96% sesuai',
    role: 'Dosen',
    subtitle: 'Smart City & IoT',
    info: 'Teknik Informatika',
    skills: ['Internet of Things', 'Smart City', 'Data Science'],
    competitions: ['GEMASTIK XVII'],
  },
  {
    id: 'dosen-2',
    initials: 'MA',
    avatarVariant: 'gray',
    name: 'Dr. Maya Anggraini',
    matchText: '92% sesuai',
    role: 'Dosen',
    subtitle: 'Product & Business',
    info: 'Sistem Informasi',
    skills: ['Product Strategy', 'Business Model', 'Research'],
    competitions: ["L'Oréal Brandstorm", 'Kreasi UI/UX Nasional'],
  },
];

const MAHASISWA_LIST = [
  {
    id: 'mhs-1',
    initials: 'NP',
    avatarVariant: 'amber',
    isOnline: true,
    name: 'Nadia Putri',
    matchText: '95% Match',
    role: '',
    subtitle: 'UI/UX Designer',
    info: 'Sistem Informasi 2022',
    skills: ['Figma', 'UX Research', 'Prototyping'],
    competitions: ['Kreasi UI/UX Nasional', 'GEMASTIK XVII'],
  },
  {
    id: 'mhs-2',
    initials: 'RM',
    avatarVariant: 'pink',
    isOnline: true,
    name: 'Raka Mahendra',
    matchText: '91% Match',
    role: '',
    subtitle: 'Frontend Developer',
    info: 'Informatika 2021',
    skills: ['React', 'TypeScript', 'Tailwind'],
    competitions: ['GEMASTIK XVII', 'Kreasi UI/UX Nasional'],
  },
  {
    id: 'mhs-3',
    initials: 'SA',
    avatarVariant: 'gray',
    isOnline: true,
    name: 'Sarah Azzahra',
    matchText: '88% Match',
    role: '',
    subtitle: 'Business Strategist',
    info: 'Manajemen 2022',
    skills: ['Pitching', 'BMC', 'Market Research'],
    competitions: ["L'Oréal Brandstorm"],
  },
];

const KOMPETISI_OPTIONS = [
  'Semua Lomba',
  'GEMASTIK XVII',
  "L'Oréal Brandstorm",
  'Kreasi UI/UX Nasional',
];

export default function CariAnggota({
  activeNav = 'jelajah-tim',
  onNavChange = () => {},
  onSwitchToJelajahTim = () => {},
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('Semua Keahlian');
  const [selectedCompetition, setSelectedCompetition] = useState('Semua Lomba');
  const [submittedIds, setSubmittedIds] = useState([]);
  const [isBuatTimOpen, setIsBuatTimOpen] = useState(false);

  // Gabungkan semua keahlian unik dari dosen & mahasiswa untuk dropdown filter
  const skillOptions = [
    'Semua Keahlian',
    ...Array.from(
      new Set([
        ...DOSEN_LIST.flatMap((d) => d.skills),
        ...MAHASISWA_LIST.flatMap((m) => m.skills),
      ])
    ),
  ];

  const filterCandidate = (person) => {
    const keyword = searchQuery.trim().toLowerCase();
    const matchSearch =
      !keyword ||
      person.name.toLowerCase().includes(keyword) ||
      person.subtitle.toLowerCase().includes(keyword) ||
      person.info.toLowerCase().includes(keyword) ||
      person.skills.some((skill) => skill.toLowerCase().includes(keyword));

    const matchSkill =
      selectedSkill === 'Semua Keahlian' ||
      person.skills.includes(selectedSkill);

    const matchCompetition =
      selectedCompetition === 'Semua Lomba' ||
      person.competitions.includes(selectedCompetition);

    return matchSearch && matchSkill && matchCompetition;
  };

  const filteredDosen = DOSEN_LIST.filter(filterCandidate);
  const filteredMahasiswa = MAHASISWA_LIST.filter(filterCandidate);

  const handleActionClick = (id) => {
    setSubmittedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFB] text-[#1E1D24]">
      {/* Header Navigasi (pill aktif tetap di Jelajah Tim) */}
      <Header
        activeNav={activeNav}
        onNavChange={onNavChange}
        onNotprofClick={() => console.log('Notifikasi / Profil diklik')}
      />

      <main className="flex-1 pb-4">
        {/* Banner Pencarian */}
        <Pencarian
          title="Temukan rekan terbaik"
          placeholder="Cari nama atau keahlian..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Tab Pemindah Mode: pindah kembali ke halaman JelajahTim */}
        <section className="mx-auto mt-4 max-w-6xl px-3 sm:px-6">
          <div className="grid grid-cols-1 gap-1.5 rounded-2xl border border-gray-200/80 bg-[#ECEBF0] p-1.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={onSwitchToJelajahTim}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-medium text-gray-600 transition hover:text-[#1E1D24] sm:text-sm"
            >
              <Users className="h-4 w-4 shrink-0" />
              <span>Cari tim untuk bergabung</span>
            </button>

            <button
              type="button"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1E1D24] px-4 py-3 text-xs font-medium text-white shadow-xs transition sm:text-sm"
            >
              <Search className="h-4 w-4 shrink-0" />
              <span>Cari anggota atau dosen</span>
            </button>
          </div>
        </section>

        {/* Kotak Filter Dropdown */}
        <section className="mx-auto mt-4 max-w-6xl px-3 sm:px-6">
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs md:grid-cols-2">
            {/* Filter Keahlian */}
            <div>
              <label
                htmlFor="filter-keahlian-kandidat"
                className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:text-[11px]"
              >
                Keahlian yang dibutuhkan
              </label>
              <div className="relative mt-2">
                <select
                  id="filter-keahlian-kandidat"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-[#1E1D24] focus:border-[#9E164B] focus:outline-none focus:ring-2 focus:ring-[#9E164B]/20"
                >
                  {skillOptions.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Filter Kompetisi */}
            <div>
              <label
                htmlFor="filter-kompetisi-kandidat"
                className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:text-[11px]"
              >
                Kompetisi
              </label>
              <div className="relative mt-2">
                <select
                  id="filter-kompetisi-kandidat"
                  value={selectedCompetition}
                  onChange={(e) => setSelectedCompetition(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-[#1E1D24] focus:border-[#9E164B] focus:outline-none focus:ring-2 focus:ring-[#9E164B]/20"
                >
                  {KOMPETISI_OPTIONS.map((lomba) => (
                    <option key={lomba} value={lomba}>
                      {lomba}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Dosen Pembimbing yang Sesuai */}
        <section className="mx-auto mt-8 max-w-6xl px-3 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#1E1D24] sm:text-2xl">
                Dosen pembimbing yang sesuai
              </h2>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Profil dosen juga dapat ditemukan berdasarkan bidang kompetisi
                timmu.
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#9E164B]">
              <GraduationCap className="h-3.5 w-3.5 shrink-0" />
              <span>Dosen</span>
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {filteredDosen.length > 0 ? (
              filteredDosen.map((dosen) => (
                <Kandidat
                  key={dosen.id}
                  initials={dosen.initials}
                  avatarVariant={dosen.avatarVariant}
                  name={dosen.name}
                  matchText={dosen.matchText}
                  role={dosen.role}
                  subtitle={dosen.subtitle}
                  info={dosen.info}
                  skills={dosen.skills}
                  profileButtonText="Lihat profil"
                  actionButtonText="Ajukan pembimbing"
                  submittedButtonText="Pengajuan terkirim"
                  actionIcon={Send}
                  isSubmitted={submittedIds.includes(dosen.id)}
                  onProfileClick={() => console.log('Lihat profil:', dosen.name)}
                  onActionClick={() => handleActionClick(dosen.id)}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-10 text-center text-sm text-gray-500">
                Tidak ada dosen pembimbing yang cocok dengan filtermu.
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Mahasiswa Paling Sesuai */}
        <section className="mx-auto mt-10 max-w-6xl px-3 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#1E1D24] sm:text-2xl">
                Mahasiswa paling sesuai
              </h2>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                24 kandidat tersedia untuk timmu
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#9E164B]">
              <Users className="h-3.5 w-3.5 shrink-0" />
              <span>Mahasiswa</span>
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {filteredMahasiswa.length > 0 ? (
              filteredMahasiswa.map((mhs) => (
                <Kandidat
                  key={mhs.id}
                  initials={mhs.initials}
                  avatarVariant={mhs.avatarVariant}
                  isOnline={mhs.isOnline}
                  name={mhs.name}
                  matchText={mhs.matchText}
                  role={mhs.role}
                  subtitle={mhs.subtitle}
                  info={mhs.info}
                  skills={mhs.skills}
                  profileButtonText="Lihat profil"
                  actionButtonText="Kirim Undangan"
                  submittedButtonText="Undangan terkirim"
                  actionIcon={Send}
                  isSubmitted={submittedIds.includes(mhs.id)}
                  onProfileClick={() => console.log('Lihat profil:', mhs.name)}
                  onActionClick={() => handleActionClick(mhs.id)}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-10 text-center text-sm text-gray-500">
                Tidak ada mahasiswa yang cocok dengan filtermu.
              </div>
            )}
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

      {/* Dialog Buat Tim */}
      <BuatTimDialog
        isOpen={isBuatTimOpen}
        onClose={() => setIsBuatTimOpen(false)}
        lombaOptions={KOMPETISI_OPTIONS.filter((item) => item !== 'Semua Lomba')}
        onSubmit={(data) => console.log('Tim baru dibuat:', data)}
      />
    </div>
  );
}