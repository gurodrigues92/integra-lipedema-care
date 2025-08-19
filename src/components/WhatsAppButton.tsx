import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  location: string;
  className?: string;
  children?: React.ReactNode;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const WhatsAppButton = ({ 
  location, 
  className = "", 
  children = "Quero entender meu caso agora",
  utm_source = "landing",
  utm_medium = "cta",
  utm_campaign = "lipedema"
}: WhatsAppButtonProps) => {
  const message = encodeURIComponent("Olá! Vi a página da Integra Lipecare e quero entender meu caso");
  const utmParams = `utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign}&utm_content=${location}`;
  const whatsappUrl = `https://wa.me/5515991159866?text=${message}&${utmParams}`;
  
  const handleClick = () => {
    // Track event
    console.log('[LandingIntegra] WhatsApp CTA clicked:', location);
    
    // Google Analytics event (if available)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'CTA',
        event_label: `WhatsApp_${location}`,
        value: 1
      });
    }
    
    // Facebook Pixel event (if available)
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Contact', {
        content_name: `WhatsApp_${location}`,
        content_category: 'Conversão'
      });
    }
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-whatsapp ${className}`}
      onClick={handleClick}
      aria-label={`Conversar no WhatsApp - ${location}`}
    >
      <MessageCircle className="w-6 h-6" />
      <span>{children}</span>
    </a>
  );
};

export default WhatsAppButton;