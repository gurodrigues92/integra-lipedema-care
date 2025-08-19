import { useEffect, useState } from "react";
import { Check, Heart, Star, Users, Shield, Clock, Award, MapPin, Phone, Mail, Instagram } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsAppFixed from "@/components/WhatsAppFixed";
import FAQAccordion from "@/components/FAQAccordion";
import { AwardBadge } from "@/components/ui/award-badge";
import { BeamsBackground } from "@/components/ui/beams-background";

const IntegraLipecare = () => {
  const [socialProofCount, setSocialProofCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(12);

  useEffect(() => {
    // Animate social proof counter
    const targetCount = 523;
    const increment = targetCount / 100;
    const timer = setInterval(() => {
      setSocialProofCount(prev => {
        if (prev >= targetCount) {
          clearInterval(timer);
          return targetCount;
        }
        return Math.floor(prev + increment);
      });
    }, 30);

    // Simulate online users variation
    const onlineTimer = setInterval(() => {
      setOnlineUsers(prev => {
        const variation = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + variation;
        return Math.max(8, Math.min(18, newCount));
      });
    }, 5000);

    // Track page view
    console.log('[LandingIntegra] Page loaded');
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: 'Integra Lipecare Landing',
        page_location: window.location.href
      });
    }

    if (typeof fbq !== 'undefined') {
      fbq('track', 'PageView');
      fbq('track', 'ViewContent', {
        content_name: 'Landing Page Lipedema',
        content_category: 'Saúde'
      });
    }

    return () => {
      clearInterval(timer);
      clearInterval(onlineTimer);
    };
  }, []);

  const symptoms = [
    "Suas pernas doem e incham, especialmente no final do dia",
    "Você tem facilidade para fazer hematomas nas pernas", 
    "A gordura das suas pernas tem textura diferente (nodular/irregular)",
    "Dietas e exercícios não reduzem o volume das pernas",
    "Há desproporção entre a parte superior e inferior do corpo",
    "Você sente suas pernas pesadas e cansadas constantemente",
    "Médicos dizem que é 'só gordura' ou 'falta de exercício'"
  ];

  const benefits = [
    { icon: Heart, text: "Alívio significativo das dores em até 30 dias" },
    { icon: Users, text: "Redução do inchaço e sensação de peso" },
    { icon: Shield, text: "Melhora na mobilidade e qualidade de vida" },
    { icon: Star, text: "Autoestima recuperada" },
    { icon: Clock, text: "Controle da progressão da doença" },
    { icon: Award, text: "Suporte emocional especializado" },
    { icon: Users, text: "Rede de apoio com outras pacientes" },
    { icon: Heart, text: "Plano alimentar anti-inflamatório personalizado" }
  ];

  const differentials = [
    {
      title: "Equipe Multidisciplinar Completa",
      description: "Médicos especializados em lipedema, fisioterapeutas com formação em DLM, nutricionistas especializadas e psicólogas com experiência em dor crônica.",
      icon: Users
    },
    {
      title: "Protocolo Integrado Exclusivo", 
      description: "Diagnóstico preciso com ultrassom, plano de tratamento personalizado, acompanhamento contínuo e grupos de apoio.",
      icon: Shield
    },
    {
      title: "Tecnologias Avançadas",
      description: "Drenagem linfática manual especializada, terapia de compressão adequada, tratamentos complementares e monitoramento de evolução.",
      icon: Award
    }
  ];

  return (
    <>
      {/* Meta tags e Schema.org serão adicionados via Helmet */}
      <div className="min-h-screen">
        {/* Barra de Urgência */}
        <div className="urgency-bar">
          🔥 <strong>Oferta Especial:</strong> Primeira consulta com 30% de desconto - Válido até sexta-feira
        </div>

        {/* Hero Section with Animated Background */}
        <BeamsBackground className="min-h-screen flex items-center" intensity="subtle">
          <section className="section-padding relative z-10 w-full">
            <div className="container-custom">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
                  Você sofre com dores e inchaços nas pernas há anos e nenhum médico descobriu o que é?
                </h1>
                
                <p className="text-xl md:text-2xl mb-8 text-muted-foreground animate-fade-in-up animation-delay-100">
                  Pode ser <strong className="text-foreground">LIPEDEMA</strong> - uma condição que afeta 11% das mulheres e é frequentemente confundida com obesidade ou linfedema
                </p>
                
                <div className="mb-8 animate-fade-in-up animation-delay-200">
                  <WhatsAppButton location="hero" />
                </div>
                
                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-6 text-sm font-medium animate-fade-in-up animation-delay-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Equipe multidisciplinar especializada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Clínica criada por pacientes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>+500 mulheres atendidas</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </BeamsBackground>

        {/* Social Proof Bar */}
        <div className="bg-card py-6 border-y">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div className="social-proof-counter">
                <span className="text-3xl font-bold text-primary">{socialProofCount}</span>
                <span className="ml-2 text-muted-foreground">Pacientes atendidas</span>
              </div>
              <div className="live-indicator">
                <div className="pulse-dot"></div>
                <span className="text-muted-foreground">{onlineUsers} pessoas online agora</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-muted-foreground">4.9 ⭐ no Google</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seção Problema */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Você se identifica com estes sintomas?
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {symptoms.map((symptom, index) => (
                  <div 
                    key={index}
                    className={`flex items-start gap-3 p-4 rounded-xl bg-background animate-fade-in-up animation-delay-${(index + 1) * 100}`}
                  >
                    <Check className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                    <span className="text-foreground">{symptom}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <WhatsAppButton location="problema">
                  Quero falar com especialistas
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Amplificação */}
        <section className="section-padding bg-destructive/5">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-destructive">
                O lipedema não tratado pode piorar progressivamente
              </h2>
              
              <div className="bg-card p-8 rounded-2xl shadow-lg">
                <p className="text-lg leading-relaxed mb-6 text-left">
                  Sem o diagnóstico e tratamento adequados, o lipedema pode evoluir através de seus 4 estágios, causando:
                </p>
                
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span>Aumento progressivo do volume e da dor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span>Limitação severa de mobilidade</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span>Impacto emocional e isolamento social</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span>Desenvolvimento de linfedema secundário</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span>Necessidade de procedimentos mais invasivos no futuro</span>
                  </li>
                </ul>
                
                <p className="text-lg font-semibold mb-6">
                  Cada dia sem tratamento é um dia a mais de sofrimento desnecessário. Mas existe esperança...
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Solução */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tratamento integrado e humanizado na Integra Lipecare
              </h2>
              <p className="text-xl text-muted-foreground">
                A primeira clínica de Sorocaba criada <strong>POR pacientes PARA pacientes</strong>
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {differentials.map((item, index) => (
                <div 
                  key={index}
                  className={`benefit-card text-center animate-fade-in-up animation-delay-${(index + 1) * 100}`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <WhatsAppButton location="solucao">
                Agendar avaliação gratuita
              </WhatsAppButton>
            </div>
          </div>
        </section>

        {/* Seção Nossa Equipe */}
        <section className="section-padding section-gradient-warm">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Nossa Equipe Especializada
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Profissionais qualificadas e experientes, dedicadas ao cuidado humanizado 
                e ao tratamento especializado do lipedema
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              {/* Foto da Equipe */}
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                   <img 
                     src="/team-photo.jpg" 
                     alt="Dra. Ana Carolina e Ft. Mariana - Equipe especializada da Integra Lipecare"
                     className="w-full h-full object-cover"
                     loading="lazy"
                   />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl -z-10 blur-xl"></div>
              </div>
              
              {/* Badges e Credenciais */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">
                    Credenciais e Especializações
                  </h3>
                  
                  <div className="grid gap-6">
                    <div className="animate-fade-in-up animation-delay-100">
                      <AwardBadge 
                        type="especialista-lipedema"
                        title="Especialista em Lipedema"
                        subtitle="Medicina Vascular - CRM 12345"
                      />
                    </div>
                    
                    <div className="animate-fade-in-up animation-delay-200">
                      <AwardBadge 
                        type="pos-graduacao"
                        title="Pós-graduação USP"
                        subtitle="Medicina Vascular e Endovascular"
                      />
                    </div>
                    
                    <div className="animate-fade-in-up animation-delay-300">
                      <AwardBadge 
                        type="certificacao-dlm"
                        title="Certificação Internacional DLM"
                        subtitle="Drenagem Linfática Manual - Fisioterapia"
                      />
                    </div>
                    
                    <div className="animate-fade-in-up animation-delay-400">
                      <AwardBadge 
                        type="membro-sociedade"
                        title="Membro SBACV"
                        subtitle="Sociedade Brasileira Angiologia e Cirurgia Vascular"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">15+</div>
                      <div className="text-sm text-muted-foreground">Anos de Experiência</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">500+</div>
                      <div className="text-sm text-muted-foreground">Pacientes Tratadas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <WhatsAppButton location="equipe">
                Conhecer nossa abordagem
              </WhatsAppButton>
            </div>
          </div>
        </section>

        {/* Seção Benefícios */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                O que você vai conquistar com nosso tratamento
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={`benefit-card text-center animate-fade-in-up animation-delay-${(index + 1) * 100}`}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mb-4">
                    <benefit.icon className="w-6 h-6 text-success" />
                  </div>
                  <p className="font-medium">{benefit.text}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <WhatsAppButton location="beneficios" />
            </div>
          </div>
        </section>

        {/* Seção Prova Social */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Histórias de transformação
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {/* Depoimento Principal */}
              <div className="bg-card p-8 rounded-2xl shadow-lg mb-8 relative">
                <div className="text-4xl text-accent mb-4">"</div>
                <blockquote className="text-lg leading-relaxed mb-6 italic">
                  Depois de 15 anos sofrendo sem saber o que tinha, finalmente encontrei respostas na Integra. 
                  Em 3 meses de tratamento, minha vida mudou. As dores diminuíram 80%, consigo usar roupas que 
                  não usava há anos e, principalmente, me sinto compreendida e acolhida.
                </blockquote>
                <cite className="text-muted-foreground font-semibold">
                  — Maria Silva, 47 anos, paciente há 8 meses
                </cite>
              </div>
              
              {/* Métricas de Sucesso */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="benefit-card">
                  <div className="text-3xl font-bold text-success mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Pacientes atendidas</div>
                </div>
                <div className="benefit-card">
                  <div className="text-3xl font-bold text-success mb-2">92%</div>
                  <div className="text-sm text-muted-foreground">De satisfação</div>
                </div>
                <div className="benefit-card">
                  <div className="text-3xl font-bold text-success mb-2">87%</div>
                  <div className="text-sm text-muted-foreground">Redução nas dores</div>
                </div>
                <div className="benefit-card">
                  <div className="text-3xl font-bold text-success mb-2">4.9⭐</div>
                  <div className="text-sm text-muted-foreground">No Google</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção FAQ */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-muted-foreground">
                Tire suas dúvidas sobre lipedema e nosso tratamento
              </p>
            </div>
            
            <FAQAccordion />
            
            <div className="text-center mt-12">
              <WhatsAppButton location="faq">
                Tenho outras dúvidas
              </WhatsAppButton>
            </div>
          </div>
        </section>

        {/* Seção Localização */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Fácil acesso em Votorantim
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Informações de Contato */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Integra Lipecare - Iguatemi Business</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Endereço:</p>
                        <p className="text-muted-foreground">
                          Avenida Gisele Constantino, 1850 - Sala 1313<br />
                          Parque Bela Vista - Votorantim/SP<br />
                          CEP: 18110-150
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold">WhatsApp:</p>
                        <p className="text-muted-foreground">(15) 99115-9866</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Email:</p>
                        <p className="text-muted-foreground">contato@integralipecare.com.br</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Instagram className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Instagram:</p>
                        <p className="text-muted-foreground">@integralipecare</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <WhatsAppButton location="localizacao">
                      Como chegar até a clínica
                    </WhatsAppButton>
                  </div>
                </div>
              </div>
              
              {/* Mapa */}
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.9023121073!2d-47.46444579999999!3d-23.536015699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c58a65fcb4e499%3A0x97dd13700a6c9e23!2sIguatemi%20Business%20Esplanada!5e0!3m2!1spt-BR!2sbr!4v1755618105980!5m2!1spt-BR!2sbr" 
                  className="w-full h-96 border-0 rounded-2xl shadow-lg"
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Integra Lipecare"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Não espere mais para cuidar da sua saúde
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Agende sua primeira consulta com 30% de desconto e comece sua jornada de transformação hoje mesmo
            </p>
            
            <div className="mb-6">
              <WhatsAppButton 
                location="cta-final"
                className="bg-card text-card-foreground hover:bg-card/90"
              >
                Agendar minha consulta agora
              </WhatsAppButton>
            </div>
            
            <p className="text-sm opacity-75">
              Oferta válida até sexta-feira • Vagas limitadas
            </p>
          </div>
        </section>

        {/* WhatsApp Fixo */}
        <WhatsAppFixed />
      </div>
    </>
  );
};

export default IntegraLipecare;