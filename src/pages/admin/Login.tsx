import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signIn(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("E-mel atau kata laluan tidak sah. Sila cuba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-8">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-gold/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tr from-gold/5 to-transparent rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="admin-card p-8 lg:p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-playfair mb-3 text-cream"
            >
              <span className="text-gold">Rem</span>bayung
            </motion.h1>
            <p className="text-cream/60 text-sm tracking-wider uppercase font-outfit">
              Panel Pentadbir
            </p>
            <div className="w-16 h-[1px] bg-gold/30 mx-auto mt-4" />
          </div>

          {/* Login Icon */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center"
            >
              <Lock size={32} className="text-gold" />
            </motion.div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3"
            >
              <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-cream/80 text-sm font-medium mb-3 flex items-center gap-2"
              >
                <Mail size={16} className="text-gold" />
                E-mel
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rembayung.com"
                required
                className="w-full bg-primary/50 border border-cream/10 rounded-lg px-4 py-3.5 text-cream placeholder-cream/30 focus:outline-none focus:border-gold transition-all font-outfit"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-cream/80 text-sm font-medium mb-3 flex items-center gap-2"
              >
                <Lock size={16} className="text-gold" />
                Kata Laluan
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-primary/50 border border-cream/10 rounded-lg px-4 py-3.5 text-cream placeholder-cream/30 focus:outline-none focus:border-gold transition-all font-outfit"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-primary font-semibold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8 font-outfit tracking-wide"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sedang Log Masuk...
                </>
              ) : (
                "LOG MASUK"
              )}
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-cream/50 text-sm hover:text-gold transition-colors font-outfit"
            >
              ← Kembali ke laman utama
            </a>
          </div>
        </div>

        {/* Demo Credentials Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-cream/30 text-xs font-outfit">
            Demo: Sila hubungi pentadbir untuk kelayakan log masuk
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
