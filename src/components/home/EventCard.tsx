import { useLanguage } from "@/contexts/LanguageContext";
import { Ticket } from "lucide-react";

interface EventCardProps {
  date: string;
  day: string;
  month: string;
  time: string;
  genre: string;
  title: string;
  image: string;
  price?: string;
  ticketUrl?: string;
}

const EventCard = ({ date, day, month, time, genre, title, image, price, ticketUrl }: EventCardProps) => {
  const { t } = useLanguage();

  return (
    <div className="card-event group">
      <div className="image-zoom relative w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Date Badge */}
        <div className="absolute top-4 left-4 text-white">
          <p className="text-sm font-medium uppercase tracking-wider">{day} {date} {month}</p>
        </div>

        {/* Price Badge */}
        {price && (
          <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full">
            <p className="text-sm font-bold">{price}</p>
          </div>
        )}
      </div>

      <div className="p-5 relative">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{time}</span>
          <span className="w-1 h-1 bg-primary rounded-full" />
          <span className="text-primary uppercase text-xs font-semibold tracking-wider">{genre}</span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
          {title}
        </h3>

        <a
          href={ticketUrl || "https://shotgun.live/fr/venues/liveclub-rennes"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-6 py-2 bg-[#b30000] hover:bg-[#800000] text-white text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(179,0,0,0.4)] hover:shadow-[0_0_25px_rgba(179,0,0,0.6)]"
        >
          <Ticket className="w-4 h-4" />
          {t("events.cardCta")}
        </a>
      </div>
    </div>
  );
};

export default EventCard;
