import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Mail,  Award, CheckCircle2, Menu, X, ExternalLink, Zap, Target, Palette,  Search, BarChart3, Video, Users, ShoppingBag, Globe, Smile, ChevronLeft, ChevronRight, ArrowUp, MessageCircle } from 'lucide-react';
import Lenis from 'lenis';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import PortfolioGallery from './components/PortfolioGallery';
import EventsGallery from './components/EventsGallery';
import VideoShowcaseSection from './components/VideoShowcaseSection';


gsap.registerPlugin(ScrollTrigger);
const clients = [
  { name: 'Senco Gold',     img: '/clients/senco.png' },
  { name: 'Wow Momo',       img: '/clients/Wow.jpg' },
  { name: 'UltraTech',      img: '/clients/ultra.png' },
  { name: 'IDFC First',     img: '/clients/IDFC.png' },
  { name: 'Lux',            img: '/clients/lux.jpg' },
  { name: 'Mirchi',         img: '/clients/Radiomirchi.jpg' },
  { name: 'Sony',           img: '/clients/Sony.png' },
  { name: 'ITC Limited',    img: '/clients/ITC.png' },
  { name: 'Ambuja Neotia',  img: '/clients/ambuja.jpg' },
  { name: 'Bangur Cement',  img: '/clients/bangur.jpg' },
    { name: 'keo karpin',  img: '/clients/keokarpin.webp' },
      { name: 'dava india',  img: '/clients/davaindia.png' },
        { name: 'idestiny',  img: '/clients/idestiny.png' },
];
const ClientItem = ({ name, img }: { name: string; img: string | null }) => (
  <div className="flex items-center gap-5 group cursor-default shrink-0">
    {/* Logo / Initials badge */}
    <div className="w-24 h-24 flex items-center justify-center overflow-hidden flex-shrink-0  transition-all duration-500">
      {img ? (
        <img
          src={img}
          alt={name}
          className="w-full h-full object-contain p-2 filter transition-all duration-500"
        />
      ) : (
        <span className="text-white/20 group-hover:text-primary/60 transition-all duration-500 font-mono text-xs font-bold tracking-widest uppercase">
          {name.split(' ').map(w => w[0]).join('').slice(0, 2)}
        </span>
      )}
    </div>

    {/* Client name */}
    <span className="text-5xl md:text-7xl font-impact font-black text-white/5 group-hover:text-primary transition-all duration-500 uppercase tracking-tighter">
      {name}
    </span>

    {/* Separator dot */}
    <span className="text-white/10 text-2xl mx-2 flex-shrink-0">·</span>
  </div>
);

export default function App() {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
const containerRef = useRef<HTMLDivElement>(null);
const [levitated, setLevitated] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowButtons(scrolled > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

useEffect(() => {
  const el = containerRef.current;
  if (!el) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setLevitated(true);
       
      }
    },
    {
      threshold: 0.2, // trigger when 20% of the div is visible
    }
  );

  observer.observe(el);
  return () => observer.disconnect();
}, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    gsap.ticker.lagSmoothing(0);

    // Handle anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            lenis.scrollTo(target as HTMLElement, {
              offset: -100,
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      });
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  useGSAP(() => {
    // Hero Animations
    const heroTl = gsap.timeline();
    heroTl.from(".hero-line", {
      y: 80,
      opacity: 0,
      duration: 1.5,
      stagger: 0.15,
      ease: "expo.out",
      clearProps: "all"
    });

    // Floating animation for hero items
    gsap.to(".hero-float", {
      y: -40,
      rotation: 10,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.5,
        from: "random"
      }
    });

    // Subtle parallax for floating elements on scroll
    gsap.to(".hero-float", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
      y: -100,
      duration: 1
    });

    // Antigravity pull for footer '8'
    gsap.set(".footer-eight", { y: 0, rotation: 0, scale: 1 });
    gsap.to(".footer-eight", {
      y: -150,
      rotation: -15,
      scale: 1.2,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".footer-crea8ors-container",
        start: "top 100%", // Starts exactly when the container top hits the bottom of the screen
        end: "bottom 20%", // Ends when it's well within the view
        scrub: 1, // Smoothly links the animation to the scroll position in both directions
      }
    });

    // Events Smile Path Animation
    gsap.to(".events-smile-path", {
      strokeDashoffset: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".events-smile-path",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1
      }
    });

    // Suble pulsing glow for footer '8'
    gsap.to(".footer-eight", {
      filter: "drop-shadow(0 0 50px rgba(255, 210, 0, 0.7))",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".footer-crea8ors-container",
        start: "top bottom",
        toggleActions: "play pause resume pause"
      }
    });

    // Reveal animations on scroll
    gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: "top 98%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        clearProps: "all" 
      });
    });

    gsap.utils.toArray<HTMLElement>(".gsap-reveal-left").forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: "top 98%",
          toggleActions: "play none none none"
        },
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        clearProps: "all" 
      });
    });

    gsap.utils.toArray<HTMLElement>(".gsap-reveal-right").forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: "top 98%",
          toggleActions: "play none none none"
        },
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        clearProps: "all" 
      });
    });

    // Horizontal Scroll for Projects
    const projectsWrapper = document.querySelector<HTMLElement>(".projects-wrapper");
    if (projectsWrapper) {
      const sections = gsap.utils.toArray<HTMLElement>(".project-card");
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".projects-container",
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          start: "top top",
          end: () => `+=${projectsWrapper.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true
        }
      });
    }

    // Client Ticker
    gsap.to(".client-ticker", {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1
    });

    // Refresh ScrollTrigger to catch layout shifts
    ScrollTrigger.refresh();

    // Hover effect for cards
    gsap.utils.toArray<HTMLElement>(".bento-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { borderColor: "rgba(255, 210, 0, 0.4)", duration: 0.3 });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { borderColor: "rgba(255, 255, 255, 0.1)", duration: 0.3 });
      });
    });
  }, { scope: container });

  const navLinks = [
    { label: "Our Story", href: "#about" },
    { label: "Strategies", href: "#strengths" },
    { label: "Expertise", href: "#services" },
    { label: "Success Stories", href: "#projects" },
    { label: "Partners", href: "#clients" },
  ];

  const testimonials = [
    {
      text: "Closest to the promises made by anyone regarding execution. Amazing teamwork",
      author: "Swarnojit Sengupta",
      role: "Wow Momo",
      image: "/user.png",
      rating: 5
    },
    {
      text: "Outstanding planning with immaculate execution. Thumbs up for the entire team.",
      author: "S. Sureka",
      role: "Lux Industries",
      image: "/user.png",
      rating: 5
    },
    {
      text: "Epic ideation and execution is absolutely in sync. More power to the Crea8ors team. Keep up the good work",
      author: "S. Sengupta",
      role: "Ultra Tech Cement",
      image: "/user.png",
      rating: 5
    }
  ];
    // Sleek Contact Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: '',
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) 
        : [...prev, service]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    
    // Simulate premium backend ingestion with custom micro-interaction timeline
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', website: '', message: '' });
    setSelectedServices([]);
    setSelectedBudget('');
    setIsSubmitted(false);
  };

  const [activeBenefit, setActiveBenefit] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextTestimonial, isCarouselPaused]);

  return (
    <div ref={container} className="min-h-screen selection:bg-primary selection:text-black overflow-x-hidden bg-dark text-white bg-grid">
      {/* Scroll Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/5">
        <motion.div 
          className="h-full bg-primary shadow-[0_0_10px_rgba(255,210,0,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Buttons Group */}
      <AnimatePresence>
        {showButtons && (
          <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/yournumber"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.3)] border-2 border-[#25D366] transition-all relative group"
            >
              <MessageCircle size={28} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75" />
              <div className="absolute right-full mr-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Chat with us
              </div>
            </motion.a>

            {/* Scroll to Top */}
            <motion.button
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(255,210,0,0.3)] border-2 border-primary group"
            >
              <ArrowUp size={24} className="group-hover:animate-bounce" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-1 w-full z-50 bg-dark/60 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center h-20">
        <div className="flex items-center gap-2">
         <img src="/logo.jpeg" alt="Logo" className='w-40 h-15 rounded-2xl ' />
        </div>
        
        <div className="hidden md:flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} className="hover:text-primary hover:opacity-100 transition-all">{link.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a href="#contact" className="hidden sm:block border border-white/20 px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-full">Contact Agency</a>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-dark z-40 p-8 flex flex-col gap-8 text-4xl font-display font-bold">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)}>{link.label}</a>
            ))}
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-primary">Contact</a>
          </div>
        )}
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-32 pb-24">
        {/* NEW QUANTIVIZE-STYLE HERO */}
        <section className="mb-32 relative bg-primary rounded-[60px] overflow-hidden py-32 text-black">
          {/* Slanted Banners */}
          <div className="absolute top-[28%] -left-20 w-[150%] -rotate-6 z-10">
            <div className="slanted-banner bg-black py-6 flex gap-24 items-center">
              {[...Array(6)].map((_, i) => (
                <span key={i} className='text-primary'>Accelerating Digital Experiences <span className="text-white">★</span></span>
              ))}
            </div>
          </div>
          <div className="absolute top-[83%] -right-20 w-[150%] rotate-3 z-10">
            <div className="slanted-banner bg-white text-black py-4 flex gap-24 items-center border-y border-black/10">
              {[...Array(6)].map((_, i) => (
                <span key={i} className='text-primary'>Strategies that Drive Impact <span className="text-white">★</span></span>
              ))}
            </div>
          </div>

          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20">
            <div className="flex flex-col items-center text-center mb-24">
               <div className="flex items-center gap-2 mb-6">
            
                 <span className="text-3xl font-impact uppercase tracking-tighter">crea8ors</span>
               </div>
               <h2 className="text-4xl md:text-6xl font-impact uppercase max-w-2xl leading-none tracking-tight mb-20">
                 Boost Your Brand's Success With <br/>
                 <span className="text-white drop-shadow-2xl">crea8ors Digital Marketing </span>
               </h2>
            </div>

            {/* Main Mockup Card */}
            <div className="relative max-w-5xl mx-auto mb-24">
               <div className="bg-dark rounded-3xl border border-white/10 p-2 md:p-4 rotate-x-6 rotate-y-3 shadow-2xl overflow-hidden group hover:rotate-0 transition-all duration-700">
                  <div className="bg-[#111] rounded-2xl p-8 md:p-16 text-center border border-white/5 relative">
                     <div className="absolute top-12 left-12 sticker text-primary scale-75 border-primary/20">
                       <Zap size={20} fill="currentColor" />
                     </div>
                     <div className="absolute bottom-12 right-12 sticker text-white scale-75 border-white/20">
                        <Smile size={20} />
                     </div>
                     
                     <h3 className="text-5xl md:text-7xl font-impact text-white mb-8 leading-none uppercase">
                        The only all-in-one <span className="text-primary italic">place</span><br/> to grow your Engagement
                     </h3>
                     <p className="text-white/40 max-w-xl mx-auto mb-10 text-sm">
                        We deliver tailored digital marketing solutions to grow your business. From SEO to social media, let's achieve your goals together.
                     </p>
                     <div className="flex flex-wrap justify-center gap-6">
                        <button className="bg-primary text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">Sign Up For Free</button>
                        <button className="bg-white/5 text-white border border-white/10 px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white/10">
                           Watch A Demo <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-black">▶</div>
                        </button>
                     </div>
                  </div>
               </div>
            </div>


          
          </div>
        </section>
        <section className="hero-section mb-24">
          <div className="relative mb-16">
            <h1 className="text-[12vw] font-black leading-[0.8] tracking-tighter font-display text-white gsap-reveal hero-line relative">
              crea<span className="text-primary italic">8</span>ors.
              {/* Floating elements like the design */}
              <div className="absolute top-0 right-[20%] w-16 h-16 bg-white/5 rounded-lg border border-white/10 overflow-hidden -rotate-12 hover:rotate-0 transition-transform hidden md:block hero-float">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=200" alt="Work" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-4 left-[40%] w-12 h-12 bg-white/5 rounded-lg border border-white/10 overflow-hidden rotate-12 hover:rotate-0 transition-transform hidden md:block hero-float">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=200" alt="Work" className="w-full h-full object-cover" />
              </div>
            </h1>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16 border-t border-white/5 pt-12">
            <div className="flex items-center gap-4 hero-line gsap-reveal-left">
              <div className="w-12 h-12 rounded-full overflow-hidden grayscale">
                <img src="/banerjee.png" alt="Sunando" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold">Sunando Chakraborty</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Founder & Growth Strategist</p>
              </div>
            </div>
            <div className="hero-line gsap-reveal">
              <p className="text-lg leading-snug">
                Hello, we are <span className="text-primary">Crea8ors.</span>, the high-performance marketing agency <span className="text-white/40 italic">scaling brands since 2009.</span>
              </p>
            </div>
            <div className="flex gap-4 hero-line gsap-reveal-right">
              <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                <Zap className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm font-bold mb-1">ROI-Obsessed Scaling</p>
                <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-wider">Stop bleeding budget. We combine predictive data with elite creative to own your market.</p>
              </div>
            </div>
          </div>

          <div className="relative h-[600px] rounded-[40px] overflow-hidden group gsap-reveal">
             <img 
               src="/hero.png" 
               alt="Team at work" 
               className="w-full h-full object-cover  opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000" 
             />
             <div className="absolute top-0 left-0 p-8 flex gap-12 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
                <span>Performance Marketing</span>
                <span>ROI Optimization</span>
                <span>Growth 2025</span>
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent" />
             <div className="absolute bottom-12 left-12">
                <a href="#projects" className="bg-primary text-white px-8 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-white hover:text-black transition-all group shadow-2xl">
                  Scale your revenue <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </a>
             </div>
             <div className="absolute bottom-12 right-12 flex gap-12 items-end">
                <div className="text-right">
                  <p className="text-4xl font-black italic tracking-tighter">$150M+</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Managed Ad Spend</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black italic tracking-tighter">4.5x</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Average ROAS</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black italic tracking-tighter">250%</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Avg Annual Scaling</p>
                </div>
             </div>
          </div>
        </section>

        {/* NEW EXPRESSIVE BRAND STATEMENT SECTION */}
        <section className="mb-32 relative py-32 bg-[#0C0616] rounded-[60px] border border-white/5 overflow-hidden">
          {/* Floating Stickers */}
          <div className="absolute top-12 left-12 sticker text-primary -rotate-12 animate-bounce">
            <Zap size={24} fill="currentColor" />
          </div>
          <div className="absolute top-24 right-24 sticker text-primary rotate-45 scale-150">
            <Smile size={24}  />
          </div>
          <div className="absolute bottom-24 left-32 sticker text-primary -rotate-45">
            <Target size={24} />
          </div>
          <div className="absolute top-1/2 right-12 sticker text-primary rotate-12 scale-125">
             <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-impact">8</div>
          </div>
          <div className="absolute bottom-12 right-[40%] text-white/10 opacity-20">
             <svg width="100" height="100" viewBox="0 0 100 100" className="animate-spin-slow">
                <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="currentColor" />
             </svg>
          </div>

          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="font-impact text-[8vw] md:text-[10vw] leading-[0.85] tracking-tighter uppercase gsap-reveal">
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-4">
                <span className="text-white">WE</span>
                <span className="text-primary relative">
                  GROW
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#FFD200] rounded-full flex items-center justify-center text-black rotate-12">
                    <Smile size={20} fill="currentColor" />
                  </div>
                </span>
                <span className="text-white">BRANDS,</span>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-4">
                <span className="relative inline-block">
                  <span className="text-outline text-white px-4 border-2 border-white/20 rounded-[50%_40%] py-2">CREATE</span>
                  <div className="absolute -top-8 -left-8 text-primary -rotate-12">
                    <Zap size={40} fill="currentColor" />
                  </div>
                </span>
                <span className="text-primary">EXPERIENCES</span>
                <span className="text-white">&</span>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
                <span className="text-primary">SOLVE</span>
                <span className="text-white">BUSINESS</span>
                <span className="text-primary relative">
                  PROBLEMS.
                  <div className="absolute -bottom-4 -right-8 sticker text-white/20 rotate-45">
                    <Target size={20}  />
                  </div>
                </span>
              </div>
            </div>

            <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/5 pt-12">
               <div className="bg-white/5 border border-white/10 p-8 rounded-3xl max-w-md text-left relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-white/5 text-4xl font-impact opacity-0 group-hover:opacity-100 transition-opacity">©2024</div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    A strong brand needs elite performance. We uncover your most profitable audiences. Through our data-driven growth process, we ensure your marketing isn't just an expense, but an investment.
                  </p>
               </div>
               
               <div className="relative">
                  <button className="bg-[#FFD200] hover:bg-white text-black px-12 py-8 rounded-[40px_10px_40px_40px] text-4xl font-impact uppercase tracking-tighter transition-all flex flex-col items-center group shadow-[0_20px_50px_rgba(255,210,0,0.2)]">
                    SCALE NOW!
                    <span className="text-[10px] font-sans font-black tracking-widest mt-1 opacity-40">BOOK A STRATEGY CALL</span>
                    <div className="absolute -top-4 -left-4 w-10 h-10 border-2 border-black rounded-full flex items-center justify-center animate-pulse">
                      <BarChart3 size={16} />
                    </div>
                  </button>
                  <div className="mt-6 flex items-center justify-center gap-3 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                     <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center">↓</span>
                     ScrollDown
                  </div>
               </div>
            </div>
          </div>
        </section>

       

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
          {/* THE REST OF THE BENTO GRID STARTS HERE */}
          <div className="md:col-span-8 md:row-span-2 bento-card p-0 gsap-reveal group">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1400" 
              alt="Strategic session" 
              className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent p-12 flex flex-col justify-end">
              <h4 className="text-4xl font-impact font-bold mb-2 tracking-tighter italic"><span className="text-primary">DRIVING</span> <span className="text-outline">BUSINESS</span> GROWTH.</h4>
              <p className="text-white/50 max-w-md text-sm leading-relaxed">Providing innovative, effective and impactful brand solutions since our inception.</p>
            </div>
          </div>

          <div className="md:col-span-4 md:row-span-2 bento-card-accent group cursor-pointer gsap-reveal overflow-visible">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[10px] opacity-80 uppercase tracking-widest font-bold">Performance Metric</span>
              <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-500">
                <Zap size={18} />
              </div>
            </div>
            {/* Playful sticker/badge floating over the card */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-black uppercase tracking-tighter rotate-12 group-hover:rotate-0 transition-transform duration-500 border-4 border-primary z-20 shadow-xl">
               Top Rated
            </div>
            <div className="mt-auto">
              <h2 className="text-6xl md:text-8xl font-impact font-black tracking-tighter mb-2 italic">+412%</h2>
              <p className="text-white/80 font-medium tracking-tight">Client Revenue Growth <span className="opacity-40 text-xs block font-normal">2024 Portfolio Average</span></p>
            </div>
          </div>

        {/* JOURNEY SECTION */}
        <div id="about" className="md:col-span-4 md:row-span-2 bento-card bg-primary/5 flex flex-col justify-between gsap-reveal overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">The Journey</span>
          </div>
          <div>
            <h3 className="text-5xl font-impact font-medium mb-4 leading-tight uppercase">Crafting brands with <span className="relative inline-block"><span className="text-primary italic">purpose</span> <svg className="absolute -inset-2 w-[120%] h-[120%] text-primary opacity-40 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M5,50 Q50,0 95,50 Q50,100 5,50" fill="none" stroke="currentColor" strokeWidth="2" /></svg></span>.</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              From experimental marketing to high-impact production, we build the bridges between brands and people.
            </p>
          </div>
          <div className="pt-6 border-t border-white/5">
             <p className="text-white/60 text-xs italic">"We measure realities through controlled absurdities."</p>
          </div>
        </div>

        <div className="md:col-span-8 md:row-span-2 bento-card p-0 gsap-reveal overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1400" 
            alt="Workspace" 
            className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent p-12 flex flex-col justify-end">
            <h4 className="text-5xl font-impact font-bold mb-2 uppercase tracking-tighter italic">Exceeding <span className="text-outline">Expectations.</span></h4>
            <p className="text-white/50 max-w-md">Driving business growth through innovative, effective and impactful solutions.</p>
          </div>
        </div>

        {/* STRENGTHS SECTION */}
        <div id="strengths" className="md:col-span-12 mt-12 mb-4">
           <div className="flex items-end justify-between gsap-reveal">
             <div className="max-w-2xl">
               <span className="text-primary font-mono text-[10px] uppercase font-bold tracking-[0.2em] mb-4 block">// Core Capabilities</span>
               <h3 className="text-7xl md:text-8xl font-impact font-bold tracking-tight uppercase leading-[0.8] mb-2">Our <span className="relative inline-block px-1"><span className="text-outline">Strategic</span> <Award className="absolute -top-4 -right-8 text-primary animate-pulse w-8 h-8 rotate-12" /></span> Ecosystem.</h3>
             </div>
             <p className="hidden md:block text-white/40 text-sm max-w-xs text-right">Hyper-specialized services designed for creative disruption and performance.</p>
           </div>
        </div>

        {[
          { title: "Meta Ads Mastery", desc: "Aggressive scaling strategies for Facebook & Instagram that deliver actual sales.", icon: <Target size={24} className="text-primary" />, span: "md:col-span-4", reveal: "gsap-reveal-left" },
          { title: "Search Dominance", desc: "High-intent SEM and SEO campaigns that own the search results.", icon: <Zap size={24} className="text-primary" />, span: "md:col-span-4", reveal: "gsap-reveal" },
          { title: "Conversion (CRO)", desc: "Optimizing every pixel of your funnel to maximize every dollar of spend.", icon: <CheckCircle2 size={24} className="text-primary" />, span: "md:col-span-4", reveal: "gsap-reveal-right" },
          { title: "Creative Sprints", desc: "Rapid-fire ad creative production designed strictly for high CTR and conversion.", icon: <Palette size={24} className="text-primary" />, span: "md:col-span-6", reveal: "gsap-reveal-left" },
          { title: "Growth Engine", desc: "Full-stack growth systems that automate your acquisition and retention.", icon: <Award size={24} className="text-primary" />, span: "md:col-span-6", reveal: "gsap-reveal-right" }
        ].map((item, idx) => (
          <div key={idx} className={cn("bento-card group hover:bg-white/5 transition-all", item.span, item.reveal)}>
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
               {item.icon}
             </div>
             <h4 className="text-2xl font-display font-bold mb-3">{item.title}</h4>
             <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}

        {/* DETAILED SERVICES SECTION */}
        <div id="services" className="md:col-span-12 mt-24 mb-4 border-t border-white/5 pt-12">
           <div className="flex items-end justify-between gsap-reveal">
             <div className="max-w-2xl">
               <span className="text-primary font-mono text-[10px] uppercase font-bold tracking-[0.2em] mb-4 block">// Specialized Solutions</span>
               <h3 className="text-7xl md:text-8xl font-impact font-bold tracking-tight uppercase leading-[0.8]"><span className="text-primary italic">Our</span> <span className="text-outline">Services.</span></h3>
             </div>
             <p className="hidden md:block text-white/40 text-sm max-w-xs text-right">Deep-dive services that bridge the gap between vision and execution.</p>
           </div>
        </div>

        {[
          { title: "Google Ads (PPC)", desc: "Capturing high-intent buyers exactly when they're searching for you.", icon: <Globe size={24} className="text-primary" />, reveal: "gsap-reveal-left" },
          { title: "E-com Scaling", desc: "A-Z management for Shopify and Amazon brands to hit 7-8 figures.", icon: <ShoppingBag size={24} className="text-primary" />, reveal: "gsap-reveal" },
          { title: "Performance Creatives", desc: "Direct-response video and static ads that actually convert.", icon: <Video size={24} className="text-primary" />, reveal: "gsap-reveal-right" },
          { title: "Influencer Whitelisting", desc: "Leveraging creator audiences via paid media for massive social proof.", icon: <Users size={24} className="text-primary" />, reveal: "gsap-reveal-left" },
          { title: "Retention Flow", desc: "Elite email and SMS marketing to maximize customer Lifetime Value.", icon: <Mail size={24} className="text-primary" />, reveal: "gsap-reveal" },
          { title: "Data Analytics", desc: "Deep-dive attribution modeling to understand where every lead comes from.", icon: <BarChart3 size={24} className="text-primary" />, reveal: "gsap-reveal-right" }
        ].map((service, idx) => (
          <div key={idx} className={cn("md:col-span-4 bento-card group hover:bg-white/5 transition-all", service.reveal)}>
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
               {service.icon}
             </div>
             <h4 className="text-2xl font-display font-bold mb-3">{service.title}</h4>
             <p className="text-white/40 text-sm leading-relaxed">{service.desc}</p>
          </div>
        ))}
        <div className="md:col-span-12 mt-12 mb-4 border-t border-white/5 pt-12">
           <div className="gsap-reveal">
               <span className="text-primary font-mono text-[10px] uppercase font-bold tracking-[0.2em] mb-4 block">// Leadership Team</span>
               <h3 className="text-7xl md:text-8xl font-impact font-bold tracking-tight uppercase leading-[0.8]">The <span className="relative inline-block"><span className="text-outline italic">Visionaries.</span> <Search className="absolute -bottom-2 -left-8 text-white w-6 h-6 -rotate-45 opacity-40" /></span></h3>
           </div>
        </div>

        {[
          { 
            name: "Sunando Chakraborty", 
            role: "Co-founder & Director", 
            desc: "15+ years experience in business development and client strategy. Storyteller & brand enthusiast.",
            img: "/banerjee.png",
            reveal: "gsap-reveal-left"
          },
          { 
            name: "Shubhadeep Sarkaar", 
            role: "Director", 
            desc: "15+ years expertise in sales and marketing across leading media groups including India Today.",
            img: "/sarkar.png",
            reveal: "gsap-reveal-right"
          }
        ].map((director, idx) => (
          <div key={idx} className={cn("md:col-span-6 md:row-span-2 bento-card p-0 flex flex-col md:flex-row group", director.reveal)}>
             <div className="md:w-1/2 overflow-hidden h-[300px] md:h-auto">
                <img src={director.img} alt={director.name} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
             </div>
             <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <span className="text-primary font-mono text-[10px] uppercase font-bold tracking-widest mb-2">{director.role}</span>
                <h4 className="text-3xl font-display font-bold mb-4">{director.name}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{director.desc}</p>
             </div>
          </div>
        ))}

        {/* BENEFITS SECTION */}
        <div className="md:col-span-4 md:row-span-2 bento-card bg-primary group gsap-reveal">
           <h4 className="text-5xl font-impact font-black leading-none mb-8 tracking-tighter italic">HOW DOES YOUR <span className="text-outline">BRAND</span> BENEFIT?</h4>
           <p className="text-white/80 text-sm leading-relaxed">
             We create a cycle of engagement that continuously elevates your brand's market position through immersion and constant conversation.
           </p>
           <div className="mt-8 pt-8 border-t border-white/20">
             <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">Status: Dominating</div>
           </div>
        </div>

        <div className="md:col-span-8 md:row-span-2 bento-card grid grid-cols-2 gap-4 benefits-grid gsap-reveal p-4">
          {[
            { label: "Acquisition", text: "Targeted high-intent traffic", icon: <Target size={16} /> },
            { label: "Scalability", text: "Uncapped revenue growth", icon: <Zap size={16} /> },
            { label: "LTV Boost", text: "Maximized customer value", icon: <CheckCircle2 size={16} /> },
            { label: "Predictability", text: "Data-backed results only", icon: <Award size={16} /> }
          ].map((benefit, i) => (
            <div key={i} className="benefit-item bento-card border-none bg-white/5 p-6 flex flex-col gap-2 hover:bg-white/10 transition-all">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-2">
                {benefit.icon}
              </div>
              <span className="font-mono text-[10px] uppercase text-primary font-bold tracking-widest">{benefit.label}</span>
              <p className="text-white/50 text-xs leading-tight">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>

        {/* AI IMAGE GENERATION SECTION (EXACT REPLICA) */}
        <section className="py-32 relative overflow-hidden bg-black mt-24 rounded-[60px] border border-white/5 mx-auto max-w-[1440px]">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[160px] rounded-full pointer-events-none" />
          
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10 mb-24">
            <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6 leading-tight whitespace-pre-wrap">
              Generate High-Converting Ads<br />
              <span className="font-impact italic text-primary">with Just a Prompt</span>
            </h2>
            <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Create ad-ready high-quality visuals in seconds. Stop waiting for designers and start testing new creatives daily.
            </p>
            <button className="bg-white/5 border border-white/10 hover:border-primary/50 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto transition-all group backdrop-blur-md">
              Create ad creative <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-white/60" />
            </button>
          </div>

      
        

          {/* Prompt Marquee (NEW) */}
          <div className="ai-prompt-marquee overflow-hidden mb-32 border-y border-white/5 py-8 relative whitespace-nowrap">
             <div className="ai-marquee-inner inline-block">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="inline-flex gap-12 items-center px-6">
                    {["PERFORMANCE ADS", "ROI OPTIMIZATION", "FUNNEL STRATEGY", "META ADS SCALING", "GOOGLE ADS DOMINANCE", "CONVERSION RATE OPTIMIZATION"].map((text, j) => (
                      <div key={j} className="flex items-center gap-6">
                        <span className="text-4xl md:text-6xl font-impact opacity-10 hover:opacity-100 transition-opacity cursor-default uppercase">{text}</span>
                        <div className="w-3 h-3 bg-primary rounded-full opacity-30" />
                      </div>
                    ))}
                  </div>
                ))}
             </div>
          </div>
        </section>

      </main>

      <PortfolioGallery />


      
      {/* CLIENT TICKER */}
   <section id="clients" className="py-24 border-b border-white/5 bg-dark">
    <div className="max-w-[1440px] mx-auto px-12 mb-12 flex items-center gap-6 gsap-reveal">
     <span className="font-mono text-[10px] uppercase font-bold opacity-30 tracking-[0.3em]">
      Industry Partners
     </span>
     <div className="h-[1px] flex-1 bg-white/5" />
  </div>

  <div className="flex whitespace-nowrap overflow-hidden">
    <div className="client-ticker flex gap-16 items-center py-6">
      {[...clients, ...clients].map((client, idx) => (
        <ClientItem key={idx} name={client.name} img={client.img} />
      ))}
    </div>
  </div>
</section>

      {/* NEW SECTION 1: EVENTS ARC */}
<EventsGallery />

<VideoShowcaseSection />

      {/* NEW SECTION 2: WE ARE ONE */}
      <section className="min-h-screen grid lg:grid-cols-12 bg-dark border-t border-white/5 overflow-hidden">
        {/* Left Side: Statement */}
        <div className="lg:col-span-4 p-12 md:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 bg-black relative z-10">
           <div className="gsap-reveal">
              <h2 className="text-[10vw] lg:text-[6vw] font-bold leading-[0.9] tracking-tighter mb-8 italic uppercase">
                We.<br/>Are.<br/>One.
              </h2>
              <div className="w-24 h-2 bg-gradient-to-r from-primary via-orange-500 to-purple-600 rounded-full mb-12" />
              <p className="text-white/40 text-lg max-w-sm leading-relaxed uppercase tracking-widest font-mono text-[10px]">
                Seamless integration of performance media, creative tech, and brand storytelling.
              </p>
           </div>
        </div>

        {/* Right Side: Panels */}
        <div className="lg:col-span-8 flex flex-col md:flex-row h-full min-h-[600px] bg-black">
           {[
             { num: "01", title: "#Pointone", img: "/point1.png", text: "Strategic market positioning with surgical precision." },
             { num: "02", title: "#Pointtwo", img: "/point2.png", text: "Human-centric creatives connecting at scale." },
             { num: "03", title: "#Pointthree", img: "/point3.png", text: "Scalable growth systems built for the modern era." }
           ].map((panel, idx) => (
             <div key={idx} className="flex-1 relative group overflow-hidden border-b md:border-b-0 md:border-r border-white/5 md:last:border-r-0 h-full flex flex-col justify-end p-12 transition-all duration-700 hover:flex-[1.5] hover:bg-white/5">
                <div className="absolute inset-0 z-0">
                  <img src={panel.img} className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                
                <div className="relative z-10">
                   <div className="flex items-center gap-4 mb-4 group-hover:translate-x-2 transition-transform">
                      <div className="w-4 h-[1px] bg-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{panel.title}</span>
                   </div>
                   <div className="text-[100px] font-impact font-medium leading-none text-outline-thin text-transparent mb-8 group-hover:text-white transition-all duration-500">{panel.num}</div>
                   <div className="h-[2px] w-0 group-hover:w-12 bg-primary transition-all duration-700 mb-4" />
                   <p className="text-white/30 text-[10px] uppercase tracking-widest leading-relaxed max-w-[200px] group-hover:text-white transition-colors uppercase">{panel.text}</p>
                </div>
             </div>
           ))}
        </div>
      </section>
      {/* <BrandShowcase /> */}

      {/* BRAND BENEFIT SECTION */}
      <section className="py-40 bg-black border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] -z-10 rounded-full" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">
            
            {/* Pie Chart Side */}
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Brand Immersion - Mint */}
                <motion.path 
                  d="M50,50 L90,50 A40,40 0 0,0 50,10 Z"
                  fill="#D1D8C5"
                  animate={{ 
                    scale: activeBenefit === 3 ? 1.1 : 1,
                    opacity: activeBenefit === 3 || activeBenefit === null ? 1 : 0.3
                  }}
                  onMouseEnter={() => setActiveBenefit(3)}
                  onMouseLeave={() => setActiveBenefit(null)}
                  className="cursor-pointer"
                />
                {/* Brand Engagement - Lavender */}
                <motion.path 
                  d="M50,50 L50,10 A40,40 0 0,0 10,50 Z"
                  fill="#D8AED3"
                  animate={{ 
                    scale: activeBenefit === 2 ? 1.1 : 1,
                    opacity: activeBenefit === 2 || activeBenefit === null ? 1 : 0.3
                  }}
                  onMouseEnter={() => setActiveBenefit(2)}
                  onMouseLeave={() => setActiveBenefit(null)}
                  className="cursor-pointer"
                />
                {/* Brand Conversation - Soft Orange */}
                <motion.path 
                  d="M50,50 L10,50 A40,40 0 0,0 50,90 Z"
                  fill="#FFBE98"
                  animate={{ 
                    scale: activeBenefit === 1 ? 1.1 : 1,
                    opacity: activeBenefit === 1 || activeBenefit === null ? 1 : 0.3
                  }}
                  onMouseEnter={() => setActiveBenefit(1)}
                  onMouseLeave={() => setActiveBenefit(null)}
                  className="cursor-pointer"
                />
                {/* Brand Impression - Peach */}
                <motion.path 
                  d="M50,50 L50,90 A40,40 0 0,0 90,50 Z"
                  fill="#FFCAB0"
                  animate={{ 
                    scale: activeBenefit === 0 ? 1.1 : 1,
                    opacity: activeBenefit === 0 || activeBenefit === null ? 1 : 0.3
                  }}
                  onMouseEnter={() => setActiveBenefit(0)}
                  onMouseLeave={() => setActiveBenefit(null)}
                  className="cursor-pointer"
                />
                {/* Center Hole for Donut Look */}
                <circle cx="50" cy="50" r="12" className="fill-black" />
              </svg>
              
              {/* Logo in Center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-50 md:scale-75">
                <span className="text-white/20 font-black text-4xl">C8</span>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 w-full max-w-2xl">
              <div className="gsap-reveal mb-16">
                 <h2 className="text-4xl md:text-7xl font-impact leading-none uppercase tracking-tighter mb-4">
                   How Does Your<br/>
                   <span className="text-primary italic">Brand</span> Benefit?
                 </h2>
                 <div className="w-20 h-1 bg-primary rounded-full" />
              </div>

              <div className="space-y-4">
                {[
                  { title: "Brand Impression", desc: "Repeated perceptive impression", color: "#FFCAB0" },
                  { title: "Brand Conversation", desc: "Continuous brand conversation", color: "#FFBE98" },
                  { title: "Brand Engagement", desc: "It's all about closeness and engagement", color: "#D8AED3" },
                  { title: "Brand Immersion", desc: "Increases the brand perception", color: "#D1D8C5" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    onMouseEnter={() => setActiveBenefit(i)}
                    onMouseLeave={() => setActiveBenefit(null)}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "flex items-center gap-6 p-6 rounded-3xl border transition-all duration-500 cursor-pointer group",
                      activeBenefit === i 
                        ? "bg-white/5 border-white/10 translate-x-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
                        : "bg-transparent border-transparent opacity-40 hover:opacity-100"
                    )}
                  >
                    <div 
                      className="w-14 h-14 rounded-2xl shrink-0 border-2 border-white/10 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <h4 className="text-xl font-bold mb-1 text-white group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-white/40 text-xs uppercase tracking-widest font-mono">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
 
      {/* NEW TESTIMONIAL INTRO SECTION */}
      <section className="py-32 bg-[#050C0A]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center gsap-reveal">
           <div className="flex justify-center mb-8">
             <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">Testimonial</span>
           </div>
           <h2 className="text-7xl md:text-9xl font-impact font-medium tracking-tight mb-12 max-w-4xl mx-auto leading-[0.9] uppercase">
             Scaling <span className="text-primary">Brands</span><br/>Through <span className="text-primary italic">Performance</span>
           </h2>
           <div className="flex justify-center">
             <button className="bg-primary text-black px-8 py-4 rounded-xl flex items-center gap-3 font-bold hover:bg-white transition-all">
                <span className="p-2 bg-black/10 rounded-lg">
                  <Menu size={16} />
                </span>
                Client Voices
             </button>
           </div>
        </div>
      </section>

      {/* NEW JOURNEY & INSIGHTS SECTION */}
      <section className="py-24 bg-[#050C0A] border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Journey Card */}
            <div className="gsap-reveal">
              <Zap className="text-amber-400 mb-6" size={24} />
              <h3 className="text-3xl font-display font-medium mb-6">The science of scaling</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                Marketing isn't a guessing game. Our methodology is built on aggressive testing and ruthless data optimization.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-bold border-b border-white hover:text-primary hover:border-primary transition-all pb-1">
                Explore Methodology <ArrowRight size={16} />
              </a>
            </div>

            {/* Insights Card */}
            <div className="gsap-reveal group cursor-pointer">
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-8">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" alt="Insights" className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-black">
                    <BarChart3 size={24} />
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium mb-6 leading-relaxed group-hover:text-primary transition-colors">Real-world data and elite marketing insights to help you scale past your limits.</p>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-bold border-b border-white hover:text-primary hover:border-primary transition-all pb-1">
                Read Strategies <ArrowRight size={16} />
              </a>
            </div>

            {/* Review Card Carousel */}
            <div 
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              className="bg-white/5 p-10 rounded-[40px] gsap-reveal border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Zap key={i} className="text-yellow-400 fill-yellow-400" size={14} />
                    ))}
                  </div>
                  <div className="flex gap-3 relative z-20">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevTestimonial}
                      className="w-12 h-12 rounded-full border-2 border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-colors shadow-xl"
                    >
                      <ChevronLeft size={22} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextTestimonial}
                      className="w-12 h-12 rounded-full border-2 border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-colors shadow-xl"
                    >
                      <ChevronRight size={22} />
                    </motion.button>
                  </div>
                </div>

                <div className="relative h-40">
                  <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.p 
                      key={currentTestimonial}
                      custom={direction}
                      variants={{
                        enter: (direction: number) => ({
                          x: direction > 0 ? 50 : -50,
                          opacity: 0
                        }),
                        center: {
                          zIndex: 1,
                          x: 0,
                          opacity: 1
                        },
                        exit: (direction: number) => ({
                          zIndex: 0,
                          x: direction < 0 ? 50 : -50,
                          opacity: 0
                        })
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5, ease: "circOut" }}
                      className="text-lg leading-relaxed font-medium absolute inset-0"
                    >
                      {"\""}{testimonials[currentTestimonial].text}{"\""}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4 mt-8">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div 
                    key={currentTestimonial}
                    custom={direction}
                    variants={{
                      enter: (direction: number) => ({
                        x: direction > 0 ? 20 : -20,
                        opacity: 0,
                        scale: 0.9
                      }),
                      center: {
                        x: 0,
                        opacity: 1,
                        scale: 1
                      },
                      exit: (direction: number) => ({
                        x: direction < 0 ? 20 : -20,
                        opacity: 0,
                        scale: 0.9
                      })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    className="w-12 h-12 rounded-full overflow-hidden bg-white/10 grayscale"
                  >
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].author} 
                      className="w-full h-full object-cover" 
                    />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentTestimonial}
                    custom={direction}
                    variants={{
                      enter: (direction: number) => ({
                        x: direction > 0 ? 20 : -20,
                        opacity: 0
                      }),
                      center: {
                        x: 0,
                        opacity: 1
                      },
                      exit: (direction: number) => ({
                        x: direction < 0 ? 20 : -20,
                        opacity: 0
                      })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-sm font-bold">{testimonials[currentTestimonial].author}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">{testimonials[currentTestimonial].role}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Dots */}
              <div className="absolute bottom-10 right-10 flex gap-2">
                {testimonials.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setDirection(i > currentTestimonial ? 1 : -1);
                      setCurrentTestimonial(i);
                    }}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-500",
                      currentTestimonial === i ? "bg-primary w-4" : "bg-white/20"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
            <section id="contact-form" className="py-24 md:py-40 bg-[#030807] border-t border-white/5 relative overflow-hidden selection:bg-primary selection:text-black">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#8E2DE2]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 xl:gap-20 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 gsap-reveal-left">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
                  Let's Connect
                </span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              
              </div>
              
              <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-impact font-medium leading-[0.95] uppercase tracking-tighter mb-8">
                Ready to <span className="text-outline">Scale</span>?<br />
                Get Your <span className="text-primary italic">Free Audit</span>
              </h2>
              
              <p className="text-white/40 text-lg leading-relaxed mb-12 max-w-lg">
                Stop guessing. We'll run a deep-dive analysis on your acquisition funnels, copy angles, and creative assets — then deliver a clear roadmap to 3x your efficiency.
              </p>

              <div className="space-y-6 max-w-md">
                <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-500 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">Inquiries</h4>
                    <p className="text-lg font-bold text-white group-hover:text-primary transition-colors">partner@crea8ors.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-500 group">
                  <div className="w-12 h-12 bg-[#8E2DE2]/10 rounded-2xl flex items-center justify-center text-[#8E2DE2] group-hover:scale-110 transition-transform duration-500">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">Quick Chat</h4>
                    <p className="text-lg font-bold text-white">Book a 15-Min Strategy Session</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form Card Column */}
            <div className="lg:col-span-7 w-full">
              <div className="relative bg-white/[0.01] border border-white/5 backdrop-blur-2xl rounded-[40px] p-6 sm:p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="lead-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      onSubmit={handleFormSubmit}
                      className="space-y-8"
                    >
                      {/* Name & Email inputs in 2 columns on desktop */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative group">
                          <input 
                            type="text" 
                            required
                            id="form-name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder=" "
                            className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(255,210,0,0.15)] transition-all text-white placeholder-transparent peer text-sm font-medium"
                          />
                          <label 
                            htmlFor="form-name"
                            className="absolute left-6 top-2 text-white/40 text-[10px] font-mono uppercase tracking-widest transition-all pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary"
                          >
                            Full Name *
                          </label>
                        </div>

                        <div className="relative group">
                          <input 
                            type="email" 
                            required
                            id="form-email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder=" "
                            className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(255,210,0,0.15)] transition-all text-white placeholder-transparent peer text-sm font-medium"
                          />
                          <label 
                            htmlFor="form-email"
                            className="absolute left-6 top-2 text-white/40 text-[10px] font-mono uppercase tracking-widest transition-all pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary"
                          >
                            Work Email *
                          </label>
                        </div>
                      </div>

                      {/* Company website input */}
                      <div className="relative group">
                        <input 
                          type="url" 
                          id="form-website"
                          value={formData.website}
                          onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                          placeholder=" "
                          className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(255,210,0,0.15)] transition-all text-white placeholder-transparent peer text-sm font-medium"
                        />
                        <label 
                          htmlFor="form-website"
                          className="absolute left-6 top-2 text-white/40 text-[10px] font-mono uppercase tracking-widest transition-all pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary"
                        >
                          Company Website
                        </label>
                      </div>

                      {/* Interactive Services Selector */}
                      <div>
                        <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4">What solutions are you looking for?</span>
                        <div className="flex flex-wrap gap-3">
                          {["Creative Production", "Performance Ads", "Funnel Optimization", "Influencer Strategy"].map((service) => {
                            const isSelected = selectedServices.includes(service);
                            return (
                              <button
                                key={service}
                                type="button"
                                onClick={() => handleServiceToggle(service)}
                                className={cn(
                                  "px-5 py-3 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300",
                                  isSelected 
                                    ? "bg-primary text-black border-primary shadow-[0_0_15px_rgba(255,210,0,0.3)]" 
                                    : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/30"
                                )}
                              >
                                {service}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Interactive Budget Selector */}
                      <div>
                        <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4">Monthly Advertising Budget</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
                          {["< $10k", "$10k - $50k", "$50k - $100k", "$100k+"].map((budget) => {
                            const isSelected = selectedBudget === budget;
                            return (
                              <button
                                key={budget}
                                type="button"
                                onClick={() => setSelectedBudget(budget)}
                                className={cn(
                                  "py-3.5 px-3 rounded-2xl border text-center text-xs font-mono font-bold transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis",
                                  isSelected 
                                    ? "bg-white/10 border-primary text-primary shadow-[0_0_15px_rgba(255,210,0,0.15)]" 
                                    : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20"
                                )}
                                title={budget}
                              >
                                {budget}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="relative group">
                        <textarea 
                          id="form-message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          placeholder=" "
                          className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(255,210,0,0.15)] transition-all text-white placeholder-transparent peer text-sm font-medium resize-none"
                        />
                        <label 
                          htmlFor="form-message"
                          className="absolute left-6 top-2 text-white/40 text-[10px] font-mono uppercase tracking-widest transition-all pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary"
                        >
                          Tell us about your brand & goals
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-white text-black py-5 px-8 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-500 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(255,210,0,0.2)] hover:shadow-[0_15px_40px_rgba(255,215,0,0.35)]"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span className="uppercase tracking-widest text-xs font-black">Initializing Submission...</span>
                          </>
                        ) : (
                          <>
                            <span className="uppercase tracking-widest text-xs font-black">SUBMIT QUERY</span>
                            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      className="text-center py-12 px-4"
                    >
                      <div className="w-24 h-24 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-8 relative">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className="text-primary"
                        >
                          <CheckCircle2 size={48} />
                        </motion.div>
                        <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75" />
                      </div>

                      <span className="bg-primary/20 border border-primary/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary mb-6 inline-block">
                        Submission Received
                      </span>

                      <h3 className="text-4xl md:text-5xl font-impact uppercase tracking-tighter text-white mb-6">
                        System Online.<br />
                        <span className="text-primary italic">We're Processing</span>
                      </h3>

                      <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed mb-10 uppercase font-mono text-[11px] tracking-wider">
                        Thanks <span className="text-white font-bold">{formData.name}</span>. We have received your parameters. Our lead strategist will compile a comprehensive growth roadmap and email it to <span className="text-primary font-bold">{formData.email}</span> within <span className="text-white font-bold">2 hours</span>.
                      </p>

                      {/* Displaying submitted summary */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 text-left max-w-sm mx-auto mb-10 space-y-4">
                        <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                          <span className="text-white/30">Target Brand:</span>
                          <span className="text-white font-bold">{formData.website || "Pending URL"}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                          <span className="text-white/30">Select Services:</span>
                          <span className="text-primary font-bold">{selectedServices.length > 0 ? selectedServices.slice(0, 2).join(", ") : "Growth Audit"}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                          <span className="text-white/30">Est. Budget:</span>
                          <span className="text-white font-bold">{selectedBudget || "Undisclosed"}</span>
                        </div>
                      </div>

                      <button
                        onClick={resetForm}
                        className="text-xs font-mono font-bold uppercase tracking-widest text-white/40 hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* REDESIGNED FOOTER */}
      <footer id="contact" className="group bg-[#050C0A] text-white pt-32 pb-24 border-t border-white/5 relative selection:bg-primary selection:text-black">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 mb-32">
            
            {/* Brand and Newsletter */}
            <div className="lg:col-span-1 border-r border-white/5 relative hidden lg:block">
               <div className="absolute top-0 left-0 bg-primary h-32 w-12 rounded-full flex items-center justify-center -rotate-180" style={{ writingMode: 'vertical-rl' }}>
                  <span className="text-[10px] font-black uppercase tracking-widest text-black">Founded 2009</span>
               </div>
            </div>

            <div className="lg:col-span-4 gsap-reveal-left">
              <div className="flex items-center gap-3 mb-16">
           
                    <img src="/logo.jpeg" alt="Logo" className='w-60 h-25 rounded-2xl' />
           
            
              </div>
              <div>
                <p className="text-lg font-medium mb-8">Let's scale your business</p>
                <form className="flex gap-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Work Email" className="flex-1 bg-white/5 border border-white/10 px-6 py-4 rounded-xl outline-none focus:border-primary transition-all" />
                  <button className="bg-primary text-black px-6 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-all">
                    Grow <BarChart3 size={16} />
                  </button>
                </form>
              </div>
            </div>

            {/* Link Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12 gsap-reveal-right">
              <div>
                <h5 className="text-lg font-medium mb-8">Performance</h5>
                <ul className="space-y-4 text-sm text-white/40 font-bold uppercase tracking-widest text-[10px]">
                  <li><a href="#" className="hover:text-primary transition-colors">Growth Audits</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">ROI Calculator</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Funnel Analysis</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Client Logins</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Scaling Roadmap</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-medium mb-8">Knowledge</h5>
                <ul className="space-y-4 text-sm text-white/40 font-bold uppercase tracking-widest text-[10px]">
                  <li><a href="#" className="hover:text-primary transition-colors">Marketing Blog</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Ad Breakdowns</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Funnel Templates</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Creative Assets</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Data Reports</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-medium mb-8">Our Agency</h5>
                <ul className="space-y-4 text-sm text-white/40 font-bold uppercase tracking-widest text-[10px]">
                  <li><a href="#" className="hover:text-primary transition-colors">Our Approach</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Growth team</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Hiring Strategists</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Scale responsibly</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Client success</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social and Copyright */}
          <div className="pt-12 border-t border-white/5 grid md:grid-cols-2 gap-12 items-center gsap-reveal-left">
            <div className="flex items-center gap-12 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
               <span>© All right reserved @Crea8ors {new Date().getFullYear()}.
               </span>
               <div className="flex items-center gap-6">
                  {/* <a href="#" className="hover:text-primary transition-all"><Facebook size={14} /></a>
                  <a href="#" className="hover:text-primary transition-all"><Instagram size={14} /></a>
                  <a href="#" className="hover:text-primary transition-all"><ExternalLink size={14} /></a> */}
                  <a href="#" className="hover:text-primary transition-all"><X size={14} /></a>
               </div>
            </div>
            <div className="flex md:justify-end gap-12 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
              <a href="#" className="hover:text-white transition-all">Terms of Use</a>
              <a href="#" className="hover:text-white transition-all">Privacy</a>
              <a href="#" className="hover:text-white transition-all">Site Index</a>
            </div>
          </div>
         
        <div
  ref={containerRef}
  className="mt-40 opacity-100 select-none overflow-visible pb-[100px] footer-crea8ors-container relative"
>
  <h6 className="text-[25vw] font-impact font-black leading-none whitespace-nowrap uppercase flex justify-center items-center">
    <span className="text-white/30 tracking-normal">crea</span>
    <span
      className={`footer-eight-hover-wrap inline-block transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110
        ${levitated
          ? '-translate-y-10 drop-shadow-[0_0_50px_rgba(255,210,0,0.6)]'
          : 'translate-y-0 drop-shadow-[0_0_0px_rgba(255,210,0,0)]'
        }`}
    >
      <span className="footer-eight inline-block text-primary italic px-6 relative z-20 origin-center drop-shadow-[0_0_30px_rgba(255,210,0,0.4)]">8</span>
    </span>
    <span className="text-white/30 tracking-normal">ors</span>
  </h6>
</div>
        </div>
        <div className="mt-12 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 text-center">
       <a href="#" className="hover:text-white transition-all  ">Designed & Developed by Soft Tech Digi Media</a>
       </div>
      </footer>
    </div>
  );
}

