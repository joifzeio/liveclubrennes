import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { ChevronLeft, ChevronRight, Search, X, ExternalLink } from "lucide-react";
import { useLanguage, getTranslationArray } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import tonusImg from "@/assets/events/tonus-27nov.png";
import adoreImg from "@/assets/events/adore-28nov.png";
import jewellImg from "@/assets/events/jewell-29nov.png";
import overqueenImg from "@/assets/events/overqueen-15dec.png";
import tonusHustlerImg from "@/assets/events/tonus-4dec.png";
import etudianteImg from "@/assets/events/etudiante-11dec.png";
import etudianteV2Img from "@/assets/events/etudiante-11dec-2.png";
import nocturneImg from "@/assets/events/nocturne-12dec.png";
import throneImg from "@/assets/events/throne-13dec.png";
import calendarHeroImg from "@/assets/social/social-2.jpeg";

interface Event {
  date: number;
  month: number; // 0-indexed (0 = Jan, 10 = Nov, 11 = Dec)
  year: number;
  day: string;
  dayEn: string;
  monthName: string;
  monthNameEn: string;
  title: string;
  time: string;
  genre: string;
  image: string;
  price: string;
  ticketUrl: string;
  isPast: boolean;
}

// All events from Shotgun - past and upcoming
const allEvents: Event[] = [
  {
    date: 11,
    month: 11, // December
    year: 2025,
    day: "Jeu",
    dayEn: "Thu",
    monthName: "Déc",
    monthNameEn: "Dec",
    title: "L'étudiante : Hustler (R2) + Cayz'm & Florent G (R1)",
    time: "23:55 - 06:00",
    genre: "HIP HOP / AFRO",
    image: etudianteV2Img,
    price: "6,59 €",
    ticketUrl: "https://shotgun.live/fr/events/tonus-hustler-r-1-ma-nu-florent-g",
    isPast: false
  },
  {
    date: 12,
    month: 11, // December
    year: 2025,
    day: "Ven",
    dayEn: "Fri",
    monthName: "Déc",
    monthNameEn: "Dec",
    title: "La Nocturne : Sylvain De France + Kidd Midas & KLR",
    time: "23:55 - 06:00",
    genre: "100% RAP FRANÇAIS",
    image: nocturneImg,
    price: "6,59 €",
    ticketUrl: "https://shotgun.live/fr/events/la-nocturne-sylvain-2-france-kidd-midas-klr-ma-nu",
    isPast: false
  },
  {
    date: 13,
    month: 11, // December
    year: 2025,
    day: "Sam",
    dayEn: "Sat",
    monthName: "Déc",
    monthNameEn: "Dec",
    title: "The Throne : DJ Folyne + Cube Winter",
    time: "23:55 - 06:00",
    genre: "HIP HOP / ELECTRO",
    image: throneImg,
    price: "6,59 €",
    ticketUrl: "https://shotgun.live/fr/events/the-throne-dj-folyne-cube-winte-ma-nu-florent-g",
    isPast: false
  },
  {
    date: 27,
    month: 10, // November (0-indexed)
    year: 2025,
    day: "Jeu",
    dayEn: "Thu",
    monthName: "Nov",
    monthNameEn: "Nov",
    title: "Tonus : Hustler + Florent G. & Ma.Nu",
    time: "23:55 - 06:00",
    genre: "HIP HOP / AFRO / POP ROCK",
    image: tonusImg,
    price: "6,59 €",
    ticketUrl: "https://shotgun.live/fr/events/jeu-27-nov-liveclub-rennes",
    isPast: true
  },
  {
    date: 28,
    month: 10,
    year: 2025,
    day: "Ven",
    dayEn: "Fri",
    monthName: "Nov",
    monthNameEn: "Nov",
    title: "Adore (Fr) Au Live Club",
    time: "23:55 - 06:00",
    genre: "ELECTRO HOUSE / DEEP HOUSE / HOUSE",
    image: adoreImg,
    price: "9,59 €",
    ticketUrl: "https://shotgun.live/fr/events/adore-fr-au-live-clu",
    isPast: true
  },
  {
    date: 29,
    month: 10,
    year: 2025,
    day: "Sam",
    dayEn: "Sat",
    monthName: "Nov",
    monthNameEn: "Nov",
    title: "DJ Jewell Au Live Club",
    time: "23:55 - 06:00",
    genre: "HIP HOP / SHATTA / DANCEHALL",
    image: jewellImg,
    price: "11,59 €",
    ticketUrl: "https://shotgun.live/fr/events/dj-jewell-au-live-club",
    isPast: true
  },

  {
    date: 15,
    month: 11, // December
    year: 2025,
    day: "Lun",
    dayEn: "Mon",
    monthName: "Déc",
    monthNameEn: "Dec",
    title: "Overqueen Absolutly Drags",
    time: "00:01 - 06:00",
    genre: "DRAG SHOW",
    image: overqueenImg,
    price: "21,59 €",
    ticketUrl: "https://shotgun.live/fr/events/overqueen-absolutly-drags",
    isPast: false
  },
];

const monthNames = {
  fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};

const Agenda = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t, language } = useLanguage();

  const daysOfWeek = getTranslationArray(language, "calendar.days");

  // Generate calendar days for current month
  const calendarDays = useMemo(() => {
    // Check if we are viewing past months/years relative to today to possibly disable calendar features?
    // For now standard calendar generation is fine.

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday
    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days: { day: number; isCurrentMonth: boolean; month: number; year: number }[] = [];

    // Previous month days
    const adjustedStart = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1; // Adjust for Monday start
    for (let i = adjustedStart - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        month: currentMonth - 1 < 0 ? 11 : currentMonth - 1,
        year: currentMonth - 1 < 0 ? currentYear - 1 : currentYear
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        month: currentMonth,
        year: currentYear
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        month: currentMonth + 1 > 11 ? 0 : currentMonth + 1,
        year: currentMonth + 1 > 11 ? currentYear + 1 : currentYear
      });
    }

    return days;
  }, [currentMonth, currentYear]);

  const getEventForDay = (day: number, month: number, year: number) => {
    return allEvents.find(e => e.date === day && e.month === month && e.year === year);
  };

  const handleDayClick = (day: number, month: number, year: number) => {
    const event = getEventForDay(day, month, year);
    if (event) {
      setSelectedEvent(event);
      setIsDialogOpen(true);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Filter events for current month view
  // Only show events that are >= today for the current month view
  // But if user browses future months, show all. If past months, show none?
  // User said "events that he needs to see are the ones later then the day he is in the site"
  // This implies if I look at "November" (past), everything is past, so maybe I shouldn't see them or they should remain but "Agenda" usually implies upcoming.
  // However, often users want to see history.
  // The request is specific: "see... ones later then the day he is in".
  // I will strictly filter out any event where eventDate < todayDate.

  const currentMonthEvents = allEvents.filter(event => {
    // 1. Must be in the selected month/year
    if (event.month !== currentMonth || event.year !== currentYear) return false;

    // 2. If the selected month is the *current* real-time month, hide past days.
    const now = new Date();
    // Reset time to midnight for accurate comparison
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const eventDate = new Date(event.year, event.month, event.date);

    // If event is strictly in the past (before today), hide it?
    // User: "later then the day he is in".
    // Does "later than" mean > or >=? "Later than the day" could strictly mean tomorrow. 
    // Usually "upcoming" includes tonight. I will assume >= today.

    // Simplest logic:
    // If the event date is < today, return false.
    if (eventDate < todayMidnight) return false;

    return true;
  });

  const filteredEvents = currentMonthEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isToday = (day: number, month: number, year: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <Layout>
      <PageHero
        title={t("calendar.title")}
        image={calendarHeroImg}
      />

      <section className="py-16 bg-background section-glow">
        <div className="container mx-auto px-4 md:px-8">
          {/* Shotgun Link */}
          <div className="text-center mb-8">
            <a
              href="https://shotgun.live/fr/venues/liveclub-rennes"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white rounded-full inline-flex items-center gap-2"
            >
              <span>🎫</span>
              {language === "fr" ? "Voir tous les événements sur Shotgun" : "View all events on Shotgun"}
            </a>
          </div>

          {/* Calendar Widget */}
          <div className="max-w-md mx-auto mb-12 bg-card rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevMonth}
                className="text-white/60 hover:text-white transition-colors p-2"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">
                  {(language === "fr" ? monthNames.fr : monthNames.en)[currentMonth].toUpperCase()}
                </span>
                <span className="text-white/60">{currentYear}</span>
              </div>
              <button
                onClick={handleNextMonth}
                className="text-primary hover:text-primary/80 transition-colors p-2"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-xs text-muted-foreground font-medium py-2">
                  {day}
                </div>
              ))}
              {calendarDays.map((dayInfo, index) => {
                const hasEvent = getEventForDay(dayInfo.day, dayInfo.month, dayInfo.year);
                const isTodayDate = isToday(dayInfo.day, dayInfo.month, dayInfo.year);

                return (
                  <button
                    key={index}
                    onClick={() => handleDayClick(dayInfo.day, dayInfo.month, dayInfo.year)}
                    className={`py-2 text-sm rounded-full transition-all relative ${dayInfo.isCurrentMonth
                      ? hasEvent
                        ? "text-white font-semibold hover:bg-primary/30 cursor-pointer"
                        : "text-white/60 hover:text-white"
                      : "text-white/20"
                      } ${isTodayDate ? "bg-primary text-white" : ""} ${hasEvent && !isTodayDate ? "ring-2 ring-primary/50" : ""
                      }`}
                  >
                    {dayInfo.day}
                    {hasEvent && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{language === "fr" ? "Événement" : "Event"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-primary rounded-full"></span>
                <span>{language === "fr" ? "Aujourd'hui" : "Today"}</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder={t("calendar.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-full px-6 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <div
                  key={index}
                  className={`card-event group animate-fade-up ${event.isPast ? "opacity-70" : ""}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="image-zoom relative w-full">
                    <img src={event.image} alt={event.title} className="w-full h-auto" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    {/* Past Event Badge */}
                    {event.isPast && (
                      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                        <p className="text-xs font-semibold">{language === "fr" ? "Passé" : "Past"}</p>
                      </div>
                    )}

                    {/* Date */}
                    <div className={`absolute ${event.isPast ? "top-12" : "top-4"} left-4`}>
                      <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                        {language === "fr" ? event.day : event.dayEn} {language === "fr" ? event.monthName : event.monthNameEn} {event.date}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full">
                      <p className="text-sm font-bold">{event.price}</p>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-primary text-xs font-semibold uppercase mb-1">
                      {(language === "fr" ? event.day : event.dayEn).toUpperCase()} {(language === "fr" ? event.monthName : event.monthNameEn).toUpperCase()} {event.date}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">{event.time}</p>
                    <span className="inline-block text-xs bg-primary/20 text-primary px-2 py-0.5 rounded mb-2">
                      {event.genre}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors truncate">
                      {event.title}
                    </h3>
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-xs font-semibold text-white uppercase tracking-widest hover:text-primary transition-colors inline-block"
                    >
                      {event.isPast
                        ? (language === "fr" ? "Voir Détails" : "View Details")
                        : t("events.tickets")
                      } →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {language === "fr"
                  ? "Aucun événement ce mois-ci"
                  : "No events this month"}
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                {language === "fr"
                  ? "Naviguez vers d'autres mois pour voir les événements"
                  : "Navigate to other months to see events"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg bg-card border-border">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white text-xl font-bold">
                  {selectedEvent.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedEvent.isPast && (
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {language === "fr" ? "Événement passé" : "Past event"}
                    </span>
                  )}
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    {selectedEvent.genre}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-white">
                    <span className="text-muted-foreground">{language === "fr" ? "Date:" : "Date:"}</span>{" "}
                    {language === "fr" ? selectedEvent.day : selectedEvent.dayEn} {selectedEvent.date}{" "}
                    {language === "fr" ? selectedEvent.monthName : selectedEvent.monthNameEn} {selectedEvent.year}
                  </p>
                  <p className="text-white">
                    <span className="text-muted-foreground">{language === "fr" ? "Horaire:" : "Time:"}</span>{" "}
                    {selectedEvent.time}
                  </p>
                  <p className="text-white">
                    <span className="text-muted-foreground">{language === "fr" ? "Prix:" : "Price:"}</span>{" "}
                    {selectedEvent.price}
                  </p>
                </div>

                <a
                  href={selectedEvent.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary rounded-full flex items-center justify-center gap-2 py-3"
                >
                  <ExternalLink size={16} />
                  {selectedEvent.isPast
                    ? (language === "fr" ? "Voir sur Shotgun" : "View on Shotgun")
                    : (language === "fr" ? "Acheter des billets" : "Buy Tickets")
                  }
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Agenda;