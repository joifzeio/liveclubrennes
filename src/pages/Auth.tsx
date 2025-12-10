import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, Upload, LogOut, Image } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignUp) {
      const redirectUrl = `${window.location.origin}/auth`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        toast({
          title: t("auth.error"),
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t("auth.signUpSuccess"),
          description: t("auth.signUpSuccessDesc"),
        });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: t("auth.error"),
          description: error.message,
          variant: "destructive",
        });
      }
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
      action: (
        <ToastAction altText="View Gallery" onClick={() => navigate("/gallery")}>
          {t("auth.viewGallery")}
        </ToastAction>
      ),
    });

    setIsUploading(false);
    event.target.value = "";
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setUser(null);
  };

  // Show admin dashboard if logged in
  if (user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-[0.2em] text-foreground">LIVECLUB</h1>
            <p className="text-[10px] tracking-[0.4em] text-muted-foreground">RENNES</p>
          </div>

          {/* Admin Dashboard Card */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
              {t("auth.adminDashboard")}
            </h2>
            <p className="text-muted-foreground text-sm text-center mb-8">
              {user.email}
            </p>

            {isAdmin ? (
              <div className="space-y-6">
                {/* Upload Section */}
                <div className="p-4 bg-background rounded-lg border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t("auth.uploadPhotos")}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t("auth.uploadDesc")}
                  </p>
                  <label className="cursor-pointer block">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleUpload}
                      disabled={isUploading}
                    />
                    <Button variant="default" className="w-full" disabled={isUploading} asChild>
                      <span>
                        {isUploading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4 mr-2" />
                        )}
                        {isUploading ? t("auth.uploading") : t("gallery.upload")}
                      </span>
                    </Button>
                  </label>
                </div>

                {/* View Gallery Button */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/gallery")}
                >
                  <Image className="w-4 h-4 mr-2" />
                  {t("auth.viewGallery")}
                </Button>

                {/* Logout Button */}
                <Button variant="ghost" className="w-full" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t("gallery.logout")}
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">{t("auth.notAdmin")}</p>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t("gallery.logout")}
                </Button>
              </div>
            )}
          </div>

          {/* Back to site */}
          <div className="mt-6 text-center">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              ← {t("auth.backToSite")}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-[0.2em] text-foreground">LIVECLUB</h1>
          <p className="text-[10px] tracking-[0.4em] text-muted-foreground">RENNES</p>
        </div>

        {/* Auth Card */}
        <div className="bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
            {isSignUp ? t("auth.signUp") : t("auth.signIn")}
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-8">
            {t("auth.adminAccess")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                {t("auth.email")}
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@liveclub.fr"
                required
                className="bg-background"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-foreground mb-2 block">
                {t("auth.password")}
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="bg-background"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isSignUp ? t("auth.signUp") : t("auth.signIn")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:text-primary/80 transition-colors text-sm"
            >
              {isSignUp ? t("auth.haveAccount") : t("auth.noAccount")}
            </button>
          </div>
        </div>

        {/* Back to site */}
        <div className="mt-6 text-center">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            ← {t("auth.backToSite")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;