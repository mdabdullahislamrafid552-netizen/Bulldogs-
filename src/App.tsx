import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { 
  TreePine, 
  Phone, 
  MapPin, 
  Mail, 
  ArrowRight,
  Menu, 
  X,
  Star,
  Instagram,
  Youtube
} from 'lucide-react';

function AnimatedCounter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: 'smooth'
      });
    }
  };

  const navItems = ['About', 'Services', 'Portfolio', 'Testimonials', 'Contact'];

  return (
    <div className="min-h-screen font-sans bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-brand)] selection:text-white">
      
      {/* Navigation - Premium Minimalist */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[var(--color-paper)]/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src="https://i.imgur.com/P732wbl.png" alt="Bulldogs Logo" className="h-16 md:h-20 w-auto object-contain" referrerPolicy="no-referrer" />
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${isScrolled ? 'text-[var(--color-ink)]/70 hover:text-[var(--color-brand)]' : 'text-white/80 hover:text-white'}`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className={`text-xs tracking-[0.15em] uppercase px-6 py-3 border transition-all duration-300 ${isScrolled ? 'border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white' : 'border-white text-white hover:bg-white hover:text-[var(--color-ink)]'}`}
            >
              Estimate
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden transition-colors ${isScrolled ? 'text-[var(--color-ink)]' : 'text-white'}`}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-[var(--color-paper)]/95 backdrop-blur-xl pt-32 px-6 overflow-y-auto flex flex-col items-center"
        >
          <div className="w-full max-w-sm flex flex-col space-y-4 text-center pb-12">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-3xl sm:text-4xl font-serif text-[var(--color-ink)] hover:text-[var(--color-brand)] transition-colors py-4 block w-full"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="mt-8 text-xs tracking-[0.15em] uppercase px-8 py-5 bg-[var(--color-ink)] text-white hover:bg-[var(--color-brand)] transition-all duration-300 w-full"
            >
              Get an Estimate
            </button>
          </div>
        </motion.div>
      )}

      {/* 1. Hero Section - Editorial / Magazine Style */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img 
            src="https://pdnguam.com/wp-content/uploads/2025/10/Tree-Service-Hickory-768x512.jpg" 
            alt="Premium tree care" 
            className="w-full h-[120%] object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </motion.div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-24 lg:mt-16">
          {/* Left Side - Text */}
          <div className="text-center lg:text-left">
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/80 text-xs tracking-[0.3em] uppercase mb-4 lg:mb-6"
            >
              Est. 2014 &mdash; Premium Arboriculture
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-6 lg:mb-8"
            >
              Elevating <br className="hidden sm:block" /><span className="italic font-light">Landscapes</span>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-6"
            >
              <button 
                onClick={() => scrollToSection('about')}
                className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 sm:py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[var(--color-ink)] transition-colors duration-500 w-full sm:w-auto"
              >
                Discover More
              </button>
            </motion.div>
          </div>

          {/* Right Side - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md p-6 sm:p-8 md:p-10 border border-white/20 shadow-2xl w-full max-w-lg mx-auto lg:max-w-none rounded-sm"
          >
            <h3 className="text-2xl font-serif text-white mb-6">Request a Consultation</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input type="text" id="hero-name" className="w-full bg-transparent border-b border-white/30 py-4 text-white focus:outline-none focus:border-white transition-colors peer placeholder-transparent" placeholder="Name" />
                <label htmlFor="hero-name" className="absolute left-0 -top-3.5 text-white/70 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs">Full Name</label>
              </div>
              <div className="relative">
                <input type="email" id="hero-email" className="w-full bg-transparent border-b border-white/30 py-4 text-white focus:outline-none focus:border-white transition-colors peer placeholder-transparent" placeholder="Email" />
                <label htmlFor="hero-email" className="absolute left-0 -top-3.5 text-white/70 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs">Email Address</label>
              </div>
              <div className="relative">
                <input type="tel" id="hero-phone" className="w-full bg-transparent border-b border-white/30 py-4 text-white focus:outline-none focus:border-white transition-colors peer placeholder-transparent" placeholder="Phone" />
                <label htmlFor="hero-phone" className="absolute left-0 -top-3.5 text-white/70 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs">Phone Number</label>
              </div>
              <div className="relative">
                <select id="hero-service" defaultValue="" className="w-full bg-transparent border-b border-white/30 py-4 text-white focus:outline-none focus:border-white transition-colors appearance-none rounded-none">
                  <option value="" disabled className="text-gray-800">Select a Service</option>
                  <option value="trimming" className="text-gray-800">Precision Trimming</option>
                  <option value="removal" className="text-gray-800">Strategic Removal</option>
                  <option value="maintenance" className="text-gray-800">Estate Maintenance</option>
                  <option value="emergency" className="text-gray-800">Emergency Response</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-white text-[var(--color-ink)] py-4 text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-brand)] hover:text-white transition-colors duration-500 mt-4">
                Submit Request
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. About Us - Luxury Editorial Layout */}
      <section id="about" className="py-16 lg:py-32 px-6 lg:px-12 bg-[var(--color-paper)] relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 text-[15rem] sm:text-[20rem] md:text-[30rem] font-serif text-black/[0.02] leading-none select-none pointer-events-none -mt-10 -mr-10 md:-mt-20 md:-mr-20">
          10
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
            
            {/* Left Content - spans 5 cols */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}
              className="lg:col-span-5 relative z-10"
            >
              <div className="flex items-center gap-4 mb-6 lg:mb-8">
                <div className="w-12 h-[1px] bg-[var(--color-brand)]"></div>
                <h2 className="text-xs tracking-[0.3em] uppercase text-[var(--color-brand)] font-semibold">Our Heritage</h2>
              </div>
              
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-8 lg:mb-10 text-[var(--color-ink)]">
                A decade of <br/><span className="italic text-gray-500 font-light">mastery</span> in arboriculture.
              </h3>
              
              <div className="space-y-8 text-gray-600 font-light leading-relaxed text-lg">
                <p className="font-serif text-2xl text-[var(--color-ink)] leading-snug">
                  "At Bulldogs Lawn & Tree, we approach every landscape as a living canvas."
                </p>
                <p>
                  For over ten years, our certified arborists have provided meticulous care, balancing the aesthetic beauty of your property with the vital health of its ecosystem.
                </p>
                <p>
                  Based in the heart of the community, we specialize in high-end residential and commercial tree management, ensuring safety, precision, and unparalleled service.
                </p>
              </div>
              
              <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-black/10 flex flex-col sm:flex-row gap-8 sm:gap-12 text-center sm:text-left">
                <div>
                  <div className="text-5xl font-serif text-[var(--color-ink)] mb-3 flex items-baseline justify-center sm:justify-start">
                    <AnimatedCounter from={0} to={10} duration={2} /><span className="text-3xl text-[var(--color-brand)] ml-1">+</span>
                  </div>
                  <div className="text-xs tracking-[0.2em] uppercase text-gray-500 font-medium">Years of Excellence</div>
                </div>
                <div>
                  <div className="text-5xl font-serif text-[var(--color-ink)] mb-3 flex items-baseline justify-center sm:justify-start">
                    <AnimatedCounter from={0} to={100} duration={2.5} /><span className="text-3xl text-[var(--color-brand)] ml-1">%</span>
                  </div>
                  <div className="text-xs tracking-[0.2em] uppercase text-gray-500 font-medium">Client Satisfaction</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Images - spans 7 cols */}
            <div className="lg:col-span-7 relative h-[400px] sm:h-[500px] lg:h-[800px] w-full mt-12 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}
                className="absolute top-0 right-0 w-[85%] h-[85%] z-10 shadow-2xl"
              >
                <img 
                  src="https://instagram.fdac2-1.fna.fbcdn.net/v/t51.82787-15/566553008_18045415058662504_3825135720943209800_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=100&ig_cache_key=Mzc0NDM1OTk4MzQzMDMwNzM4NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkxNC5oZHIuQzMifQ%3D%3D&_nc_ohc=-7u_YC7JmM8Q7kNvwFuXpCn&_nc_oc=AdkCfvS5cg2a6fWjw57HoLf2GDgIu80Bh37LNk5XM6eFz0K20D0jD-eZ3cvifMcE_e0&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac2-1.fna&_nc_gid=AWGQPOsY7O10QlG5gvtmQA&_nc_ss=8&oh=00_Afz0_QX9bpB8pX2CeykvbTf66HoNvxkuOWgqnEFU553tRw&oe=69BCDC52" 
                  alt="Arborist at work" 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, delay: 0.3 }}
                className="absolute bottom-0 left-0 w-[60%] sm:w-[55%] h-[45%] z-20 shadow-2xl border-8 border-[var(--color-paper)]"
              >
                <img 
                  src="https://instagram.fdac2-1.fna.fbcdn.net/v/t51.71878-15/564255198_1185289456797913_7940867645396385358_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=111&ig_cache_key=Mzc0MjAwNzEwOTkzMzI1NzkxOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2LnNkci5DMyJ9&_nc_ohc=X0bZ2uDwYIMQ7kNvwFFC1Kg&_nc_oc=AdmZKX3_lcHtCJdhUhoutUK9E4Edw3Lfcy7DqAQYVa7M_qbnLhpGEykmxvL_o0Y1FIY&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac2-1.fna&_nc_gid=AWGQPOsY7O10QlG5gvtmQA&_nc_ss=8&oh=00_AfyyD2IbREGfv3FijaCrfT2DrBQi0PrpUaHZwT376A9jhA&oe=69BCCF0C" 
                  alt="Precision tree trimming" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              {/* Decorative Badge */}
              <motion.div
                initial={{ opacity: 0, rotate: -90 }} whileInView={{ opacity: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }}
                className="absolute top-8 sm:top-12 left-0 sm:-left-6 z-30 bg-[var(--color-ink)] text-white p-4 sm:p-6 rounded-full w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center text-center shadow-xl"
              >
                <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-serif leading-tight">Certified<br/>Arborist</span>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. Services - Minimalist Grid */}
      <section id="services" className="py-16 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-20">
            <div className="max-w-2xl">
              <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--color-brand)] mb-4 lg:mb-6">Expertise</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight">
                Curated <span className="italic text-gray-500">services</span>
              </h3>
            </div>
            <p className="text-gray-500 font-light max-w-sm mt-4 md:mt-0">
              Comprehensive solutions tailored to the unique demands of your landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 lg:gap-y-16">
            {[
              {
                title: "Precision Trimming",
                desc: "Architectural pruning to enhance structural integrity, promote healthy growth, and elevate the visual harmony of your canopy.",
                num: "01"
              },
              {
                title: "Strategic Removal",
                desc: "Safe, calculated extraction of hazardous or declining specimens, utilizing advanced rigging techniques to protect your property.",
                num: "02"
              },
              {
                title: "Estate Maintenance",
                desc: "Holistic landscape management, ensuring pristine grounds through seasonal cleanups and meticulous attention to detail.",
                num: "03"
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="text-xs font-mono text-gray-400 mb-6 pb-6 border-b border-gray-200 group-hover:border-[var(--color-brand)] transition-colors duration-500">
                  {service.num}
                </div>
                <h4 className="text-2xl font-serif mb-4 group-hover:text-[var(--color-brand)] transition-colors duration-500">{service.title}</h4>
                <p className="text-gray-500 font-light leading-relaxed mb-8">
                  {service.desc}
                </p>
                <div className="flex items-center text-xs tracking-[0.1em] uppercase text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors duration-500">
                  <span>Discover</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Portfolio - Oversized Imagery */}
      <section id="portfolio" className="py-16 lg:py-32 bg-[var(--color-ink)] text-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 lg:mb-24">
            <h2 className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4 lg:mb-6">Selected Works</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              A gallery of <span className="italic text-gray-400">transformations</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative aspect-[4/5] group overflow-hidden">
              <img src="https://instagram.fdac2-2.fna.fbcdn.net/v/t15.5256-10/563276412_1115768607290154_2696140310657825266_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=107&ig_cache_key=Mzc0MDA5ODcxMDg1NzMyOTk4MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=Ar9pPTQSKjAQ7kNvwGdaKKj&_nc_oc=AdlNNVHS7aF9JsIPPSYfGGrQi6E8_QQpJpZQJwNq5EicutJLJ4dMF74PYa3N8whiiJ4&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac2-2.fna&_nc_gid=UagiaGrYRouoY9xrTsmxYA&_nc_ss=8&oh=00_AfxRbe3yZ7OmkdUtT3jSxjw3Y4kJLuLNbZqCqMHmxjIp4A&oe=69BCE3D1" alt="Trimming" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              <div className="absolute bottom-10 left-10">
                <p className="text-xs tracking-[0.2em] uppercase mb-2">Canopy Restoration</p>
                <p className="font-serif text-2xl italic">Oak Preservation</p>
              </div>
            </motion.div>
            
            <div className="grid grid-rows-2 gap-4 md:gap-8">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="relative w-full h-full group overflow-hidden">
                <img src="https://instagram.fdac2-2.fna.fbcdn.net/v/t51.71878-15/542740850_3145710315633389_4171407756220779143_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=103&ig_cache_key=MzcxMzA2Njc1ODY0MDA2NjEyNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2LnNkci5DMyJ9&_nc_ohc=jNnF0vO-Oc8Q7kNvwGPT-j9&_nc_oc=Adlfc3adHhFHNaMNLbcXl-4ACfX36_PZU3sKWwetijpiWH9R7PV-4ebWIlrh1Sx84gY&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac2-2.fna&_nc_gid=UagiaGrYRouoY9xrTsmxYA&_nc_ss=8&oh=00_AfxaHOrfroPkpPDoZAffEKHtGsT4pitbMQEWa7dASdHL2Q&oe=69BCB66F" alt="Removal" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute bottom-8 left-8">
                  <p className="text-xs tracking-[0.2em] uppercase mb-2">Technical Extraction</p>
                  <p className="font-serif text-xl italic">Hazard Mitigation</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="relative w-full h-full group overflow-hidden">
                <img src="https://instagram.fdac2-1.fna.fbcdn.net/v/t51.82787-15/541623505_18040616891662504_3582816433576832379_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=111&ig_cache_key=MzcxMjkxNTc3MTk3NTY2MzQ4MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyODR4MjI4My5zZHIuQzMifQ%3D%3D&_nc_ohc=xxMdR965Yi0Q7kNvwHrEUEw&_nc_oc=AdmFRFlAlVUHtpp9_jsZQmKYKhVzFsGrPFLnWbVv1wa3Vr6XWt7uzXJZh1rU1tTJuVo&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac2-1.fna&_nc_gid=UagiaGrYRouoY9xrTsmxYA&_nc_ss=8&oh=00_AfyRu_ETeP6wqtONjlBQjuftaWSrGhOJUlGKldX9WuEstw&oe=69BCDD7B" alt="Maintenance" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute bottom-8 left-8">
                  <p className="text-xs tracking-[0.2em] uppercase mb-2">Estate Care</p>
                  <p className="font-serif text-xl italic">Seasonal Grooming</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-8">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="relative aspect-[4/5] md:aspect-auto md:h-[600px] group overflow-hidden">
              <img src="https://instagram.fdac2-1.fna.fbcdn.net/v/t51.71878-15/506294250_9841882675881195_9019467944909869118_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=111&ig_cache_key=MzY1MzQ0OTE3MzUwNTIzNzA4Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2LnNkci5DMyJ9&_nc_ohc=qycImbZFryEQ7kNvwEHeIj-&_nc_oc=AdnHIL4fxFEInZbphsVUXs37IFKu60Ov9MsvRdr8-dsIv1fNkopdfOsCVOEM9RC-Kyk&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac2-1.fna&_nc_gid=lSV5z4EvAZr5EfZDeqIZow&_nc_ss=8&oh=00_AfzAdzaGdQUiEj_Hl8RaWBy3S7MYov_sVMzXErfpDZdvaA&oe=69BCC03F" alt="Operations" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              <div className="absolute bottom-10 left-10">
                <p className="text-xs tracking-[0.2em] uppercase mb-2">Equipment</p>
                <p className="font-serif text-2xl italic">Heavy Machinery</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="relative aspect-[4/5] md:aspect-auto md:h-[600px] group overflow-hidden">
              <img src="https://instagram.fdac2-2.fna.fbcdn.net/v/t51.71878-15/505454020_1499007114614653_5847030051971529723_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=103&ig_cache_key=MzY1NDI0OTIwOTY1NDc5Njc2NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjY0MHgxMTM2LnNkci5DMyJ9&_nc_ohc=ETSnDtn4QfwQ7kNvwGBV5FU&_nc_oc=Adnwg9dI-WGRNCh0HlOg6UmvJDLkBBm5YxNG12YNFDxSfeS024y74LihCzH2In7mLGE&_nc_ad=z-m&_nc_cid=1112&_nc_zt=23&_nc_ht=instagram.fdac2-2.fna&_nc_gid=lSV5z4EvAZr5EfZDeqIZow&_nc_ss=8&oh=00_AfwzlKBXBLR_goZDc-nx1qgV0XJ8GdZH8vixmg9PDF3-OQ&oe=69BCBB1F" alt="Team" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              <div className="absolute bottom-10 left-10">
                <p className="text-xs tracking-[0.2em] uppercase mb-2">Our Team</p>
                <p className="font-serif text-2xl italic">Dedicated Professionals</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials - Typography Focus */}
      <section id="testimonials" className="py-16 lg:py-32 px-6 lg:px-12 bg-[var(--color-paper)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--color-brand)] mb-12 lg:mb-20">Client Perspectives</h2>
          
          <div className="relative">
            <div className="text-6xl sm:text-8xl font-serif text-gray-200 absolute -top-8 sm:-top-12 left-0 right-0 mx-auto z-0 opacity-50">"</div>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-[var(--color-ink)] relative z-10 mb-8 lg:mb-12">
              The level of professionalism and artistry Bulldogs brought to our property was astounding. They didn't just remove a tree; they sculpted our entire landscape.
            </p>
            <div className="flex items-center justify-center space-x-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[var(--color-ink)] text-[var(--color-ink)]" />)}
            </div>
            <p className="text-xs tracking-[0.2em] uppercase font-medium">Eleanor V. &mdash; <span className="text-gray-500">Estate Owner</span></p>
          </div>
        </div>
      </section>

      {/* 6. Contact - High-End Form */}
      <section id="contact" className="py-16 lg:py-32 px-6 lg:px-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="text-xs tracking-[0.2em] uppercase text-[var(--color-brand)] mb-4 lg:mb-6">Inquiries</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-8 lg:mb-12">
              Commission <br/><span className="italic text-gray-500">our expertise.</span>
            </h3>
            
            <div className="space-y-8 lg:space-y-10 text-sm tracking-wide">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">Direct Line</p>
                <p className="text-xl font-serif flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-[var(--color-brand)]" />
                  (555) 123-4567
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">Electronic Mail</p>
                <p className="text-xl font-serif flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-[var(--color-brand)]" />
                  concierge@bulldogslawntree.com
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">Headquarters</p>
                <p className="text-xl font-serif text-gray-600 flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-1 text-[var(--color-brand)] flex-shrink-0" />
                  <span>Serving the greater metropolitan area<br/>with distinction.</span>
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">Connect With Us</p>
                <div className="flex space-x-6">
                  <a href="https://www.instagram.com/bulldogs_lawn_and_tree/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-brand)] transition-colors">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="https://www.youtube.com/@Bulldogs-lawn-and-Tree" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-brand)] transition-colors">
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-paper)] p-6 sm:p-10 md:p-16">
            <form className="space-y-8 lg:space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input type="text" id="name" className="w-full bg-transparent border-b border-gray-300 py-4 focus:outline-none focus:border-[var(--color-ink)] transition-colors peer placeholder-transparent" placeholder="Name" />
                <label htmlFor="name" className="absolute left-0 top-4 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--color-ink)] peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm">Full Name</label>
              </div>
              
              <div className="relative">
                <input type="email" id="email" className="w-full bg-transparent border-b border-gray-300 py-4 focus:outline-none focus:border-[var(--color-ink)] transition-colors peer placeholder-transparent" placeholder="Email" />
                <label htmlFor="email" className="absolute left-0 top-4 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--color-ink)] peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm">Email Address</label>
              </div>

              <div className="relative">
                <select id="service" defaultValue="" className="w-full bg-transparent border-b border-gray-300 py-4 focus:outline-none focus:border-[var(--color-ink)] transition-colors text-[var(--color-ink)] appearance-none rounded-none">
                  <option value="" disabled className="text-gray-400">Select a Service</option>
                  <option value="trimming">Precision Trimming</option>
                  <option value="removal">Strategic Removal</option>
                  <option value="maintenance">Estate Maintenance</option>
                  <option value="consultation">Arborist Consultation</option>
                </select>
              </div>
              
              <div className="relative">
                <textarea id="message" rows={3} className="w-full bg-transparent border-b border-gray-300 py-4 focus:outline-none focus:border-[var(--color-ink)] transition-colors peer placeholder-transparent resize-none" placeholder="Details"></textarea>
                <label htmlFor="message" className="absolute left-0 top-4 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--color-ink)] peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm">Project Details</label>
              </div>
              
              <button type="submit" className="w-full bg-[var(--color-ink)] text-white py-5 text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-brand)] transition-colors duration-500">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="bg-[var(--color-ink)] text-white py-12 px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <img src="https://i.imgur.com/P732wbl.png" alt="Bulldogs Logo" className="h-20 md:h-24 w-auto object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs tracking-[0.1em] uppercase text-gray-400 items-center">
            <a href="https://www.instagram.com/bulldogs_lawn_and_tree/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a href="https://www.youtube.com/@Bulldogs-lawn-and-Tree" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <Youtube className="h-4 w-4" /> YouTube
            </a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
