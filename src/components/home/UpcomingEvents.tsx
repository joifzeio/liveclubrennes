import { useRef } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { useLanguage } from "@/contexts/LanguageContext";

import tonusImg from "@/assets/events/tonus-27nov.png";
import adoreImg from "@/assets/events/adore-28nov.png";
import jewellImg from "@/assets/events/jewell-29nov.png";
import overqueenImg from "@/assets/events/overqueen-15dec.png";
import tonusHustlerImg from "@/assets/events/tonus-4dec.png";
import etudianteImg from "@/assets/events/etudiante-11dec.png";
import etudianteV2Img from "@/assets/events/etudiante-11dec-2.png";
import nocturneImg from "@/assets/events/nocturne-12dec.png";
import throneImg from "@/assets/events/throne-13dec.png";

const events = [
  {
    date: "11",
    day: "Jeu",
    dayEn: "Thu",
    month: "Déc",
    year: 2025,
    time: "23:55 - 06:00",
    genre: "Hip Hop / Afro",
    title: "L'étudiante : Hustler (R2) + Cayz'm & Florent G (R1)",
    image: etudianteV2Img,
    price: "6,59 €",
    ticketUrl: "https://shotgun.live/fr/events/tonus-hustler-r-1-ma-nu-florent-g",
  },
  {
    date: "12",
    day: "Ven",
    dayEn: "Fri",
    month: "Déc",
    year: 2025,
    time: "23:55 - 06:00",
    genre: "100% Rap Français",
    title: "La Nocturne : Sylvain De France + Kidd Midas & KLR",
    image: nocturneImg,
    price: "6,59 €",
    ticketUrl: "https://shotgun.live/fr/events/la-nocturne-sylvain-2-france-kidd-midas-klr-ma-nu",
  },
  {
    date: "13",
    day: "Sam",
    dayEn: "Sat",
    month: "Déc",
    year: 2025,
    time: "23:55 - 06:00",
    genre: "Hip Hop / Electro",
    title: "The Throne : DJ Folyne + Cube Winter",
    image: throneImg,
    price: "6,59 €",
    ticketUrl: "https://shotgun.live/fr/events/the-throne-dj-folyne-cube-winte-ma-nu-florent-g",
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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

  const onMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDown.current = true;
    sliderRef.current.classList.add('cursor-grabbing');
    sliderRef.current.classList.remove('cursor-grab');

    // Disable smooth scroll and snap for instant drag response
    sliderRef.current.style.scrollBehavior = 'auto';
    sliderRef.current.style.scrollSnapType = 'none';

    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    if (!sliderRef.current) return;
    isDown.current = false;
    sliderRef.current.classList.remove('cursor-grabbing');
    sliderRef.current.classList.add('cursor-grab');

    // Re-enable smooth scroll and snap
    sliderRef.current.style.scrollBehavior = 'smooth';
    sliderRef.current.style.scrollSnapType = 'x mandatory';
  };

  const onMouseUp = () => {
    if (!sliderRef.current) return;
    isDown.current = false;
    sliderRef.current.classList.remove('cursor-grabbing');
    sliderRef.current.classList.add('cursor-grab');

    // Re-enable smooth scroll and snap
    sliderRef.current.style.scrollBehavior = 'smooth';
    sliderRef.current.style.scrollSnapType = 'x mandatory';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1; // 1:1 movement for natural feel
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="relative py-24 bg-background section-glow">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          {t("events.title")}
        </h2>

        {/* Events Grid with Scroll */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 cursor-grab active:cursor-grabbing"
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="animate-fade-up min-w-[300px] md:min-w-[600px] snap-center select-none"
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
          <Link to="/agenda" className="btn-outline-white rounded-full">
            {t("events.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
