import React, { useEffect, useRef, useState } from 'react';
import { FileText, Send, Check } from 'lucide-react';

function formatFileMeta(file) {
  const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
  const sizeInMB = file.size / (1024 * 1024);

  if (sizeInMB >= 0.1) {
    return `${ext} · ${sizeInMB.toFixed(1).replace('.', ',')} MB`;
  }

  const sizeInKB = Math.max(1, Math.round(file.size / 1024));
  return `${ext} · ${sizeInKB} KB`;
}

export default function FormPengajuanPembimbing({
  stepNumber = 1,
  title = 'Form pengajuan pembimbing',
  subtitle = 'Pastikan detail pengajuan sudah lengkap.',
  dosenTujuan = 'Dr. Budi Santoso · Teknik Informatika',
  initialTopic = 'Sistem Mitigasi Banjir Berbasis IoT',
  initialMessage = 'Selamat siang Pak Budi, kami sedang mempersiapkan GEMASTIK kategori Kota Cerdas. Kami berharap Bapak bersedia membimbing tim kami.',
  maxChars = 500,
  initialFile = {
    name: 'Proposal_Gemastik_TimAurora.pdf',
    meta: 'PDF · 2,4 MB',
  },
  isSubmitted,
  onSubmit = () => {},
}) {
  const fileInputRef = useRef(null);

  const [dosen, setDosen] = useState(dosenTujuan);
  const [topic, setTopic] = useState(initialTopic);
  const [message, setMessage] = useState(initialMessage);
  const [proposalFile, setProposalFile] = useState(initialFile);
  const [internalSubmitted, setInternalSubmitted] = useState(false);

  const submitted =
    isSubmitted !== undefined ? isSubmitted : internalSubmitted;

  // Sinkronkan input Dosen tujuan jika kartu DosenCard yang dipilih berubah
  useEffect(() => {
    setDosen(dosenTujuan);
  }, [dosenTujuan]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProposalFile({
      name: file.name,
      meta: formatFileMeta(file),
      rawFile: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitted) return;

    if (isSubmitted === undefined) {
      setInternalSubmitted(true);
    }

    onSubmit({
      dosen,
      topic,
      message,
      proposalFile,
    });
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-7">
      {/* Header Form */}
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FCE7F3] text-sm font-bold text-[#9E164B]">
          {stepNumber}
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight text-[#1E1D24] sm:text-xl">
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Dosen Tujuan */}
        <div>
          <label
            htmlFor="dosen-tujuan"
            className="block text-sm font-bold text-[#1E1D24]"
          >
            Dosen tujuan
          </label>
          <input
            id="dosen-tujuan"
            type="text"
            value={dosen}
            onChange={(e) => setDosen(e.target.value)}
            disabled={submitted}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1E1D24] transition focus:border-[#9E164B] focus:outline-none focus:ring-2 focus:ring-[#9E164B]/20 disabled:cursor-default disabled:bg-[#FAFAFB]"
          />
          <p className="mt-1.5 text-xs text-gray-500">
            Rekomendasi berdasarkan topik dan rekam jejak lomba.
          </p>
        </div>

        {/* Judul / Topik Lomba */}
        <div>
          <label
            htmlFor="judul-topik"
            className="block text-sm font-bold text-[#1E1D24]"
          >
            Judul / topik lomba
          </label>
          <input
            id="judul-topik"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={submitted}
            placeholder="Masukkan judul atau topik lomba"
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1E1D24] transition focus:border-[#9E164B] focus:outline-none focus:ring-2 focus:ring-[#9E164B]/20 disabled:cursor-default disabled:bg-[#FAFAFB]"
          />
          <p className="mt-1.5 text-xs text-gray-500">
            Gunakan judul ringkas dan spesifik.
          </p>
        </div>

        {/* Pesan Pengajuan */}
        <div>
          <label
            htmlFor="pesan-pengajuan"
            className="block text-sm font-bold text-[#1E1D24]"
          >
            Pesan pengajuan
          </label>
          <textarea
            id="pesan-pengajuan"
            rows={4}
            maxLength={maxChars}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={submitted}
            placeholder="Tulis pesan singkat untuk dosen pembimbing..."
            className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm leading-relaxed text-[#1E1D24] transition focus:border-[#9E164B] focus:outline-none focus:ring-2 focus:ring-[#9E164B]/20 disabled:cursor-default disabled:bg-[#FAFAFB]"
          />
          <p className="mt-1.5 text-xs text-gray-500">
            {message.length}/{maxChars} karakter
          </p>
        </div>

        {/* Proposal Tim */}
        <div>
          <span className="block text-sm font-bold text-[#1E1D24]">
            Proposal tim
          </span>

          <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-dashed border-gray-300 bg-[#FAFAFB] px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <FileText
                className="h-5 w-5 shrink-0 text-gray-600"
                strokeWidth={1.8}
              />
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-[#1E1D24] sm:text-sm">
                  {proposalFile.name}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500 sm:text-xs">
                  {proposalFile.meta}
                </p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              disabled={submitted}
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 cursor-pointer text-xs font-bold text-[#9E164B] transition hover:text-[#82113D] hover:underline disabled:cursor-default disabled:opacity-60 disabled:no-underline sm:text-sm"
            >
              Ganti file
            </button>
          </div>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={submitted}
          className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition ${
            submitted
              ? 'cursor-default bg-[#15803D]'
              : 'cursor-pointer bg-[#9E164B] hover:bg-[#82113D]'
          }`}
        >
          {submitted ? (
            <>
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} />
              <span>Pengajuan terkirim</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4 shrink-0" strokeWidth={2} />
              <span>Kirim pengajuan</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
}