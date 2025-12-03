import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { useLanguage } from "@/contexts/LanguageContext";

import tonusImg from "@/assets/events/tonus-27nov.png";
import adoreImg from "@/assets/events/adore-28nov.png";
import jewellImg from "@/assets/events/jewell-29nov.png";
import overqueenImg from "@/assets/events/overqueen-15dec.png";
import tonusHustlerImg from "@/assets/events/tonus-4dec.png";

const events = [
  {
    date: "27",
    day: "Jeu",
    dayEn: "Thu",
    month: "Nov",
    year: 2025,
    time: "23:55 - 06:00",
    genre: "Hip Hop / Afro",
    title: "Tonus : Hustler + Florent G. & Ma.Nu",
    image: tonusImg,
    price: "6,59 €",
    ticketUrl: "https://shotgun.live/fr/events/jeu-27-nov-liveclub-rennes",
  },
  {
    date: "28",
    day: "Ven",
    dayEn: "Fri",
    month: "Nov",
    year: 2025,
    time: "23:55 - 06:00",
    genre: "House",
    title: "Adore (Fr) Au Live Club",
    image: adoreImg,
    price: "9,59 €",
    ticketUrl: "https://shotgun.live/fr/events/adore-fr-au-live-clu",
  },
  {
    date: "29",
    day: "Sam",
    dayEn: "Sat",
    month: "Nov",
    year: 2025,
    time: "23:55 - 06:00",
    genre: "Hip Hop / Dancehall",
    title: "DJ Jewell Au Live Club",
    image: jewellImg,
    price: "11,59 €",
    ticketUrl: "https://shotgun.live/fr/events/dj-jewell-au-live-club",
  },
  {
    date: "04",
    day: "Jeu",
    dayEn: "Thu",
    month: "Déc",
    year: 2025,
    time: "23:55 - 07:00",
    genre: "Hip Hop / Afro",
    title: "Tonus : Hustler (R2) + Cayz'm & Florent G (R1)",
    image: tonusHustlerImg,
    price: "6,59 €",
    ticketUrl: "https://shotgun.live/fr/events/tonus-hustler-r-2-cayz-m-florent-g-r-1",
  },
  {
    date: "15",
    day: "Lun",
    dayEn: "Mon",
    month: "Déc",
    year: 2025,
    time: "00:01 - 06:00",
    genre: "Drag Show",
    title: "Overqueen Absolutly Drags",
    image: overqueenImg,
    price: "21,59 €",
    ticketUrl: "https://shotgun.live/fr/events/overqueen-absolutly-drags",
  },
];

const UpcomingEvents = () => {
  const { t, language } = useLanguage();

  // Filter out past events
  const upcomingEvents = events.filter(event => {
    // Parse date manually since format is simple
    const monthMap: { [key: string]: number } = {
      "Jan": 0, "Fév": 1, "Mar": 2, "Avr": 3, "Mai": 4, "Juin": 5,
      "Juil": 6, "Août": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Déc": 11
    };

    const eventMonth = monthMap[event.month];
    const eventDate = new Date(event.year, eventMonth, parseInt(event.date));
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison

    return eventDate >= today;
  });

  return (
    <section className="relative py-24 bg-background section-glow">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          {t("events.title")}
        </h2>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <EventCard
                {...event}
                day={language === "fr" ? event.day : event.dayEn}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/calendrier" className="btn-outline-white rounded-full">
            {t("events.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
