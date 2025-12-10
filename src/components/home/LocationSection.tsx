import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Train, Bus, Car, Bike, Info, ShieldCheck } from "lucide-react";
import GoogleMap from "@/components/layout/GoogleMap";

const LocationSection = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-4">
                            {t("location.title")}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {t("location.subtitle")}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full border border-primary/20 text-primary whitespace-nowrap">
                            <ShieldCheck size={18} />
                            <span className="font-semibold text-sm">Safe Place</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Map Column */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 h-[400px] lg:h-[500px]">
                        <div className="w-full h-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.5!2d-1.6790!3d48.1070!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480ede3b8c5d9a0f%3A0x4ce4e5b4e6e6e6e6!2s1988%20Live%20Club!5e0!3m2!1sen!2sfr!4v1700000000000!5m2!1sen!2sfr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="opacity-90 hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                    </div>

                    {/* Info Column */}
                    <div className="space-y-8">

                        {/* Metro & Bus */}
                        <div className="flex gap-6 group">
                            <div className="mt-1">
                                <Bus className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                    {t("location.transport.title")}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    <span className="text-white font-medium">Ligne A</span>, Arrêt Charles de Gaulle (2 min).<br />
                                    <span className="text-white font-medium">Ligne B</span>, Arrêt Colombier (2 min).<br />
                                    <span className="text-white font-medium">Bus C5, C6</span>, Arrêt Plélo Colombier.
                                </p>
                            </div>
                        </div>

                        <div className="h-px bg-white/5 w-full my-4" />

                        {/* Train */}
                        <div className="flex gap-6 group">
                            <div className="mt-1">
                                <Train className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">
                                    {t("location.train.title")}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    <a href="https://maps.app.goo.gl/xXq5Jq" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:underline">
                                        Gare de Rennes
                                    </a> à 5 minutes à pied.
                                </p>
                            </div>
                        </div>

                        <div className="h-px bg-white/5 w-full my-4" />

                        {/* Parking */}
                        <div className="flex gap-6 group">
                            <div className="mt-1">
                                <Car className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">
                                    {t("location.parking.title")}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    <span className="text-white font-medium">Parking Colombier</span>.<br />
                                    <span className="text-white font-medium">Parking Charles de Gaulle</span>.
                                </p>
                            </div>
                        </div>

                        <div className="h-px bg-white/5 w-full my-4" />

                        {/* Bike */}
                        <div className="flex gap-6 group">
                            <div className="mt-1">
                                <Bike className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">
                                    {t("location.bike.title")}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Station Vélo Star <span className="text-white font-medium">Colombier</span> à proximité immédiate.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
