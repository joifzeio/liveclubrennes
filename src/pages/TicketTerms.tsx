import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";

const TicketTerms = () => {
    const { t } = useLanguage();

    return (
        <Layout>
            <PageHero
                title={t("legal.cgb.title")}
                image="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1974&auto=format&fit=crop"
            />
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 md:px-8 prose prose-invert max-w-4xl">
                    <h2>Plateforme de Billetterie</h2>
                    <p>
                        La billetterie du LiveClub Rennes est gérée par notre partenaire Shotgun. En achetant un billet, vous acceptez également les Conditions Générales de Vente de Shotgun.
                    </p>
                    <p>
                        <a href="https://shotgun.live/fr/legal/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Voir les CGV de Shotgun
                        </a>
                    </p>

                    <h2>Conditions d'accès</h2>
                    <p>
                        L'achat d'un billet ne garantit pas l'accès si les conditions d'admission de l'établissement ne sont pas respectées (âge légal, tenue correcte, état d'ébriété, etc.). La direction se réserve le droit d'entrée.
                    </p>

                    <h2>Remboursement</h2>
                    <p>
                        Les billets ne sont ni repris ni échangés, sauf en cas d'annulation de l'événement par l'organisateur.
                    </p>

                    <h2>Droit à l'image</h2>
                    <p>
                        En accédant à l'établissement, vous consentez à être potentiellement photographié ou filmé. Ces images pourront être utilisées à des fins promotionnelles.
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default TicketTerms;
