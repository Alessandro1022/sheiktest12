import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Smartphone } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/services", label: t("nav.services") },
    { path: "/products", label: t("nav.products") },
    { path: "/contact", label: t("nav.contact") },
    { path: "/admin", label: t("nav.admin") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <Smartphone className="w-8 h-8 text-primary" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sheik Mobile Center
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium transition-all hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage("sv")}
                className={`text-2xl transition-opacity ${
                  language === "sv" ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
                title="Svenska"
              >
                🇸🇪
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`text-2xl transition-opacity ${
                  language === "en" ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
                title="English"
              >
                🇬🇧
              </button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 glass-strong rounded-lg mt-2 mb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-lg font-medium transition-all hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
