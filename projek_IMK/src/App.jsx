// import React, { useState } from 'react';
// import Header from './components/Header';
// import Footer from './components/Footer';

// export default function App() {
//   const [activeNav, setActiveNav] = useState('beranda');

//   return (
//     <div className="flex min-h-screen flex-col bg-[#FAFAFB]">
//       <Header
//         activeNav={activeNav}
//         onNavChange={setActiveNav}
//         onNotprofClick={() => console.log('Notif / Profil diklik')}
//       />

//       {/* Area Konten Utama */}
//       <main className="flex-1">
//         {/* Komponen isi halaman ditaruh di sini */}
//       </main>

//       <Footer />
//     </div>
//   );
// }

import React, { useState } from 'react';
import Beranda from './pages/Beranda';
import JelajahTim from './pages/JelajahTim';
import CariAnggota from './pages/CariAnggota';
import TimSaya from './pages/TimSaya';
import JadwalDiskusi from './pages/JadwalDiskusi';
import Dosen from './pages/Dosen';

export default function App() {
  const [activePage, setActivePage] = useState('beranda');

  if (activePage === 'jelajah-tim') {
    return (
      <JelajahTim
        activeNav="jelajah-tim"
        onNavChange={setActivePage}
        onSwitchToCariAnggota={() => setActivePage('cari-anggota')}
      />
    );
  }

  if (activePage === 'cari-anggota') {
    return (
      <CariAnggota
        activeNav="jelajah-tim"
        onNavChange={setActivePage}
        onSwitchToJelajahTim={() => setActivePage('jelajah-tim')}
      />
    );
  }

  if (activePage === 'tim-saya') {
    return (
      <TimSaya
        activeNav="tim-saya"
        onNavChange={setActivePage}
        onSwitchToJadwal={() => setActivePage('jadwal-diskusi')}
      />
    );
  }

  if (activePage === 'jadwal-diskusi') {
    return (
      <JadwalDiskusi
        activeNav="tim-saya"
        onNavChange={setActivePage}
        onSwitchToTimSaya={() => setActivePage('tim-saya')}
      />
    );
  }

  if (activePage === 'dosen') {
    return (
      <Dosen
        activeNav="dosen"
        onNavChange={setActivePage}
      />
    );
  }

  return (
    <Beranda
      activeNav={activePage}
      onNavChange={setActivePage}
    />
  );
}