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
import WorkspaceBanner from "../components/WorkspaceBanner";
import SinkronJadwal from "../components/SinkronJadwal";
import KetersediaanTambahan from "../components/KetersediaanTambahan";
import SharedFreeTime from "../components/SharedFreeTime";
import PilihWaktuDiskusi from "../components/PilihWaktuDiskusi";
import BuatTimButton from "../components/BuatTimButton";
import Footer from "../components/Footer";

import BuatTimDialog from "../components/dialogs/BuatTimDialog";
import StatusToast from "../components/dialogs/StatusToast";

const TEAM_DATA = {
  name: "Tim Aurora",
  competition: "GEMASTIK XVII",
  division: "Divisi Kota Cerdas",
  advisorStatus: "Pembimbing disetujui",
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

const HARI_PENDEK = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const HARI_PANJANG = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const JAM_SLOTS = [
  { start: "19.00", range: "19.00–20.00" },
  { start: "20.00", range: "20.00–21.00" },
  { start: "16.00", range: "16.00–17.00" },
  { start: "19.00", range: "19.00–20.00" },
];

function generateUpcomingSchedule(daysCount = 4) {
  const today = new Date();

  const dates = Array.from({ length: daysCount }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index + 1); // +1 s/d +4 hari setelah hari ini
    return date;
  });

  // Format rentang tanggal (aman walaupun ganti bulan atau tahun)
  const first = dates[0];
  const last = dates[dates.length - 1];

  const firstMonth = first.toLocaleDateString("id-ID", { month: "long" });
  const lastMonth = last.toLocaleDateString("id-ID", { month: "long" });

  let dateRange = "";
  if (
    first.getMonth() === last.getMonth() &&
    first.getFullYear() === last.getFullYear()
  ) {
    dateRange = `${first.getDate()}–${last.getDate()} ${lastMonth} ${last.getFullYear()}`;
  } else if (first.getFullYear() === last.getFullYear()) {
    dateRange = `${first.getDate()} ${firstMonth}–${last.getDate()} ${lastMonth} ${last.getFullYear()}`;
  } else {
    dateRange = `${first.getDate()} ${firstMonth} ${first.getFullYear()}–${last.getDate()} ${lastMonth} ${last.getFullYear()}`;
  }

  // Format daftar slot untuk KetersediaanTambahan, SharedFreeTime, & PilihWaktuDiskusi
  const slots = dates.map((date, index) => {
    const dayIdx = date.getDay();
    const dayShort = HARI_PENDEK[dayIdx];
    const dayLong = HARI_PANJANG[dayIdx];
    const monthLong = date.toLocaleDateString("id-ID", { month: "long" });
    const jam = JAM_SLOTS[index % JAM_SLOTS.length];

    return {
      id: `slot-${index}`,
      day: dayShort,
      time: jam.start,
      label: `${dayLong}, ${jam.range}`,
      fullLabel: `${dayLong}, ${date.getDate()} ${monthLong} · ${jam.range}`,
      recommended: index === 1, // Slot kedua direkomendasikan secara default
    };
  });

  return { dateRange, slots };
}

export default function JadwalDiskusi({
  activeNav = "tim-saya",
  onNavChange = () => {},
  onSwitchToTimSaya = () => {},
}) {
  const [lastSyncedText, setLastSyncedText] = useState("Hari ini, 09.42");
  const [isSyncing, setIsSyncing] = useState(false);

  const [myAvailableSlots, setMyAvailableSlots] = useState([
    "slot-0",
    "slot-1",
    "slot-3",
  ]);

  const [{ dateRange, slots: dynamicSlots }] = useState(() =>
    generateUpcomingSchedule(4)
  );
  const [confirmedSlot, setConfirmedSlot] = useState(null);
  const [isBuatTimOpen, setIsBuatTimOpen] = useState(false);
  const [toast, setToast] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const scheduleMembers = [
    {
      id: "arya",
      initials: "AR",
      name: "Arya (Kamu)",
      syncedInfo: "5 MK tersinkron",
      availableSlots: myAvailableSlots,
    },
    {
      id: "nadia",
      initials: "NP",
      name: "Nadia",
      syncedInfo: "6 MK tersinkron",
      availableSlots: ["slot-0", "slot-1", "slot-2"],
    },
    {
      id: "raka",
      initials: "RM",
      name: "Raka",
      syncedInfo: "5 MK tersinkron",
      availableSlots: ["slot-1", "slot-2", "slot-3"],
    },
  ];

  const showToast = (title, message) => {
    setToast({ isOpen: true, title, message });
  };

  const handleResync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const now = new Date();
      const jam = String(now.getHours()).padStart(2, "0");
      const menit = String(now.getMinutes()).padStart(2, "0");
      setLastSyncedText(`Hari ini, ${jam}.${menit}`);
      setIsSyncing(false);
      showToast(
        "Jadwal tersinkronisasi",
        "Jadwal kuliah seluruh anggota berhasil diperbarui.",
      );
    }, 600);
  };

  const handleSaveAvailability = (data) => {
    setMyAvailableSlots(data.selectedIds);
    showToast(
      "Ketersediaan disimpan",
      "Matriks shared free-time Tim Aurora telah diperbarui.",
    );
  };

  const handleConfirmSchedule = (slot) => {
    setConfirmedSlot(slot);
    showToast(
      "Jadwal dikonfirmasi",
      `Diskusi ${TEAM_DATA.name} dijadwalkan pada ${slot.fullLabel}.`,
    );
  };

  const handleTabChange = (tabId) => {
    if (tabId === "jadwal") return;
    onSwitchToTimSaya(tabId);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFB] text-[#1E1D24]">
      {/* Header Navigasi (pill aktif tetap di Tim Saya) */}
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
            activeTab="jadwal"
            onTabChange={handleTabChange}
            ariaLabel={`Navigasi workspace ${TEAM_DATA.name}`}
          />
        </section>

        {/* Konten Utama Jadwal Diskusi */}
        <section className="mx-auto mt-6 max-w-6xl space-y-6 px-3 sm:px-6">
          {/* Banner Informasi Jadwal */}
          <WorkspaceBanner
            icon={Calendar}
            title={`Jadwal adalah bagian dari ${TEAM_DATA.name}`}
            description="Hanya anggota tim ini yang dapat mengisi ketersediaan dan melihat hasilnya."
          />

          {/* Panel Sinkronisasi Portal Akademik UB */}
          <SinkronJadwal
            lastSyncedText={lastSyncedText}
            isSyncing={isSyncing}
            onResync={handleResync}
          />

          {/* Grid Ketersediaan Tambahan (Kiri) & Shared Free-Time (Kanan) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <KetersediaanTambahan
                initialDateRange={dateRange}
                slots={dynamicSlots}
                initialSelectedIds={myAvailableSlots}
                onSave={handleSaveAvailability}
              />
            </div>

            <div className="lg:col-span-8">
              <SharedFreeTime slots={dynamicSlots} members={scheduleMembers} />
            </div>
          </div>

          <PilihWaktuDiskusi
            slots={dynamicSlots.slice(0, 3)}
            initialSelectedId="slot-1"
            isConfirmed={Boolean(confirmedSlot)}
            onConfirm={handleConfirmSchedule}
          />

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
        onSubmit={(data) => console.log("Tim baru dibuat:", data)}
      />
    </div>
  );
}
