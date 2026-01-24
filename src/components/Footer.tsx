import { Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";

// TikTok icon component (not in lucide-react)
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/rembayungmy/",
    label: "Instagram",
  },
  {
    icon: TikTokIcon,
    href: "https://www.tiktok.com/@rembayungmy?is_from_webapp=1&sender_device=pc",
    label: "TikTok",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/rembayungmy",
    label: "Facebook",
  },
];

const footerLinks = [
  { name: "Utama", href: "#hero" },
  { name: "Tentang", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Tempahan", href: "#booking" },
  { name: "Lokasi", href: "#location" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary relative pt-24 pb-8 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 border-b border-white/10 pb-12">
          {/* Brand Column (Left) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <p className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-6">
                Rembayung
              </p>
              <h3 className="text-4xl md:text-5xl font-playfair text-white leading-tight mb-8">
                Warisan Melayu, <br />
                <span className="text-gold italic">Citarasa Dunia.</span>
              </h3>
            </div>
            <p className="text-cream/50 text-sm max-w-xs leading-relaxed font-outfit font-light">
              Sebuah restoran yang meraikan keaslian masakan kampung di tengah
              kemodenan Kuala Lumpur.
            </p>
          </div>

          {/* Spacer */}
          <div className="lg:col-span-2"></div>

          {/* Info Columns (Right) */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Location */}
            <div>
              <h4 className="text-white font-outfit text-sm font-medium uppercase tracking-widest mb-6">
                Lokasi
              </h4>
              <p className="text-cream/60 font-outfit font-light text-sm leading-relaxed mb-4">
                Jalan Raja Muda Musa, <br />
                Kampung Baru, <br />
                50300 Kuala Lumpur.
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                className="text-gold text-sm hover:text-white transition-colors border-b border-gold/30 pb-0.5"
                rel="noreferrer"
              >
                Lihat di Peta
              </a>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-outfit text-sm font-medium uppercase tracking-widest mb-6">
                Hubungi
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+60123456789"
                    className="text-cream/60 hover:text-gold transition-colors text-sm font-outfit font-light"
                  >
                    +60 12-345 6789
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@rembayung.com"
                    className="text-cream/60 hover:text-gold transition-colors text-sm font-outfit font-light"
                  >
                    hello@rembayung.com
                  </a>
                </li>
              </ul>
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold/60 hover:text-gold transition-colors"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Menu */}
            <div>
              <h4 className="text-white font-outfit text-sm font-medium uppercase tracking-widest mb-6">
                Menu
              </h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-cream/60 hover:text-white transition-colors text-sm font-outfit font-light uppercase tracking-wide text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: LED Scrolling Marquee Effect */}
        <div className="relative overflow-hidden h-[15vw]">
          <motion.div
            className="flex gap-24 absolute whitespace-nowrap"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Repeat the text multiple times for seamless loop */}
            <h1 className="text-[12vw] leading-none font-playfair font-normal text-white/5 select-none pointer-events-none">
              REMBAYUNG
            </h1>
            <h1 className="text-[12vw] leading-none font-playfair font-normal text-white/5 select-none pointer-events-none">
              REMBAYUNG
            </h1>
            <h1 className="text-[12vw] leading-none font-playfair font-normal text-white/5 select-none pointer-events-none">
              REMBAYUNG
            </h1>
            <h1 className="text-[12vw] leading-none font-playfair font-normal text-white/5 select-none pointer-events-none">
              REMBAYUNG
            </h1>
          </motion.div>

          <div className="absolute bottom-4 left-0 right-0 flex flex-col md:flex-row justify-between items-end px-2 text-[10px] md:text-xs text-cream/20 font-outfit uppercase tracking-widest">
            <p>© {currentYear} Hak Cipta Terpelihara</p>
            <p>Di bina oleh Azim Adanan</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
