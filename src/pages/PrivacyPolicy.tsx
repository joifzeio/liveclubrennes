import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
    const { t } = useLanguage();

    return (
        <Layout>
            <PageHero
                title={t("legal.privacy.title")}
                image="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
            />
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 md:px-8 prose prose-invert max-w-4xl">
                    <h2>Collecte des données</h2>
                    <p>
                        Les informations recueillies sur ce site sont enregistrées dans un fichier informatisé par LiveClub Rennes pour la gestion de notre clientèle.
                    </p>

                    <h2>Utilisation des données</h2>
                    <p>
                        Les données collectées seront communiquées aux seuls destinataires suivants : LiveClub Rennes.
                    </p>

                    <h2>Vos droits</h2>
                    <p>
                        Vous pouvez accéder aux données vous concernant, les rectifier, demander leur effacement ou exercer votre droit à la limitation du traitement de vos données.
                    </p>

                    <h2>Cookies</h2>
                    <p>
                        Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer sur ce site, vous acceptez leur utilisation.
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default PrivacyPolicy;
