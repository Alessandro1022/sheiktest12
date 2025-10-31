import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { Wrench, ShoppingBag, Cable } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-home.jpg";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        
        <div className="container mx-auto px-4 z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
              {t("home.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
              {t("home.hero.subtitle")}
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
              {t("home.hero.description")}
            </p>
            <Link to="/services">
              <Button 
                size="lg" 
                className="bg-accent hover:scale-105 hover:shadow-2xl hover:shadow-accent/50 text-white font-semibold px-8 py-6 text-lg rounded-2xl animate-in fade-in slide-in-from-bottom-7 duration-700 delay-500 transition-all"
              >
                {t("home.hero.cta")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={Wrench}
            title={t("home.features.repair")}
            description={t("home.features.repair.desc")}
          />
          <FeatureCard
            icon={ShoppingBag}
            title={t("home.features.buy")}
            description={t("home.features.buy.desc")}
          />
          <FeatureCard
            icon={Cable}
            title={t("home.features.accessories")}
            description={t("home.features.accessories.desc")}
          />
        </div>
      </section>
    </div>
  );
}
