
import { motion } from 'motion/react';
import {  Target, ArrowRight, Zap,  Compass, Eye } from 'lucide-react';

export default function AboutPage({ onNavigateToContact }: { onNavigateToContact: () => void }) {
  
  const directors = [
    {
      name: "Sunando Chakraborty",
      title: "Co-Founder & Director",
      experience: "15+ Years",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
      bio: "Sunando Chakraborty is a seasoned marketing leader with 15+ years of experience in business development, client strategy, and brand integration. He has worked with renowned brands such as ABP Group, Radio Mirchi, Reliance Communications, Mahuaa Bangla, Mongia Steel and others, driving high-impact marketing initiatives. As the co-founder & director of Crea8ors, he has spearheaded milestone projects including rural Jatra activations across Bengal & Assam and the exclusive IP 'Platform'. A passionate storyteller and brand enthusiast, Sunando continues to explore emerging trends in branding, communication, and entrepreneurship."
    },
    {
      name: "Shubhadeep Sarkaar",
      title: "Co-Founder & Director",
      experience: "15+ Years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
      bio: "Shubhadeep Sarkaar brings 15+ years of sales and marketing expertise across leading media groups like India Today, Mahuaa Media, Focus TV and Epic Media. His entrepreneurial journey in Bengali movie marketing set new benchmarks in film activations and brand integrations for leading production houses including SVF, Raj Chakraborty Films, Dev Entertainment and more. He has successfully executed large-scale Jatra activations in Bengal and Assam, influencing regional brand outreach. His dynamic problem-solving approach and constant pursuit of innovation remain the core of Crea8ors’ creative strength."
    }
  ];

  const strengths = [
    "Activations",
    "Events",
    "Branded Content",
    "Intellectual Property (IP)",
    "Digital Marketing",
    "Creative Design"
  ];

  return (
    <div className="pt-28 pb-32 relative text-white bg-black selection:bg-primary selection:text-black">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#200F3C]/20 via-transparent to-transparent -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-primary/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* HERO HEADER - THE JOURNEY (SLIDE 2) */}
        <div className="mb-32 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-8"
          >
            <Compass size={10} className="text-primary" /> OUR JOURNEY
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-impact font-medium leading-none uppercase tracking-tighter mb-8"
          >
            THE ROAD TO <span className="text-primary italic">BRAND DOMINANCE.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed space-y-6"
          >
            <p>
              Crea8ors is a dynamic marketing and branding agency crafting impactful brand experiences across diverse sectors.
            </p>
            <p className="text-sm text-white/40 max-w-2xl mx-auto">
              We specialise in experiential marketing, rural activations, regional in-film associations, brand engagement, creative design, branded content, events and production.
            </p>
            <div className="pt-6 font-mono text-xs uppercase tracking-[0.2em] text-primary font-bold">
              Our focus is simple &mdash; <span className="text-white">innovative ideas</span>, <span className="text-white">meaningful engagement</span>, <span className="text-white">measurable growth</span>.
            </div>
          </motion.div>
        </div>

        {/* MISSION & VISION (SLIDE 3) */}
        <div className="grid md:grid-cols-2 gap-8 mb-40">
          <div className="bg-gradient-to-br from-[#0C0616] to-[#05010A] border border-white/5 p-10 md:p-16 rounded-[40px] relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold block">// Core Drive</span>
              <h2 className="text-3xl md:text-4xl font-impact uppercase tracking-tight text-white">
                OUR MISSION
              </h2>
              <p className="text-white/60 text-base leading-relaxed">
                To build innovative, effective and impactful brand solutions that exceed expectations and drive business growth.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#050C0A] to-black border border-white/5 p-10 md:p-16 rounded-[40px] relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">// The Horizon</span>
              <h2 className="text-3xl md:text-4xl font-impact uppercase tracking-tight text-white">
                OUR VISION
              </h2>
              <p className="text-white/60 text-base leading-relaxed">
                To become a leading creative force recognised for strategic thinking, transformative ideas, and unwavering dedication to client success.
              </p>
            </div>
          </div>
        </div>

        {/* LEADERSHIP & DIRECTORS (SLIDES 4 & 5) */}
        <div className="mb-40">
          <div className="mb-16 text-center md:text-left">
            <span className="text-primary font-mono text-xs uppercase font-bold tracking-[0.2em] block mb-2">// The Brains behind Crea8ors</span>
            <h2 className="text-4xl md:text-7xl font-impact uppercase tracking-tight text-white">
              OUR <span className="text-primary italic">DIRECTORS</span>
            </h2>
            <p className="text-white/40 text-sm max-w-xl mt-2">
              Seasoned leaders bringing together decades of sales, movie integration, and on-ground activations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {directors.map((director, idx) => (
              <div 
                key={idx}
                className="bg-white/[0.01] border border-white/5 rounded-[40px] overflow-hidden flex flex-col justify-between hover:border-white/15 transition-all duration-500 group"
              >
                <div>
                  {/* Photo area with modern overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={director.image} 
                      alt={director.name}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-8 right-8">
                      <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block mb-1">
                        {director.title}
                      </span>
                      <h3 className="text-3xl font-impact text-white uppercase tracking-tight leading-none">
                        {director.name}
                      </h3>
                    </div>
                  </div>

                  {/* Biography */}
                  <div className="p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                        Senior Leadership
                      </span>
                      <span className="text-[10px] font-mono uppercase text-primary font-bold">
                        {director.experience} Industry Expertise
                      </span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {director.bio}
                    </p>
                  </div>
                </div>

                {/* Director Footer accent */}
                <div className="border-t border-white/5 px-8 md:px-10 py-6 bg-white/[0.01] flex justify-between items-center">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Crea8ors Leadership Team</span>
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CORE STRENGTHS (SLIDE 6) */}
        <div className="mb-40 py-24 px-8 md:px-16 bg-[#0B0C10] rounded-[50px] border border-white/5 relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-primary font-mono text-xs uppercase font-bold tracking-[0.2em] block">// Competitive Edge</span>
              <h2 className="text-4xl md:text-6xl font-impact uppercase tracking-tight text-white leading-none">
                OUR CORE <br/>
                <span className="text-primary italic">STRENGTHS</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                By maintaining absolute control over our planning and execution channels, we scale activations with zero service degradation.
              </p>
              <div className="h-[2px] w-20 bg-primary rounded" />
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {strengths.map((strength, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-impact text-primary/40 group-hover:text-primary font-black transition-colors">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                      {strength}
                    </h3>
                  </div>
                  <Zap className="w-4 h-4 text-primary/20 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* THE CREA8ORS CREED */}
        <div className="border-t border-white/5 pt-32 text-center max-w-4xl mx-auto">
          <span className="text-primary font-mono text-xs uppercase font-bold tracking-[0.2em] mb-6 block">// Align Your Brand</span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-impact text-white uppercase tracking-tighter leading-tight mb-8">
            READY TO CO-CREATE <br />
            THE NEXT <span className="text-primary italic">MILESTONE?</span>
          </h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto mb-12 leading-relaxed">
            Get in touch with Sunando, Shubhadeep, and our growth strategists to map out a high-recall activation roadmap.
          </p>
          <button 
            onClick={onNavigateToContact}
            className="bg-primary hover:bg-white text-black py-5 px-10 rounded-full font-black uppercase text-xs tracking-widest inline-flex items-center gap-2 transition-all duration-300 shadow-[0_0_30px_rgba(255,210,0,0.15)]"
          >
            Connect with Crea8ors
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
