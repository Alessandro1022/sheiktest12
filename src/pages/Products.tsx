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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group glass rounded-xl overflow-hidden hover:glass-strong transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.condition && (
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.condition === 'new' 
                          ? 'bg-primary/90 text-white' 
                          : 'bg-accent/90 text-white'
                      }`}>
                        {product.condition === 'new' ? 'NY' : 'BEGAGNAD'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
                    {product.description}
                  </p>
                  {product.price && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-2xl font-bold text-primary">
                        {product.price.toLocaleString('sv-SE')} kr
                      </p>
                    </div>
                  )}
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