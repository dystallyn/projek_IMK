import React, { useState } from "react";
import {
  GraduationCap,
  Code2,
  ArrowUpRight,
  Diamond,
  ArrowRight,
  Trophy,
  Users,
  Sparkles,
  Briefcase,
} from "lucide-react";

import Header from "../components/Header";
import Pencarian from "../components/Pencarian";
import Info from "../components/Info";
import Lomba from "../components/Lomba";
import BuatTimButton from "../components/BuatTimButton";
import Footer from "../components/Footer";

import DetailLombaDialog from "../components/dialogs/DetailLombaDialog";
import BuatTimDialog from "../components/dialogs/BuatTimDialog";

import figureImg from "../assets/image/Figure.png";
import figure2Img from "../assets/image/Figure2.png";

const CATEGORIES = ["Semua", "Teknologi", "Bisnis", "Desain"];

const INFO_SLIDES = [
  {
    id: 1,
    icon: Briefcase,
    category: "Peluang Untukmu",
    title: "9 posisi tim sedang terbuka",
    description: "Frontend, riset, desain, dan strategi bisnis.",
    buttonText: "Jelajah tim",
    targetPage: "jelajah-tim",
    image: figure2Img,
    imageCredit: "Foto: Vitaly Gariev / Unsplash",
  },
  {
    id: 2,
    icon: GraduationCap,
    category: "Dosen Pembimbing",
    title: "2 dosen sesuai bidang timmu",
    description: "Lihat keahlian dan kuota bimbingan yang tersedia.",
    buttonText: "Lihat dosen",
    targetPage: "dosen",
    image: figureImg,
    imageCredit: "Foto: Vitaly Gariev / Unsplash",
  },
];

const LOMBA_LIST = [
  {
    id: 1,
    icon: Code2,
    category: "Teknologi",
    title: "GEMASTIK XVII",
    organizer: "Puspresnas",
    deadlineText: "18 hari lagi",
    teamsFormed: 4,
    openPositions: 2,
    roles: ["Frontend", "Data Analyst"],
    variant: "teal",
    description:
      "Kompetisi nasional untuk mengembangkan solusi inovatif, terukur, dan berdampak. Peserta bekerja dalam tim lintas disiplin dan dapat mengajukan dosen pembimbing.",
    requirements: [
      "3–5 anggota aktif dari perguruan tinggi",
      "Maksimal satu dosen pembimbing per tim",
      "Proposal awal wajib diunggah sebelum pendaftaran",
    ],
  },
  {
    id: 2,
    icon: ArrowUpRight,
    category: "Bisnis",
    title: "L'Oréal Brandstorm",
    organizer: "L'Oréal Indonesia",
    deadlineText: "24 hari lagi",
    teamsFormed: 3,
    openPositions: 2,
    roles: ["Pitch Deck", "Market Research"],
    variant: "amber",
    description:
      "Kompetisi inovasi bisnis internasional untuk merancang strategi produk dan pengalaman konsumen masa depan.",
    requirements: [
      "3 anggota mahasiswa aktif lintas jurusan",
      "Maksimal satu dosen pembimbing per tim",
      "Pitch deck wajib dalam bahasa Inggris",
    ],
  },
  {
    id: 3,
    icon: Diamond,
    category: "Desain",
    title: "Kreasi UI/UX Nasional",
    organizer: "Asosiasi Digital",
    deadlineText: "31 hari lagi",
    teamsFormed: 2,
    openPositions: 1,
    roles: ["UI Designer"],
    variant: "purple",
    description:
      "Kompetisi perancangan antarmuka dan pengalaman pengguna untuk menjawab tantangan produk digital di Indonesia.",
    requirements: [
      "2–3 anggota aktif dari perguruan tinggi yang sama",
      "Melampirkan prototipe interaktif Figma",
      "Dokumen studi kasus maksimal 15 halaman",
    ],
  },
];

// export default function Beranda() {
//   const [activeNav, setActiveNav] = useState("beranda");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("Semua");
//   const [selectedLomba, setSelectedLomba] = useState(null);
//   const [isBuatTimOpen, setIsBuatTimOpen] = useState(false);

//   const filteredLomba = LOMBA_LIST.filter((item) => {
//     const matchCategory =
//       activeCategory === "Semua" || item.category === activeCategory;
//     const keyword = searchQuery.trim().toLowerCase();
//     const matchSearch =
//       !keyword ||
//       item.title.toLowerCase().includes(keyword) ||
//       item.organizer.toLowerCase().includes(keyword) ||
//       item.category.toLowerCase().includes(keyword) ||
//       item.roles.some((role) => role.toLowerCase().includes(keyword));

//     return matchCategory && matchSearch;
//   });

export default function Beranda({
  activeNav = "beranda",
  onNavChange = () => {},
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedLomba, setSelectedLomba] = useState(null);
  const [isBuatTimOpen, setIsBuatTimOpen] = useState(false);

  const filteredLomba = LOMBA_LIST.filter((item) => {
    const matchCategory =
      activeCategory === "Semua" || item.category === activeCategory;
    const keyword = searchQuery.trim().toLowerCase();
    const matchSearch =
      !keyword ||
      item.title.toLowerCase().includes(keyword) ||
      item.organizer.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword) ||
      item.roles.some((role) => role.toLowerCase().includes(keyword));

    return matchCategory && matchSearch;
  });

  const infoSlides = INFO_SLIDES.map((slide) => ({
    ...slide,
    onButtonClick: () => onNavChange(slide.targetPage),
  }));

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFB] text-[#1E1D24]">
      {/* Header Navigasi */}
      <Header
        activeNav={activeNav}
        onNavChange={onNavChange}
        onNotprofClick={() => console.log("Notifikasi / Profil diklik")}
      />

      {/* Konten Utama */}
      <main className="flex-1 pb-4">
        {/* Banner Pencarian */}
        <Pencarian
          title="Temukan peluang kompetisi"
          placeholder="Contoh: Gemastik, UI/UX..."
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {/* Banner Informasi Terbaru (default ke slide ke-3 sesuai desain) */}
        <Info slides={infoSlides} initialSlide={0} />

        {/* Section Lomba Pilihan */}
        <section className="mx-auto mt-10 max-w-6xl px-3 sm:px-6">
          {/* Judul Section & Link Lihat Semua */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#1E1D24] sm:text-2xl">
                Lomba pilihan untukmu
              </h2>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Berdasarkan minat dan keahlianmu.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveCategory("Semua")}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#9E164B] transition hover:text-[#82113D] sm:text-sm"
            >
              <span>Lihat semua</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Filter Kategori */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`cursor-pointer rounded-full px-5 py-2 text-xs font-medium transition sm:text-sm ${
                    isSelected
                      ? "bg-[#1E1D24] text-white shadow-xs"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Grid Daftar Kartu Lomba */}
          {filteredLomba.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLomba.map((item) => (
                <Lomba
                  key={item.id}
                  icon={item.icon}
                  category={item.category}
                  title={item.title}
                  organizer={item.organizer}
                  deadlineText={item.deadlineText}
                  teamsFormed={item.teamsFormed}
                  openPositions={item.openPositions}
                  roles={item.roles}
                  variant={item.variant}
                  onButtonClick={() => console.log("Lihat tim:", item.title)}
                  onDetailClick={() => setSelectedLomba(item)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white py-12 text-center text-sm text-gray-500">
              Tidak ada lomba yang cocok dengan pencarianmu.
            </div>
          )}

          {/* Tombol Buat Tim di Kanan Bawah Section */}
          <div className="mt-6 flex justify-end">
            <BuatTimButton
              floating={false}
              onClick={() => setIsBuatTimOpen(true)}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
      <DetailLombaDialog
        isOpen={Boolean(selectedLomba)}
        lomba={selectedLomba}
        onClose={() => setSelectedLomba(null)}
      />
      <BuatTimDialog
        isOpen={isBuatTimOpen}
        onClose={() => setIsBuatTimOpen(false)}
        lombaOptions={LOMBA_LIST.map((item) => item.title)}
        onSubmit={(data) => {
          console.log("Tim baru dibuat:", data);
        }}
      />
    </div>
  );
}
