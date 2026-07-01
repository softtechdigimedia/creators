import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

type VideoProject = {
  key: string;
  name: string;
  thumbnail: string;
  videoSrc: string;
  meta?: string;
};

const videoProjects: VideoProject[] = [
  {
    key: "counch-shell",
    name: "Counch Shell Event",
    meta: "",
    thumbnail: "/photo/C0246T01.JPG",
    videoSrc: "/Video/C0331.mp4",
  },
  {
    key: "counch-shell-1",
    name: "Counch Shell Event-1",
    meta: "",
    thumbnail: "/photo/C0276T01.JPG",
    videoSrc: "/Video/C0336.mp4",
  },
  {
    key: "jatra",
    meta: "",
    name: "Jatra activation",
    thumbnail: "/Activation/Jatra- Activation-1.jpeg",
    videoSrc: "/Video/Jatra-5.mp4",
  },
  {
    key: "puja-activation",
    name: "Puja Activation",
    meta: "",
    thumbnail: "/Activation/Puja Activation - 8.jpeg",
    videoSrc: "/Video/Puja Activation - 9.mp4",
  },
  {
    key: "dominos",
    name: "Dominos ",
    meta: "",
    thumbnail: "/Dominos/Dominos3.jpeg",
    videoSrc: "/Video/Dominos (1).mp4",
  },
];

function VideoModal({ project, onClose }: { project: VideoProject; onClose: () => void }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);


  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-[fadeIn_0.25s_ease]" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)]"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors"
          aria-label="Close video"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="mb-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 block mb-1">
            {project.meta || "Selected Work"}
          </span>
          <h3 className="text-2xl sm:text-3xl font-impact uppercase tracking-tight text-white">
            {project.name}
          </h3>
        </div>

        <div className="rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl aspect-video">
          {project.videoSrc ? (
            <video
              src={project.videoSrc}
              poster={project.thumbnail}
              controls
              loop
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-full h-full object-cover opacity-60"
            />
          )}
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

const FRAME_HEIGHT = 280; // px height of each filmstrip frame — single source of truth for both CSS animation and JS timing
const SCROLL_DURATION = videoProjects.length * 2.5; // seconds for one full loop, ~2.5s per frame

export default function VideoShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Drives the highlighted list item on the static card, timed to roughly
  // match the pace of the CSS marquee animation below (2.5s per frame).
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % videoProjects.length);
    }, 2500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

 
  const loopedProjects = [...videoProjects, ...videoProjects];

  return (
    <>
      <section className="relative bg-[#0A0A0A] text-white py-32 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 lg:px-0">
          <div className="relative">
            {/* RIGHT — continuously scrolling filmstrip, masked top/bottom to fade frames in/out */}
            <div
              className="ml-auto w-full sm:w-[78%] h-[640px] sm:h-[720px] overflow-hidden relative"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
              }}
            >
              <div
                className="flex flex-col gap-4 absolute inset-x-0 top-0 animate-filmstrip"
                style={{
                  animationDuration: `${SCROLL_DURATION}s`,
                }}
              >
                {loopedProjects.map((project, idx) => (
                  <button
                    key={`${project.key}-${idx}`}
                    onClick={() => setActiveVideo(project)}
                    className="relative group rounded-2xl overflow-hidden border border-white/5 shadow-xl text-left cursor-pointer flex-shrink-0"
                    style={{ height: `${FRAME_HEIGHT}px` }}
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[12px] sm:border-l-[14px] border-l-black border-y-[8px] sm:border-y-[9px] border-y-transparent ml-1" />
                      </div>
                    </div>

                    <div className="md:hidden absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <span className="text-sm font-impact uppercase tracking-tight">{project.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* LEFT — fully static card, no sticky/scroll tracking, just timer-synced highlight */}
            <div className="hidden md:flex absolute top-0 left-0 h-full w-[55%] items-center pointer-events-none">
              <div className="relative bg-[#0A0A0A] border-2 border-white/90 rounded-[28px] px-10 py-12 shadow-2xl pointer-events-auto">
               

                <ul className="space-y-3 pl-6">
                  {videoProjects.map((project, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <li key={project.key}>
                        <button
                          onClick={() => setActiveVideo(project)}
                          className="text-left w-full group flex items-baseline gap-2"
                        >
                          <span
                            className={`font-display tracking-tight transition-colors duration-500 ${
                              isActive
                                ? "text-white text-lg font-semibold"
                                : "text-white/25 text-base group-hover:text-white/50"
                            }`}
                          >
                            {project.name}
                          </span>
                          {isActive && project.meta && (
                            <span className="text-[8px] tracking-[0.15em] uppercase text-white/40 whitespace-nowrap animate-[fadeIn_0.4s_ease]">
                              {project.meta}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile heading — card hidden below md, filmstrip still auto-plays */}
          <div className="md:hidden mt-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-2">
              Selected Work
            </span>
            <h2 className="text-3xl font-impact uppercase">{videoProjects[activeIndex]?.name}</h2>
          </div>
        </div>
      </section>

      {activeVideo && <VideoModal project={activeVideo} onClose={() => setActiveVideo(null)} />}

      <style>{`
        @keyframes filmstrip-scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        .animate-filmstrip {
          animation-name: filmstrip-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-filmstrip:hover {
          animation-play-state: paused;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}