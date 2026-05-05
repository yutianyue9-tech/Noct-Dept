import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  ShoppingBag, 
  Instagram, 
  Twitter,
  ExternalLink,
  Volume2,
  VolumeX,
  PlayCircle
} from 'lucide-react';

// --- Types ---
interface CollectionItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

// --- Data ---
const FEATURED_ITEMS: CollectionItem[] = [
  {
    id: '01',
    title: 'THE VELVET OBSCURA',
    category: 'OUTERWEAR',
    year: 'FALL 2024',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
    description: 'A study in deep shadows and structured silhouettes. Hand-tailored in Milan from heavy Italian velvet.'
  },
  {
    id: '02',
    title: 'SILICA SHROUD',
    category: 'DRAPERY',
    year: 'SPRING 2025',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
    description: 'Technical organza layered to create a shimmering, ethereal distortion of the human form.'
  },
  {
    id: '03',
    title: 'ONYX MONOLITH',
    category: 'ARCHIVAL',
    year: '2023 EDITION',
    image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=1200',
    description: 'The definitive architectural jacket. Zero-waste pattern cutting meets industrial hardware.'
  }
];

const ARCHIVE_CATEGORIES = [
  'NOIR TAILORING',
  'TECHNICAL VEILS',
  'INDUSTRIAL LEATHER',
  'CONCEPTUAL KNIT',
  'OBJECTS'
];

// --- Components ---

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 h-20 flex items-center px-6 md:px-12 ${
        isScrolled ? 'bg-surface/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-8">
          <button 
            id="menu-toggle"
            className="p-2 hover:bg-surface-bright/20 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-[10px] tracking-[0.2em] font-bold hover:text-primary transition-colors">ARCHIVE</a>
            <a href="#" className="text-[10px] tracking-[0.2em] font-bold hover:text-primary transition-colors">DEPT. RETAIL</a>
            <a href="#" className="text-[10px] tracking-[0.2em] font-bold hover:text-primary transition-colors">CINEMA</a>
          </div>
        </div>

        <a href="/" className="absolute left-1/2 -translate-x-1/2 text-2xl font-serif tracking-tighter font-bold">
          NOCT DEPT<span className="text-xs align-top opacity-50 ml-0.5">®</span>
        </a>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-1.5 text-[10px] tracking-widest font-medium opacity-70 hover:opacity-100 transition-opacity">
            <Search className="w-3.5 h-3.5" />
            SEARCH
          </button>
          <div className="h-4 w-[1px] bg-outline-variant mx-2 hidden md:block"></div>
          <button className="relative p-2">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-surface z-[60] flex flex-col p-12"
          >
            <button 
              className="absolute top-8 right-8 p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            <div className="mt-20 space-y-8">
              {['COLLECTIONS', 'ARCHIVE', 'ABOUT', 'RETAIL', 'JOURNAL'].map((item) => (
                <a 
                  key={item}
                  href="#"
                  className="block text-5xl font-serif font-bold hover:italic transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="mt-auto border-t border-outline-variant pt-8 flex gap-6">
              <Instagram className="w-5 h-5 opacity-60" />
              <Twitter className="w-5 h-5 opacity-60" />
              <span className="text-xs tracking-widest ml-auto opacity-40 italic">©2024 NOCT DEPT.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-surface-container-lowest">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-20 scale-105 transition-transform duration-[60s] ease-linear brightness-50 contrast-125"
          style={{ transform: `scale(${1 + scrollYProgress.get() * 0.1})` }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-man-in-a-black-outfit-walking-slowly-in-the-dark-44161-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60"></div>
      </div>

      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4"
      >
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="block text-primary text-xs tracking-[0.5em] font-medium mb-6"
        >
          AN ARCHIVE OF OBSESSION
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-9xl font-serif font-bold italic tracking-tighter leading-none"
        >
          Nocturnally <br /> 
          <span className="not-italic font-bold">Engineered</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex flex-col items-center gap-8"
        >
          <p className="max-w-md text-sm leading-relaxed text-on-surface-variant font-medium">
            Bridging the gap between cinema and couture. Explore the inaugural archive of structured shadows and technical drapery.
          </p>
          
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-primary text-on-primary text-[10px] tracking-[0.3em] font-bold hover:bg-white transition-colors">
              SHOP ARCHIVE
            </button>
            <button className="px-8 py-3 border border-outline text-[10px] tracking-[0.3em] font-bold hover:bg-surface-bright overflow-hidden relative group">
              <span className="relative z-10">THE FILM</span>
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <span className="text-[8px] tracking-[1em] rotate-90 vertical-text whitespace-nowrap mb-8">SCROLL</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-primary to-transparent"></div>
      </div>
    </section>
  );
};

const CollectionCard: React.FC<{ item: CollectionItem; index: number }> = ({ item, index }) => {
  return (
    <motion.div 
      id={`item-${item.id}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, delay: index * 0.1 }}
      className={`group relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center mb-32 md:mb-64 ${
        index % 2 === 0 ? '' : 'md:flex-row-reverse'
      }`}
    >
      <div className={`md:col-span-7 overflow-hidden relative aspect-[4/5] ${
        index % 2 === 0 ? 'md:order-1' : 'md:order-2'
      }`}>
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 grayscale brightness-50 contrast-125"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700"></div>
        <div className="absolute top-8 left-8 text-xs font-bold tracking-widest bg-surface/80 backdrop-blur px-3 py-1">
          {item.category}
        </div>
      </div>

      <div className={`md:col-span-5 ${
        index % 2 === 0 ? 'md:order-2 md:pl-12' : 'md:order-1 md:pr-12'
      }`}>
        <span className="text-xs font-mono text-outline italic block mb-2">{item.year} // ART. {item.id}</span>
        <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6 group-hover:italic transition-all duration-500 tracking-tight">
          {item.title}
        </h3>
        <p className="text-on-surface-variant leading-relaxed text-sm mb-10 max-w-sm">
          {item.description}
        </p>
        <button className="flex items-center gap-4 group/btn">
          <span className="text-[10px] tracking-widest font-bold">VIEW TECHNICAL SPECS</span>
          <div className="w-8 h-[1px] bg-primary group-hover/btn:w-16 transition-all duration-500"></div>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

const ConceptSection: React.FC = () => {
  return (
    <section id="concept" className="py-20 md:py-40 px-6 md:px-12 bg-surface">
      <div className="max-w-6xl auto border-t border-b border-outline-variant py-24 flex flex-col md:flex-row gap-12 md:items-center">
        <div className="flex-1">
          <h2 className="text-5xl md:text-7xl font-serif italic mb-8 max-w-lg leading-[0.9]">
            Objects derived from <br /> 
            <span className="not-italic font-bold">Absolute</span> Darkness.
          </h2>
        </div>
        <div className="flex-1">
          <div className="space-y-6 text-on-surface-variant font-medium leading-relaxed max-w-md">
            <p className="text-sm">
              NOCT DEPT. is more than a boutique; it is an investigation into the intersection of cinematic atmosphere and the tactile reality of high fashion.
            </p>
            <p className="text-sm opacity-60 italic">
              "We build for the character who inhabits the shadows between frames."
            </p>
            <div className="pt-4">
              <button className="text-[10px] tracking-widest font-bold flex items-center gap-2 group">
                READ THE MANIFESTO
                <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RollingTape: React.FC = () => {
  return (
    <div className="py-8 bg-surface-container overflow-hidden border-y border-outline-variant/30 flex whitespace-nowrap">
      {[1, 2, 3].map((i) => (
        <motion.div 
          key={i}
          initial={{ x: 0 }}
          animate={{ x: '-100%' }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex gap-20 items-center px-10"
        >
          {ARCHIVE_CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center gap-20">
              <span className="text-[10px] tracking-[0.5em] font-bold opacity-30">{cat}</span>
              <div className="w-2 h-2 rounded-full bg-primary opacity-20"></div>
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const CinemaGrid: React.FC = () => {
  return (
    <section id="cinema" className="py-32 px-6 md:px-12">
      <div className="flex justify-between items-end mb-16">
        <div>
          <span className="text-[10px] tracking-widest font-bold text-outline uppercase block mb-4">// CINEMATIC FRAGMENTS</span>
          <h2 className="text-4xl md:text-6xl font-serif italic">The Visual Journal</h2>
        </div>
        <button className="text-[10px] tracking-widest font-bold underline underline-offset-8">EXPLORE ALL MEDIA</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
        <div className="col-span-2 row-span-2 relative overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover grayscale brightness-50 contrast-150 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-1000" 
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-opacity"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle className="w-20 h-20 text-white/50" />
          </div>
          <div className="absolute bottom-6 left-6 text-xs italic opacity-0 group-hover:opacity-70 transition-all transform translate-y-2 group-hover:translate-y-0">
            SCENE 04 // THE RAIN IN BRERA
          </div>
        </div>
        <div className="relative overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale brightness-50 contrast-125 hover:brightness-100 transition-all duration-700" />
        </div>
        <div className="relative overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale brightness-50 contrast-125 hover:brightness-100 transition-all duration-700" />
        </div>
        <div className="col-span-2 relative overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
             <span className="text-xs tracking-[0.4em] font-medium border border-white/10 px-6 py-2">EXPERIMENTAL</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-surface-container-lowest pt-32 pb-12 px-6 md:px-12 border-t border-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
        <div className="md:col-span-2">
          <h2 className="text-6xl md:text-8xl font-serif font-bold italic mb-12">NOCT DEPT.</h2>
          <div className="flex gap-8 items-center mb-12">
            <Instagram className="w-6 h-6 hover:text-primary transition-colors cursor-pointer" />
            <Twitter className="w-6 h-6 hover:text-primary transition-colors cursor-pointer" />
            <p className="text-[10px] tracking-widest font-bold opacity-40">MILANO / TOKYO / NEW YORK</p>
          </div>
          <div className="relative w-full max-w-sm">
            <input 
              type="email" 
              placeholder="JOIN THE ARCHIVE (EMAIL)" 
              className="w-full bg-transparent border-b border-outline-variant py-4 text-xs tracking-widest outline-none focus:border-primary transition-colors"
            />
            <button className="absolute right-0 bottom-4">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] tracking-[0.3em] font-bold text-outline mb-8">NAVIGATION</h4>
          {['Collections', 'The Archive', 'Cinema', 'Retail Dept', 'About', 'Contact'].map(link => (
            <a key={link} href="#" className="block text-sm font-medium hover:text-primary transition-colors">{link}</a>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] tracking-[0.3em] font-bold text-outline mb-8">LEGAL</h4>
          {['Privacy Policy', 'Terms of Use', 'Accessibility', 'Shipping/Returns'].map(link => (
            <a key={link} href="#" className="block text-sm font-medium hover:text-primary transition-colors">{link}</a>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-outline-variant/10 opacity-30 text-[9px] tracking-[0.2em] font-bold">
        <p>© 2024 NOCT DEPT. ALL RIGHTS RESERVED.</p>
        <p>COORDINATES: 45.4642° N, 9.1900° E</p>
        <p>STAY IN THE DARK.</p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial load for cinematic effect
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="grain-overlay"></div>
      
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="preloader"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="text-xs tracking-[1em] font-serif italic mb-12 opacity-50"
            >
              CULTIVATING DARKNESS
            </motion.div>
            <div className="w-12 h-12 border border-white/10 flex items-center justify-center p-2">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="w-full h-full border-t border-primary"
              ></motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      
      <main>
        <Hero />
        
        <RollingTape />

        <section id="featured-archive" className="px-6 md:px-12 py-32 md:py-64 max-w-7xl mx-auto">
          <div className="mb-32 md:mb-64">
            <span className="text-[10px] tracking-[0.5em] font-bold text-outline block mb-6">SELECTED PIECES</span>
            <h2 className="text-5xl md:text-8xl font-serif font-bold italic tracking-tighter">Archival <br /> Highlights</h2>
          </div>

          <div className="space-y-32">
            {FEATURED_ITEMS.map((item, idx) => (
              <CollectionCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </section>

        <ConceptSection />

        <div className="relative h-screen bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549497538-301288c86a1a?auto=format&fit=crop&q=80&w=1500")' }}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 text-center">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-serif italic font-bold mb-8">"We dress the void between moments."</h2>
              <p className="text-sm tracking-widest font-bold opacity-30">MILANO ARTISANRY // FUTURE ARTIFACTS</p>
            </div>
          </div>
        </div>

        <CinemaGrid />

        <section className="py-40 flex flex-col items-center justify-center text-center px-6">
          <span className="text-[10px] tracking-[0.5em] font-bold mb-8 opacity-40">NEXT COLLECTION</span>
          <h2 className="text-6xl md:text-9xl font-serif font-bold italic tracking-tighter mb-12">Monolith II</h2>
          <button className="flex items-center gap-4 group">
            <span className="text-[10px] tracking-[0.3em] font-bold">NOTIFY ME ON ARRIVAL</span>
            <div className="w-20 h-[1px] bg-primary group-hover:w-32 transition-all"></div>
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>
      </main>

      <Footer />
      
      <div className="fixed bottom-12 right-12 z-40 hidden md:flex flex-col gap-6 items-center opacity-30 hover:opacity-100 transition-opacity duration-700">
        <div className="w-[1px] h-32 bg-primary"></div>
        <div className="flex flex-col gap-6">
          <Instagram className="w-4 h-4 cursor-pointer" />
          <Twitter className="w-4 h-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default App;
