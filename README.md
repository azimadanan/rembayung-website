# 🦅 Rembayung Restaurant Website

> **A premium restaurant booking website for Khairul Aming's Rembayung, featuring a modern "Expert Designer" aesthetic, full booking system, and admin panel.**

![Hero Banner](public/photo/interior%20restoran.png)

---

## 🌟 Features

### Public Website

- ✨ **Cinematic Hero Section** - Massive editorial typography with parallax video
- 📖 **About Section** - Khairul Aming's journey to RM4 million restaurant
- 🍽️ **Menu Catalog** - Authentic Malay dishes with local photos
- 📅 **Booking System** - Full-featured reservation form with validation
- 🖼️ **Gallery** - Editorial photo wall showcasing restaurant atmosphere
- 📍 **Location** - Interactive map and contact information
- 📱 **Mobile-Responsive** - Premium design across all screen sizes

### Admin Panel

- 🔐 **Secure Login** - Authentication via Supabase
- 📊 **Dashboard** - View and manage all reservations
- ✅ **Status Management** - Confirm or cancel bookings
- 🔍 **Filtering** - Sort by pending, confirmed, or cancelled
- 🔄 **Real-time Sync** - Instant database updates

### Database

- 🗄️ **Supabase PostgreSQL** - Scalable cloud database
- 🔒 **Row Level Security** - Public can book, admins can manage
- ⚡ **Real-time Updates** - Changes reflect immediately

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Supabase account ([Sign up free](https://supabase.com))

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Copy your credentials:
   - **Project URL**: `Settings > API > Project URL`
   - **Anon Key**: `Settings > API > Project API keys > anon public`
3. Create `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Create Database Tables

1. In Supabase, go to **SQL Editor**
2. Copy the contents of `db/schema.sql`
3. Paste and click **Run**
4. Verify the `bookings` table appears in **Table Editor**

### 4. Create Admin User

1. In Supabase, go to **Authentication > Users**
2. Click **Add User**:
   - Email: `admin@rembayung.com`
   - Password: `Rembayung2026!`
   - ✅ **Auto Confirm User**
3. Click **Create User**

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser 🎉

---

## 📁 Project Structure

```
rembayung-website/
├── public/
│   └── photo/                    # Local restaurant images
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/                 # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── MenuSection.tsx
│   │   ├── BookingSection.tsx
│   │   ├── GallerySection.tsx
│   │   └── LocationSection.tsx
│   ├── pages/                    # Full pages
│   │   ├── Home.tsx
│   │   └── admin/
│   │       ├── Login.tsx
│   │       └── Dashboard.tsx
│   ├── lib/
│   │   └── supabase.ts          # Database client & API functions
│   ├── App.tsx                  # Router configuration
│   ├── main.tsx                 # App entry point
│   └── index.css                # Global styles & design system
├── db/
│   └── schema.sql               # Supabase database schema
├── .env                         # Environment variables (create this!)
├── package.json
└── README.md
```

---

## 🧪 Testing the System

### Test the Booking Form

1. Go to [http://localhost:5174](http://localhost:5174)
2. Scroll to **"Jemput Makan"** section
3. Fill out the form and submit
4. Check Supabase → **Table Editor** → `bookings` for the new entry ✅

### Test the Admin Panel

1. Go to [http://localhost:5174/admin/login](http://localhost:5174/admin/login)
2. Login with:
   - Email: `admin@rembayung.com`
   - Password: `Rembayung2026!`
3. Verify you see the bookings dashboard ✅
4. Try confirming/cancelling a booking ✅

**For detailed testing instructions, see:**

- 📋 [Quick Test Checklist](docs/quick_test_checklist.md)
- 📖 [Testing Guide](docs/testing_guide.md)
- 🏗️ [System Architecture](docs/system_architecture.md)

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - Component-based UI
- **TypeScript** - Type-safe code
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **date-fns** - Date manipulation

### Backend & Database

- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Relational database
- **Supabase Auth** - User authentication
- **Row Level Security (RLS)** - Data access control

---

## 🎨 Design System

The site uses a **"Professional Design Expert"** aesthetic:

- **Massive Typography**: Editorial-style headings (`text-7xl` to `text-10xl`)
- **Gold Accents**: `#D4AF37` for premium feel
- **Dark Palette**: Deep blacks and creams for sophistication
- **Glassmorphism**: Subtle blur effects for modern UI
- **Smooth Animations**: Framer Motion for polished interactions

**Color Palette:**

```css
--primary: #0a0a0a /* Deep black */ --secondary: #1a1a1a /* Soft black */
  --accent: #d4af37 /* Golden */ --cream: #f5f5dc /* Warm cream */;
```

---

## 📸 Screenshots

<details>
<summary>View Screenshots</summary>

### Hero Section

![Hero](docs/screenshots/01-hero-section.png)

### Menu Catalog

![Menu](docs/screenshots/03-menu-section.png)

### Booking Form

![Booking](docs/screenshots/04-booking-form.png)

### Admin Dashboard

![Dashboard](docs/screenshots/09-admin-dashboard.png)

</details>

---

## 🚀 Deployment

### Deploy to Netlify

1. Build the production bundle:

```bash
npm run build
```

2. Sign up at [netlify.com](https://netlify.com)
3. Drag and drop the `dist/` folder OR connect your Git repo
4. Add environment variables in **Site settings**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Your site is live! 🎉

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts and add environment variables when asked.

---

## 📋 API Reference

### Public API (No Auth Required)

#### Create Booking

```typescript
import { createBooking } from "./lib/supabase";

const booking = {
  booking_date: "2026-01-25",
  time_slot: "lunch",
  guest_count: 4,
  name: "John Doe",
  phone: "0123456789",
  email: "john@example.com",
};

const result = await createBooking(booking);
```

### Admin API (Auth Required)

#### Get All Bookings

```typescript
import { getBookings } from "./lib/supabase";

const bookings = await getBookings();
```

#### Update Booking Status

```typescript
import { updateBookingStatus } from "./lib/supabase";

await updateBookingStatus(bookingId, "confirmed"); // or 'cancelled'
```

#### Sign In

```typescript
import { signIn } from "./lib/supabase";

await signIn("admin@rembayung.com", "password");
```

---

## 🔒 Security

- ✅ Environment variables for sensitive data
- ✅ Row Level Security (RLS) on database
- ✅ Password hashing via Supabase Auth
- ✅ Session-based authentication
- ✅ Protected admin routes
- ✅ Input validation on forms

---

## 📝 License

This project is created for educational purposes.

---

## 🙏 Acknowledgments

- **Khairul Aming** - Restaurant owner and inspiration
- **Supabase** - Backend infrastructure
- **Vite** - Build tooling
- **Framer Motion** - Animation library

---

## 📞 Support

For issues or questions:

1. Check the [Testing Guide](docs/testing_guide.md)
2. Review [System Architecture](docs/system_architecture.md)
3. Open browser DevTools (F12) for console errors
4. Verify Supabase credentials in `.env`

---

## ✅ Project Status

**Status:** ✨ Production Ready

- [x] Public booking form
- [x] Admin authentication
- [x] Admin dashboard
- [x] Database integration
- [x] Mobile responsive
- [x] Local photos integrated
- [x] Professional design
- [x] Documentation complete

---

**Built with ❤️ by Azim**

**🦅 Warisan Melayu. Rasa Kampung.**
