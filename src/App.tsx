import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { VideoProvider } from "@/contexts/VideoContext";
import { ScheduleProvider } from "@/contexts/ScheduleContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import About from "./pages/About";
import Events from "./pages/Events";
import Prayer from "./pages/Prayer";
import Donations from "./pages/Donations";
import Projects from "./pages/Projects";
import Schedule from "./pages/Schedule";
import Videos from "./pages/Videos";
import Admin from "./pages/Admin";
import Mentoria from "./pages/Mentoria";
import Imersao from "./pages/Imersao";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <VideoProvider>
      <ScheduleProvider>
        <ProjectProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/eventos" element={<Events />} />
                <Route path="/oracao" element={<Prayer />} />
                <Route path="/doacoes" element={<Donations />} />
                <Route path="/projetos" element={<Projects />} />
                <Route path="/agenda" element={<Schedule />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/mentoria" element={<Mentoria />} />
                <Route path="/imersao" element={<Imersao />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
              <WhatsAppButton />
            </BrowserRouter>
          </TooltipProvider>
        </ProjectProvider>
      </ScheduleProvider>
    </VideoProvider>
  </QueryClientProvider>
);

export default App;
