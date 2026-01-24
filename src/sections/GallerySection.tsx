import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleryImages = [
  {
    src: "/photo/hidangan utama.png",
    alt: "Hidangan utama",
    category: "food",
  },
  {
    src: "/photo/interior restoran.png",
    alt: "Interior restoran",
    category: "interior",
  },
  {
    src: "/photo/Screenshot 2026-01-24 230911.png",
    alt: "Char Kway Teow",
    category: "food",
  },
  {
    src: "/photo/suasana malam.png",
    alt: "Suasana malam",
    category: "atmosphere",
  },
  {
    src: "/photo/Screenshot 2026-01-24 230955.png",
    alt: "Laksa Heritage",
    category: "food",
  },
  {
    src: "/photo/menu_utama.png",
    alt: "Menu utama",
    category: "interior",
  },
  {
    src: "/photo/Screenshot 2026-01-24 231829.png",
    alt: "Gulai Ayam Kampung",
    category: "food",
  },
  {
    src: "/photo/Screenshot 2026-01-24 230919.png",
    alt: "Tempeh Goreng",
    category: "food",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section
      id="gallery"
      className="section bg-primary relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 batik-overlay opacity-30" />

      <div className="container mx-auto relative z-10">
        {/* Header - Editorial Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-10"
        >
          <div className="text-center lg:text-left">
            <p className="text-gold tracking-[0.4em] uppercase text-xs md:text-sm font-medium mb-4">
              Galeri
            </p>
            <h2 className="text-5xl md:text-7xl font-playfair text-white">
              Suasana <span className="text-gold italic">Rembayung</span>
            </h2>
            <div className="w-16 h-[1px] bg-gold/50 mx-auto lg:mx-0 mt-8" />
          </div>

          <p className="text-cream/70 max-w-xl mx-auto lg:mx-0 lg:text-right font-outfit text-lg font-light leading-relaxed lg:max-w-md">
            Jelajahi keindahan ruangan dan hidangan kami melalui lensa kamera.
          </p>
        </motion.div>

        {/* Gallery Grid - Editorial Photo Wall */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-sm cursor-pointer group border border-white/5 ${
                index === 0 || index === 5 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover transition-all duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 ${
                  index === 0 || index === 5 ? "h-64 md:h-full" : "h-64 md:h-64"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2 font-outfit">
                  {image.category}
                </p>
                <p className="text-white text-lg font-playfair">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
