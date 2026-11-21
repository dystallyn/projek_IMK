import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const PLACEHOLDER_SLIDES = [
  {
    id: 1,
    category: 'KATEGORI INFO',
    title: 'Judul informasi terbaru',
    description: 'Deskripsi singkat informasi akan tampil di sini.',
    buttonText: 'Lihat detail',
    image: '',
    imageCredit: '',
  },
];

export default function Info({
  slides = PLACEHOLDER_SLIDES,
  initialSlide = 0,
  autoPlay = true,
  interval = 4000,
}) {
  const safeSlides = slides.length > 0 ? slides : PLACEHOLDER_SLIDES;
  const [activeIndex, setActiveIndex] = useState(
    initialSlide < safeSlides.length ? initialSlide : 0
  );
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide berputar terus (loop) dan jeda saat di-hover
  useEffect(() => {
    if (!autoPlay || isPaused || safeSlides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeSlides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, safeSlides.length]);

  return (
    <section className="w-full px-3 pt-4 sm:px-6">
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[#9E164B] border-t-4 bg-[#FFF4F8]"
      >
        {/* Track Slide Horizontal */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {safeSlides.map((slide, index) => {
            const Icon = slide.icon;

            return (
              <div
                key={slide.id ?? index}
                className="grid w-full shrink-0 grid-cols-1 md:grid-cols-12"
              >
                {/* Sisi Kiri: Konten */}
                <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7 md:pb-16 lg:p-10 lg:pb-20">
                  <div>
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCE4EC] text-[#9E164B] sm:h-14 sm:w-14">
                        {Icon ? (
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        ) : null}
                      </div>

                      <div>
                        {slide.category && (
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#9E164B] sm:text-xs">
                            {slide.category}
                          </p>
                        )}

                        {slide.title && (
                          <h2 className="mt-1 text-xl font-bold tracking-tight text-[#1E1D24] sm:text-2xl lg:text-[28px] lg:leading-tight">
                            {slide.title}
                          </h2>
                        )}

                        {slide.description && (
                          <p className="mt-1.5 text-xs text-gray-500 sm:text-sm">
                            {slide.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {slide.buttonText && (
                      <button
                        type="button"
                        onClick={slide.onButtonClick}
                        className="mt-6 inline-flex cursor-pointer items-center gap-6 rounded-xl bg-[#9E164B] px-5 py-3 text-xs font-medium text-white transition hover:bg-[#82113D] sm:mt-7 sm:text-sm"
                      >
                        <span>{slide.buttonText}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Sisi Kanan: Gambar */}
                <div className="relative h-[220px] bg-gray-200 md:col-span-5 md:h-auto md:min-h-[260px]">
                  {slide.image ? (
                    <img
                      src={slide.image}
                      alt={slide.imageAlt || slide.title || 'Informasi'}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      Area Gambar
                    </div>
                  )}

                  {slide.imageCredit && (
                    <span className="absolute bottom-3 right-3 rounded-md bg-black/55 px-2.5 py-1 text-[10px] text-white/90">
                      {slide.imageCredit}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Indikator Titik Carousel (Tetap diam saat slide bergeser) */}
        <div className="flex items-center gap-2 bg-[#FFF4F8] px-6 py-4 md:absolute md:bottom-7 md:left-8 md:bg-transparent md:p-0 lg:left-10">
          {safeSlides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={slide.id ?? index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Slide ${index + 1}`}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-6 bg-[#9E164B]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}