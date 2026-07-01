import { useState, useEffect } from "react";
import { X } from "lucide-react";

const projects = [

  {
    title: "ShyamSel Meet",
    category: "Fabricator Meet",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800",
    description: "Fabricator engagement and network meet.",
    gallery: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    title: "Havells Activity ",
    category: "Sales Activation",
    img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
    description: "Festive season sales activation across regions.",
    gallery: [
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    title: "jatra activation",
    category: "Sales Activation",
    img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
    description: "Festive season sales activation across regions.",
    gallery: [
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    title: "Kotak Event",
    category: "",
    img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
    description: "Festive season sales activation across regions.",
    gallery: [
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    ],
  },
          {
    title: "counch shell Blows event",
    category: "",
    img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
    description: "Festive season sales activation across regions.",
    gallery: [
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    title: "Too Yam Puja Activity",
    category: "",
    img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
    description: "Festive season sales activation across regions.",
    gallery: [
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    title: "Puja Branding",
    category: "Sales Activation",
    img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
    description: "Festive season sales activation across regions.",
    gallery: [
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    ],
  },
    {
    title: "ITC Wholesale Activity",
    category: "Sales Activation",
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=800",
    description: "Captured moments from our flagship activation.",
    gallery: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    title: "Dominos",
    category: "",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800",
    description: "On-ground promotion across upcountry markets.",
    gallery: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1496318447583-f524534e9ce1?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    title: "Autohood Branding",
    category: "",
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    description: "A flagship business summit built from the ground up.",
    gallery: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    title: "ITC Puja Activity",
    category: "Sales Activation",
    img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
    description: "Festive season sales activation across regions.",
    gallery: [
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    ],
  },
    {
    title: "Musical Event",
    category: "",
    img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
    description: "Festive season sales activation across regions.",
    gallery: [
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  {
    title: "puja activation",
    category: "",
    img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
    description: "Festive season sales activation across regions.",
    gallery: [
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    ],
  },

];

function GalleryModal({ project, onClose }: { project: (typeof projects)[number]; onClose: () => void }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const photos = project.gallery;

  // Each span is a multiple of a fixed base row height (set via grid-auto-rows below).
  // This is what prevents the dead-space gaps: spans always land on exact row boundaries,
  // there's no "guessing" combined height of neighboring cells.
  const layoutPattern = [
    { col: "col-span-2", row: "row-span-2" }, // big hero tile
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-2" }, // tall tile
    { col: "col-span-2", row: "row-span-1" }, // wide tile
    { col: "col-span-1", row: "row-span-1" },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 overflow-hidden"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.25s_ease]" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="no-scrollbar relative bg-[#F2F2F2] rounded-[32px] w-full max-w-5xl h-[90vh] overflow-y-scroll overscroll-contain shadow-2xl animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="bg-white rounded-[32px] m-2 p-6 sm:p-10">
          <div className="flex items-start justify-between mb-8 gap-6">
            <div>
              <span className="text-primary font-mono text-[10px] uppercase font-bold tracking-[0.2em] mb-2 block">
                {project.category}
              </span>
              <h3 className="text-4xl sm:text-5xl font-impact font-black leading-[0.9] tracking-tight uppercase text-[#0A0A0A]">
                {project.title}
              </h3>
            </div>
            <div className="flex items-start gap-6">
              <p className="hidden sm:block text-black/40 text-sm max-w-[220px] text-right pt-2">
                {project.description}
              </p>
              <button
                onClick={onClose}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors sticky top-0"
                aria-label="Close gallery"
              >
                <X className="w-5 h-5 text-black/70" />
              </button>
            </div>
          </div>

          {/* 
            Fixed grid-auto-rows (e.g. 140px) is the key change.
            row-span-2 now always equals exactly 2x that height + 1 gap, never a mismatch.
            grid-flow-dense fills any leftover holes by pulling later items up/left automatically.
          */}
          <div
            className="grid grid-cols-3 gap-3 sm:gap-4"
            style={{
              gridAutoRows: "140px",
              gridAutoFlow: "dense",
            }}
          >
            {photos.map((src, i) => {
              const layout = layoutPattern[i % layoutPattern.length];
              return (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl border border-black/5 group ${layout.col} ${layout.row}`}
                >
                  <img
                    src={src}
                    alt={`${project.title} photo ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function PortfolioGallery() {
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);

  return (
    <>
      <section id="projects" className="projects-container overflow-hidden bg-[#0A0A0A]">
        <div className="projects-wrapper h-screen flex items-center px-6 lg:px-24 gap-12">
          <div className="flex-shrink-0 w-[400px]">
            <span className="text-primary font-mono text-[10px] uppercase font-bold tracking-[0.2em] mb-4 block">
              // Portfolio
            </span>
            <h3 className="text-9xl font-impact font-black leading-[0.8] tracking-tighter mb-8 uppercase">
              FEATURED
              <br />
              <span className="text-outline italic">WORKS.</span>
            </h3>
            <p className="text-white/40 max-w-xs text-sm">
              Scroll horizontally to explore our tactical activations and events.
            </p>
          </div>

          {projects.map((project, idx) => (
            <button
              key={idx}
              onClick={() => setActiveProject(project)}
              className="project-card flex-shrink-0 w-[550px] h-[400px] relative group overflow-hidden rounded-[40px] border border-white/5 shadow-2xl text-left cursor-pointer"
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent p-12 flex flex-col justify-end">
                <span className="font-mono text-[10px] uppercase font-bold text-primary tracking-widest mb-2">
                  {project.category}
                </span>
                <h4 className="text-white text-5xl font-impact font-medium tracking-widest uppercase">
                  {project.title}
                </h4>
              </div>
            </button>
          ))}
        </div>
      </section>

      {activeProject && (
        <GalleryModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}