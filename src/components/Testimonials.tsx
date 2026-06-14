"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import SectionLabel from "./SectionLabel";
import { useReducedMotion } from "./GsapProvider";

const testimonials = [
  {
    text: "Podejście do nauki i doskonalenia języka angielskiego jest w szkole anicecupoftea.pl na najwyższym poziomie. Zajęcia to nie tylko lekcje języka, to wszechstronnie kształcące spotkania, a to za sprawą różnorodnych i ciekawych materiałów dydaktycznych, ale także dzięki wyjątkowej osobowości samego założyciela szkoły, pana Anthony\u2019ego Goltza.",
    author: "Jan Kisielewski",
    role: "Marketing Strategy Director, Stratosfera by Deloitte",
    image: "/images/testimonials/jan-kisielewski.jpeg",
  },
  {
    text: "Z pełnym przekonaniem polecam współpracę z Anthonym. Jego sumienne i profesjonalne podejście do najtrudniejszych tłumaczeń i poprawek przyczyniło się do mojego sukcesu. Zarówno Anthony, jak również jego zespół, to ludzie najlepsi w swoim fachu. Podchodzą do sprawy rzeczowo i uczciwie. Są w pełni wykwalifikowani pod względem merytorycznym i otwarci na nową wiedzę oraz możliwości.",
    author: "Dr Joachim Popek",
    role: "Uniwersytet Rzeszowski",
    image: "/images/testimonials/joachim-popek.jpg",
  },
  {
    text: "Doceniam ogromne zaangażowanie, terminowość oraz niebywałą staranność. Jak mawiają Japończycy: \u00ABHerbata to dzieło sztuki i potrzebuje ręki mistrza, by wydobyć z niej najszlachetniejsze nuty\u00BB.",
    author: "Przemysław Kosiński",
    role: "Dr n. med",
    image: "/images/testimonials/przemyslaw-kosinski.png",
  },
  {
    text: "Znakomite tłumaczenia oraz solidny proofreading tekstów, otrzymywane zawsze na czas. Zatrudniony w firmie zespół native speakerów, znających również język polski, gwarantuje, że tekst będzie czymś znacznie więcej niż przekładem zdań \u2014 uwzględniać bowiem będzie specyfikę oraz kulturę języka angielskiego.",
    author: "Dr Aleksandra Oniszczuk",
    role: "Uniwersytet Warszawski",
    image: "/images/testimonials/aleksandra-oniszczuk.png",
  },
  {
    text: "Anthony zaoferował mi coś, co jest niedostępne nigdzie indziej w Warszawie. Ten przesmaczny przepis to angielski oksfordzkiej jakości i pewność, że drukowana przez nas gazeta i oficjalne dokumenty będą wolne od błędów. Anthony to ten typ nauczyciela, o którym pamiętasz po latach, bo nie chciałeś go rozczarować.",
    author: "Marek Tejchman",
    role: "Zastępca redaktora naczelnego, Dziennik Gazeta Prawna",
    image: "/images/testimonials/marek-tejchman.png",
  },
  {
    text: "Jeśli szukasz czegoś \u00ABna miarę\u00BB \u2013 to miejsce jest dla ciebie. Zero nudy, tłumaczenie zawsze na czas. Nigdy nie czułam się tak zdyscyplinowana, jednocześnie doskonale się przy tej nauce bawiąc. A Nice Cup of Tea to prawdopodobnie najlepsza szkoła językowa w Polsce.",
    author: "Katarzyna Bonda",
    role: "Pisarka",
    image: "/images/testimonials/katarzyna-bonda.jpg",
  },
  {
    text: "Nauka, motywacja i wsparcie, brytyjski humor w cenie \u2013 nie ma drugiego takiego miejsca w Polsce. Anthony to skuteczny nauczyciel, a jednocześnie pasjonujący rozmówca. Jego wiedza i przenikliwe obserwacje sprawiają, że każda lekcja to inspirująca dyskusja.",
    author: "Anna Gielewska",
    role: "Fellow, Uniwersytet Stanforda; Fundacja Reporterów",
    image: "/images/testimonials/anna-gielewska.png",
  },
  {
    text: "Mam poczucie bezpieczeństwa i pewność, że uczę się tego właściwego języka angielskiego, takiego bez skazy. Rewelacyjne jest dopasowanie do zainteresowań i potrzeb. Najcenniejsze jest dostosowanie do aktualnych oczekiwań \u2014 to naprawdę wartościowe, kiedy w nagłym przypadku można liczyć na pomoc i wsparcie. I jeszcze jedno \u2014 zaufanie.",
    author: "Marta Kielczyk",
    role: "Dziennikarka",
    image: "/images/testimonials/marta-kielczyk.png",
  },
];

// How many "behind" cards to show in the stack
const VISIBLE_BEHIND = 2;
const CARD_HEIGHT = 280;
const DEPTH_OFFSET = 12; // px horizontal offset per layer
const SCALE_STEP = 0.04; // scale reduction per layer
const Z_STEP = 80; // translateZ per layer

function getStackTransform(depth: number) {
  if (depth === 0) return { x: 0, scale: 1, z: 0, opacity: 1 };
  return {
    x: depth * DEPTH_OFFSET,
    scale: 1 - depth * SCALE_STEP,
    z: -depth * Z_STEP,
    opacity: Math.max(0, 1 - depth * 0.2),
  };
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimating = useRef(false);
  const reduced = useReducedMotion();

  // Get the visible indices for the stack (current + behind cards)
  const getVisibleIndices = useCallback(
    (activeIndex: number) => {
      const indices: number[] = [];
      for (let i = 0; i <= VISIBLE_BEHIND; i++) {
        indices.push((activeIndex + i) % testimonials.length);
      }
      return indices;
    },
    []
  );

  // Position cards in stack without animation (initial + after state change)
  const positionStack = useCallback(
    (activeIndex: number) => {
      const visible = getVisibleIndices(activeIndex);
      testimonials.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const depthIndex = visible.indexOf(i);
        if (depthIndex === -1) {
          gsap.set(el, { opacity: 0, zIndex: 0, x: 0, scale: 1 });
          return;
        }
        const t = getStackTransform(depthIndex);
        gsap.set(el, {
          x: t.x,
          scale: t.scale,
          opacity: t.opacity,
          zIndex: VISIBLE_BEHIND + 1 - depthIndex,
        });
      });
    },
    [getVisibleIndices]
  );

  // Initial positioning
  useEffect(() => {
    positionStack(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeSlide = useCallback(
    (direction: number) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const len = testimonials.length;
      const nextIndex =
        direction === 1
          ? (current + 1) % len
          : (current - 1 + len) % len;

      const frontCard = cardRefs.current[current];

      if (reduced || !frontCard) {
        setCurrent(nextIndex);
        positionStack(nextIndex);
        isAnimating.current = false;
        return;
      }

      // Prepare the new card that will appear at the back of the stack
      const newBackIndex = (nextIndex + VISIBLE_BEHIND) % len;
      const newBackCard = cardRefs.current[newBackIndex];
      if (newBackCard) {
        const backT = getStackTransform(VISIBLE_BEHIND + 1);
        gsap.set(newBackCard, {
          opacity: 0,
          x: backT.x,
          scale: backT.scale,
          zIndex: 0,
        });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrent(nextIndex);
          positionStack(nextIndex);
          isAnimating.current = false;
        },
      });

      // 1. Animate front card out (swipe away)
      tl.to(frontCard, {
        x: direction === 1 ? -120 : 120,
        opacity: 0,
        scale: 0.9,
        duration: 0.45,
        ease: "power3.in",
      });

      // 2. Shift remaining visible cards forward in the stack
      const currentVisible = getVisibleIndices(current);
      currentVisible.forEach((cardIndex, depth) => {
        if (depth === 0) return; // front card already handled
        const el = cardRefs.current[cardIndex];
        if (!el) return;

        const targetT = getStackTransform(depth - 1);
        tl.to(
          el,
          {
            x: targetT.x,
            scale: targetT.scale,
            opacity: targetT.opacity,
            zIndex: VISIBLE_BEHIND + 1 - (depth - 1),
            duration: 0.5,
            ease: "power2.out",
          },
          0.15
        );
      });

      // 3. Fade in new back card
      if (newBackCard) {
        const targetT = getStackTransform(VISIBLE_BEHIND);
        tl.to(
          newBackCard,
          {
            opacity: targetT.opacity,
            x: targetT.x,
            scale: targetT.scale,
            zIndex: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          0.2
        );
      }
    },
    [current, reduced, getVisibleIndices, positionStack]
  );

  const prev = () => changeSlide(-1);
  const next = () => changeSlide(1);

  const t = testimonials[current];

  return (
    <section className="flex gap-[10px] items-start py-20 px-16 w-full">
      {/* Left side */}
      <div className="flex-1 flex flex-col items-start">
        <SectionLabel label="TESTIMONIALS" title="What they say" />
        <div className="flex flex-col items-start justify-end pt-8 w-full max-w-[663px]">
          <div className="w-full">
            <div className="flex gap-4 items-center">
              <button
                onClick={prev}
                className="font-fraunces font-bold text-[48px] text-main cursor-pointer hover:opacity-70 transition-opacity leading-none"
              >
                &larr;
              </button>
              <button
                onClick={next}
                className="font-fraunces font-bold text-[48px] text-main cursor-pointer hover:opacity-70 transition-opacity leading-none"
              >
                &rarr;
              </button>
              <span className="font-inter text-sm text-main/50 ml-2">
                {current + 1} / {testimonials.length}
              </span>
            </div>
            <p className="font-fraunces font-bold text-[32px] text-main leading-normal mt-4">
              {t.author}
            </p>
            <p className="font-inter font-normal text-base text-main/70 leading-6">
              {t.role}
            </p>
          </div>
        </div>
      </div>

      {/* Right side: stacked cards */}
      <div
        ref={stackRef}
        className="relative w-[695px] shrink-0"
        style={{ minHeight: CARD_HEIGHT, perspective: "1000px" }}
      >
        {/* Static decorative card behind the stack */}
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-main-bg border-2 border-main rounded-[50px] p-9 w-full h-[90%] overflow-hidden"
          style={{ zIndex: 0 }}
        />

        {testimonials.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute inset-0 bg-main-bg border-2 border-main rounded-[50px] p-9 flex flex-col items-start justify-center gap-4"
            style={{
              minHeight: CARD_HEIGHT,
              height: "auto",
              transformOrigin: "center center",
              willChange: "transform, opacity",
              opacity: 0,
            }}
          >
            <div className="relative size-14 rounded-full overflow-hidden shrink-0 grayscale">
              <Image
                src={item.image}
                alt={item.author}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <p className="font-fraunces font-normal text-lg text-main text-justify leading-relaxed indent-20 flex-1">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
