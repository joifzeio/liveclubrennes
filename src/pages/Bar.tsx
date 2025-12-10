import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import mainVipPic from "@/assets/vip/mainvippic.jpeg";
import bottlesImg from "@/assets/club/bottles_service.jpg";
import djImg from "@/assets/club/dj_electro.jpg";
import crowdImg from "@/assets/club/crowd_dancing.jpg";

const bottleMenu = [
  { name: "Vodka Grey Goose", price: "€150", size: "70cl" },
  { name: "Vodka Belvedere", price: "€140", size: "70cl" },
  { name: "Champagne Moët & Chandon", price: "€180", size: "75cl" },
  { name: "Champagne Dom Pérignon", price: "€450", size: "75cl" },
  { name: "Whisky Jack Daniel's", price: "€120", size: "70cl" },
  { name: "Whisky Johnnie Walker Black", price: "€130", size: "70cl" },
  { name: "Gin Hendrick's", price: "€130", size: "70cl" },
  { name: "Rhum Diplomatico", price: "€140", size: "70cl" },
  { name: "Tequila Don Julio", price: "€160", size: "70cl" },
  { name: "Cognac Hennessy VS", price: "€170", size: "70cl" },
];

const Bar = () => {
  const { t, language } = useLanguage();

  const experiences = [
    {
      title: t("bar.experience.cocktails"),
      description: t("bar.experience.cocktails.desc"),
      image: bottlesImg,
    },
    {
      title: t("bar.experience.afterwork"),
      description: t("bar.experience.afterwork.desc"),
      image: djImg,
    },
    {
      title: t("bar.experience.night"),
      description: t("bar.experience.night.desc"),
      image: crowdImg,
    },
  ];

  return (
    <Layout>
      <PageHero
        title={t("bar.title")}
        image="https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2074&auto=format&fit=crop"
      />

      {/* Intro Section */}
      <section className="py-24 bg-background section-glow">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t("bar.intro.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t("bar.intro.description")}
          </p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.title}
                className="group animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="image-zoom rounded-2xl overflow-hidden aspect-[4/5] mb-6">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {exp.title}
                </h3>
                <p className="text-muted-foreground">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottle Menu */}
      <section className="py-24 bg-background section-glow">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              {language === "fr" ? "Carte des Bouteilles" : "Bottle Menu"}
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              {language === "fr"
                ? "Réservez votre table VIP avec service bouteilles"
                : "Book your VIP table with bottle service"}
            </p>

            <div className="space-y-4">
              {bottleMenu.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between py-4 border-b border-border/30 animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <span className="text-muted-foreground text-sm">({item.size})</span>
                  </div>
                  <span className="text-primary font-bold text-xl">{item.price}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground text-sm mt-8">
              {language === "fr"
                ? "* Prix indicatifs. Softs et garnitures inclus avec chaque bouteille."
                : "* Indicative prices. Soft drinks and garnishes included with each bottle."}
            </p>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${mainVipPic})`,
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 gradient-radial-magenta" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("bar.reserve.title")}
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            {t("bar.reserve.description")}
          </p>
          <Link to="/agenda" className="btn-outline-white rounded-full">
            {t("bar.reserve.cta")}
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Bar;
