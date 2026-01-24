import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="section bg-primary relative overflow-hidden"
    >
      {/* Background Decoration */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl"
      />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side - Editorial Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            style={{ y: y1 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Container */}
              <motion.div
                style={{ rotate }}
                className="relative overflow-hidden rounded-sm shadow-2xl border border-white/5"
              >
                <img
                  src="/photo/khairul aming.png"
                  alt="Khairul Aming"
                  className="w-full h-auto aspect-[4/5] object-cover opacity-90"
                />
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Information Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 glass p-6 md:p-10 max-w-[240px] md:max-w-[280px]"
              >
                <div className="mb-4 w-12 h-[1px] bg-gold/50" />
                <p className="text-4xl md:text-5xl font-playfair text-gold mb-3">
                  RM4 Juta
                </p>
                <p className="text-cream/50 text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed">
                  Pelaburan membawa cita rasa kampung ke tengah bandar
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="pl-0 lg:pl-10"
          >
            <p className="text-gold tracking-[0.3em] uppercase text-sm font-medium mb-4">
              Kisah Kami
            </p>
            <h2 className="text-5xl md:text-7xl font-playfair text-white mb-8 leading-[1.1]">
              Dari Dapur Digital <br />
              <span className="text-gold italic">ke Restoran Impian</span>
            </h2>

            <div className="w-16 h-[1px] bg-gold/50 mb-10" />

            <div className="space-y-8 text-cream/80 font-outfit text-xl font-light leading-relaxed">
              <p>
                <span className="text-white font-normal underline decoration-gold/30 underline-offset-4">
                  Khairul Aming
                </span>
                , nama yang tidak asing lagi dalam dunia masakan digital
                Malaysia. Bermula dengan video-video masakan di media sosial,
                beliau telah memikat jutaan hati dengan resepi-resepi autentik
                warisan nenek moyang.
              </p>
              <p>
                Kini, impian untuk membawa{" "}
                <span className="text-gold italic font-playfair text-2xl">
                  cita rasa kampung
                </span>{" "}
                ke dunia nyata akhirnya tercapai.{" "}
                <strong className="text-white font-normal">Rembayung</strong> —
                sebuah restoran yang lahir dari cinta terhadap masakan Melayu,
                dibina dengan penuh kasih sayang di tengah-tengah Kampung Baru,
                Kuala Lumpur.
              </p>
            </div>

            {/* Stats - Minimalist */}
            <div className="grid grid-cols-3 gap-12 mt-16 pt-0">
              <div>
                <p className="text-5xl font-playfair text-gold mb-2">250</p>
                <p className="text-cream/40 text-xs uppercase tracking-[0.2em]">
                  Kapasiti
                </p>
              </div>
              <div>
                <p className="text-5xl font-playfair text-gold mb-2">100%</p>
                <p className="text-cream/40 text-xs uppercase tracking-[0.2em]">
                  Autentik
                </p>
              </div>
              <div>
                <p className="text-5xl font-playfair text-gold mb-2">2026</p>
                <p className="text-cream/40 text-xs uppercase tracking-[0.2em]">
                  Pembukaan
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
