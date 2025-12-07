import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/hooks/useLanguage";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Navigate to="/en" replace />} />
            <Route path="/en" element={<Index />} />
            <Route path="/ru" element={<Index />} />
            <Route path="/ua" element={<Index />} />
            <Route path="*" element={<Navigate to="/en" replace />} />
          </Routes>
        </TooltipProvider>
      </LanguageProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;