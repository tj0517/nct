"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import SectionLabel from "./SectionLabel";

const testimonials = [
  {
    text: "Mam poczucie bezpieczeństwa i pewność, że uczę się tego właściwego języka angielskiego, takiego bez skazy. Rewelacyjne jest dopasowanie do zainteresowań i potrzeb. Najcenniejsze jest dostosowanie do aktualnych oczekiwań — to naprawdę wartościowe, kiedy w nagłym przypadku można liczyć na pomoc i wsparcie. I jeszcze jedno — zaufanie.",
    author: "Marta Kielczyk",
    role: "Dziennikarka",
    image: "/images/testimonials/marta-kielczyk.png",
  },
  {
    text: "Podejście do nauki i doskonalenia języka angielskiego jest w szkole anicecupoftea.pl na najwyższym poziomie. Zajęcia to nie tylko lekcje języka, to wszechstronnie kształcące spotkania, a to za sprawą różnorodnych i ciekawych materiałów dydaktycznych, ale także dzięki wyjątkowej osobowości samego założyciela szkoły, pana Anthony\u2019ego Goltza.",
    author: "Jan Kisielewski",
    role: "Marketing Strategy Director, Deloitte",
    image: "/images/testimonials/jan-kisielewski.jpeg",
  },
  {
    text: "Jeśli szukasz czegoś \u00ABna miarę\u00BB \u2013 to miejsce jest dla ciebie. Zero nudy, tłumaczenie zawsze na czas. Nigdy nie czułam się tak zdyscyplinowana, jednocześnie doskonale się przy tej nauce bawiąc. A Nice Cup of Tea to prawdopodobnie najlepsza szkoła językowa w Polsce.",
    author: "Katarzyna Bonda",
    role: "Pisarka",
    image: "/images/testimonials/katarzyna-bonda.jpg",
  },
  {
    text: "Nauka, motywacja i wsparcie, brytyjski humor w cenie \u2013 nie ma drugiego takiego miejsca w Polsce. Anthony to skuteczny nauczyciel, a jednocześnie pasjonujący rozmówca. Jego wiedza i przenikliwe obserwacje sprawiają, że każda lekcja to inspirująca dyskusja.",
    author: "Małgorzata Szumowska",
    role: "Reżyserka",
    image: null,
  },
];

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div className="bg-second-bg border border-main/75 rounded-bl-[30px] rounded-tr-[30px] p-6 md:p-8 flex flex-col gap-5 h-full">
      <p className="font-fraunces font-normal text-base md:text-lg text-main leading-relaxed flex-1">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className={`relative size-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center ${t.image ? "bg-second-bg" : "bg-second-bg border-2 border-main/30"}`}>
          {t.image ? (
            <Image
              src={t.image}
              alt={t.author}
              fill
              sizes="48px"
              className="object-cover grayscale"
            />
          ) : (
            <span className="text-xl" aria-label="Director's chair">🎬</span>
          )}
        </div>
        <div>
          <p className="font-fraunces font-bold text-base md:text-lg text-main leading-tight">
            {t.author}
          </p>
          <p className="font-inter text-sm text-main/60">
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-scroll every 5s
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, current]);

  return (
    <section className="py-10 md:py-20 px-5 md:px-16 w-full bg-main-bg">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-8 md:gap-12">
        <SectionLabel label="TESTIMONIALS" title="What they say" labelColor="main" titleColor="main" />

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} t={t} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden flex flex-col gap-6">
          <div className="overflow-hidden rounded-bl-[30px] rounded-tr-[30px]">
            <div
              className="flex transition-transform duration-400 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.author} className="min-w-full px-0.5">
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots + arrows */}
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={prev}
              className="size-10 rounded-full border-2 border-main/40 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
              aria-label="Previous"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-main">
                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? "w-6 h-2.5 bg-accent" : "size-2.5 bg-main/20"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="size-10 rounded-full border-2 border-main/40 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
              aria-label="Next"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-main">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
  </div>
    </section>
  );
}
