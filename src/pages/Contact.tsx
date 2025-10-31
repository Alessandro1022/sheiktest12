import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import heroImage from "@/assets/hero-contact.jpg";

export default function Contact() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      label: t("contact.info.address"),
      value: "Kungsgatan 45, Stockholm",
    },
    {
      icon: Phone,
      label: t("contact.info.phone"),
      value: "+46 70 123 45 67",
    },
    {
      icon: Mail,
      label: t("contact.info.email"),
      value: "info@sheikmobile.se",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/70" />
        </div>
        
        <div className="container mx-auto px-4 z-10 pt-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t("contact.hero.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("contact.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{t("contact.info.title")}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="glass p-6 rounded-2xl hover:glass-strong transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{info.label}</h3>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="glass p-6 rounded-2xl hover:glass-strong transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t("contact.info.hours")}</h3>
                  <div className="space-y-1 text-muted-foreground">
                    <p>{t("contact.info.hours.weekdays")}</p>
                    <p>{t("contact.info.hours.saturday")}</p>
                    <p>{t("contact.info.hours.sunday")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-strong p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">{t("contact.visit.title")}</h3>
            <p className="text-muted-foreground text-lg">
              {t("contact.visit.description")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
