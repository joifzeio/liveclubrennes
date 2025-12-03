import { Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import djGreenLight from "@/assets/social/dj_green_light.jpg";
import social1 from "@/assets/social/social-1.jpeg";
import social2 from "@/assets/social/social-2.jpeg";
import social3 from "@/assets/social/social-3.jpeg";
import social4 from "@/assets/social/social-4.jpeg";
import social5 from "@/assets/social/social-5.jpeg";
import social6 from "@/assets/social/social-6.jpeg";
import social7 from "@/assets/social/social-7.jpeg";
import social9 from "@/assets/social/social-9.jpeg";
import social10 from "@/assets/social/social-10.jpeg";
import social11 from "@/assets/social/social-11.jpeg";
import social12 from "@/assets/social/social-12.jpeg";

const instagramPosts = [
  djGreenLight,
  social1,
  social2,
  social3,
  social4,
  social5,
  social6,
  social7,
  social9,
  social10,
  social11,
  social11,
  social12,
];

const SocialSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 bg-background section-glow">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("social.title")}</h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-white/80">
            {t("social.subtitle")}
          </h3>
        </div>

        {/* Instagram Handle */}
        <a
          href="https://www.instagram.com/liveclubrennes/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-4 mb-12 group"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-opium-pink p-0.5">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <Instagram className="text-primary" size={24} />
            </div>
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-lg group-hover:text-primary transition-colors">
              liveclubrennes
            </p>
            <p className="text-muted-foreground text-sm">
              📍 27 Place du Colombier, Rennes
            </p>
          </div>
        </a>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href="https://www.instagram.com/liveclubrennes/"
              target="_blank"
              rel="noopener noreferrer"
              className="image-zoom aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={post}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/liveclubrennes/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-white rounded-full inline-flex items-center gap-2"
          >
            <Instagram size={18} />
            {t("social.follow")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
