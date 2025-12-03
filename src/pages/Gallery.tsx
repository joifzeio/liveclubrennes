import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import galleryHeroImg from "@/assets/social/social-3.jpeg";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Trash2, LogOut, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GalleryImage {
  id: string;
  image_url: string;
  storage_path: string;
  created_at: string;
}

const Gallery = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => {
          checkAdminRole(session.user.id);
        }, 0);
      } else {
        setIsAdmin(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    fetchImages();

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!error && data) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const fetchImages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setImages(data);
    }
    setIsLoading(false);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    for (const file of Array.from(files)) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, file);

      if (uploadError) {
        toast({
          title: "Error",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        });
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from("gallery_images")
        .insert({
          image_url: urlData.publicUrl,
          storage_path: filePath,
          uploaded_by: user?.id,
        });

      if (insertError) {
        toast({
          title: "Error",
          description: `Failed to save ${file.name}`,
          variant: "destructive",
        });
      }
    }

    toast({
      title: t("gallery.uploadSuccess"),
      description: t("gallery.uploadSuccessDesc"),
    });

    setIsUploading(false);
    fetchImages();
    event.target.value = "";
  };

  const handleDelete = async (image: GalleryImage) => {
    const { error: storageError } = await supabase.storage
      .from("gallery")
      .remove([image.storage_path]);

    if (storageError) {
      toast({
        title: "Error",
        description: "Failed to delete image from storage",
        variant: "destructive",
      });
      return;
    }

    const { error: dbError } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", image.id);

    if (dbError) {
      toast({
        title: "Error",
        description: "Failed to delete image record",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t("gallery.deleteSuccess"),
      description: t("gallery.deleteSuccessDesc"),
    });

    fetchImages();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setUser(null);
  };

  return (
    <Layout>
      <PageHero title={t("gallery.title")} image={galleryHeroImg} />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          {/* Admin Controls */}
          {isAdmin && (
            <div className="mb-12 p-6 bg-card rounded-xl border border-border">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{t("gallery.adminPanel")}</h3>
                  <p className="text-muted-foreground text-sm">{t("gallery.adminDesc")}</p>
                </div>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleUpload}
                      disabled={isUploading}
                    />
                    <Button variant="default" disabled={isUploading} asChild>
                      <span>
                        {isUploading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4 mr-2" />
                        )}
                        {t("gallery.upload")}
                      </span>
                    </Button>
                  </label>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("gallery.logout")}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Weekly Reset Notice */}
          <div className="mb-8 text-center">
            <p className="text-muted-foreground text-sm">{t("gallery.resetNotice")}</p>
          </div>

          {/* Gallery Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">{t("gallery.empty")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="relative group overflow-hidden rounded-lg aspect-square animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img
                    src={image.image_url}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {isAdmin && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={() => handleDelete(image)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

                  <div className="absolute bottom-2 left-2 text-white/70 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {new Date(image.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Admin Login Link */}
          {!user && (
            <div className="mt-12 text-center">
              <a href="/auth" className="text-primary hover:text-primary/80 transition-colors text-sm">
                {t("gallery.adminLogin")}
              </a>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;