import React from 'react';
import { Plus } from 'lucide-react';

export default function BuatTimButton({
  label = 'Buat Tim',
  onClick = () => {},
  floating = true,
}) {
  const buttonElement = (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[#9E164B] px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_22px_rgba(158,22,75,0.35)] ring-1 ring-white/40 transition-all duration-200 hover:bg-[#82113D] hover:shadow-[0_10px_26px_rgba(158,22,75,0.45)] active:scale-95 sm:px-7 sm:py-3.5 sm:text-base"
    >
      <Plus className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
      <span>{label}</span>
    </button>
  );

  if (floating) {
    return (
      <div className="fixed bottom-5 right-5 z-40 sm:bottom-8 sm:right-8">
        {buttonElement}
      </div>
    );
  }

  return buttonElement;
}