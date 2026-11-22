import React, { useState } from "react";
import {
  CheckCircle2,
  Home,
  Calendar,
  Folder,
  MessageSquare,
} from "lucide-react";

import Header from "../components/Header";
import WorkspaceTabs from "../components/WorkspaceTabs";
import AnggotaDisetujui from "../components/AnggotaDisetujui";
import WorkspaceTim from "../components/WorkspaceTim";
import DosenPembimbing from "../components/DosenPembimbing";
import BuatTimButton from "../components/BuatTimButton";
import Footer from "../components/Footer";

import KunciTimDialog from "../components/dialogs/KunciTimDialog";
import StatusToast from "../components/dialogs/StatusToast";
import BuatTimDialog from "../components/dialogs/BuatTimDialog";

const TEAM_DATA = {
  name: "Tim Aurora",
  competition: "GEMASTIK XVII",
  division: "Divisi Kota Cerdas",
  advisorStatus: "Pembimbing disetujui",
  totalPositions: 3,
  members: [
    {
      id: 1,
      initials: "NP",
      avatarVariant: "amber",
      name: "Nadia Putri",
      role: "Ketua Tim · Product Designer",
      status: "Disetujui",
    },
    {
      id: 2,
      initials: "RM",
      avatarVariant: "pink",
      name: "Raka Mahendra",
      role: "Frontend Developer",
      status: "Disetujui",
    },
    {
      id: 3,
      initials: "SA",
      avatarVariant: "gray",
      name: "Sarah Azzahra",
      role: "Business Strategist",
      status: "Disetujui",
    },
  ],
  advisor: {
    initials: "BS",
    name: "Dr. Budi Santoso",
    department: "Teknik Informatika",
    specialty: "Smart City & IoT",
    statusText: "Aktif membimbing",
    responseTime: "< 1 hari",
    guidedTeams: "4 tim",
  },
};

const WORKSPACE_TABS = [
  { id: "ringkasan", label: "Ringkasan", icon: Home },
  { id: "jadwal", label: "Jadwal diskusi", icon: Calendar, badge: 1 },
  { id: "dokumen", label: "Dokumen", icon: Folder },
  { id: "diskusi", label: "Diskusi", icon: MessageSquare, badge: 12 },
];

const LOMBA_OPTIONS = [
  "GEMASTIK XVII",
  "L'Oréal Brandstorm",
  "Kreasi UI/UX Nasional",
];

export default function TimSaya({
  activeNav = "tim-saya",
  onNavChange = () => {},
  onSwitchToJadwal = () => {},
}) {
  const [activeTab, setActiveTab] = useState("ringkasan");
  const [isTeamLocked, setIsTeamLocked] = useState(false);
  const [lockedDate, setLockedDate] = useState("");
  const [isConfirmLockOpen, setIsConfirmLockOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isBuatTimOpen, setIsBuatTimOpen] = useState(false);

  const handleConfirmLock = () => {
    const formattedDate = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setLockedDate(formattedDate);
    setIsTeamLocked(true);
    setIsConfirmLockOpen(false);
    setIsStatusOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFB] text-[#1E1D24]">
      {/* Header Navigasi */}
      <Header
        activeNav={activeNav}
        onNavChange={onNavChange}
        onNotprofClick={() => console.log("Notifikasi / Profil diklik")}
      />

      <main className="flex-1 pb-6">
        {/* Header Identitas Tim */}
        <section className="mx-auto mt-8 max-w-6xl px-3 sm:px-6">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#9E164B] sm:text-xs">
                TIM SAYA / WORKSPACE
              </p>
              <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-[#1E1D24] sm:text-4xl">
                {TEAM_DATA.name}
              </h1>
              <p className="mt-1.5 text-xs text-gray-500 sm:text-sm">
                {TEAM_DATA.competition} · {TEAM_DATA.division}
              </p>
            </div>

            <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[#BBF7D0] bg-[#EEFBF3] px-3.5 py-1.5 text-xs font-semibold text-[#15803D]">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span>{TEAM_DATA.advisorStatus}</span>
            </span>
          </div>
        </section>

        {/* Tab Navigasi Workspace */}
        <section className="mx-auto mt-6 max-w-6xl px-3 sm:px-6">
          <WorkspaceTabs
            tabs={WORKSPACE_TABS}
            activeTab={activeTab}
            onTabChange={(tabId) => {
              if (tabId === "jadwal") {
                onSwitchToJadwal();
              } else {
                setActiveTab(tabId);
              }
            }}
            ariaLabel={`Navigasi workspace ${TEAM_DATA.name}`}
          />
        </section>

        {/* Konten Berdasarkan Tab Aktif */}
        <section className="mx-auto mt-6 max-w-6xl px-3 sm:px-6">
          {activeTab === "ringkasan" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Kolom Kiri: Anggota & Workspace */}
              <div className="space-y-6 lg:col-span-8">
                <AnggotaDisetujui
                  members={TEAM_DATA.members}
                  totalPositions={TEAM_DATA.totalPositions}
                  isLocked={isTeamLocked}
                  lockedDate={lockedDate}
                  onLockTeam={() => setIsConfirmLockOpen(true)}
                />

                <WorkspaceTim
                  onOpenWorkspace={() => setActiveTab("dokumen")}
                  onItemClick={(item) => {
                    if (item.id === "jadwal") {
                      onSwitchToJadwal();
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                />
              </div>

              {/* Kolom Kanan: Profil Dosen Pembimbing */}
              <div className="lg:col-span-4">
                <DosenPembimbing
                  initials={TEAM_DATA.advisor.initials}
                  name={TEAM_DATA.advisor.name}
                  department={TEAM_DATA.advisor.department}
                  specialty={TEAM_DATA.advisor.specialty}
                  statusText={TEAM_DATA.advisor.statusText}
                  responseTime={TEAM_DATA.advisor.responseTime}
                  guidedTeams={TEAM_DATA.advisor.guidedTeams}
                  onContactClick={() => setActiveTab("diskusi")}
                />
              </div>
            </div>
          )}

          {activeTab === "jadwal" && (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center">
              <p className="text-sm font-semibold text-[#1E1D24]">
                Jadwal diskusi
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Konten tab Jadwal diskusi siap ditambahkan di sini.
              </p>
            </div>
          )}

          {activeTab === "dokumen" && (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center">
              <p className="text-sm font-semibold text-[#1E1D24]">
                Dokumen tim
              </p>
            </div>
          )}

          {activeTab === "diskusi" && (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center">
              <p className="text-sm font-semibold text-[#1E1D24]">
                Diskusi tim
              </p>
            </div>
          )}

          {/* Tombol Buat Tim */}
          <div className="relative z-10 mt-6 flex justify-end lg:-mt-5 lg:pr-2">
            <div className="mt-8 flex justify-end">
              <BuatTimButton
                floating={false}
                onClick={() => setIsBuatTimOpen(true)}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Dialog Konfirmasi Kunci Tim */}
      <KunciTimDialog
        isOpen={isConfirmLockOpen}
        onClose={() => setIsConfirmLockOpen(false)}
        onConfirm={handleConfirmLock}
      />

      {/* Notifikasi Status Team Locked */}
      <StatusToast
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        title="Team Locked"
        message={`Susunan ${TEAM_DATA.name} berhasil dikunci dan dikonfirmasi.`}
      />

      {/* Dialog Buat Tim Baru */}
      <BuatTimDialog
        isOpen={isBuatTimOpen}
        onClose={() => setIsBuatTimOpen(false)}
        lombaOptions={LOMBA_OPTIONS}
        onSubmit={(data) => console.log("Tim baru dibuat:", data)}
      />
    </div>
  );
}
