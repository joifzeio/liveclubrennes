import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.calendar": "Calendrier",
    "nav.club": "Club",
    "nav.bar": "Bar",
    "nav.vip": "VIP",
    "nav.tickets": "Billets & Tables VIP",
    "nav.reservations": "Bar et Réservations",

    // Hero
    "hero.title": "VOS NUITS SONT MEILLEURES AU LIVECLUB",
    "hero.cta": "Découvrir le Club",

    // Upcoming Events
    "events.title": "Événements à venir",
    "events.viewAll": "Voir le calendrier complet",
    "events.tickets": "Billets & Tables VIP",

    // New Year
    "newyear.title": "Nouvel An 2026",
    "newyear.description": "Commencez l'année en beauté — célébrez avec nous ! Préparez-vous pour une nuit avec les meilleures vibrations, une musique incroyable et des moments inoubliables.",
    "newyear.cta": "Plus d'infos & réservations",

    // Club Section
    "club.title": "Club",
    "club.description": "Avec une longue tradition d'excellence dans le domaine de la vie nocturne et du divertissement, LiveClub est devenu le club le plus emblématique de Rennes et s'est imposé comme l'une des principales destinations de loisirs grâce à une programmation remplie de performances et d'artistes de renommée internationale.",
    "club.cta": "Plus d'infos",
    "club.intro.title": "Plus d'une décennie d'excellence",
    "club.intro.highlight": "dans le monde de la nuit et du divertissement",
    "club.intro.description": "LiveClub, situé au cœur de Rennes, est l'une des discothèques les plus emblématiques de la ville. Elle a consolidé sa réputation comme l'une des principales destinations du circuit de la vie nocturne, avec une programmation remplie de concerts live et de DJs de renommée internationale.",
    "club.experience": "L'expérience LiveClub",

    // Bar Section
    "bar.title": "Bar",
    "bar.description": "Un espace convivial où les cocktails raffinés se mêlent à l'ambiance festive. Notre carte est remplie de créations originales, de classiques revisités et de boissons premium, le tout dans un cadre moderne et dynamique.",
    "bar.cta": "Découvrir notre bar",
    "bar.menu": "Explorer notre carte",
    "bar.intro.title": "Expérience cocktails unique",
    "bar.intro.description": "Situé au cœur de Rennes, LiveClub se distingue non seulement par sa vie nocturne excitante, mais aussi par son bar exceptionnel. Notre bar vous invite à découvrir une fusion unique de saveurs et d'expériences que vous pouvez apprécier tout au long de la soirée.",
    "bar.experience.cocktails": "Cocktails",
    "bar.experience.cocktails.desc": "Le moment où nos mixologues créent des œuvres d'art liquides. Profitez d'ingrédients de haute qualité et de saveurs exquises.",
    "bar.experience.afterwork": "After Work",
    "bar.experience.afterwork.desc": "Découvrez l'essence de l'After Work au LiveClub. Retrouvez vos amis autour de délicieuses boissons et cocktails.",
    "bar.experience.night": "Soirée",
    "bar.experience.night.desc": "Rejoignez-nous pour une expérience magique remplie de saveurs authentiques, d'ingrédients premium et des meilleures boissons pour vous préparer à une grande nuit.",
    "bar.menu.title": "Notre Carte",
    "bar.menu.viewAll": "Voir la carte complète",
    "bar.reserve.title": "Réservez votre table",
    "bar.reserve.description": "Profitez d'une expérience unique au LiveClub. Réservez maintenant et laissez-vous surprendre.",
    "bar.reserve.cta": "Faire une réservation",

    // VIP Section
    "vip.title": "VIP",
    "vip.description": "Passez votre soirée au niveau supérieur. Réservez votre table VIP et plongez dans un univers de luxe, de divertissement sans limites et de la meilleure musique.",
    "vip.cta": "Infos et Réservations",
    "vip.experience": "Expérience VIP",
    "vip.level.title": "Passez votre soirée au niveau supérieur",
    "vip.level.description": "Profitez du meilleur de la vie nocturne au LiveClub. Rejoignez-nous dans notre espace VIP et plongez dans un univers de luxe et de divertissement sans limites accompagné de la meilleure musique. Préparez-vous pour une nuit qui dépassera même vos attentes les plus folles et vous offrira des souvenirs inoubliables.",
    "vip.calendar.cta": "Visitez le calendrier et réservez",
    "vip.areas.title": "Les zones les plus exclusives",
    "vip.areas.description": "Entrez dans un espace unique et exclusif dans nos zones VIP. Les zones les plus privilégiées de notre club, avec des vues incomparables.",
    "vip.custom.title": "Expérience VIP sur mesure",
    "vip.custom.description": "Entrez dans un espace unique et exclusif dans nos zones VIP. Les zones les plus privilégiées de notre club, avec des vues incomparables, un service de première classe et une sélection de boissons exquises.",
    "vip.custom.cta": "Découvrez notre carte VIP",
    "vip.ready.title": "Prêt pour la meilleure nuit de votre vie ?",
    "vip.ready.description": "Réservez votre table VIP et vivez une expérience inoubliable au LiveClub.",
    "vip.ready.cta": "Réserver maintenant",

    // Social
    "social.title": "Social",
    "social.subtitle": "Rejoignez la famille LiveClub",
    "social.follow": "Suivre sur Instagram",

    // Calendar
    "calendar.title": "Calendrier",
    "calendar.search": "Rechercher",
    "calendar.days": ["LU", "MA", "ME", "JE", "VE", "SA", "DI"],

    // Footer
    "footer.explore": "Explorer",
    "footer.contact": "Contact",
    "footer.hours": "Horaires",
    "footer.club.hours": "Club : 23h00 - 06h00",
    "footer.bar.hours": "Bar : 18h00 - 03h00",
    "footer.legal": "Mentions Légales",
    "footer.privacy": "Politique de Confidentialité",
    "footer.cookies": "Cookies",
    "footer.copyright": "© 2024 LiveClub Rennes. Tous droits réservés.",

    // Gallery
    "nav.gallery": "Galerie",
    "gallery.title": "Galerie",
    "gallery.adminPanel": "Panneau Admin",
    "gallery.adminDesc": "Téléchargez des photos pour la galerie. Les images sont réinitialisées chaque dimanche.",
    "gallery.upload": "Télécharger",
    "gallery.logout": "Déconnexion",
    "gallery.resetNotice": "La galerie est réinitialisée chaque dimanche à minuit.",
    "gallery.empty": "Aucune photo dans la galerie pour le moment.",
    "gallery.adminLogin": "Connexion admin →",
    "gallery.uploadSuccess": "Succès",
    "gallery.uploadSuccessDesc": "Images téléchargées avec succès.",
    "gallery.deleteSuccess": "Supprimé",
    "gallery.deleteSuccessDesc": "Image supprimée avec succès.",

    // Auth
    "auth.signIn": "Connexion",
    "auth.signUp": "Inscription",
    "auth.adminAccess": "Accès réservé aux administrateurs",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.error": "Erreur",
    "auth.signUpSuccess": "Inscription réussie",
    "auth.signUpSuccessDesc": "Vous pouvez maintenant vous connecter.",
    "auth.haveAccount": "Déjà un compte ? Connectez-vous",
    "auth.noAccount": "Pas de compte ? Inscrivez-vous",
    "auth.backToSite": "Retour au site",
    "auth.adminDashboard": "Tableau de bord Admin",
    "auth.uploadPhotos": "Télécharger des photos",
    "auth.uploadDesc": "Ajoutez des photos à la galerie. Elles seront visibles immédiatement.",
    "auth.uploading": "Téléchargement...",
    "auth.viewGallery": "Voir la galerie",
    "auth.notAdmin": "Vous n'avez pas les droits d'administrateur.",

    // Rooms
    "rooms.main.title": "Hip Hop",
    "rooms.main.desc": "Le meilleur du son urbain, Hip-Hop et RnB pour une ambiance survoltée toute la nuit.",
    "rooms.lounge.title": "Electro",
    "rooms.lounge.desc": "Une immersion totale dans la musique électronique avec les meilleurs DJs de la scène actuelle.",
    "rooms.cave.title": "Généraliste / 90's",
    "rooms.cave.desc": "Les tubes incontournables d'hier et d'aujourd'hui pour chanter et danser sans s'arrêter.",

    // VIP Areas
    "vip.area.main": "Zone Hip Hop VIP",
    "vip.area.main.desc": "Au cœur de l'action, vivez l'expérience Hip Hop en mode VIP.",
    "vip.area.main.capacity": "4-8 personnes",
    "vip.area.lounge": "Zone Electro VIP",
    "vip.area.lounge.desc": "Espace exclusif pour vibrer au rythme de l'électro.",
    "vip.area.lounge.capacity": "6-12 personnes",
    "vip.area.cave": "Zone 90's VIP",
    "vip.area.cave.desc": "Ambiance rétro et festive dans un cadre intimiste.",
    "vip.area.cave.capacity": "4-10 personnes",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.calendar": "Calendar",
    "nav.club": "Club",
    "nav.bar": "Bar",
    "nav.vip": "VIP",
    "nav.tickets": "Tickets & VIP Tables",
    "nav.reservations": "Bar and Reservations",

    // Hero
    "hero.title": "NIGHTS ARE BETTER AT LIVECLUB",
    "hero.cta": "Discover the Club",

    // Upcoming Events
    "events.title": "Upcoming Events",
    "events.viewAll": "View full calendar",
    "events.tickets": "Tickets & VIP Tables",

    // New Year
    "newyear.title": "New Year's Eve 2026",
    "newyear.description": "Start the year in style — celebrate with us! Get ready for a night with the best vibes, incredible music and unforgettable moments.",
    "newyear.cta": "More info & reservations",

    // Club Section
    "club.title": "Club",
    "club.description": "With a long tradition of excellence in nightlife and entertainment, LiveClub has become the most iconic club in Rennes and has established itself as one of the main leisure destinations thanks to a lineup full of performances and internationally renowned artists.",
    "club.cta": "More info",
    "club.intro.title": "More than a decade of excellence",
    "club.intro.highlight": "in the world of nightlife and entertainment",
    "club.intro.description": "LiveClub, located in the heart of Rennes, is one of the most emblematic nightclubs in the city. It has consolidated its reputation as one of the main destinations on the nightlife circuit, with a lineup full of live performances and internationally renowned DJs.",
    "club.experience": "The LiveClub Experience",

    // Bar Section
    "bar.title": "Bar",
    "bar.description": "A friendly space where refined cocktails blend with the festive atmosphere. Our menu is full of original creations, reinvented classics and premium drinks, all in a modern and dynamic setting.",
    "bar.cta": "Discover our bar",
    "bar.menu": "Explore our menu",
    "bar.intro.title": "Unique cocktail experience",
    "bar.intro.description": "Located in the heart of Rennes, LiveClub stands out not only for its exciting nightlife but also for its exceptional bar. Our bar invites you to discover a unique fusion of flavors and experiences that you can enjoy throughout the evening.",
    "bar.experience.cocktails": "Cocktails",
    "bar.experience.cocktails.desc": "The moment when our mixologists create liquid works of art. Enjoy high-quality ingredients and exquisite flavors.",
    "bar.experience.afterwork": "After Work",
    "bar.experience.afterwork.desc": "Discover the essence of After Work at LiveClub. Meet up with friends over delicious drinks and cocktails.",
    "bar.experience.night": "Night",
    "bar.experience.night.desc": "Join us for a magical experience filled with authentic flavors, premium ingredients and the best drinks to prepare you for a great night.",
    "bar.menu.title": "Our Menu",
    "bar.menu.viewAll": "View full menu",
    "bar.reserve.title": "Book your table",
    "bar.reserve.description": "Enjoy a unique experience at LiveClub. Book now and let yourself be surprised.",
    "bar.reserve.cta": "Make a reservation",

    // VIP Section
    "vip.title": "VIP",
    "vip.description": "Take your night to the next level. Book your VIP table and immerse yourself in a universe of luxury, limitless entertainment and the best music.",
    "vip.cta": "Info and Reservations",
    "vip.experience": "VIP Experience",
    "vip.level.title": "Take your night to the next level",
    "vip.level.description": "Enjoy the best of nightlife at LiveClub. Join us in our VIP area and immerse yourself in a universe of luxury and limitless entertainment accompanied by the best music. Get ready for a night that will exceed even your wildest expectations and give you unforgettable memories.",
    "vip.calendar.cta": "Visit the calendar and book",
    "vip.areas.title": "The most exclusive areas",
    "vip.areas.description": "Enter a unique and exclusive space in our VIP areas. The most privileged areas of our club, with unparalleled views.",
    "vip.custom.title": "Custom VIP experience",
    "vip.custom.description": "Enter a unique and exclusive space in our VIP areas. The most privileged areas of our club, with unparalleled views, first-class service and a selection of exquisite drinks.",
    "vip.custom.cta": "Discover our VIP menu",
    "vip.ready.title": "Ready for the best night of your life?",
    "vip.ready.description": "Book your VIP table and live an unforgettable experience at LiveClub.",
    "vip.ready.cta": "Book now",

    // Social
    "social.title": "Social",
    "social.subtitle": "Join the LiveClub family",
    "social.follow": "Follow on Instagram",

    // Calendar
    "calendar.title": "Calendar",
    "calendar.search": "Search",
    "calendar.days": ["MO", "TU", "WE", "TH", "FR", "SA", "SU"],

    // Footer
    "footer.explore": "Explore",
    "footer.contact": "Contact",
    "footer.hours": "Hours",
    "footer.club.hours": "Club: 11:00 PM - 6:00 AM",
    "footer.bar.hours": "Bar: 6:00 PM - 3:00 AM",
    "footer.legal": "Legal Notice",
    "footer.privacy": "Privacy Policy",
    "footer.cookies": "Cookies",
    "footer.copyright": "© 2024 LiveClub Rennes. All rights reserved.",

    // Gallery
    "nav.gallery": "Gallery",
    "gallery.title": "Gallery",
    "gallery.adminPanel": "Admin Panel",
    "gallery.adminDesc": "Upload photos to the gallery. Images are reset every Sunday.",
    "gallery.upload": "Upload",
    "gallery.logout": "Logout",
    "gallery.resetNotice": "Gallery is reset every Sunday at midnight.",
    "gallery.empty": "No photos in the gallery yet.",
    "gallery.adminLogin": "Admin login →",
    "gallery.uploadSuccess": "Success",
    "gallery.uploadSuccessDesc": "Images uploaded successfully.",
    "gallery.deleteSuccess": "Deleted",
    "gallery.deleteSuccessDesc": "Image deleted successfully.",

    // Auth
    "auth.signIn": "Sign In",
    "auth.signUp": "Sign Up",
    "auth.adminAccess": "Admin access only",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.error": "Error",
    "auth.signUpSuccess": "Sign up successful",
    "auth.signUpSuccessDesc": "You can now sign in.",
    "auth.haveAccount": "Already have an account? Sign in",
    "auth.noAccount": "No account? Sign up",
    "auth.backToSite": "Back to site",
    "auth.adminDashboard": "Admin Dashboard",
    "auth.uploadPhotos": "Upload Photos",
    "auth.uploadDesc": "Add photos to the gallery. They will be visible immediately.",
    "auth.uploading": "Uploading...",
    "auth.viewGallery": "View Gallery",
    "auth.notAdmin": "You don't have admin privileges.",

    // Rooms
    "rooms.main.title": "Hip Hop",
    "rooms.main.desc": "The best of urban sound, Hip-Hop and RnB for an electric atmosphere all night long.",
    "rooms.lounge.title": "Electro",
    "rooms.lounge.desc": "Total immersion in electronic music with the best DJs of the current scene.",
    "rooms.cave.title": "Generaliste / 90's",
    "rooms.cave.desc": "The essential hits of yesterday and today to sing and dance without stopping.",

    // VIP Areas
    "vip.area.main": "Hip Hop VIP Zone",
    "vip.area.main.desc": "In the heart of the action, live the Hip Hop experience in VIP mode.",
    "vip.area.main.capacity": "4-8 people",
    "vip.area.lounge": "Electro VIP Zone",
    "vip.area.lounge.desc": "Exclusive area to vibrate to the rhythm of electro.",
    "vip.area.lounge.capacity": "6-12 people",
    "vip.area.cave": "90's VIP Zone",
    "vip.area.cave.desc": "Retro and festive atmosphere in an intimate setting.",
    "vip.area.cave.capacity": "4-10 people",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string): string => {
    const value = translations[language][key as keyof typeof translations.fr];
    if (Array.isArray(value)) {
      return value as unknown as string;
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const getTranslationArray = (language: "fr" | "en", key: string): string[] => {
  const value = translations[language][key as keyof typeof translations.fr];
  if (Array.isArray(value)) {
    return value;
  }
  return [];
};
