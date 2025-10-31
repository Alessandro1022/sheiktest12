import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import marblePattern from "@/assets/marble-pattern.jpeg";

const Admin = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: 'admin',
    });

    if (error) {
      setIsAdmin(false);
      return;
    }

    setIsAdmin(Boolean(data));
  };

  const { data: products } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      toast({
        title: "Fel",
        description: t("admin.login.error"),
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    },
  });

  const saveProductMutation = useMutation({
    mutationFn: async () => {
      let imageUrl = editingProduct?.image_url;

      if (productImage) {
        imageUrl = await uploadImageMutation.mutateAsync(productImage);
      }

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update({
            name: productName,
            description: productDescription,
            image_url: imageUrl,
          })
          .eq('id', editingProduct.id);

        if (error) throw error;
      } else {
        if (!imageUrl) {
          throw new Error("Image is required for new products");
        }

        const { error } = await supabase
          .from('products')
          .insert({
            name: productName,
            description: productDescription,
            image_url: imageUrl,
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditingProduct(null);
      setProductName("");
      setProductDescription("");
      setProductImage(null);
      toast({
        title: "Sparat",
        description: "Produkten har sparats",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fel",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Borttaget",
        description: "Produkten har tagits bort",
      });
    },
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url(${marblePattern})`, backgroundSize: 'cover' }}
        />
        <Card className="w-full max-w-md relative z-10 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">{t("admin.login.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder={t("admin.login.email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 bg-white text-gray-900"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder={t("admin.login.password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 bg-white text-gray-900"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {t("admin.login.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url(${marblePattern})`, backgroundSize: 'cover' }}
        />
        <div className="text-center relative z-10">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Ingen åtkomst</h1>
          <p className="text-gray-700 mb-4">Du har inte behörighet att se denna sida.</p>
          <Button onClick={handleLogout}>{t("admin.logout")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div 
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `url(${marblePattern})`, backgroundSize: 'cover' }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{t("admin.title")}</h1>
          <Button onClick={handleLogout} variant="outline">
            {t("admin.logout")}
          </Button>
        </div>

        {/* Add/Edit Product Form */}
        <Card className="mb-8 bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">
              {editingProduct ? t("admin.editProduct") : t("admin.addProduct")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder={t("admin.productName")}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border-gray-300 bg-white text-gray-900"
            />
            <Textarea
              placeholder={t("admin.productDescription")}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="border-gray-300 bg-white text-gray-900"
            />
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900">
                {t("admin.uploadImage")}
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setProductImage(e.target.files?.[0] || null)}
                className="border-gray-300"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => saveProductMutation.mutate()}
                disabled={saveProductMutation.isPending}
              >
                {t("admin.save")}
              </Button>
              {editingProduct && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingProduct(null);
                    setProductName("");
                    setProductDescription("");
                    setProductImage(null);
                  }}
                >
                  {t("admin.cancel")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <Card key={product.id} className="bg-white border-gray-200">
              <CardContent className="p-4">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="font-bold text-lg mb-2 text-gray-900">{product.name}</h3>
                <p className="text-gray-700 text-sm mb-4">{product.description}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditingProduct(product);
                      setProductName(product.name);
                      setProductDescription(product.description);
                    }}
                  >
                    {t("admin.editProduct")}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteProductMutation.mutate(product.id)}
                  >
                    {t("admin.deleteProduct")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;