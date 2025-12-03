import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import clubHeroImg from "@/assets/social/social-4.jpeg";
import hiphopMcImg from "@/assets/club/hiphop_mc.jpg";
import electroCrowdImg from "@/assets/club/electro_crowd.jpg";
import crowdImg from "@/assets/club/crowd_dancing.jpg";
import djImg from "@/assets/club/dj_electro.jpg";
import gallery1Img from "@/assets/social/social-10.jpeg";
import gallery2Img from "@/assets/social/social-11.jpeg";
import gallery3Img from "@/assets/social/social-12.jpeg";

const Club = () => {
  const { t } = useLanguage();

  const rooms = [
    {
      title: t("rooms.main.title"),
      description: t("rooms.main.desc"),
      image: hiphopMcImg,
    },
    {
      title: t("rooms.lounge.title"),
      description: t("rooms.lounge.desc"),
      image: electroCrowdImg,
    },
    {
      title: t("rooms.cave.title"),
      description: t("rooms.cave.desc"),
      image: djImg,
    },
  ];

  return (
    <Layout>
      <PageHero
        title={t("club.title")}
        image={clubHeroImg}
      />

      {/* Intro Section */}
      <section className="py-24 bg-background section-glow">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            {t("club.intro.title")}<br />
            <span className="text-primary">{t("club.intro.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t("club.intro.description")}
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <div
                key={room.title}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {room.title}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {room.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-background section-glow">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            {t("club.experience")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              gallery1Img,
              gallery2Img,
              gallery3Img,
              hiphopMcImg,
              crowdImg,
              djImg,
            ].map((img, index) => (
              <div
                key={index}
                className={`image-zoom rounded-xl overflow-hidden ${index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className={`w-full h-full object-cover ${index === 0 ? "aspect-square md:aspect-auto" : "aspect-square"
                    }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Club;
