import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBanner({
  title = 'Temukan peluang kompetisi',
  placeholder = 'Contoh: Gemastik, UI/UX...',
  value = '',
  onChange = () => {},
  onSubmit = () => {},
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <section className="w-full px-3 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-2xl bg-[#1E1D24] px-6 py-6 shadow-md shadow-black/10 md:flex-row md:items-center md:justify-between md:px-9 md:py-7">
        {/* Teks Judul */}
        <h1 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
          {title}
        </h1>

        {/* Kolom Pencarian */}
        <form onSubmit={handleSubmit} className="relative w-full md:w-[54%]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 sm:h-5 sm:w-5" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label={title}
            className="w-full rounded-xl bg-white py-3 pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9E164B] sm:py-3.5 sm:pl-12 sm:text-base"
          />
        </form>
      </div>
    </section>
  );
}