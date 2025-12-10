import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";

const TermsOfSale = () => {
    const { t } = useLanguage();

    return (
        <Layout>
            <PageHero
                title={t("legal.cgv.title")}
                image="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop"
            />
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 md:px-8 prose prose-invert max-w-4xl">
                    <h2>Préambule</h2>
                    <p>
                        Les présentes conditions générales de vente s'appliquent à toutes les ventes conclues sur le site Internet du LiveClub Rennes.
                    </p>

                    <h2>Prix</h2>
                    <p>
                        Les prix de nos produits sont indiqués en euros toutes taxes comprises (TTC).
                    </p>

                    <h2>Commandes</h2>
                    <p>
                        Le LiveClub Rennes se réserve le droit d'annuler ou de refuser toute commande d'un client avec lequel il existerait un litige relatif au paiement d'une commande antérieure.
                    </p>

                    <h2>Paiement</h2>
                    <p>
                        Le fait de valider votre commande implique pour vous l'obligation de payer le prix indiqué.
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default TermsOfSale;
