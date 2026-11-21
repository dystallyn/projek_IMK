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


import Beranda from './pages/Beranda';

export default function App() {
  return <Beranda />;
}