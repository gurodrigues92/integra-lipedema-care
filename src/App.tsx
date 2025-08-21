import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IntegraLipecare from "./pages/IntegraLipecare";
import NotFound from "./pages/NotFound";
import { Helmet } from "react-helmet";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Helmet>
        <title>Tratamento de Lipedema em Sorocaba | Integra Lipecare - Clínica Especializada</title>
        <meta name="description" content="Clínica especializada em lipedema em Sorocaba. Equipe multidisciplinar, tratamento humanizado. Criada por pacientes, para pacientes. Agende sua avaliação." />
        
        {/* Open Graph */}
        <meta property="og:title" content="Integra Lipecare - Tratamento Especializado de Lipedema" />
        <meta property="og:description" content="Sofre com dores e inchaços nas pernas? Pode ser lipedema. Diagnóstico e tratamento especializado em Sorocaba." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://integralipecare.com.br" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": "Integra Lipecare",
            "description": "Clínica especializada em diagnóstico e tratamento de lipedema",
            "url": "https://integralipecare.com.br",
            "telephone": "+55-15-99115-9866",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Avenida Gisele Constantino, 1850 - Sala 1313",
              "addressLocality": "Votorantim",
              "addressRegion": "SP",
              "postalCode": "18110-150",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -23.536015699999997,
              "longitude": -47.46444579999999
            },
            "openingHours": "Mo-Fr 08:00-18:00, Sa 08:00-13:00",
            "priceRange": "$$",
            "medicalSpecialty": [
              "Vascular Medicine",
              "Physical Therapy", 
              "Nutrition",
              "Psychology"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127"
            }
          })}
        </script>
      </Helmet>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntegraLipecare />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
