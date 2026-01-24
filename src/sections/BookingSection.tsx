import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";
import { createBooking } from "../lib/supabase";

interface FormData {
  booking_date: string;
  time_slot: "lunch" | "dinner";
  guest_count: number;
  name: string;
  phone: string;
  email: string;
}

const initialFormData: FormData = {
  booking_date: "",
  time_slot: "dinner",
  guest_count: 2,
  name: "",
  phone: "",
  email: "",
};

export default function BookingSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get tomorrow's date as minimum booking date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guest_count" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createBooking(formData);
      setIsSuccess(true);
      setFormData(initialFormData);
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData(initialFormData);
  };

  return (
    <section
      id="booking"
      className="section bg-primary relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full pattern-songket opacity-5 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          {/* Left Content - Editorial Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-10"
          >
            <p className="text-gold tracking-[0.4em] uppercase text-xs md:text-sm font-medium mb-4">
              Tempahan Meja
            </p>
            <h2 className="text-5xl md:text-7xl font-playfair text-white mb-8 leading-tight">
              Jemput <br />
              <span className="text-gold italic">Makan</span>
            </h2>

            <div className="w-20 h-[1px] bg-gold/50 mb-10" />

            <p className="text-cream/80 leading-relaxed mb-16 font-outfit text-xl font-light max-w-md">
              Rembayung beroperasi secara tempahan sahaja untuk memastikan
              kualiti hidangan yang tiada tandingan.
            </p>

            <div className="space-y-12 font-outfit border-l border-white/10 pl-8">
              <div className="group">
                <p className="text-gold uppercase tracking-[0.2em] text-sm mb-3">
                  Waktu Operasi
                </p>
                <div className="text-white text-xl font-light">
                  <p>Tengahari: 11:30 AM - 3:00 PM</p>
                  <p>Malam: 6:00 PM - 10:00 PM</p>
                </div>
              </div>

              <div className="group">
                <p className="text-gold uppercase tracking-[0.2em] text-sm mb-3">
                  Kapasiti
                </p>
                <div className="text-white text-xl font-light">
                  <p>Sesuai untuk 2 - 8 orang</p>
                  <p className="text-cream/60 text-base mt-2">
                    *Untuk kumpulan besar, sila hubungi kami terus.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Booking Form (Reservation Card Style) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass p-8 lg:p-12 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-50" />
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-8 bg-gold/5">
                      <CheckCircle size={40} className="text-gold" />
                    </div>
                    <h3 className="text-4xl font-playfair text-white mb-6">
                      Tempahan Diterima
                    </h3>
                    <p className="text-cream/60 mb-10 font-outfit text-lg font-light max-w-sm mx-auto">
                      Terima kasih. Kami menanti kehadiran anda di Rembayung.
                    </p>
                    <button
                      onClick={resetForm}
                      className="px-8 py-3 border border-gold/30 text-gold hover:bg-gold hover:text-primary transition-all duration-300 uppercase tracking-widest text-xs"
                    >
                      Buat Tempahan Lain
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-10"
                  >
                    <div className="grid md:grid-cols-2 gap-10">
                      {/* Date Input */}
                      <div className="flex flex-col gap-3 group">
                        <label
                          htmlFor="booking_date"
                          className="text-xs md:text-sm text-gold font-bold tracking-[0.2em] uppercase"
                        >
                          Tarikh
                        </label>
                        <input
                          id="booking_date"
                          type="date"
                          name="booking_date"
                          value={formData.booking_date}
                          onChange={handleChange}
                          min={minDate}
                          required
                          className="w-full bg-transparent border-b border-white/20 py-2 text-white text-xl focus:outline-none focus:border-gold transition-colors font-playfair uppercase placeholder-transparent cursor-pointer hover:border-white/40"
                        />
                      </div>

                      {/* Time Select */}
                      <div className="flex flex-col gap-3 group">
                        <label
                          htmlFor="time_slot"
                          className="text-xs md:text-sm text-gold font-bold tracking-[0.2em] uppercase"
                        >
                          Waktu
                        </label>
                        <div className="relative">
                          <select
                            id="time_slot"
                            name="time_slot"
                            value={formData.time_slot}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b border-white/20 py-2 text-white text-xl focus:outline-none focus:border-gold transition-colors font-playfair appearance-none cursor-pointer hover:border-white/40"
                          >
                            <option
                              value="lunch"
                              className="bg-primary-light text-white"
                            >
                              Makan Tengahari
                            </option>
                            <option
                              value="dinner"
                              className="bg-primary-light text-white"
                            >
                              Makan Malam
                            </option>
                          </select>
                          <ChevronDown
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-gold transition-colors"
                            size={16}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Guest Count */}
                    <div className="pt-4">
                      <div className="flex justify-between items-end mb-6">
                        <label className="text-xs md:text-sm text-gold font-bold tracking-[0.2em] uppercase">
                          Bilangan Tetamu
                        </label>
                        <span className="text-3xl font-playfair text-white">
                          {formData.guest_count}
                        </span>
                      </div>
                      <input
                        id="guest_count"
                        type="range"
                        name="guest_count"
                        min="2"
                        max="8"
                        value={formData.guest_count}
                        onChange={handleChange}
                        className="w-full h-[1px] bg-white/10 appearance-none cursor-pointer accent-gold hover:bg-white/20 transition-colors"
                        aria-label="Bilangan Tetamu"
                      />
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8 pt-4">
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="name"
                          className="text-xs md:text-sm text-gold font-bold tracking-[0.2em] uppercase"
                        >
                          Nama Penuh
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-transparent border-b border-white/20 py-2 text-white text-xl focus:outline-none focus:border-gold transition-colors font-playfair placeholder-transparent hover:border-white/40"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-3">
                          <label
                            htmlFor="phone"
                            className="text-xs md:text-sm text-gold font-bold tracking-[0.2em] uppercase"
                          >
                            No. Telefon
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b border-white/20 py-2 text-white text-xl focus:outline-none focus:border-gold transition-colors font-playfair placeholder-transparent hover:border-white/40"
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <label
                            htmlFor="email"
                            className="text-xs md:text-sm text-gold font-bold tracking-[0.2em] uppercase"
                          >
                            E-mel
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b border-white/20 py-2 text-white text-xl focus:outline-none focus:border-gold transition-colors font-playfair placeholder-transparent hover:border-white/40"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold hover:bg-white text-primary font-bold py-6 mt-10 transition-all duration-500 uppercase tracking-[0.2em] text-base md:text-lg rounded-xl shadow-2xl hover:shadow-gold/30 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden transform hover:-translate-y-1 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <div className="flex justify-center">
                          <Loader2 size={24} className="animate-spin" />
                        </div>
                      ) : (
                        <span className="relative z-10 flex items-center justify-center gap-4">
                          Sahkan Tempahan
                        </span>
                      )}
                      <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
