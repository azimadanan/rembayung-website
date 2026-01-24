import { motion } from "framer-motion";

const menuItems = [
  {
    name: "Char Kway Teow",
    description:
      "Kway teow goreng panas dengan udang segar, kerang, dan taugeh rangup.",
    image: "/photo/Screenshot 2026-01-24 230911.png",
    tag: "Popular",
    price: "RM 15",
  },
  {
    name: "Tempeh Goreng",
    description:
      "Tempeh rangup disalut rempah istimewa, dihidang panas dengan sambal kicap.",
    image: "/photo/Screenshot 2026-01-24 230919.png",
    tag: "Side Dish",
    price: "RM 8",
  },
  {
    name: "Lime Frosty",
    description:
      "Minuman limau nipis segar dengan ais hancur, penghilang dahaga yang sempurna.",
    image: "/photo/Screenshot 2026-01-24 230927.png",
    tag: "Refreshing",
    price: "RM 6",
  },
  {
    name: "Beef Bun Rembayung",
    description:
      "Bun lembut dengan daging premium, keju cair, dan limpahan sos istimewa.",
    image: "/photo/Screenshot 2026-01-24 230948.png",
    tag: "Specialty",
    price: "RM 18",
  },
  {
    name: "Laksa Heritage",
    description:
      "Laksa autentik dengan kuah ikan yang pekat, telur rebus, dan hirisan cili.",
    image: "/photo/Screenshot 2026-01-24 230955.png",
    tag: "Signature",
    price: "RM 16",
  },
  {
    name: "Gulai Ayam Kampung",
    description:
      "Gulai ayam kampung asli dengan kentang, dimasak perlahan dengan santan segar.",
    image: "/photo/Screenshot 2026-01-24 231829.png",
    tag: "Classic",
    price: "RM 32",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function MenuSection() {
  return (
    <section
      id="menu"
      className="section bg-primary text-cream relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-batik-geo opacity-10 pointer-events-none mix-blend-soft-light" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary pointer-events-none" />

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
              Hidangan Istimewa
            </p>
            <h2 className="text-5xl md:text-7xl font-playfair text-white">
              Menu <span className="text-gold italic">Pilihan</span>
            </h2>
            <div className="w-16 h-[1px] bg-gold/50 mx-auto lg:mx-0 mt-8" />
          </div>

          <p className="text-cream/70 max-w-xl mx-auto lg:mx-0 lg:text-right font-outfit text-lg font-light leading-relaxed lg:max-w-md">
            Setiap hidangan dimasak dengan bahan-bahan segar dan rempah ratus
            warisan, menghidangkan cita rasa autentik kampung Melayu.
          </p>
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-8 bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-95 group-hover:opacity-100"
                />

                {/* Dark gradient overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

                {/* Floating Tag - Much More Visible */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="font-outfit text-xs font-extrabold tracking-[0.25em] uppercase text-gold bg-black/80 backdrop-blur-sm px-4 py-2 shadow-xl border border-gold/30">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Content - Clean Editorial */}
              <div className="text-center relative px-4">
                <h3
                  className="text-3xl md:text-4xl font-playfair font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300"
                  style={{
                    textShadow:
                      "0 3px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)",
                  }}
                >
                  {item.name}
                </h3>
                <p className="text-cream/70 text-sm leading-relaxed mb-5 font-outfit font-normal tracking-wide">
                  {item.description}
                </p>
                <p className="text-gold font-bold text-xl font-outfit tracking-widest">
                  {item.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-cream/30 text-xs mt-24 font-outfit uppercase tracking-widest"
        >
          * Menu lengkap akan diberikan semasa tempahan. Harga tertulis adalah
          anggaran.
        </motion.p>
      </div>
    </section>
  );
}
