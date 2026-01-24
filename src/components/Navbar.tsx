import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Utama", href: "#hero" },
  { name: "Tentang", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Galeri", href: "#gallery" },
  { name: "Lokasi", href: "#location" },
  { name: "Hubungi", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (!isHomePage) {
      window.location.href = "/" + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass py-3 px-4 mx-4 mt-2 rounded-2xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.span
              className="text-2xl md:text-3xl font-playfair font-normal tracking-wide"
              whileHover={{ scale: 1.02 }}
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
            >
              <span className="text-gold">Rem</span>bayung
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-cream/90 hover:text-gold transition-colors duration-300 tracking-widest uppercase font-outfit"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("#booking")}
              className="btn-primary text-xs px-6 py-3 border border-gold/20 shadow-lg shadow-black/20"
            >
              Tempah Sekarang
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-cream p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-primary/95 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-full sm:w-[450px] bg-primary border-l border-white/5 shadow-2xl p-8 md:p-12 pt-28 flex flex-col overflow-y-auto"
            >
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 pattern-songket opacity-[0.07] pointer-events-none mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary/50 pointer-events-none" />

              {/* Close Button Inside Drawer */}
              <button
                className="absolute top-8 right-8 text-gold-light/50 hover:text-gold p-3 hover:bg-white/5 rounded-full transition-all duration-300 z-20 group"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Tutup Menu"
              >
                <X
                  size={28}
                  className="group-hover:rotate-90 transition-transform duration-500"
                />
              </button>

              {/* Branding inside Menu */}
              <div className="mb-12 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gold tracking-[0.4em] uppercase text-[8px] font-bold mb-2 opacity-60">
                    Rembayung
                  </p>
                  <h3 className="text-3xl font-playfair text-white flex flex-col">
                    <span>Warisan</span>
                    <span className="text-gold italic -mt-1">Melayu</span>
                  </h3>
                  <div className="w-10 h-[1px] bg-gold/30 mt-4" />
                </motion.div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-6 relative z-10">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.08 }}
                    onClick={() => scrollToSection(link.href)}
                    className="group flex items-baseline text-left"
                  >
                    <span className="text-[9px] font-outfit text-gold/40 mr-4 tracking-widest font-bold group-hover:text-gold transition-colors">
                      0{index + 1}
                    </span>
                    <span className="text-2xl md:text-3xl font-playfair text-white group-hover:text-gold transition-all duration-300 group-hover:translate-x-2">
                      {link.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Footer inside Menu */}
              <div className="mt-auto pt-8 border-t border-white/10 relative z-10">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={() => scrollToSection("#booking")}
                  className="w-full group relative overflow-hidden flex items-center justify-center py-7 border-2 border-gold/30 hover:border-gold transition-all duration-500"
                >
                  <span className="relative z-10 text-gold group-hover:text-primary font-bold uppercase tracking-[0.3em] text-sm transition-colors duration-500">
                    Tempah Sekarang
                  </span>
                  <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </motion.button>
                <p className="text-center text-[10px] text-cream/30 uppercase tracking-[0.2em] mt-8 font-outfit">
                  Masakan Kampung, Citarasa Semua
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
