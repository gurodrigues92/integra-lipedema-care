import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const WhatsAppFixed = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
      // Hide tooltip after 5 seconds
      setTimeout(() => setShowTooltip(false), 5000);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const message = encodeURIComponent("Olá! Vi a página e quero entender meu caso");
  const whatsappUrl = `https://wa.me/5515991159866?text=${message}&utm_source=landing&utm_medium=whatsapp-fixed&utm_campaign=lipedema`;
  
  const handleClick = () => {
    console.log('[LandingIntegra] WhatsApp Fixed clicked');
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'WhatsApp_Fixed',
        value: 1
      });
    }
    
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Contact', {
        content_name: 'WhatsApp_Fixed',
        content_category: 'Conversão'
      });
    }
  };

  return (
    <div className="whatsapp-fixed">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-bubble"
        onClick={handleClick}
        aria-label="Conversar no WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
      
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-4 w-48 p-3 bg-white rounded-lg shadow-lg border animate-fade-in-up">
          <div className="text-sm text-gray-700">
            <p className="font-semibold">Olá! Posso ajudar? 😊</p>
            <p className="mt-1 text-xs">Primeira consulta com 30% de desconto</p>
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppFixed;