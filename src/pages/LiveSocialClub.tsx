import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";

import thumbnailEp3 from "@/assets/social/thumbnail_ep3.png";

const LiveSocialClub = () => {
    const { language } = useLanguage();

    const episodes = [
        {
            id: 1,
            title: "Episode 1",
            guest: "DJ SEROM",
            video: "/videos/episodes/episode1.mp4",
            thumbnail: "/videos/episodes/thumbnail_ep1.png",
        },
        {
            id: 2,
            title: "Episode 2",
            guest: "SiiNA",
            video: "/videos/episodes/episode2.mp4",
            thumbnail: "/videos/episodes/thumbnail_ep2.jpg",
        },
        {
            id: 3,
            title: "Episode 3",
            guest: "MUXXA",
            video: "/videos/episodes/episode3.mp4",
            thumbnail: thumbnailEp3,
        },
    ];

    return (
        <Layout>
            <PageHero
                title="LIVE SOCIAL CLUB"
                image="/videos/episodes/episode1.mp4" // Using video as background or fallback
                isVideo={true}
            />

            <section className="py-24 bg-background section-glow">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            {language === "fr"
                                ? "Chaque épisode met en lumière une anecdote marquante racontée par celles et ceux qui font vibrer les dancefloors : DJs, organisateurs, figures incontournables du clubbing."
                                : "Each episode highlights a remarkable anecdote told by those who make the dancefloors vibrate: DJs, organizers, essential figures of clubbing."}
                        </p>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-6">
                            {language === "fr"
                                ? "Pour cette deuxième édition, nous accueillons le DJ et producteur Siina. Il s’est déjà hissé à la première place du classement Apple Music avec son titre Blessed, signé sur VOD, le label du collectif Keinemusik."
                                : "For this second edition, we welcome DJ and producer Siina. He has already reached the top of the Apple Music charts with his track Blessed, signed to VOD, the label of the Keinemusik collective."}
                        </p>
                        <p className="text-lg md:text-xl text-white font-medium leading-relaxed mt-6">
                            {language === "fr"
                                ? "Un format court, authentique et sans filtre, au cœur des souvenirs et des coulisses de la nuit."
                                : "A short, authentic and unfiltered format, at the heart of memories and behind the scenes of the night."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {episodes.map((episode) => (
                            <div key={episode.id} className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                                <video
                                    controls
                                    className="w-full h-full object-cover"
                                    poster={episode.thumbnail}
                                >
                                    <source src={episode.video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                                    <h3 className="text-white text-center font-bold text-xl uppercase tracking-wider">
                                        {episode.guest}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default LiveSocialClub;
