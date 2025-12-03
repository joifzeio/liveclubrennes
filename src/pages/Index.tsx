import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import NewYearSection from "@/components/home/NewYearSection";
import SectionCard from "@/components/home/SectionCard";
import SocialSection from "@/components/home/SocialSection";
import { useLanguage } from "@/contexts/LanguageContext";

import clubMcImg from "@/assets/club/hiphop_mc2.jpg";
import clubMcVerticalImg from "@/assets/club/club_mc_vertical.jpg";
import crowdImg from "@/assets/club/crowd_dancing.jpg";
import bottlesImg from "@/assets/club/bottles_service.jpg";
import barTapsImg from "@/assets/club/bar_taps.png";

const Index = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <Hero />
      <UpcomingEvents />
      <NewYearSection />

      {/* Club Section */}
      <SectionCard
        title={t("club.title")}
        description={t("club.description")}
        image={clubMcVerticalImg}
        link="/club"
        linkText={t("club.cta")}
      />

      {/* Bar Section */}
      <SectionCard
        title={t("bar.title")}
        description={t("bar.description")}
        image={barTapsImg}
        link="/bar"
        linkText={t("bar.cta")}
        reversed
      />

      {/* VIP Section */}
      <SectionCard
        title={t("vip.title")}
        description={t("vip.description")}
        image={bottlesImg}
        link="/vip"
        linkText={t("vip.cta")}
      />

      <SocialSection />
    </Layout>
  );
};

export default Index;
