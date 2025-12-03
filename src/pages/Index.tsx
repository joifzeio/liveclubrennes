import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import NewYearSection from "@/components/home/NewYearSection";
import SectionCard from "@/components/home/SectionCard";
import SocialSection from "@/components/home/SocialSection";
import { useLanguage } from "@/contexts/LanguageContext";

import hiphopMc2Img from "@/assets/club/hiphop_mc2.jpg";
import crowdImg from "@/assets/club/crowd_dancing.jpg";
import bottlesImg from "@/assets/club/bottles_service.jpg";

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
        image={hiphopMc2Img}
        link="/club"
        linkText={t("club.cta")}
      />

      {/* Bar Section */}
      <SectionCard
        title={t("bar.title")}
        description={t("bar.description")}
        image={crowdImg}
        link="/bar"
        linkText={t("bar.cta")}
        secondaryLink="/bar"
        secondaryLinkText={t("bar.menu")}
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
