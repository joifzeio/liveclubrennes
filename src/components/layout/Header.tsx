import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-primary transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-bold tracking-[0.2em]">LIVECLUB</h1>
              <p className="text-[8px] md:text-[10px] tracking-[0.4em] text-center -mt-1">RENNES</p>
            </div>
          </Link>

          {/* Right Side Navigation */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/calendrier" className="btn-outline-white rounded-full text-xs">
                {t("nav.tickets")}
              </Link>
              <Link to="/bar" className="btn-outline-white rounded-full text-xs">
                {t("nav.reservations")}
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <button
                onClick={() => setLanguage("en")}
                className={`transition-colors ${language === "en" ? "text-primary" : "text-white/50 hover:text-white"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("fr")}
                className={`transition-colors ${language === "fr" ? "text-primary" : "text-white/50 hover:text-white"}`}
              >
                FR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 top-20 bg-background/98 backdrop-blur-lg transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <nav className="container mx-auto px-8 py-12">
          <ul className="space-y-8">
            {[
              { to: "/", label: t("nav.home") },
              { to: "/calendrier", label: t("nav.calendar") },
              { to: "/club", label: t("nav.club") },
              { to: "/bar", label: t("nav.bar") },
              { to: "/vip", label: t("nav.vip") },
              { to: "/live-social-club", label: "LIVE SOCIAL CLUB" },
              { to: "/gallery", label: t("nav.gallery") },
            ].map((item, index) => (
              <li key={item.to} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <Link
                  to={item.to}
                  className={`text-3xl md:text-4xl font-bold tracking-wider transition-colors ${location.pathname === item.to ? "text-primary" : "text-white hover:text-primary"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col gap-4 lg:hidden">
            <Link to="/calendrier" className="btn-outline-white rounded-full text-center">
              {t("nav.tickets")}
            </Link>
            <Link to="/bar" className="btn-outline-white rounded-full text-center">
              {t("nav.reservations")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
