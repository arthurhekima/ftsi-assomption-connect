
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Formations from "./pages/Formations";
import Enseignants from "./pages/Enseignants";
import Etudiants from "./pages/Etudiants";
import Administration from "./pages/Administration";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import EnseignantsAdmin from "./pages/admin/EnseignantsAdmin";
import PhotosAdmin from "./pages/admin/PhotosAdmin";
import HorairesAdmin from "./pages/admin/HorairesAdmin";
import { AuthProvider } from "./hooks/use-auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="formations" element={<Formations />} />
              <Route path="enseignants" element={<Enseignants />} />
              <Route path="etudiants" element={<Etudiants />} />
              <Route path="administration" element={<Administration />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="enseignants" element={<EnseignantsAdmin />} />
              <Route path="photos" element={<PhotosAdmin />} />
              <Route path="horaires" element={<HorairesAdmin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
