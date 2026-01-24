import { motion } from "framer-motion";
import { MapPin, Clock, Navigation } from "lucide-react";

export default function LocationSection() {
  const openMaps = () => {
    window.open("https://maps.app.goo.gl/r3kkq2XSzMc35EEJ6", "_blank");
  };

  return (
    <section
      id="location"
      className="section bg-primary relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-light/30 via-primary to-primary pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle text-gold tracking-widest">Lokasi</p>
          <h2 className="section-title text-gradient-gold">
            Cari <span className="text-cream italic font-playfair">Kami</span>
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-8 opacity-30" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-[500px] shadow-2xl border border-white/10 backdrop-blur-sm">
              {/* Styled Map Embed - Inverted for Dark Mode */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.7468373462543!2d101.69687!3d3.1614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d47e816b1b%3A0x1a9726e88b87a8e5!2sKampung%20Baru%2C%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1705987200000!5m2!1sen!2smy"
                className="w-full h-full border-0 grayscale-[0.5] invert brightness-[0.8] hue-rotate-[15deg] sepia-[0.2]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rembayung Location"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 pointer-events-none border border-gold/10 rounded-2xl shadow-inner" />
            </div>

            {/* Get Directions Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openMaps}
              className="absolute bottom-6 left-6 btn-primary flex items-center gap-2 shadow-xl shadow-black/50"
            >
              <Navigation size={18} />
              Dapatkan Arah
            </motion.button>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Address Card */}
            <div className="glass p-8 transition-all hover:border-gold/30 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 border border-gold/20">
                  <MapPin size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-3xl font-playfair text-white mb-3">
                    Alamat
                  </h3>
                  <p className="text-cream leading-relaxed font-outfit text-xl font-light">
                    Kampung Baru
                    <br />
                    Kuala Lumpur, 50300
                    <br />
                    Malaysia
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="glass p-8 transition-all hover:border-gold/30 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 border border-gold/20">
                  <Clock size={24} className="text-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-playfair text-white mb-6">
                    Waktu Operasi
                  </h3>
                  <div className="space-y-5 font-outfit">
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-cream/80 text-lg font-light">
                        Isnin - Khamis
                      </span>
                      <span className="text-white text-xl font-medium">
                        11:30 AM - 10:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-cream/80 text-lg font-light">
                        Jumaat - Ahad
                      </span>
                      <span className="text-white text-xl font-medium">
                        11:30 AM - 11:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-cream/80 text-lg font-light">
                        Cuti Umum
                      </span>
                      <span className="text-gold text-xl font-semibold">
                        Buka
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="rounded-xl p-8 glass border border-white/10">
              <p className="text-cream text-base md:text-lg leading-relaxed font-outfit font-light">
                <span className="text-gold font-bold mr-2">Nota:</span>
                Rembayung beroperasi secara tempahan sahaja. Sila buat tempahan
                sekurang-kurangnya 24 jam lebih awal.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
