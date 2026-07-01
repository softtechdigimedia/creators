import { useState, useEffect } from "react";
import { X } from "lucide-react";

const projects = [

  {
    title: "ShyamSel Meet",
    category: "Fabricator Meet",
    img: "/Activation/Fabricator22.jpeg",
    description: "Fabricator engagement and network meet.",
    gallery: [
      "/Activation/Fabricator-26.jpeg",
      "/Activation/Fabricator-20.jpeg",
      "/Activation/Fabricator-28.jpeg",
      "/Activation/Fabricator21.jpeg",
      "/Activation/Fabricator-20.jpeg",
    ],
  },
  {
    title: "Havells Activity ",
    category: "Sales Activation",
    img: "/Havells Activity/Havells (1).jpeg",
    description: "Festive season sales activation across regions.",
    gallery: [
      "/Havells Activity/Havells (1).jpeg",
      "/Havells Activity/Havells (2).jpeg",
      "/Havells Activity/Havells (3).jpeg",
      "/Havells Activity/Havells (4).jpeg",
   
    ],
  },

  {
    title: "Kotak Event",
    category: "",
    img: "/Kotak Event/Kotak (2).jpeg",
    description: "Festive season sales activation across regions.",
    gallery: [
      "/Kotak Event/Kotak (2).jpeg",
      "/Kotak Event/Kotak (1).jpeg",
      "/Kotak Event/Kotak (3).jpeg",
      "/Kotak Event/Kotak (4).jpeg",
    ],
  },
          {
    title: "counch shell Blows event",
    category: "",
    img: "/photo/C0299T01.JPG",
    description: "Festive season sales activation across regions.",
    gallery: [
      "/photo/C0278T01.JPG",
      "/photo/C0228T01.JPG",
      "/photo/C0218T01.JPG",
      "/photo/C0279T01.JPG",
      "/photo/C0232T01.JPG",
      "/photo/C0217T01.JPG",
      "/photo/C0276T01.JPG",
    ],
  },
  {
    title: "Too Yam Puja Activity",
    category: "",
    img: "/Too Yam Puja Activity/Too Yam Puja (2).jpeg",
    description: "Festive season sales activation across regions.",
    gallery: [
      "/Too Yam Puja Activity/Too Yam Puja (1).jpeg",
      "/Too Yam Puja Activity/Too Yam Puja (2).jpeg",
      "/Too Yam Puja Activity/Too Yam Puja (3).jpeg",
      "/Too Yam Puja Activity/Too Yam Puja (4).jpeg",
     
    ],
  },
  {
    title: "Puja Branding",
    category: "Sales Activation",
    img: "/Puja Branding/Puja Branding2.jpeg",
    description: "Festive season sales activation across regions.",
    gallery: [
       "/Puja Branding/Puja Branding5.jpeg",
      "/Puja Branding/Puja Branding1.jpeg",
      "/Puja Branding/Puja Branding3.jpeg",
      "/Puja Branding/Puja Branding4.jpeg",
     
    "/Puja Branding/Puja Branding2.jpeg",
    ],
  },
  //   {
  //   title: "ITC Wholesale Activity",
  //   category: "Sales Activation",
  //   img: "",
  //   description: "Captured moments from our flagship activation.",
  //   gallery: [
  //     "",
  //     "",
  //     "",
  //     "",
  //     "",
  //     "",
  //   ],
  // },
  {
    title: "Dominos",
    category: "",
    img: "/Dominos/Dominos1.jpeg",
    description: "On-ground promotion across upcountry markets.",
    gallery: [
      "/Dominos/Dominos1.jpeg",
      "/Dominos/Dominos2.jpeg",
      "/Dominos/Dominos3.jpeg",
  
    ],
  },
  {
    title: "Autohood Branding",
    category: "",
    img: "/Autohood Branding/Autohood.jpeg",
    description: "A flagship business summit built from the ground up.",
    gallery: [
      "/Autohood Branding/Autohood.jpeg",
      "/Autohood Branding/Autohood4.jpeg",
      "/Autohood Branding/Autohood2.jpeg",
      "/Autohood Branding/Autohood3.jpeg",
     
    ],
  },
  {
    title: "ITC Puja Activity",
    category: "Sales Activation",
    img: "/ITC Puja Activity/ITC Puja Activity (4).jpeg",
    description: "Festive season sales activation across regions.",
    gallery: [
      "/ITC Puja Activity/ITC Puja Activity (4).jpeg",
      "/ITC Puja Activity/ITC Puja Activity (1).jpeg",
      "/ITC Puja Activity/ITC Puja Activity (2).jpeg",
      "/ITC Puja Activity/ITC Puja Activity (3).jpeg",
      "/ITC Puja Activity/ITC Puja Activity (5).jpeg",
    
    ],
  },
    {
    title: "Musical Event",
    category: "",
    img: "/Musical Event/Event (3).jpeg",
    description: "Festive season sales activation across regions.",
    gallery: [
      "/Musical Event/Event (3).jpeg",
      "/Musical Event/Event (1).jpeg",
      "/Musical Event/Event (2).jpeg",
    
    ],
  },
      {
    title: "Puja Activation",
    category: "",
    img: "/Activation/Puja Activation - 8.jpeg",
    description: "Festive season sales activation across regions.",
    gallery: [
      "/Activation/Puja Activation - 8.jpeg",
      "/Activation/Puja Activation - 1.jpeg",
      "/Activation/Puja Activation - 4.jpeg",
      "/Activation/Puja Activation - 7.jpeg",
      "/Activation/Puja Activation -5.jpeg",
      "/Activation/Puja-Activation-6.jpeg",
      "/Activation/Puja Activation - 2.jpeg",
    ],
  },

     {
    title: "ITC CANTER",
    category: "Sales Activation",
    img: "/ITC CANTER/ITC Canter1.jpeg",
    description: "Festive season sales activation across regions.",
    gallery: [
      "/ITC CANTER/ITC Canter1.jpeg",
      "/ITC CANTER/ITC Canter2.jpeg",
      "/ITC CANTER/ITC Canter3.jpeg",
      "/ITC CANTER/ITC Canter4.jpeg",
      "/ITC CANTER/ITC Canter5.jpeg",
      "/ITC CANTER/ITC Canter6.jpeg",
      "",
    ],
  },
   {
    title: "mOVIE pROMOTION",
    category: "Promotion",
    img: "/Movie/Movie Campaign1.jpeg",
    description: "Festive season sales activation across regions.",
    gallery: [
      "/Movie/Movie Campaign1.jpeg",
      "/Movie/Movie Campaign2.jpeg",
      "/Movie/Movie Promotion1.jpeg",
      "/Movie/Movie Promotio2.jpeg",
    ],
  },
    {
    title: "jatra activation",
    category: "Sales Activation",
    img: "/Jatra/Jatra-1.jpeg",
    description: "Festive season sales activation across regions.",
    gallery: [
      "/Jatra/Jatra-1.jpeg",
      "/Jatra/Jatra - 2.jpeg",
      "/Jatra/Jatra-3.jpeg",
      "/Jatra/Jatra-7.jpeg",
      "/Jatra/Jatra-8.jpeg",
      "/Jatra/Jatra-6.jpeg",
      "",
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