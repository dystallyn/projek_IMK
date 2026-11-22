import React from 'react';
import { Calendar } from 'lucide-react';

const VARIANT_STYLES = {
  pink: 'border-[#FAD4E2] bg-[#FFF5F8]',
  gray: 'border-gray-200 bg-[#F9F8FA]',
  green: 'border-[#BBF7D0] bg-[#EEFBF3]',
  amber: 'border-[#FDE68A] bg-[#FFFBEB]',
};

export default function WorkspaceBanner({
  icon: Icon = Calendar,
  title = 'Jadwal adalah bagian dari Tim Aurora',
  description = 'Hanya anggota tim ini yang dapat mengisi ketersediaan dan melihat hasilnya.',
  variant = 'pink',
}) {
  const containerStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.pink;

  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border px-5 py-4 sm:items-center sm:px-6 sm:py-5 ${containerStyle}`}
    >
      {Icon && (
        <Icon
          className="mt-0.5 h-5 w-5 shrink-0 text-[#1E1D24] sm:mt-0"
          strokeWidth={1.8}
        />
      )}

      <div className="min-w-0">
        <h3 className="text-sm font-bold leading-snug text-[#1E1D24] sm:text-base">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}