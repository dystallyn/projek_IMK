// import React, { useState } from 'react';
// import {
//   Home,
//   Search,
//   PanelLeft,
//   GraduationCap,
//   Menu,
//   X,
// } from 'lucide-react';

// // Sesuaikan ekstensi file (.png / .svg / .webp) dengan file asli di folder assets
// import logoImg from '../assets/image/Logo.png';
// import notprofImg from '../assets/image/NotProf.png';

// const NAV_ITEMS = [
//   { id: 'beranda', label: 'Beranda', icon: Home },
//   { id: 'jelajah-tim', label: 'Jelajah Tim', icon: Search },
//   { id: 'tim-saya', label: 'Tim Saya', icon: PanelLeft },
//   { id: 'dosen', label: 'Dosen', icon: GraduationCap },
// ];

// export default function Header({
//   activeNav = 'beranda',
//   onNavChange = () => {},
//   onNotprofClick = () => {},
// }) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const handleSelectNav = (id) => {
//     onNavChange(id);
//     setMobileMenuOpen(false);
//   };

//   return (
//     <div className="sticky top-0 z-40 w-full px-4 pt-4 sm:px-6">
//       <header className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-[#1E1D24] px-5 py-3 text-white shadow-lg shadow-black/15">
//         {/* Kiri: Logo */}
//         <a
//           href="#beranda"
//           onClick={(e) => {
//             e.preventDefault();
//             handleSelectNav('beranda');
//           }}
//           className="flex shrink-0 items-center focus:outline-none"
//         >
//           <img
//             src={logoImg}
//             alt="KolaboraCampus"
//             className="h-8 w-auto object-contain"
//           />
//         </a>

//         {/* Tengah: Menu Navigasi (Desktop) */}
//         <nav
//           aria-label="Navigasi utama"
//           className="hidden items-center gap-2 md:flex"
//         >
//           {NAV_ITEMS.map((item) => {
//             const Icon = item.icon;
//             const isActive = activeNav === item.id;

//             return (
//               <button
//                 key={item.id}
//                 type="button"
//                 onClick={() => handleSelectNav(item.id)}
//                 className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
//                   isActive
//                     ? 'bg-[#9E164B] text-white'
//                     : 'text-gray-300 hover:bg-white/10 hover:text-white'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span>{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>

//         {/* Kanan: Notifikasi & Profil + Toggle Mobile */}
//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             onClick={onNotprofClick}
//             aria-label="Notifikasi dan Profil"
//             className="flex shrink-0 items-center rounded-full transition hover:opacity-90 focus:outline-none"
//           >
//             <img
//               src={notprofImg}
//               alt="Notifikasi dan Profil"
//               className="h-10 w-auto object-contain"
//             />
//           </button>

//           {/* Tombol Hamburger (Mobile) */}
//           <button
//             type="button"
//             onClick={() => setMobileMenuOpen((prev) => !prev)}
//             aria-label="Toggle menu navigasi"
//             className="flex h-9 w-9 items-center justify-center rounded-full text-gray-300 transition hover:bg-white/10 hover:text-white md:hidden"
//           >
//             {mobileMenuOpen ? (
//               <X className="h-5 w-5" />
//             ) : (
//               <Menu className="h-5 w-5" />
//             )}
//           </button>
//         </div>
//       </header>

//       {/* Dropdown Menu Mobile */}
//       {mobileMenuOpen && (
//         <nav
//           aria-label="Navigasi mobile"
//           className="mx-auto mt-2 max-w-6xl rounded-2xl bg-[#1E1D24] p-3 text-white shadow-lg md:hidden"
//         >
//           <div className="flex flex-col gap-1.5">
//             {NAV_ITEMS.map((item) => {
//               const Icon = item.icon;
//               const isActive = activeNav === item.id;

//               return (
//                 <button
//                   key={item.id}
//                   type="button"
//                   onClick={() => handleSelectNav(item.id)}
//                   className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
//                     isActive
//                       ? 'bg-[#9E164B] text-white'
//                       : 'text-gray-300 hover:bg-white/10 hover:text-white'
//                   }`}
//                 >
//                   <Icon className="h-4 w-4" />
//                   <span>{item.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </nav>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import {
  Home,
  Search,
  PanelLeft,
  GraduationCap,
  Menu,
  X,
} from 'lucide-react';

import logoImg from '../assets/image/Logo.png';
import notprofImg from '../assets/image/NotProf.png';

const DEFAULT_NAV_ITEMS = [
  { id: 'beranda', label: 'Beranda', icon: Home },
  { id: 'jelajah-tim', label: 'Jelajah Tim', icon: Search },
  { id: 'tim-saya', label: 'Tim Saya', icon: PanelLeft },
  { id: 'dosen', label: 'Dosen', icon: GraduationCap },
];

export default function Header({
  navItems = DEFAULT_NAV_ITEMS,
  activeNav = 'beranda',
  onNavChange = () => {},
  onNotprofClick = () => {},
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tutup menu mobile otomatis jika layar diperbesar ke desktop (md >= 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectNav = (id) => {
    onNavChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-6 sm:pt-4">
      <header className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-[#1E1D24] px-4 py-2.5 text-white shadow-lg shadow-black/15 sm:px-6 sm:py-3">
        {/* Kiri: Logo */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            handleSelectNav('beranda');
          }}
          className="flex shrink-0 items-center focus:outline-none"
        >
          <img
            src={logoImg}
            alt="KolaboraCampus"
            className="h-7 w-auto object-contain sm:h-8"
          />
        </a>

        {/* Tengah: Navigasi Desktop & Tablet Landscape */}
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-1 md:flex lg:gap-2"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectNav(item.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 lg:px-5 lg:py-2.5 ${
                  isActive
                    ? 'bg-[#9E164B] text-white shadow-sm'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Kanan: Notifikasi/Profil & Hamburger Mobile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onNotprofClick}
            aria-label="Notifikasi dan Profil"
            className="flex shrink-0 cursor-pointer items-center rounded-full transition hover:opacity-90 focus:outline-none"
          >
            <img
              src={notprofImg}
              alt="Notifikasi dan Profil"
              className="h-8 w-auto object-contain sm:h-10"
            />
          </button>

          {/* Tombol Menu Mobile (Hanya tampil di layar < 768px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-gray-200 transition hover:bg-white/20 hover:text-white md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Dropdown Menu Mobile dengan transisi halus */}
      <div
        className={`mx-auto max-w-6xl overflow-hidden transition-all duration-200 ease-out md:hidden ${
          mobileMenuOpen
            ? 'mt-2 max-h-96 opacity-100'
            : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <nav
          aria-label="Navigasi mobile"
          className="rounded-3xl bg-[#1E1D24] p-3 text-white shadow-xl shadow-black/20"
        >
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectNav(item.id)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#9E164B] text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}