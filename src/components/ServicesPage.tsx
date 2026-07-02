import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight,  Zap,  Check, 
   Eye, MessageSquare, Heart, ShieldCheck 
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ServicesPage({ onNavigateToContact }: { onNavigateToContact: () => void }) {
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  const digitalMarketingServices = [
    "SEM (Search Engine Marketing)",
    "SEO (Search Engine Optimization)",
    "ASO (App Store Optimization)",
    "Website Development",
    "Competitor Analysis",
    "Content Marketing",
    "Email Marketing",
    "Online Lead Generation",
    "Influencer Marketing"
  ];

  const brandEngagementAreas = [
    {
      num: "1",
      title: "Corporate brand launch events",
      desc: "Immersive high-impact launches that position your brand perfectly in front of key stakeholders."
    },
    {
      num: "2",
      title: "Corporate Activations",
      desc: "Tailored experiential campaigns designed to engage corporate workforces and premium demographics."
    },
    {
      num: "3",
      title: "Durga Puja and Festival brand experience",
      desc: "Massive scale, highly emotional seasonal brand hubs connecting with millions during key festivals."
    },
    {
      num: "4",
      title: "Annual Dealer Conferences and Expos",
      desc: "Strengthen channel networks, showcase product catalogs, and align dealer incentives with professional execution."
    },
    {
      num: "5",
      title: "Rural activations through Jatra & Mobile Theatre",
      desc: "Direct physical brand touchpoints with rural markets via traditional storytelling formats in Bengal & Assam."
    },
    {
      num: "6",
      title: "In-film branding and marketing association",
      desc: "Surgical cinematic integrations weaving your brand's efficacy natively into leading films."
    }
  ];

  const benefits = [
    {
      title: "Brand Impression",
      tagline: "Repeated Perceptive Impression",
      icon: <Eye className="w-6 h-6 text-primary" />,
      color: "from-pink-500/10 to-transparent",
      borderColor: "border-pink-500/20",
      accentColor: "bg-pink-500",
      desc: "Establish a constant, top-of-mind visual and cognitive presence. Our designs and activation banners build high-recall familiarity across targeted high-traffic zones and media streams."
    },
    {
      title: "Brand Conversation",
      tagline: "Continuous Brand Conversation",
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      color: "from-orange-500/10 to-transparent",
      borderColor: "border-orange-500/20",
      accentColor: "bg-orange-500",
      desc: "Move from static listening to active engagement. We curate interactive campaigns and social-first outreach programs that make your audience actively discuss and share your brand's story."
    },
    {
      title: "Brand Engagement",
      tagline: "Closeness & Genuine Engagement",
      icon: <Heart className="w-6 h-6 text-primary" />,
      color: "from-purple-500/10 to-transparent",
      borderColor: "border-purple-500/20",
      accentColor: "bg-purple-500",
      desc: "It’s all about emotional closeness and genuine alignment. By pairing physical activations with community-focused campaigns, we turn passive target groups into loyal advocates."
    },
    {
      title: "Brand Immersion",
      tagline: "Increases the Brand Perception",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      color: "from-emerald-500/10 to-transparent",
      borderColor: "border-emerald-500/20",
      accentColor: "bg-emerald-500",
      desc: "Envelop your consumers in fully-realized environments. Whether through massive-scale Jatra pavilions or custom digital products, we craft complete brand ecosystems."
    }
  ];

  return (
    <div className="pt-28 pb-32 relative text-white bg-black selection:bg-primary selection:text-black">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#200F3C]/20 via-transparent to-transparent -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-primary/5 blur-[180px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* HERO SECTION */}
        <div className="mb-32 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-8"
          >
            <Zap size={10} className="text-primary" /> OUR SERVICES
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-impact font-medium leading-none uppercase tracking-tighter mb-8"
          >
            INNOVATE. <span className="text-primary italic">ENGAGE.</span><br />
            OPTIMISE. <span className="text-outline">DELIVER.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Crea8ors is a dynamic marketing and branding agency crafting impactful brand experiences across diverse sectors. We blend high-recall experiential marketing with result-driven digital engines.
          </motion.p>
        </div>

        {/* SECTION 1: DIGITAL MARKETING (SLIDE 17) */}
        <div className="mb-40 grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-8">
            <span className="text-primary font-mono text-xs uppercase font-bold tracking-[0.2em] block">// Results-Driven Marketing</span>
            <h2 className="text-4xl md:text-6xl font-impact uppercase tracking-tight text-white leading-none">
              STRATEGIC <br/><span className="text-primary italic">DIGITAL MARKETING</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed">
              We partner with you to build a complete digital marketing strategy focused on <strong className="text-white font-bold">measurable ROI</strong>. No generic agency fluff or vanity metrics. 
            </p>
            <div className="bg-white/[0.02] border-l-4 border-primary p-6 rounded-r-2xl space-y-2">
              <span className="text-xs font-mono uppercase font-black text-primary tracking-widest block">Core Business Pricing Innovation:</span>
              <p className="text-sm font-bold text-white uppercase tracking-tight">
                We follow a results-based pricing model — <span className="text-primary underline decoration-2">you pay for outcomes, not hours</span>.
              </p>
              <p className="text-white/40 text-xs mt-2">
                This ensures every single rupee invested delivers a positive ROI while saving you time, effort, and unnecessary marketing spend.
              </p>
            </div>
            <p className="text-white/40 text-sm">
              By bringing together all key digital platforms, we craft custom, performance-driven solutions that support your growth and scale your business efficiently.
            </p>
            <button 
              onClick={onNavigateToContact}
              className="bg-primary hover:bg-white text-black font-black uppercase text-xs tracking-widest px-8 py-4 rounded-2xl flex items-center gap-2 transition-all duration-300 shadow-[0_0_30px_rgba(255,210,0,0.15)] group"
            >
              Get ROI Audit Roadmap
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-8 pb-4 border-b border-white/5 font-mono text-center lg:text-left">
              Our Integrated Services Cover:
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {digitalMarketingServices.map((service, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Check size={12} />
                  </div>
                  <span className="text-white/80 text-xs font-semibold uppercase tracking-wide font-mono leading-tight">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: CREATIVE DESIGN & PHILOSOPHY (SLIDE 18) */}
        <div className="mb-40 py-24 px-8 md:px-16 bg-gradient-to-r from-[#110825] to-[#050C0A] rounded-[50px] border border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <span className="text-primary font-mono text-xs uppercase font-bold tracking-[0.25em] block">// Creative Philosophy</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-impact uppercase tracking-tight text-white leading-tight">
              &ldquo;No idea is worth its salt unless it <br/>
              <span className="text-primary italic">sounds absurd</span> in the beginning.&rdquo;
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-white/60 text-lg sm:text-xl font-medium tracking-wide max-w-3xl mx-auto leading-relaxed">
              It is in this <strong className="text-primary">controlled absurdities</strong> that we measure out the realities of life. 
              This frees us from the limitations of convention and the straightjacketing of thoughts.
            </p>
            <p className="text-white/40 text-sm uppercase tracking-[0.2em] font-mono">
              We are free to explore to ideate and to implement &bull; <span className="text-white font-bold">we are unlimited!</span>
            </p>
          </div>
        </div>

        {/* SECTION 3: BRAND ENGAGEMENT (SLIDE 7) */}
        <div className="mb-40">
          <div className="mb-16">
            <span className="text-primary font-mono text-xs uppercase font-bold tracking-[0.2em] block mb-2">// On-Ground Integration</span>
            <h2 className="text-4xl md:text-7xl font-impact uppercase tracking-tight text-white">
              BRAND <span className="text-primary italic">ENGAGEMENT</span> EXPERIENCES
            </h2>
            <p className="text-white/40 text-base max-w-2xl mt-4">
              We specialize in creating on-ground activation benchmarks that build genuine connection, especially across media-dark districts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandEngagementAreas.map((area, index) => (
              <div 
                key={index} 
                className="bg-white/[0.01] border border-white/5 hover:border-primary/20 hover:bg-white/[0.02] p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <div className="text-4xl font-impact text-outline-thin text-transparent group-hover:text-primary transition-colors duration-300 font-bold">
                    {area.num.padStart(2, '0')}
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-white font-sans leading-snug">
                    {area.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed font-mono">
                    {area.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bengal & Assam Jatra Spotlight card */}
          <div className="mt-12 bg-gradient-to-br from-[#0C1A14] to-black border border-emerald-500/10 p-8 md:p-12 rounded-[35px] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-500/20">
                Milestone Rural Outreach
              </span>
              <h3 className="text-2xl font-impact uppercase tracking-tight text-white">
                RURAL JATRA & MOBILE THEATRE BENCHMARKS
              </h3>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                We have created milestone integrated engagements with the traditional Jatra shows in both <strong className="text-white">Bengal</strong> and <strong className="text-white">Assam</strong> which have helped our clients reach out directly to their target groups in the media-dark areas of districts across states.
              </p>
            </div>
            <button 
              onClick={onNavigateToContact}
              className="bg-white hover:bg-primary hover:text-black text-black px-6 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest shrink-0 transition-colors cursor-pointer"
            >
              Explore Rural Solutions
            </button>
          </div>
        </div>

        {/* SECTION 4: HOW DOES YOUR BRAND BENEFIT (SLIDE 25) */}
        <div className="border-t border-white/5 pt-32">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-mono text-xs uppercase font-bold tracking-[0.2em] block mb-2">// Business Value</span>
            <h2 className="text-4xl md:text-6xl font-impact uppercase tracking-tight text-white leading-none">
              HOW DOES YOUR <br/><span className="text-primary italic">BRAND BENEFIT?</span>
            </h2>
            <p className="text-white/40 text-xs sm:text-sm mt-4 uppercase tracking-widest font-mono">
              The four stages of modern brand capital development
            </p>
          </div>

          {/* Interactive Benefit Grid / Carousel */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-4 flex flex-col gap-3">
              {benefits.map((benefit, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPillar(idx)}
                  className={cn(
                    "p-6 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between group",
                    selectedPillar === idx 
                      ? "bg-white/5 border-primary shadow-lg shadow-primary/5" 
                      : "bg-transparent border-white/5 hover:border-white/20"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className={cn("w-2 h-2 rounded-full", selectedPillar === idx ? "bg-primary animate-ping" : "bg-white/20")} />
                    <div>
                      <h4 className={cn("text-xs font-bold uppercase tracking-wider font-mono", selectedPillar === idx ? "text-primary" : "text-white")}>
                        {benefit.title}
                      </h4>
                      <p className="text-[10px] text-white/30 truncate max-w-[200px]">{benefit.tagline}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className={cn("transition-transform group-hover:translate-x-1", selectedPillar === idx ? "text-primary" : "text-white/30")} />
                </button>
              ))}
            </div>

            <div className="lg:col-span-8">
              <div className={cn(
                "h-full rounded-3xl p-8 md:p-12 border bg-gradient-to-br transition-all duration-500 flex flex-col justify-between relative overflow-hidden",
                benefits[selectedPillar].borderColor,
                benefits[selectedPillar].color
              )}>
                {/* Visual Circle Representation */}
                <div className="absolute -right-20 -bottom-20 w-80 h-80 border border-white/5 rounded-full flex items-center justify-center pointer-events-none opacity-30">
                  <div className="w-64 h-64 border border-white/5 rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 border border-white/10 rounded-full flex items-center justify-center">
                      <div className={cn("w-8 h-8 rounded-full blur-xl", benefits[selectedPillar].accentColor)} />
                    </div>
                  </div>
                </div>

                <div className="space-y-6 relative z-10 max-w-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {benefits[selectedPillar].icon}
                    </div>
                    <div>
                      <span className="text-primary font-mono text-[9px] uppercase tracking-[0.2em] font-bold block">// Benefit Stage</span>
                      <h3 className="text-2xl font-impact uppercase tracking-wide text-white">
                        {benefits[selectedPillar].title}
                      </h3>
                    </div>
                  </div>

                  <div className="h-[1px] bg-white/5 w-full" />

                  <span className="text-sm font-mono uppercase font-black tracking-widest text-primary block">
                    {benefits[selectedPillar].tagline}
                  </span>

                  <p className="text-white/60 text-base leading-relaxed">
                    {benefits[selectedPillar].desc}
                  </p>
                </div>

                <div className="mt-12 relative z-10">
                  <button 
                    onClick={onNavigateToContact}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-white hover:text-primary hover:border-primary transition-all pb-1"
                  >
                    Integrate into Your Funnel <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ChevronRight({ className, size }: { className?: string; size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
