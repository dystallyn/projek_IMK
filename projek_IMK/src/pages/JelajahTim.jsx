import React, { useState } from "react";
import { Users, Search, Sparkles, ChevronDown } from "lucide-react";

import Header from "../components/Header";
import Pencarian from "../components/Pencarian";
import Tim from "../components/Tim";
import BuatTimButton from "../components/BuatTimButton";
import BuatTimDialog from "../components/dialogs/BuatTimDialog";
import Footer from "../components/Footer";
import DetailTimDialog from "../components/dialogs/DetailTimDialog";

const INITIAL_TIM_LIST = [
  {
    id: 1,
    competition: "GEMASTIK XVII",
    name: "NusaVerse",
    creatorName: "Rizky Maulana",
    creatorRole: "Mahasiswa",
    advisor: "Dr. Budi Santoso",
    currentMembers: 3,
    maxMembers: 5,
    description:
      "Mengembangkan dashboard mitigasi banjir berbasis data sensor dan prediksi real-time.",
    positions: [
      { role: "Frontend Developer", count: 1 },
      { role: "Data Analyst", count: 1 },
    ],
    members: [
      {
        initials: "RM",
        name: "Rizky Maulana",
        isLeader: true,
        role: "Product Manager",
        major: "Sistem Informasi 2022",
      },
      {
        initials: "AD",
        name: "Alya Damayanti",
        isLeader: false,
        role: "IoT Engineer",
        major: "Teknik Elektro 2021",
      },
      {
        initials: "SK",
        name: "Satria Kusuma",
        isLeader: false,
        role: "UI/UX Designer",
        major: "Desain Komunikasi Visual 2022",
      },
    ],
    variant: "teal",
  },
  {
    id: 2,
    competition: "L'Oréal Brandstorm",
    name: "EcoMinds Lab",
    creatorName: "Dr. Maya Anggraini",
    creatorRole: "Dosen",
    advisor: "Dr. Maya Anggraini",
    currentMembers: 2,
    maxMembers: 4,
    description:
      "Merancang konsep produk perawatan ramah lingkungan dengan pendekatan ekonomi sirkular.",
    positions: [
      { role: "Business Strategist", count: 1 },
      { role: "Pitch Designer", count: 1 },
    ],
    members: [
      {
        initials: "MA",
        name: "Dr. Maya Anggraini",
        isLeader: true,
        role: "Pembimbing & Inisiator",
        major: "Manajemen Bisnis",
      },
      {
        initials: "DN",
        name: "Dimas Nugraha",
        isLeader: false,
        role: "Market Researcher",
        major: "Ilmu Ekonomi 2022",
      },
    ],
    variant: "amber",
  },
  {
    id: 3,
    competition: "Kreasi UI/UX Nasional",
    name: "Ruang Reka",
    creatorName: "Nabila Vina",
    creatorRole: "Mahasiswa",
    advisor: "Dr. Maya Anggraini",
    currentMembers: 2,
    maxMembers: 3,
    description:
      "Membangun pengalaman aplikasi aksesibel untuk membantu mahasiswa difabel di lingkungan kampus.",
    positions: [{ role: "UX Researcher", count: 1 }],
    members: [
      {
        initials: "NV",
        name: "Nabila Vina",
        isLeader: true,
        role: "UI Designer",
        major: "Teknik Informatika 2023",
      },
      {
        initials: "FR",
        name: "Fajar Ramadhan",
        isLeader: false,
        role: "Interaction Designer",
        major: "Sistem Informasi 2023",
      },
    ],
    variant: "purple",
  },
];

const KOMPETISI_OPTIONS = [
  "Semua Lomba",
  "GEMASTIK XVII",
  "L'Oréal Brandstorm",
  "Kreasi UI/UX Nasional",
];

const VARIANT_BY_LOMBA = {
  "GEMASTIK XVII": "teal",
  "L'Oréal Brandstorm": "amber",
  "Kreasi UI/UX Nasional": "purple",
};

export default function JelajahTim({
  activeNav = "jelajah-tim",
  onNavChange = () => {},
  onSwitchToCariAnggota = () => {},
}) {
  const [timList, setTimList] = useState(INITIAL_TIM_LIST);
  const [activeTab, setActiveTab] = useState("tim"); // 'tim' | 'kandidat'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("Semua Keahlian");
  const [selectedCompetition, setSelectedCompetition] = useState("Semua Lomba");
  const [isBuatTimOpen, setIsBuatTimOpen] = useState(false);
  const [selectedTim, setSelectedTim] = useState(null);
  const [appliedTimIds, setAppliedTimIds] = useState([]);

  const handleApplyTim = (tim) => {
    setAppliedTimIds((prev) =>
      prev.includes(tim.id) ? prev : [...prev, tim.id],
    );
  };

  // Ambil daftar unik keahlian dari semua posisi terbuka
  const skillOptions = [
    "Semua Keahlian",
    ...Array.from(
      new Set(timList.flatMap((tim) => tim.positions.map((pos) => pos.role))),
    ),
  ];

  // Filter daftar tim berdasarkan pencarian, keahlian, dan kompetisi
  const filteredTim = timList.filter((tim) => {
    const keyword = searchQuery.trim().toLowerCase();
    const matchSearch =
      !keyword ||
      tim.name.toLowerCase().includes(keyword) ||
      tim.creatorName.toLowerCase().includes(keyword) ||
      tim.competition.toLowerCase().includes(keyword) ||
      tim.positions.some((pos) => pos.role.toLowerCase().includes(keyword));

    const matchSkill =
      selectedSkill === "Semua Keahlian" ||
      tim.positions.some((pos) => pos.role === selectedSkill);

    const matchCompetition =
      selectedCompetition === "Semua Lomba" ||
      tim.competition === selectedCompetition;

    return matchSearch && matchSkill && matchCompetition;
  });

  // Tambahkan tim baru dari BuatTimDialog ke daftar
  const handleCreateTim = (data) => {
    const newTim = {
      id: Date.now(),
      competition: data.lomba,
      name: data.namaTim,
      creatorName: "Kamu",
      creatorRole: data.pembukaTim.includes("dosen") ? "Dosen" : "Mahasiswa",
      advisor: data.kondisiDosen === "sudah" ? "Sudah ditentukan" : "",
      currentMembers: 1,
      maxMembers: 5,
      positions: data.positions
        .filter((p) => p.nama.trim() !== "")
        .map((p) => ({ role: p.nama, count: p.jumlah })),
      variant: VARIANT_BY_LOMBA[data.lomba] || "teal",
    };

    setTimList((prev) => [newTim, ...prev]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFB] text-[#1E1D24]">
      {/* Header Navigasi */}
      <Header
        activeNav={activeNav}
        onNavChange={onNavChange}
        onNotprofClick={() => console.log("Notifikasi / Profil diklik")}
      />

      <main className="flex-1 pb-4">
        {/* Banner Pencarian */}
        <Pencarian
          title="Jelajah tim terbuka"
          placeholder="Cari tim, pembuka, atau posisi..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Tab Pemindah Mode */}
        <section className="mx-auto mt-4 max-w-6xl px-3 sm:px-6">
          <div className="grid grid-cols-1 gap-1.5 rounded-2xl border border-gray-200/80 bg-[#ECEBF0] p-1.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setActiveTab("tim")}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-medium transition sm:text-sm ${
                activeTab === "tim"
                  ? "bg-[#1E1D24] text-white shadow-xs"
                  : "text-gray-600 hover:text-[#1E1D24]"
              }`}
            >
              <Users className="h-4 w-4 shrink-0" />
              <span>Cari tim untuk bergabung</span>
            </button>

            <button
              type="button"
              onClick={onSwitchToCariAnggota}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-medium text-gray-600 transition hover:text-[#1E1D24] sm:text-sm"
            >
              <Search className="h-4 w-4 shrink-0" />
              <span>Cari anggota atau dosen</span>
            </button>
          </div>
        </section>

        {/* Kotak Filter Dropdown */}
        <section className="mx-auto mt-4 max-w-6xl px-3 sm:px-6">
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs md:grid-cols-2">
            {/* Filter Posisi / Keahlian */}
            <div>
              <label
                htmlFor="filter-keahlian"
                className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:text-[11px]"
              >
                Posisi yang kamu minati
              </label>
              <div className="relative mt-2">
                <select
                  id="filter-keahlian"
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
                htmlFor="filter-kompetisi"
                className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:text-[11px]"
              >
                Kompetisi
              </label>
              <div className="relative mt-2">
                <select
                  id="filter-kompetisi"
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

        {/* Konten Berdasarkan Tab Aktif */}
        {activeTab === "tim" ? (
          <section className="mx-auto mt-8 max-w-6xl px-3 sm:px-6">
            {/* Judul Section & Label Rekomendasi */}
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#1E1D24] sm:text-2xl">
                  Tim yang sedang membuka posisi
                </h2>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Diurutkan berdasarkan kecocokan keahlianmu.
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E164B] sm:text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Rekomendasi untukmu</span>
              </span>
            </div>

            {/* Grid Kartu Tim */}
            {filteredTim.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTim.map((tim) => (
                  <Tim
                    key={tim.id}
                    competition={tim.competition}
                    name={tim.name}
                    creatorName={tim.creatorName}
                    creatorRole={tim.creatorRole}
                    advisor={tim.advisor}
                    currentMembers={tim.currentMembers}
                    maxMembers={tim.maxMembers}
                    positions={tim.positions}
                    variant={tim.variant}
                    onButtonClick={() => setSelectedTim(tim)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white py-12 text-center text-sm text-gray-500">
                Tidak ada tim yang cocok dengan filter atau pencarianmu.
              </div>
            )}

            {/* Tombol Buat Tim */}
            <div className="mt-8 flex justify-end">
              <BuatTimButton
                floating={false}
                onClick={() => setIsBuatTimOpen(true)}
              />
            </div>
          </section>
        ) : (
          <section className="mx-auto mt-8 max-w-6xl px-3 sm:px-6">
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center">
              <p className="text-sm font-semibold text-[#1E1D24]">
                Daftar anggota &amp; dosen
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Konten tab &ldquo;Cari anggota atau dosen&rdquo; bisa
                ditambahkan di sini.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Dialog Buat Tim */}
      <BuatTimDialog
        isOpen={isBuatTimOpen}
        onClose={() => setIsBuatTimOpen(false)}
        lombaOptions={KOMPETISI_OPTIONS.filter(
          (item) => item !== "Semua Lomba",
        )}
        onSubmit={handleCreateTim}
      />
      <DetailTimDialog
        isOpen={Boolean(selectedTim)}
        tim={selectedTim}
        isApplied={selectedTim ? appliedTimIds.includes(selectedTim.id) : false}
        onApply={handleApplyTim}
        onClose={() => setSelectedTim(null)}
      />
    </div>
  );
}
