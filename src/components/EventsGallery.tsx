import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type EventData = {
  key: string;
  title: string;
  cover: string;
  images: string[]; // plug in your real arrays here
};

const events: EventData[] = [
  {
    key: "external",
    title: "External Events",
    cover: "/Activation/Puja Activation - 4.jpeg",
    images: [
      "/Activation/Fabricator-30.jpeg",
      "/Activation/Fabricator-29.jpeg",
      "/Activation/Fabricator-24.jpeg",
      "/Activation/Fabricator-25.jpeg",
      "/Activation/Fabricator23.jpeg",
    ],
  },
  {
    key: "corporate",
    title: "Corporate Events",
    cover: "/Activation/Fabricator7.jpeg",
    images: [
      "/Activation/Fabricator5.jpeg",
      "/Activation/Fabricator6.jpeg",
      "/Activation/Fabricator10.jpeg",
      "/Activation/Fabricator8.jpeg",
      "/Activation/Fabricator9.jpeg",
        "/Activation/Fabricator11.jpeg",
          "/Activation/Fabricator13.jpeg",
            "/Activation/Fabricator-14.jpeg",
    ],
  },
  {
    key: "internal",
    title: "Internal Events",
    cover: "/Musical Event/Event (2).jpeg",
    images: [
       "/Kotak Event/Kotak (4).jpeg",
      "/Carlsberg/Carlsberg1.jpeg",
      "/Musical Event/Event (3).jpeg",
       "/Carlsberg/Carlsberg2.jpeg",
    ],
  },
];

function StackedGalleryModal({
  event,
  onClose,
}: {
  event: EventData;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = event.images.length;

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, goNext, goPrev]);

  // Offset of each card relative to the active one, wrapped to range [-2, 2]
  // so only up to 2 cards fan out on each side of the focused photo.
  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md animate-[fadeIn_0.25s_ease]" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 right-0 sm:right-2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors"
          aria-label="Close gallery"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-2 block">
            Event Gallery
          </span>
          <h3 className="text-3xl sm:text-5xl font-impact uppercase tracking-tight text-white">
            {event.title}
          </h3>
        </div>

        {/* Stacked fan carousel */}
        <div className="relative h-[280px] sm:h-[380px] md:h-[440px] flex items-center justify-center select-none">
          {event.images.map((src, index) => {
            const offset = getOffset(index);
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            // Only render cards within 2 positions of active to keep DOM light
            // and avoid visual clutter beyond what the reference fan shows.
            if (absOffset > 2) return null;

            const translateX = offset * 70; // px spacing between stacked cards, scales down via clamp below
            const rotate = offset * 8; // degrees of fan rotation
            const scale = isActive ? 1 : 1 - absOffset * 0.12;
            const zIndex = 10 - absOffset;
            const brightness = isActive ? 1 : 0.45;

            return (
              <button
                key={index}
                onClick={() => !isActive && setActiveIndex(index)}
                aria-label={`View photo ${index + 1}`}
                className="absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
                style={{
                  transform: `translateX(clamp(-160px, ${translateX}%, 160px)) rotate(${rotate}deg) scale(${scale})`,
                  zIndex,
                  filter: `brightness(${brightness})`,
                  pointerEvents: absOffset > 2 ? "none" : "auto",
                }}
              >
                <div
                  className={`bg-[#111] p-2 sm:p-3 rounded-xl shadow-2xl border ${
                    isActive ? "border-white/20" : "border-white/5"
                  }`}
                >
                  <div className="w-[160px] h-[200px] sm:w-[220px] sm:h-[280px] md:w-[260px] md:h-[330px] rounded-lg overflow-hidden bg-black/40">
                    <img
                      src={src}
                      alt={`${event.title} photo ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Nav arrows */}
        <button
          onClick={goPrev}
          className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label="Next photo"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        {/* Index dots */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-10">
          {event.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to photo ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function EventsGallery() {
  const [activeEvent, setActiveEvent] = useState<EventData | null>(null);

  return (
    <>
      <section className="py-40 relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.1" />
            <path d="M0,60 Q25,30 50,60 T100,60" fill="none" stroke="white" strokeWidth="0.1" />
            <path d="M0,40 Q25,10 50,40 T100,40" fill="none" stroke="white" strokeWidth="0.1" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="gsap-reveal mb-12">
            <span className="text-sm font-bold uppercase tracking-[0.3em] opacity-80 mb-4 block">
              We make every
            </span>
            <h2 className="text-[12vw] md:text-[10vw] font-impact leading-none uppercase tracking-tighter">
              Events
            </h2>
            <span className="text-3xl font-display italic opacity-60 mt-4 block">like:</span>
          </div>

          {/* ARC SMILE GRAPHIC */}
          <div className="relative mt-20 mb-32 flex justify-center items-center">
            <svg className="w-[300px] md:w-[600px] h-[100px] md:h-[200px]" viewBox="0 0 600 200">
              <path
                d="M50,50 Q300,250 550,50"
                fill="none"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                className="opacity-20"
              />
              <path
                className="events-smile-path"
                d="M50,50 Q300,250 550,50"
                fill="none"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              <circle cx="50" cy="50" r="10" fill="#FF4B2B" className="gsap-reveal" />
              <circle cx="200" cy="140" r="10" fill="#FFB400" className="gsap-reveal" />
              <circle cx="400" cy="140" r="10" fill="#00C9FF" className="gsap-reveal" />
              <circle cx="550" cy="50" r="10" fill="#2B32B2" className="gsap-reveal" />
            </svg>
          </div>

          {/* FAN IMAGES — now clickable to open the stacked gallery popup */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-0 mt-20 relative px-4">
            {events.map((evt, idx) => {
              const rotateClass =
                idx === 0
                  ? "md:-rotate-12 gsap-reveal-left"
                  : idx === 1
                  ? "z-20 md:scale-110 gsap-reveal"
                  : "md:rotate-12 gsap-reveal-right";

              return (
                <button
                  key={evt.key}
                  onClick={() => setActiveEvent(evt)}
                  className={`transform-gpu mb-8 md:mb-0 text-left cursor-pointer ${rotateClass}`}
                >
                  <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative group bg-black/20">
                    <img
                      src={evt.cover}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={evt.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                      <p
                        className={`text-2xl font-impact uppercase tracking-tight ${
                          idx === 2 ? "ml-8" : ""
                        }`}
                      >
                        {evt.title}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {activeEvent && (
        <StackedGalleryModal event={activeEvent} onClose={() => setActiveEvent(null)} />
      )}
    </>
  );
}