import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Calendrier from "./pages/Calendrier";
import Club from "./pages/Club";
import Bar from "./pages/Bar";
import VIP from "./pages/VIP";
import Gallery from "./pages/Gallery";
import LiveSocialClub from "./pages/LiveSocialClub";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import ScrollToTop from "./components/ScrollToTop";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calendrier" element={<Calendrier />} />
            <Route path="/club" element={<Club />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/vip" element={<VIP />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/live-social-club" element={<LiveSocialClub />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
