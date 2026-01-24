import { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  Loader2,
  RefreshCw,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getBookings,
  updateBookingStatus,
  signOut,
  getSession,
  type Booking,
} from "../../lib/supabase";
import { format, parseISO, isToday, isTomorrow, isPast } from "date-fns";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "pending" | "confirmed" | "cancelled"
  >("all");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchBookings();
  }, []);

  const checkAuth = async () => {
    const session = await getSession();
    if (!session) {
      navigate("/admin");
    }
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const data = await getBookings();
      setBookings(data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (
    id: string,
    status: "confirmed" | "cancelled",
  ) => {
    try {
      await updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b)),
      );
    } finally {
      // Done
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/admin");
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const getDateLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return "Hari Ini";
    if (isTomorrow(date)) return "Esok";
    if (isPast(date)) return "Lepas";
    return format(date, "dd MMM yyyy");
  };

  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1.5 w-fit">
            <CheckCircle size={14} />
            Disahkan
          </span>
        );
      case "cancelled":
        return (
          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex items-center gap-1.5 w-fit">
            <XCircle size={14} />
            Dibatalkan
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold flex items-center gap-1.5 w-fit">
            <Clock size={14} />
            Menunggu
          </span>
        );
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    today: bookings.filter((b) => isToday(parseISO(b.booking_date))).length,
  };

  return (
    <div className="min-h-screen bg-primary font-outfit text-cream antialiased">
      {/* Navbar */}
      <nav className="admin-nav sticky top-0 z-50">
        <div className="w-full px-4 md:px-8 lg:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-playfair font-bold">
              <span className="text-gold">Rem</span>bayung
            </h1>
            <div className="h-4 w-[1px] bg-white/20" />
            <p className="text-[10px] uppercase tracking-widest text-cream/40">
              Admin
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 text-cream/60 hover:text-cream transition-all text-sm font-medium"
          >
            <LogOut size={16} />
            Log Keluar
          </button>
        </div>
      </nav>

      <main className="w-full px-4 md:px-8 lg:px-12 py-10">
        {/* Simple Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              label: "Jumlah Tempahan",
              value: stats.total,
              icon: Users,
              color: "text-blue-400",
            },
            {
              label: "Menunggu",
              value: stats.pending,
              icon: Clock,
              color: "text-yellow-400",
            },
            {
              label: "Disahkan",
              value: stats.confirmed,
              icon: CheckCircle,
              color: "text-green-400",
            },
            {
              label: "Hari Ini",
              value: stats.today,
              icon: Calendar,
              color: "text-gold",
            },
          ].map((stat) => (
            <div key={stat.label} className="admin-stat-card">
              <div className="flex items-start justify-between mb-4">
                <p className="text-xs uppercase tracking-[0.1em] text-gold font-bold">
                  {stat.label}
                </p>
                <stat.icon size={20} className={stat.color} />
              </div>
              <p className="text-4xl font-bold font-playfair text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* List Section */}
        <div className="admin-card overflow-hidden">
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-bold">Senarai Tempahan</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-primary px-3 py-2 rounded-lg border border-white/10">
                <Filter size={14} className="text-cream/40" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as typeof filter)}
                  title="Tapis tempahan mengikut status"
                  className="bg-transparent text-sm focus:outline-none cursor-pointer text-cream [&>option]:bg-primary [&>option]:text-cream"
                >
                  <option value="all" className="bg-primary text-cream">
                    Semua
                  </option>
                  <option value="pending" className="bg-primary text-cream">
                    Menunggu
                  </option>
                  <option value="confirmed" className="bg-primary text-cream">
                    Disahkan
                  </option>
                  <option value="cancelled" className="bg-primary text-cream">
                    Dibatalkan
                  </option>
                </select>
              </div>
              <button
                onClick={fetchBookings}
                title="Segarkan data"
                className="p-2 rounded-lg bg-white/5 text-cream/40 hover:text-gold hover:bg-gold/10 transition-all"
              >
                <RefreshCw
                  size={18}
                  className={isLoading ? "animate-spin" : ""}
                />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-20 text-center opacity-50">
                <Loader2 size={32} className="animate-spin mx-auto mb-4" />
                <p className="text-sm">Memuatkan data...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="py-20 text-center opacity-30 italic">
                <p>Tiada tempahan dijumpai</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-xs uppercase tracking-widest text-gold font-bold">
                    <th className="px-6 py-5">Tarikh</th>
                    <th className="px-6 py-5 text-center">Waktu</th>
                    <th className="px-6 py-5">Pelanggan</th>
                    <th className="px-6 py-5 text-center">Pax</th>
                    <th className="px-6 py-5">Telefon</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <p className="font-bold text-base text-white">
                          {getDateLabel(booking.booking_date)}
                        </p>
                        <p className="text-xs text-cream/50 mt-1 uppercase tracking-wider">
                          {format(
                            parseISO(booking.booking_date),
                            "dd MMM yyyy",
                          )}
                        </p>
                      </td>
                      <td className="px-6 py-5 text-center lowercase">
                        <span
                          className={`px-3 py-1 rounded border text-[11px] font-bold uppercase tracking-wider ${booking.time_slot === "lunch" ? "border-blue-500/50 text-blue-400 bg-blue-500/10" : "border-purple-500/50 text-purple-400 bg-purple-500/10"}`}
                        >
                          {booking.time_slot}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-bold text-base text-white">
                          {booking.name}
                        </p>
                        <p className="text-sm text-cream/50">{booking.email}</p>
                      </td>
                      <td className="px-6 py-5 text-center font-bold text-lg">
                        {booking.guest_count}
                      </td>
                      <td className="px-6 py-5">
                        <a
                          href={`tel:${booking.phone}`}
                          className="text-gold hover:text-white hover:underline text-base font-medium transition-colors"
                        >
                          {booking.phone}
                        </a>
                      </td>
                      <td className="px-6 py-5">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-5 text-right">
                        {booking.status === "pending" && (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(booking.id!, "confirmed")
                              }
                              title="Sahkan Tempahan"
                              className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white transition-all"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(booking.id!, "cancelled")
                              }
                              title="Batalkan Tempahan"
                              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
