import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  section?: string;
  structuredData?: object;
}

export const SEOHead = ({
  title = "Tratamento de Lipedema em Sorocaba | Integra Lipecare - Clínica Especializada",
  description = "Clínica especializada em lipedema em Sorocaba. Equipe multidisciplinar, diagnóstico preciso, tratamento humanizado. Criada por pacientes, para pacientes. Agende sua primeira consulta especializada.",
  keywords = "lipedema, tratamento lipedema, lipedema sorocaba, clinica lipedema, drenagem linfática, lipedema tratamento, dor nas pernas, inchaço pernas, lipedema diagnostico",
  image = "https://integralipecare.com.br/og-image.jpg",
  url = "https://integralipecare.com.br",
  type = "website",
  section,
  structuredData
}: SEOHeadProps) => {
  
  // Dynamic title based on section
  const sectionTitles: Record<string, string> = {
    'hero': "Tratamento de Lipedema em Sorocaba | Integra Lipecare",
    'problema': "Sintomas do Lipedema | Diagnóstico Especializado",
    'solucao': "Tratamento Integrado de Lipedema | Equipe Multidisciplinar",
    'equipe': "Médicas Especialistas em Lipedema | Integra Lipecare",
    'depoimentos': "Depoimentos Reais | Resultados do Tratamento de Lipedema",
    'faq': "Perguntas Frequentes sobre Lipedema | Tire suas Dúvidas",
    'contato': "Agende sua Consulta | Primeira Consulta Especializada"
  };

  const sectionDescriptions: Record<string, string> = {
    'hero': "Você sofre com dores e inchaços nas pernas? Pode ser lipedema. Conheça a primeira clínica de Sorocaba especializada no tratamento humanizado do lipedema.",
    'problema': "Identifique os sintomas do lipedema: dores nas pernas, inchaço persistente, desproporção corporal. Diagnóstico preciso com equipe especializada.",
    'solucao': "Protocolo integrado exclusivo: diagnóstico com ultrassom, drenagem linfática especializada, acompanhamento nutricional e suporte psicológico.",
    'equipe': "Conheça Dra. Daniela Persinotti e Dra. Fernanda Sales - especialistas renomadas no tratamento de lipedema com mais de 500 pacientes atendidas.",
    'depoimentos': "Veja depoimentos reais de pacientes que transformaram suas vidas com nosso tratamento especializado em lipedema. Resultados comprovados.",
    'faq': "Tire suas dúvidas sobre lipedema: causas, sintomas, tratamentos disponíveis, duração do tratamento e muito mais. Respostas de especialistas.",
    'contato': "Agende sua primeira consulta especializada em lipedema. Atendimento humanizado com equipe multidisciplinar especializada. Consulta detalhada e personalizada."
  };

  const finalTitle = section && sectionTitles[section] ? sectionTitles[section] : title;
  const finalDescription = section && sectionDescriptions[section] ? sectionDescriptions[section] : description;

  // Default structured data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Integra Lipecare",
    "description": "Clínica especializada em diagnóstico e tratamento de lipedema",
    "url": "https://integralipecare.com.br",
    "telephone": "+55-15-99115-9866",
    "email": "contato@integralipecare.com.br",
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
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 08:00-13:00"
    ],
    "priceRange": "$$",
    "medicalSpecialty": [
      "Medicina Vascular",
      "Fisioterapia",
      "Nutrição",
      "Psicologia"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tratamentos de Lipedema",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Avaliação Completa de Lipedema",
            "description": "Consulta especializada para diagnóstico de lipedema"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Drenagem Linfática Manual Especializada",
            "description": "Técnica específica para tratamento de lipedema"
          }
        }
      ]
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Integra Lipecare - Tratamento Especializado de Lipedema" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Integra Lipecare" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Integra Lipecare - Tratamento Especializado de Lipedema" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Integra Lipecare" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta httpEquiv="content-language" content="pt-BR" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="theme-color" content="#6366f1" />
      
      {/* Medical/Health Specific */}
      <meta name="medical-disclaimer" content="As informações contidas neste site são apenas para fins educacionais e não substituem o aconselhamento médico profissional." />
      <meta name="health-topic" content="Lipedema, Tratamento, Medicina Vascular" />
      
      {/* Local SEO */}
      <meta name="geo.region" content="BR-SP" />
      <meta name="geo.placename" content="Sorocaba, São Paulo" />
      <meta name="geo.position" content="-23.536015699999997;-47.46444579999999" />
      <meta name="ICBM" content="-23.536015699999997, -47.46444579999999" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Additional structured data for FAQ pages */}
      {section === 'faq' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "O que é lipedema?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Lipedema é uma condição médica que causa acúmulo desproporcional de gordura nas pernas, braços e outras partes do corpo, frequentemente acompanhada de dor e sensibilidade."
                }
              },
              {
                "@type": "Question", 
                "name": "Como é feito o diagnóstico de lipedema?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "O diagnóstico é feito através de avaliação clínica especializada, exame físico detalhado e, quando necessário, ultrassom para diferenciação de outras condições."
                }
              }
            ]
          })}
        </script>
      )}
    </Helmet>
  );
};