import React from 'react';
import { Check, Send, Clock } from 'lucide-react';

export default function StatusPengajuan({
  title = 'Status pengajuan',
  isSubmitted = false,
  formedAt = '18 Okt · 14.32',
  submittedAt = 'Baru saja',
  steps,
}) {
  const defaultSteps = [
    {
      id: 1,
      title: 'Tim terbentuk',
      subtitle: formedAt,
      status: 'completed',
    },
    {
      id: 2,
      title: isSubmitted ? 'Pengajuan terkirim' : 'Pengajuan siap dikirim',
      subtitle: isSubmitted ? submittedAt : 'Lengkapi dan kirim formulir',
      status: isSubmitted ? 'completed' : 'active',
      icon: Send,
    },
    {
      id: 3,
      title: 'Persetujuan dosen',
      subtitle: isSubmitted ? 'Menunggu respons dosen' : 'Belum tersedia',
      status: isSubmitted ? 'active' : 'upcoming',
      icon: isSubmitted ? Clock : null,
    },
  ];

  const timelineSteps = steps || defaultSteps;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-7">
      <h2 className="text-lg font-bold tracking-tight text-[#1E1D24] sm:text-xl">
        {title}
      </h2>

      <ol className="mt-6">
        {timelineSteps.map((step, index) => {
          const isLast = index === timelineSteps.length - 1;
          const Icon = step.icon;

          return (
            <li
              key={step.id ?? index}
              className={`relative flex items-start gap-4 ${
                isLast ? '' : 'pb-7'
              }`}
            >
              {/* Garis Vertikal Penghubung */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[17px] top-9 bottom-0 w-px ${
                    step.status === 'completed'
                      ? 'bg-gray-200'
                      : 'bg-gray-200'
                  }`}
                />
              )}

              {/* Indikator Bulat */}
              <div className="relative z-10 flex shrink-0 items-center justify-center">
                {step.status === 'completed' && (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#15803D] text-white">
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                )}

                {step.status === 'active' && (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9E164B] text-white ring-4 ring-[#FCE7F3]">
                    {Icon ? (
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                )}

                {step.status === 'upcoming' && (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F2F6] text-xs font-semibold text-gray-500">
                    {index + 1}
                  </div>
                )}
              </div>

              {/* Label Tahap */}
              <div className="min-w-0 pt-0.5">
                <p className="text-sm font-bold text-[#1E1D24]">
                  {step.title}
                </p>
                {step.subtitle && (
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    {step.subtitle}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}