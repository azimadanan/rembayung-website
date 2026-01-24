import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const scrollToBooking = () => {
    const element = document.querySelector("#booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: backgroundY,
        }}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/images/hero-bg.png"
          >
            <source src="/videos/Video Project 6.mp4" type="video/mp4" />
          </video>
        </motion.div>
        {/* Darker Gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary" />
      </motion.div>

      {/* Songket Pattern Overlay */}
      <div className="absolute inset-0 pattern-songket z-0 opacity-15 mix-blend-overlay" />

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div style={{ y: textY, opacity }} className="relative">
          {/* Main Title Group */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 md:mb-12"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gold-light tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-sm font-semibold mb-2 drop-shadow-md"
            >
              Selamat Datang ke
            </motion.p>

            <h1 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-playfair font-normal text-gold py-2 leading-none tracking-tighter drop-shadow-2xl">
              Rembayung
            </h1>

            <p className="font-caveat text-3xl md:text-6xl text-gold/90 mt-4 drop-shadow-lg">
              "Masakan Kampung, Citarasa Semua"
            </p>
          </motion.div>

          {/* CTA Mobile (Visible only on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col items-center lg:hidden gap-4 mt-12"
          >
            <button
              onClick={scrollToBooking}
              className="group flex flex-col items-center gap-3 text-gold hover:text-white transition-colors duration-300"
            >
              <span className="text-lg font-outfit tracking-widest uppercase border-b border-gold/30 pb-1 group-hover:border-white/50">
                Tempah Meja
              </span>
              <span className="bg-gold/10 p-4 rounded-full border border-gold/20 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Desktop CTA (Visible only on LG up) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden lg:flex absolute bottom-12 right-12 flex-col items-end gap-4 z-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToBooking}
            className="group flex items-center gap-3 text-gold hover:text-white transition-colors duration-300"
          >
            <span className="text-xl font-outfit tracking-widest uppercase border-b border-gold/30 pb-1 group-hover:border-white/50">
              Tempah Meja
            </span>
            <span className="bg-gold/10 p-2 rounded-full border border-gold/20 group-hover:bg-gold group-hover:text-primary transition-all duration-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-cream/40 hover:text-gold transition-colors"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  );
}
