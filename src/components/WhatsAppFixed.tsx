// WhatsApp official logo component
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
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
        </svg>
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