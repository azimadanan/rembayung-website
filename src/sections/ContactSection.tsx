import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook, Send } from "lucide-react";
import { useState } from "react";

// TikTok icon component
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    value: "+60 12-345 6789",
    href: "tel:+60123456789",
  },
  {
    icon: Mail,
    title: "E-mel",
    value: "hello@rembayung.com",
    href: "mailto:hello@rembayung.com",
  },
  {
    icon: MapPin,
    title: "Alamat",
    value: "Kampung Baru, Kuala Lumpur",
    href: "https://maps.google.com/?q=Kampung+Baru+Kuala+Lumpur",
  },
];

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/rembayungmy/",
    label: "Instagram",
    handle: "@rembayungmy",
  },
  {
    icon: TikTokIcon,
    href: "https://www.tiktok.com/@rembayungmy?is_from_webapp=1&sender_device=pc",
    label: "TikTok",
    handle: "@rembayungmy",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/rembayungmy",
    label: "Facebook",
    handle: "Rembayung",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="section bg-primary-light relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tl from-secondary/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">Hubungi Kami</p>
          <h2 className="section-title">
            Mari <span className="gradient-text">Berhubung</span>
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto mt-4">
            Ada soalan atau maklum balas? Kami sentiasa bersedia untuk mendengar
            daripada anda.
          </p>
          <div className="divider mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.href}
                target={info.title === "Alamat" ? "_blank" : undefined}
                rel={
                  info.title === "Alamat" ? "noopener noreferrer" : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="glass rounded-xl p-6 flex items-center gap-4 group cursor-pointer block"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                  <info.icon
                    size={24}
                    className="text-accent group-hover:text-primary transition-colors duration-300"
                  />
                </div>
                <div>
                  <p className="text-cream/50 text-sm">{info.title}</p>
                  <p className="text-cream font-medium group-hover:text-accent transition-colors">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-8"
            >
              <h3 className="text-lg font-semibold text-cream mb-6">
                Ikuti Kami
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass rounded-xl px-5 py-3 flex items-center gap-3 hover:bg-accent/10 transition-colors"
                  >
                    <social.icon size={20} className="text-accent" />
                    <span className="text-cream/70 text-sm">
                      {social.handle}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass rounded-2xl p-8 lg:p-10">
              <h3 className="text-2xl font-playfair text-cream mb-6">
                Hantar Mesej
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-green-500" />
                  </div>
                  <p className="text-cream font-medium">
                    Mesej telah dihantar!
                  </p>
                  <p className="text-cream/60 text-sm mt-2">
                    Kami akan menghubungi anda segera.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-cream/80 text-sm font-medium mb-2">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Nama anda"
                      required
                      className="w-full bg-primary border border-accent/20 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-cream/80 text-sm font-medium mb-2">
                      E-mel
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="nama@email.com"
                      required
                      className="w-full bg-primary border border-accent/20 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-cream/80 text-sm font-medium mb-2">
                      Mesej
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Tulis mesej anda di sini..."
                      required
                      rows={5}
                      className="w-full bg-primary border border-accent/20 rounded-lg px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary py-4 flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Hantar Mesej
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
