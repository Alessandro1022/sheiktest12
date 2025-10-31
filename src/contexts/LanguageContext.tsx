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
    "nav.products": "Produkter",
    "nav.contact": "Kontakt",
    "nav.admin": "Admin",
    
    // Home page
    "home.hero.title": "Välkommen till Sheik Mobile Center",
    "home.hero.subtitle": "Din kompletta mobilpartner",
    "home.hero.description": "Hos oss får du professionell service för alla dina mobilbehov. Vi utför snabba reparationer med kvalitetsdelar, köper och säljer telefoner till rättvisa priser, och erbjuder ett omfattande sortiment av tillbehör. Med gedigen erfarenhet och expertis levererar vi alltid förstklassig service.",
    "home.hero.cta": "Utforska våra tjänster",
    "home.features.repair": "Snabba Reparationer",
    "home.features.repair.desc": "Professionella reparationer med originaldelar",
    "home.features.buy": "Köp & Sälj",
    "home.features.buy.desc": "Köper och säljer begagnade telefoner till bästa pris",
    "home.features.accessories": "Tillbehör",
    "home.features.accessories.desc": "Brett sortiment av högkvalitativa tillbehör",
    
    // Services page
    "services.hero.title": "Våra Tjänster",
    "services.hero.subtitle": "Professionella mobilreparationer och försäljning med garanti",
    "services.hero.description": "Vi är specialister på allt som rör mobiltelefoner. Oavsett om din telefon behöver reparation, om du vill sälja din gamla eller köpa en uppgraderad modell, eller om du söker högkvalitativa tillbehör - vi har lösningen. Varje tjänst utförs med precision och omsorg.",
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
    "contact.visit.title": "Besök Oss i Kortedala",
    "contact.visit.description": "Vi ligger på Kortedala Torg i Göteborg och välkomnar dig varmt till vår butik. Vårt erfarna och kunniga team finns på plats för att ge dig personlig service och experthjälp med alla dina mobilbehov. Oavsett om du behöver en snabb reparation, vill sälja eller köpa en telefon, eller bara vill titta på vårt sortiment av tillbehör - kom förbi så hjälper vi dig!",
    
    // Footer
    "footer.copyright": "© 2025 Sheik Mobile Center. Alla rättigheter förbehållna.",
    "footer.contact": "Kontakt",
    "footer.address": "Kortedala Torg 4, 417 05 Göteborg",
    "footer.phone": "Tel: 031-41 49 49",
    
    // Products
    "products.title": "Våra Produkter",
    "products.subtitle": "Upptäck vårt sortiment av produkter och tillbehör som finns i vår butik.",
    
    // Admin
    "admin.title": "Adminpanel",
    "admin.login.title": "Admin Inloggning",
    "admin.login.email": "E-post",
    "admin.login.password": "Lösenord",
    "admin.login.submit": "Logga in",
    "admin.login.error": "Ogiltiga uppgifter",
    "admin.addProduct": "Lägg till Produkt",
    "admin.editProduct": "Redigera Produkt",
    "admin.deleteProduct": "Ta bort",
    "admin.productName": "Produktnamn",
    "admin.productDescription": "Beskrivning",
    "admin.productImage": "Produktbild",
    "admin.save": "Spara",
    "admin.cancel": "Avbryt",
    "admin.logout": "Logga ut",
    "admin.uploadImage": "Ladda upp bild",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.products": "Products",
    "nav.contact": "Contact",
    "nav.admin": "Admin",
    
    // Home page
    "home.hero.title": "Welcome to Sheik Mobile Center",
    "home.hero.subtitle": "Your Complete Mobile Partner",
    "home.hero.description": "We provide professional service for all your mobile needs. We perform fast repairs with quality parts, buy and sell phones at fair prices, and offer a comprehensive range of accessories. With extensive experience and expertise, we always deliver first-class service.",
    "home.hero.cta": "Explore Our Services",
    "home.features.repair": "Fast Repairs",
    "home.features.repair.desc": "Professional repairs with original parts",
    "home.features.buy": "Buy & Sell",
    "home.features.buy.desc": "Buy and sell used phones at the best prices",
    "home.features.accessories": "Accessories",
    "home.features.accessories.desc": "Wide range of high-quality accessories",
    
    // Services page
    "services.hero.title": "Our Services",
    "services.hero.subtitle": "Professional Mobile Repairs and Sales with Warranty",
    "services.hero.description": "We specialize in everything related to mobile phones. Whether your phone needs repair, you want to sell your old one or buy an upgraded model, or you're looking for high-quality accessories - we have the solution. Every service is performed with precision and care.",
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
    "contact.visit.title": "Visit Us in Kortedala",
    "contact.visit.description": "We are located at Kortedala Torg in Gothenburg and warmly welcome you to our store. Our experienced and knowledgeable team is here to provide you with personal service and expert help with all your mobile needs. Whether you need a quick repair, want to sell or buy a phone, or just want to browse our range of accessories - stop by and we'll help you!",
    
    // Footer
    "footer.copyright": "© 2025 Sheik Mobile Center. All rights reserved.",
    "footer.contact": "Contact",
    "footer.address": "Kortedala Torg 4, 417 05 Gothenburg",
    "footer.phone": "Phone: 031-41 49 49",
    
    // Products
    "products.title": "Our Products",
    "products.subtitle": "Discover our selection of products and accessories available in our store.",
    
    // Admin
    "admin.title": "Admin Panel",
    "admin.login.title": "Admin Login",
    "admin.login.email": "Email",
    "admin.login.password": "Password",
    "admin.login.submit": "Login",
    "admin.login.error": "Invalid credentials",
    "admin.addProduct": "Add Product",
    "admin.editProduct": "Edit Product",
    "admin.deleteProduct": "Delete",
    "admin.productName": "Product Name",
    "admin.productDescription": "Description",
    "admin.productImage": "Product Image",
    "admin.save": "Save",
    "admin.cancel": "Cancel",
    "admin.logout": "Logout",
    "admin.uploadImage": "Upload Image",
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
