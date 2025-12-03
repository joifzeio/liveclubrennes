import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import newYearBg from "@/assets/social/newyear-bg.png";

const NewYearSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${newYearBg}')`,
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />

      {/* Animated Glow */}
      <div className="absolute inset-0 gradient-radial-magenta animate-pulse-glow" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 text-shadow">
          {t("newyear.title")}
        </h2>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          {t("newyear.description")}
        </p>
        <Link to="/calendrier" className="btn-outline-white rounded-full">
          {t("newyear.cta")}
        </Link>
      </div>
    </section>
  );
};

export default NewYearSection;
