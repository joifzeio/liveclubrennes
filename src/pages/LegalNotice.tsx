import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";

const LegalNotice = () => {
    const { t } = useLanguage();

    return (
        <Layout>
            <PageHero
                title={t("legal.notice.title")}
                image="https://images.unsplash.com/photo-1507679799987-e737747874ed?q=80&w=2070&auto=format&fit=crop"
            />
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 md:px-8 prose prose-invert max-w-4xl">
                    <h2>Éditeur du site</h2>
                    <p>
                        LIVECLUB RENNES<br />
                        27 Place du Colombier<br />
                        35000 Rennes, France
                    </p>
                    <p>
                        Email : info@liveclub-rennes.fr<br />
                        Téléphone : +33 2 99 30 70 70
                    </p>

                    <h2>Hébergement</h2>
                    <p>
                        [Nom de l'hébergeur]<br />
                        [Adresse de l'hébergeur]<br />
                        [Contact de l'hébergeur]
                    </p>

                    <h2>Propriété intellectuelle</h2>
                    <p>
                        L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default LegalNotice;
