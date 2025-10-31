import { createContext, useContext, useState, ReactNode } from "react";

type Language = "sv" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  sv: {
    // Navigation
    "nav.home": "Hem",
    "nav.services": "Tjänster",
    "nav.contact": "Kontakt",
    
    // Home page
    "home.hero.title": "Välkommen till Sheik Mobilecenter",
    "home.hero.subtitle": "Allt inom mobiltelefoni",
    "home.hero.description": "Vi erbjuder professionella reparationer, köper och säljer telefoner samt erbjuder ett brett sortiment av tillbehör. Med års erfarenhet och expertis garanterar vi kvalitet i varje tjänst.",
    "home.hero.cta": "Utforska våra tjänster",
    "home.features.repair": "Snabba Reparationer",
    "home.features.repair.desc": "Professionella reparationer med originaldelar",
    "home.features.buy": "Köp & Sälj",
    "home.features.buy.desc": "Köper och säljer begagnade telefoner till bästa pris",
    "home.features.accessories": "Tillbehör",
    "home.features.accessories.desc": "Brett sortiment av högkvalitativa tillbehör",
    
    // Services page
    "services.hero.title": "Våra Tjänster",
    "services.hero.subtitle": "Kompletta lösningar för alla dina mobilbehov",
    "services.repair.title": "Reparationstjänster",
    "services.repair.screen": "Skärmbyte",
    "services.repair.battery": "Batteribyte",
    "services.repair.camera": "Kamerareparation",
    "services.repair.water": "Vattenskadereparation",
    "services.buy.title": "Köp & Försäljning",
    "services.buy.used": "Begagnade telefoner",
    "services.buy.trade": "Inbyte av din gamla telefon",
    "services.buy.warranty": "Garanti på alla enheter",
    "services.accessories.title": "Tillbehör",
    "services.accessories.cases": "Skyddsskal & fodral",
    "services.accessories.chargers": "Laddare & kablar",
    "services.accessories.screen": "Skärmskydd",
    
    // Contact page
    "contact.hero.title": "Kontakta Oss",
    "contact.hero.subtitle": "Vi finns här för att hjälpa dig",
    "contact.info.title": "Kontaktinformation",
    "contact.info.address": "Adress",
    "contact.info.phone": "Telefon",
    "contact.info.email": "E-post",
    "contact.info.hours": "Öppettider",
    "contact.info.hours.weekdays": "Mån-Fre: 12:00 - 19:00",
    "contact.info.hours.weekend": "Lör-Sön: 12:00 - 16:00",
    "contact.visit.title": "Besök Oss",
    "contact.visit.description": "Vi finns centralt i staden och välkomnar dig att besöka vår butik. Våra erfarna tekniker är redo att hjälpa dig med alla dina mobilbehov.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.contact": "Contact",
    
    // Home page
    "home.hero.title": "Welcome to Sheik Mobilecenter",
    "home.hero.subtitle": "Everything in Mobile Telephony",
    "home.hero.description": "We offer professional repairs, buy and sell phones, and provide a wide range of accessories. With years of experience and expertise, we guarantee quality in every service.",
    "home.hero.cta": "Explore Our Services",
    "home.features.repair": "Fast Repairs",
    "home.features.repair.desc": "Professional repairs with original parts",
    "home.features.buy": "Buy & Sell",
    "home.features.buy.desc": "Buy and sell used phones at the best prices",
    "home.features.accessories": "Accessories",
    "home.features.accessories.desc": "Wide range of high-quality accessories",
    
    // Services page
    "services.hero.title": "Our Services",
    "services.hero.subtitle": "Complete Solutions for All Your Mobile Needs",
    "services.repair.title": "Repair Services",
    "services.repair.screen": "Screen Replacement",
    "services.repair.battery": "Battery Replacement",
    "services.repair.camera": "Camera Repair",
    "services.repair.water": "Water Damage Repair",
    "services.buy.title": "Buy & Sell",
    "services.buy.used": "Used Phones",
    "services.buy.trade": "Trade-in Your Old Phone",
    "services.buy.warranty": "Warranty on All Devices",
    "services.accessories.title": "Accessories",
    "services.accessories.cases": "Cases & Covers",
    "services.accessories.chargers": "Chargers & Cables",
    "services.accessories.screen": "Screen Protectors",
    
    // Contact page
    "contact.hero.title": "Contact Us",
    "contact.hero.subtitle": "We're Here to Help You",
    "contact.info.title": "Contact Information",
    "contact.info.address": "Address",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",
    "contact.info.hours": "Opening Hours",
    "contact.info.hours.weekdays": "Mon-Fri: 12:00 PM - 7:00 PM",
    "contact.info.hours.weekend": "Sat-Sun: 12:00 PM - 4:00 PM",
    "contact.visit.title": "Visit Us",
    "contact.visit.description": "We are centrally located in the city and welcome you to visit our store. Our experienced technicians are ready to help you with all your mobile needs.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("sv");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.sv] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
