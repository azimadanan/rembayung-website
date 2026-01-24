import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import MenuSection from "../sections/MenuSection";
import BookingSection from "../sections/BookingSection";
import LocationSection from "../sections/LocationSection";
import GallerySection from "../sections/GallerySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <GallerySection />
        <BookingSection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}
