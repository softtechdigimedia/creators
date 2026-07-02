import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar,  ArrowRight,  Trophy,  ExternalLink, Globe, 
} from 'lucide-react';
import { cn } from '../lib/utils';
import EventsGallery from '../components/EventsGallery';
import VideoShowcaseSection from '../components/VideoShowcaseSection';

export default function EventsPage({ onNavigateToContact }: { onNavigateToContact: () => void }) {
  const [activeTab, setActiveTab] = useState<'case-studies' | 'ips' | 'accolades'>('case-studies');

  const spotlights = [
    {
      title: "Upcountry Promotion & mobile activation",
      brand: "UltraTech Cement",
      tagline: "Taking the brand's promise and efficacy to the consumer in the last mile.",
      desc: "UTC briefed us seeking for an impactful BTL Activation, which would create visibility and noise in the target markets of Bihar and engage with the target consumers and educate them too. A branded mobile Van was taken for connecting with maximum locations and people with a team of Street Play artists for delivering the key communication messages in the most entertaining manner. We deployed other engagement platforms as well whereby consumers played games having subtly weaved brand messages and could win prizes!!",
      stats: [
        { label: "Days", value: "120 Days x 3 Vans" },
        { label: "Locations Covered", value: "360 Locations" },
        { label: "Direct Contacts", value: "5000+ Contacts" }
      ],
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800",
      accent: "from-yellow-500/10 to-transparent",
      borderColor: "border-yellow-500/20"
    },
    {
      title: "National Fabricator Meet",
      brand: "ShyamSel",
      tagline: "A strategic engagement initiative bringing together key fabricators on a single platform.",
      desc: "The meet aims to strengthen relationships, showcase ShyamSel roofing solutions, and create meaningful interactions through product insights, networking, and partner recognition. Designed as an engaging industry interaction, the event reinforces brand loyalty, encourages collaboration, and positions ShyamSel as a trusted partner within the roofing and fabrication ecosystem.",
      stats: [
        { label: "Scope", value: "National Meet" },
        { label: "Engagement", value: "B2B Channel Partners" },
        { label: "Outcome", value: "Deep Brand Loyalty" }
      ],
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800",
      accent: "from-orange-500/10 to-transparent",
      borderColor: "border-orange-500/20"
    },
    {
      title: "Mirchi Boombox Concert Series",
      brand: "Radio Mirchi & Royal Stag",
      tagline: "An electrifying night of music, energy, and unforgettable performances.",
      desc: "An immersive concert experience filled with powerful beats, vibrant vibes, and spectacular entertainment featuring top talent including Fossils, Armaan Malik, Dino James, Payal Dev, and DJ Sahil Gulati. Booked via leading platforms to scale lifestyle-based brand positioning in metro markets.",
      stats: [
        { label: "Event Type", value: "Mega Music IP" },
        { label: "Target", value: "Youth & Metros" },
        { label: "Partner", value: "Radio Mirchi" }
      ],
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=800",
      accent: "from-purple-500/10 to-transparent",
      borderColor: "border-purple-500/20"
    }
  ];

  const ips = [
    {
      name: "IP Event – “PLATFORM”",
      tagline: "Business meets Business &bull; Kolkata Chapter",
      link: "https://platform.ind.in",
      desc: "“Platform” marked a first-of-its-kind initiative that reshaped Bengal's entrepreneurial landscape. It brought together innovators, founders, and industry leaders in a vibrant Pitch Festival, where start-ups presented their breakthrough ideas, gained expert insights, and built visibility in a competitive ecosystem. The energy continued with a high-impact Business Networking Meet & Business Summit, featuring talk shows, panel discussions & fireside conversations with leading industry figures.",
      awardsText: "The event also celebrated excellence through the Entrepreneurship Excellence Awards, honouring standout start-ups and entrepreneurs for their innovative thinking and strong growth potential.",
      partnersText: "Partners & Support: “Platform” was powered by a wide network of partners — spanning television, radio, outdoor media, and influential business communities — whose support amplified the event’s reach and impact.",
      stats: [
        { label: "Established", value: "1st March 2025" },
        { label: "Venue", value: "Dhono Dhanyo Auditorium, Kolkata" },
        { label: "Core Focus", value: "Pitch, Summit & Awards" }
      ]
    }
  ];

  const accolades = [
    {
      title: "UltraTech Cement – Mobile Theatre Activation",
      awardName: "Award-Winning Regional Marketing Initiative",
      description: "The Mobile Theatre activity received exceptional appreciation from both internal stakeholders and external audiences. The initiative was professionally filmed and documented, enabling strong post-campaign visibility.",
      nomination: "Nominated for three categories at the MAA Awards by AdGully (2023–24).",
      achievement: "Secured the Gold Trophy under “Best Regional Marketing Collaboration”, earning recognition in front of the crème de la crème of the corporate fraternity.",
      icon: <Trophy className="w-10 h-10 text-primary animate-bounce" />
    }
  ];

  return (
    <div className="pt-28 pb-32 relative text-white bg-black selection:bg-primary selection:text-black">

      <EventsGallery />

<VideoShowcaseSection />
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-[#200F3C]/20 via-transparent to-transparent -z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-[600px] h-[600px] bg-primary/5 blur-[180px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* HERO HEADER */}
        <div className="mb-24 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-8"
          >
            <Calendar size={10} className="text-primary" /> EXPERIENTIAL IP & ON-GROUND
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-impact font-medium leading-none uppercase tracking-tighter mb-8"
          >
            EXPERIENCE <span className="text-outline">THAT</span><br />
            STRIKES <span className="text-primary italic">ON-GROUND.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            From award-winning upcountry mobile theatre campaigns for UltraTech to elite business IP networking summits like Platform, we specialize in high-impact brand activations.
          </motion.p>
        </div>

        {/* CONTROLS & NAVIGATION TABS */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/5 p-1.5 rounded-full border border-white/10 flex gap-2">
            {[
              { id: 'case-studies', label: 'Case Studies' },
              { id: 'ips', label: 'Intellectual Properties (IP)' },
              { id: 'accolades', label: 'Accolades' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer",
                  activeTab === tab.id 
                    ? "bg-primary text-black shadow-lg" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
   

        {/* DYNAMIC CONTENT CONTAINER */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'case-studies' && (
              <motion.div
                key="case-studies"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                {spotlights.map((study, idx) => (
                  <div 
                    key={idx}
                    className={cn(
                      "bg-gradient-to-br border rounded-[45px] p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12",
                      study.accent, study.borderColor
                    )}
                  >
                    {/* Visual Media Block */}
                    <div className="w-full lg:w-[40%] aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 relative group shrink-0">
                      <img 
                        src={study.image} 
                        alt={study.title} 
                        className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-white/10 px-4 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest text-primary">
                        {study.brand}
                      </div>
                    </div>

                    {/* Content Detail Block */}
                    <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                        <span className="text-primary font-mono text-[10px] uppercase font-bold tracking-[0.2em] block">// Milestone Activation</span>
                        <h2 className="text-3xl md:text-4xl font-impact uppercase tracking-tight text-white leading-tight">
                          {study.title}
                        </h2>
                        <p className="text-sm font-semibold text-white/80 font-mono italic">
                          &ldquo;{study.tagline}&rdquo;
                        </p>
                      </div>

                      <div className="h-[1px] bg-white/5 w-full" />

                      <p className="text-white/40 text-xs md:text-sm leading-relaxed">
                        {study.desc}
                      </p>

                      {/* On-ground stats container */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                        {study.stats.map((stat, sIdx) => (
                          <div key={sIdx}>
                            <h5 className="text-[9px] font-mono text-white/30 uppercase tracking-widest leading-none mb-1">
                              {stat.label}
                            </h5>
                            <p className="text-xs sm:text-sm font-bold text-white uppercase font-sans">
                              {stat.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'ips' && (
              <motion.div
                key="ips"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {ips.map((ip, idx) => (
                  <div 
                    key={idx}
                    className="bg-white/[0.01] border border-white/5 p-8 md:p-16 rounded-[45px] relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                    <div className="space-y-8 max-w-5xl">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="space-y-2">
                          <span className="text-primary font-mono text-xs uppercase font-bold tracking-[0.2em] block">// Elite Proprietory IP</span>
                          <h2 className="text-4xl md:text-5xl font-impact uppercase tracking-tight text-white leading-none">
                            {ip.name}
                          </h2>
                          <div className="text-sm font-mono text-white/40 uppercase tracking-wider" dangerouslySetInnerHTML={{ __html: ip.tagline }} />
                        </div>
                        <a 
                          href={ip.link} 
                          target="_blank" 
                          referrerPolicy="no-referrer"
                          className="bg-primary hover:bg-white text-black font-black uppercase text-[10px] tracking-widest px-6 py-3 rounded-xl flex items-center gap-2 transition-colors duration-300 shadow-[0_0_20px_rgba(255,210,0,0.1)] shrink-0 cursor-pointer"
                        >
                          <Globe size={14} /> Visit IP Web
                          <ExternalLink size={12} />
                        </a>
                      </div>

                      <div className="h-[1px] bg-white/5 w-full" />

                      <p className="text-white/60 text-base leading-relaxed font-sans">
                        {ip.desc}
                      </p>

                      <div className="grid md:grid-cols-2 gap-8 pt-4">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                          <span className="text-xs font-mono font-black text-primary uppercase tracking-widest block">Excellence Recognition</span>
                          <p className="text-white/50 text-xs leading-relaxed">
                            {ip.awardsText}
                          </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                          <span className="text-xs font-mono font-black text-primary uppercase tracking-widest block">Partners & Support Network</span>
                          <p className="text-white/50 text-xs leading-relaxed">
                            {ip.partnersText}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
                        {ip.stats.map((stat, sIdx) => (
                          <div key={sIdx}>
                            <h5 className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none mb-2">
                              {stat.label}
                            </h5>
                            <p className="text-base sm:text-lg font-impact text-white uppercase">
                              {stat.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'accolades' && (
              <motion.div
                key="accolades"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {accolades.map((award, idx) => (
                  <div 
                    key={idx}
                    className="bg-gradient-to-r from-[#110825] to-[#0A0514] border border-primary/20 p-8 md:p-16 rounded-[45px] relative overflow-hidden"
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                    
                    <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
                      <div className="lg:col-span-3 flex flex-col items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/10 text-center space-y-4">
                        {award.icon}
                        <div>
                          <span className="text-primary font-mono text-[9px] uppercase tracking-widest font-black block">// MAA AWARDS</span>
                          <p className="text-white font-mono text-xs uppercase font-bold tracking-wider leading-none mt-1">By AdGully</p>
                        </div>
                      </div>

                      <div className="lg:col-span-9 space-y-6">
                        <div className="space-y-1">
                          <span className="text-primary font-mono text-xs uppercase font-bold tracking-[0.2em] block">// Gold Trophy Winner</span>
                          <h2 className="text-3xl md:text-5xl font-impact uppercase tracking-tight text-white leading-none">
                            {award.title}
                          </h2>
                          <p className="text-sm font-bold text-white/80 font-mono mt-1">
                            {award.awardName}
                          </p>
                        </div>

                        <div className="h-[1px] bg-white/5 w-full" />

                        <p className="text-white/60 text-sm leading-relaxed font-sans">
                          {award.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 pt-2">
                          <div className="flex gap-3 items-start p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="text-primary font-black text-sm">✓</span>
                            <p className="text-xs text-white/50 leading-relaxed font-mono">
                              <strong>Nomination:</strong> {award.nomination}
                            </p>
                          </div>
                          <div className="flex gap-3 items-start p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="text-emerald-400 font-black text-sm">🏆</span>
                            <p className="text-xs text-white/50 leading-relaxed font-mono">
                              <strong>Result:</strong> {award.achievement}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CROWD-PULLING CALL TO ACTION */}
        <div className="border-t border-white/5 pt-32 text-center max-w-4xl mx-auto mt-20">
          <span className="text-primary font-mono text-xs uppercase font-bold tracking-[0.2em] mb-6 block">// Launch Your Experience</span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-impact text-white uppercase tracking-tighter leading-tight mb-8">
            SCALE ON-GROUND <br />
            & DISTRIBUTE <span className="text-outline">DYNAMICALLY.</span>
          </h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto mb-12 leading-relaxed">
            Contact us to engineer customized on-ground prompts, regional fabricator meets, or corporate activation platforms built to convert.
          </p>
          <button 
            onClick={onNavigateToContact}
            className="bg-primary hover:bg-white text-black py-5 px-10 rounded-full font-black uppercase text-xs tracking-widest inline-flex items-center gap-2 transition-all duration-300 shadow-[0_0_30px_rgba(255,210,0,0.15)]"
          >
            Schedule a Consultation
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
