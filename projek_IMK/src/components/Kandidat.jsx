import React from "react";
import { Sparkles, Send, Check } from "lucide-react";

const AVATAR_VARIANTS = {
  pink: "bg-[#FCE7F3] text-[#9E164B]",
  amber: "bg-[#FEF3C7] text-[#B45309]",
  teal: "bg-[#CCFBF1] text-[#0F766E]",
  purple: "bg-[#F3E8FF] text-[#7E22CE]",
  gray: "bg-[#ECEBF0] text-[#374151]",
};

function getInitials(name = "") {
  const cleaned = name.replace(/\b(Dr|Prof|Ir|H|Hj)\.\s*/gi, "").trim();

  return cleaned
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export default function Kandidat({
  initials = "",
  avatarVariant = "pink",
  name = "Nama Kandidat",
  matchText = "",
  role = "Peran",
  subtitle = "Bidang Keahlian",
  info = "Program Studi / Instansi",
  skills = [],
  profileButtonText = "Lihat profil",
  actionButtonText = "Ajukan",
  submittedButtonText = "Terkirim",
  actionIcon: ActionIcon = Send,
  isSubmitted = false,
  onProfileClick = () => {},
  onActionClick = () => {},
}) {
  const displayInitials = initials || getInitials(name);
  const avatarClass = AVATAR_VARIANTS[avatarVariant] || AVATAR_VARIANTS.pink;

  return (
    <article className="flex flex-col justify-between gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition hover:shadow-md sm:p-6 lg:flex-row lg:items-center">
      {/* Sisi Kiri: Avatar & Identitas */}
      <div className="flex items-start gap-4 sm:items-center sm:gap-5">
        <div className="relative shrink-0">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full text-base font-bold sm:h-16 sm:w-16 sm:text-lg ${avatarClass}`}
          >
            {displayInitials}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          {/* Baris Nama & Badge Kecocokan */}
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-base font-bold tracking-tight text-[#1E1D24] sm:text-lg">
              {name}
            </h3>

            {matchText && (
              <span className="inline-flex items-center gap-1 rounded-full border border-[#FCE7F3] bg-[#FFF4F8] px-3 py-1 text-xs font-semibold text-[#9E164B]">
                <Sparkles className="h-3.5 w-3.5 shrink-0" />
                <span>{matchText}</span>
              </span>
            )}
          </div>

          {/* Baris Peran & Bidang */}
          {(role || subtitle) && (
            <p className="mt-1 text-xs font-semibold text-[#9E164B] sm:text-sm">
              {role}
              {role && subtitle ? " · " : ""}
              {subtitle}
            </p>
          )}

          {/* Info Tambahan (Prodi / Angkatan) */}
          {info && (
            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">{info}</p>
          )}

          {/* Tag Keahlian */}
          {skills.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-lg border border-gray-200 bg-[#FAFAFB] px-3 py-1 text-xs font-medium text-gray-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sisi Kanan: Tombol Aksi */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center lg:shrink-0">
        {profileButtonText && (
          <button
            type="button"
            onClick={onProfileClick}
            className="cursor-pointer rounded-xl border border-gray-200 bg-white px-5 py-3 text-xs font-semibold text-[#1E1D24] transition hover:bg-gray-50 sm:text-sm"
          >
            {profileButtonText}
          </button>
        )}

        {actionButtonText &&
          (isSubmitted ? (
            <button
              type="button"
              disabled
              className="inline-flex cursor-default items-center justify-center gap-2 rounded-xl bg-[#9E164B]/85 px-5 py-3 text-xs font-semibold text-white sm:text-sm"
            >
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} />
              <span>{submittedButtonText}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onActionClick}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#9E164B] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#82113D] sm:text-sm"
            >
              {ActionIcon && <ActionIcon className="h-4 w-4 shrink-0" />}
              <span>{actionButtonText}</span>
            </button>
          ))}
      </div>
    </article>
  );
}
