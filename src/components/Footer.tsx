import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Smartphone } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="glass mt-auto border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Smartphone className="w-6 h-6 text-primary" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Sheik Mobile Center
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              {t("footer.copyright")}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <h3 className="text-sm font-semibold text-foreground mb-1">
              {t("footer.contact")}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{t("footer.address")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-primary" />
              <span>{t("footer.phone")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
