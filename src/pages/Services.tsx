import { useLanguage } from "@/contexts/LanguageContext";
import { ServiceCard } from "@/components/ServiceCard";
import { Wrench, ShoppingCart, Cable } from "lucide-react";
import heroImage from "@/assets/hero-services.jpg";

export default function Services() {
  const { t } = useLanguage();

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
            {t("services.hero.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            {t("services.hero.subtitle")}
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("services.hero.description")}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ServiceCard
            icon={Wrench}
            title={t("services.repair.title")}
            items={[
              t("services.repair.screen"),
              t("services.repair.battery"),
              t("services.repair.camera"),
              t("services.repair.water"),
            ]}
          />
          <ServiceCard
            icon={ShoppingCart}
            title={t("services.buy.title")}
            items={[
              t("services.buy.used"),
              t("services.buy.trade"),
              t("services.buy.warranty"),
            ]}
          />
          <ServiceCard
            icon={Cable}
            title={t("services.accessories.title")}
            items={[
              t("services.accessories.cases"),
              t("services.accessories.chargers"),
              t("services.accessories.screen"),
            ]}
          />
        </div>
      </section>
    </div>
  );
}
