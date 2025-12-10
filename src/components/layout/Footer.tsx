import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import GoogleMap from "./GoogleMap";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-border/30 py-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Google Maps Widget */}
        <div className="mb-12">
          <GoogleMap />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src="/logo.png" alt="LiveClub Rennes" className="h-16 w-auto object-contain" />
            </Link>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/liveclubrennes" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/liveclubrennes" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.youtube.com/@liveclubrennes" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold tracking-wider mb-4 uppercase text-sm">{t("footer.explore")}</h3>
            <ul className="space-y-2">
              {[
                { to: "/agenda", label: t("nav.calendar") },
                { to: "/club", label: t("nav.club") },
                { to: "/bar", label: t("nav.bar") },
                { to: "/vip", label: t("nav.vip") },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold tracking-wider mb-4 uppercase text-sm">{t("footer.contact")}</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>27 Place du Colombier</li>
              <li>35000 Rennes, France</li>
              <li className="pt-2">info@liveclub-rennes.fr</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold tracking-wider mb-4 uppercase text-sm">{t("footer.hours")}</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>{t("footer.club.hours")}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">{t("footer.copyright")}</p>
          <div className="flex gap-6 text-sm flex-wrap justify-end">
            <Link to="/mentions-legales" className="text-white/40 hover:text-primary transition-colors">
              {t("footer.legal")}
            </Link>
            <Link to="/protection-donnees" className="text-white/40 hover:text-primary transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link to="/cgv" className="text-white/40 hover:text-primary transition-colors">
              {t("footer.cgv")}
            </Link>
            <Link to="/billetterie-cgv" className="text-white/40 hover:text-primary transition-colors">
              {t("footer.cgb")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
