import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${marblePattern})`, backgroundSize: 'cover' }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center text-gray-900">
            {t("products.title")}
          </h1>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
            {t("products.subtitle")}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center text-gray-700">Laddar produkter...</div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-12 opacity-20"
                      style={{ backgroundImage: `url(${marblePattern})`, backgroundSize: 'cover' }}
                    />
                  </div>
                  <CardContent className="p-6 relative">
                    <div 
                      className="absolute inset-0 opacity-5"
                      style={{ backgroundImage: `url(${marblePattern})`, backgroundSize: 'cover' }}
                    />
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{product.name}</h3>
                      <p className="text-gray-700">{product.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-700">Inga produkter tillgängliga än.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;