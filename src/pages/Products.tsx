import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import marblePattern from "@/assets/marble-pattern.jpeg";

const Products = () => {
  const { t } = useLanguage();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${marblePattern})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/70" />
        </div>
        
        <div className="container mx-auto px-4 z-10 pt-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t("products.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("products.subtitle")}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 container mx-auto px-4">
        {isLoading ? (
          <div className="text-center text-muted-foreground">Laddar produkter...</div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="glass rounded-2xl overflow-hidden hover:glass-strong transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-16 opacity-30"
                    style={{ backgroundImage: `url(${marblePattern})`, backgroundSize: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">Inga produkter tillgängliga än.</div>
        )}
      </section>
    </div>
  );
};

export default Products;