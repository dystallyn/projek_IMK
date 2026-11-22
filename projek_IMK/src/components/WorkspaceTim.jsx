import React from 'react';
import { Folder, MessageSquare, Calendar, ArrowRight } from 'lucide-react';

const ICON_VARIANTS = {
  pink: 'bg-[#FCE7F3] text-[#9E164B]',
  green: 'bg-[#DCFCE7] text-[#15803D]',
  amber: 'bg-[#FEF3C7] text-[#B45309]',
  teal: 'bg-[#CCFBF1] text-[#0F766E]',
  purple: 'bg-[#F3E8FF] text-[#7E22CE]',
};

const DEFAULT_ITEMS = [
  {
    id: 'dokumen',
    title: 'Dokumen tim',
    subtitle: '8 file · 2 baru',
    icon: Folder,
    variant: 'pink',
  },
  {
    id: 'diskusi',
    title: 'Diskusi',
    subtitle: '12 pesan belum dibaca',
    icon: MessageSquare,
    variant: 'green',
  },
  {
    id: 'jadwal',
    title: 'Timeline',
    subtitle: 'Milestone berikutnya 3 hari',
    icon: Calendar,
    variant: 'amber',
  },
];

export default function WorkspaceTim({
  title = 'Workspace tim',
  subtitle = 'Kelola semua kebutuhan lomba dalam satu ruang.',
  actionText = 'Buka workspace',
  items = DEFAULT_ITEMS,
  onOpenWorkspace = () => {},
  onItemClick = () => {},
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-7">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#1E1D24] sm:text-xl">
            {title}
          </h2>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">{subtitle}</p>
        </div>

        <button
          type="button"
          onClick={onOpenWorkspace}
          className="inline-flex w-fit shrink-0 cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#9E164B] transition hover:text-[#82113D] sm:text-sm"
        >
          <span>{actionText}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Grid 3 Kartu Pintasan */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((item, index) => {
          const Icon = item.icon;
          const iconClass =
            ICON_VARIANTS[item.variant] || ICON_VARIANTS.pink;

          return (
            <button
              key={item.id ?? index}
              type="button"
              onClick={() => onItemClick(item)}
              className="group flex cursor-pointer flex-col items-start rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-gray-300 hover:bg-[#FAFAFB] hover:shadow-xs"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition group-hover:scale-105 ${iconClass}`}
              >
                {Icon ? <Icon className="h-5 w-5" /> : null}
              </div>

              <h3 className="mt-4 text-sm font-bold text-[#1E1D24] sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500">{item.subtitle}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}