import React from 'react';
import logoImg from '../assets/image/Logo.png';

export default function Footer({
  tagline = 'Kolaborasi cerdas untuk prestasi yang lebih besar.',
  ssoText = 'Terhubung melalui SSO Universitas Brawijaya',
}) {
  return (
    <div className="w-full px-3 pb-4 pt-8 sm:px-6">
      <footer className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 rounded-[28px] bg-[#1E1D24] px-6 py-4 text-white shadow-lg shadow-black/15 sm:flex-row sm:items-center sm:px-10 sm:py-5">
        {/* Kiri: Logo & Tagline */}
        <div className="flex flex-col items-start gap-2">
          <img
            src={logoImg}
            alt="KolaboraCampus"
            className="h-7 w-auto object-contain sm:h-8"
          />
          <p className="text-[10px] text-gray-400 sm:text-[11px]">
            {tagline}
          </p>
        </div>

        {/* Kanan: Keterangan SSO */}
        <p className="text-[9px] text-gray-400 sm:text-right sm:text-[10px]">
          {ssoText}
        </p>
      </footer>
    </div>
  );
}