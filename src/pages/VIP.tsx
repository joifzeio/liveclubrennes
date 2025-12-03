import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import mainVipPic from "@/assets/vip/mainvippic.jpeg";
import belaireImg from "@/assets/vip/belaire_service.jpg";

const VIP = () => {
  const { t } = useLanguage();

  const vipAreas = [
    {
      name: t("vip.area.main"),
      description: t("vip.area.main.desc"),
      capacity: t("vip.area.main.capacity"),
    },
    {
      name: t("vip.area.lounge"),
      description: t("vip.area.lounge.desc"),
      capacity: t("vip.area.lounge.capacity"),
    },
    {
      name: t("vip.area.cave"),
      description: t("vip.area.cave.desc"),
      capacity: t("vip.area.cave.capacity"),
    },
  ];

  return (
    <Layout>
      <PageHero
        title={t("vip.title")}
        image={mainVipPic}
      />

      {/* VIP Experience Section */}
      <section className="py-24 bg-background section-glow">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="image-zoom rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src={mainVipPic}
                  alt="VIP Area"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="image-zoom rounded-2xl overflow-hidden aspect-[3/4] mt-8">
                <img
                  src={belaireImg}
                  alt="VIP Experience"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-primary uppercase tracking-widest text-sm font-semibold mb-4">
                {t("vip.experience")}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t("vip.level.title")}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t("vip.level.description")}
              </p>
              <Link to="/calendrier" className="btn-outline-white rounded-full">
                {t("vip.calendar.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Areas */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("vip.areas.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("vip.areas.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vipAreas.map((area, index) => (
              <div
                key={area.name}
                className="bg-card rounded-2xl p-6 border border-border/30 hover:border-primary/50 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-bold text-white mb-3">{area.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{area.description}</p>
                <p className="text-primary text-sm font-semibold">{area.capacity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-background section-glow">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t("vip.custom.title")}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t("vip.custom.description")}
              </p>
              <Link to="/calendrier" className="btn-outline-white rounded-full">
                {t("vip.custom.cta")}
              </Link>
            </div>

            <div className="image-zoom rounded-2xl overflow-hidden">
              <img
                src={mainVipPic}
                alt="Club Map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${mainVipPic}')`,
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 gradient-radial-magenta animate-pulse-glow" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-shadow">
            {t("vip.ready.title")}
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            {t("vip.ready.description")}
          </p>
          <Link to="/calendrier" className="btn-outline-white rounded-full">
            {t("vip.ready.cta")}
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default VIP;
