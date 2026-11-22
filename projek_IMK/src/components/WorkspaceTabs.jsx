import React from 'react';
import { Home, Calendar, Folder, MessageSquare } from 'lucide-react';

const DEFAULT_TABS = [
  { id: 'ringkasan', label: 'Ringkasan', icon: Home },
  { id: 'jadwal', label: 'Jadwal diskusi', icon: Calendar, badge: 1 },
  { id: 'dokumen', label: 'Dokumen', icon: Folder },
  { id: 'diskusi', label: 'Diskusi', icon: MessageSquare, badge: 12 },
];

export default function WorkspaceTabs({
  tabs = DEFAULT_TABS,
  activeTab = 'ringkasan',
  onTabChange = () => {},
  ariaLabel = 'Navigasi workspace tim',
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex w-full items-center gap-1.5 overflow-x-auto rounded-2xl border border-gray-200/80 bg-[#ECEBF0] p-1.5 sm:gap-2"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const hasBadge =
          tab.badge !== undefined && tab.badge !== null && tab.badge > 0;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`inline-flex shrink-0 cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-xl px-5 py-3 text-xs font-medium transition sm:px-6 sm:text-sm ${
              isActive
                ? 'bg-[#1E1D24] text-white shadow-xs'
                : 'text-gray-600 hover:bg-white/60 hover:text-[#1E1D24]'
            }`}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            <span>{tab.label}</span>

            {hasBadge && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#9E164B] px-1.5 text-[11px] font-bold leading-none text-white">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}