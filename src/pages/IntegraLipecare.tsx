import { useEffect, useState } from "react";
import { Check, Heart, Star, Users, Shield, Clock, Award, MapPin, Phone, Mail, Instagram, ZoomIn } from "lucide-react";
import integraLipecareLogotipo from "@/assets/integra-lipecare-logo.png";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsAppFixed from "@/components/WhatsAppFixed";
import FAQAccordion from "@/components/FAQAccordion";
import { AwardBadge } from "@/components/ui/award-badge";
import { BeamsBackground } from "@/components/ui/beams-background";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AnimatedSection } from "@/components/AnimatedSection";
import { MicroInteraction } from "@/components/MicroInteraction";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { InteractiveTimeline } from "@/components/InteractiveTimeline";
import { LiveMetrics } from "@/components/LiveMetrics";
import { SmartForm } from "@/components/SmartForm";
const IntegraLipecare = () => {
  console.log("IntegraLipecare component is rendering");
  const [socialProofCount, setSocialProofCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(12);
  const [imageModalOpen, setImageModalOpen] = useState<'daniela' | 'fernanda' | null>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
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

    // Header scroll effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = 150;
      if (scrolled > threshold) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

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
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const symptoms = ["Suas pernas doem e incham, especialmente no final do dia", "Você tem facilidade para fazer hematomas nas pernas", "A gordura das suas pernas tem textura diferente (nodular/irregular)", "Dietas e exercícios não reduzem o volume das pernas", "Há desproporção entre a parte superior e inferior do corpo", "Você sente suas pernas pesadas e cansadas constantemente", "Médicos dizem que é 'só gordura' ou 'falta de exercício'"];
  const benefits = [{
    icon: Heart,
    text: "Alívio significativo das dores em até 30 dias"
  }, {
    icon: Users,
    text: "Redução do inchaço e sensação de peso"
  }, {
    icon: Shield,
    text: "Melhora na mobilidade e qualidade de vida"
  }, {
    icon: Star,
    text: "Autoestima recuperada"
  }, {
    icon: Clock,
    text: "Controle da progressão da doença"
  }, {
    icon: Award,
    text: "Suporte emocional especializado"
  }, {
    icon: Users,
    text: "Rede de apoio com outras pacientes"
  }, {
    icon: Heart,
    text: "Plano alimentar anti-inflamatório personalizado"
  }];
  const differentials = [{
    title: "Equipe Multidisciplinar Completa",
    description: "Médicos especializados em lipedema, fisioterapeutas com formação em DLM, nutricionistas especializadas e psicólogas com experiência em dor crônica.",
    icon: Users
  }, {
    title: "Protocolo Integrado Exclusivo",
    description: "Diagnóstico preciso com ultrassom, plano de tratamento personalizado, acompanhamento contínuo e grupos de apoio.",
    icon: Shield
  }, {
    title: "Tecnologias Avançadas",
    description: "Drenagem linfática manual especializada, terapia de compressão adequada, tratamentos complementares e monitoramento de evolução.",
    icon: Award
  }];
  return <>
      {/* Meta tags e Schema.org serão adicionados via Helmet */}
      <div className="min-h-screen">
        {/* Scroll Progress Bar */}
        <ScrollProgress />
        
        {/* Header com Logo */}
        <header className={`bg-background/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-500 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
          <div className="container-custom py-4">
            <div className="flex justify-center">
              <img src={integraLipecareLogotipo} alt="Integra Lipecare - Clínica Especializada em Lipedema" className="h-12 md:h-16 w-auto" loading="eager" />
            </div>
          </div>
        </header>

        {/* Hero Section with Modern Asymmetric Layout */}
        <BeamsBackground className="min-h-screen flex items-center relative overflow-hidden" intensity="subtle">
          <section className="section-padding relative z-10 w-full">
            <div className="container-custom">
              {/* Asymmetric Grid Layout */}
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Main Content - Left Side */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-6">
                    <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight animate-fade-in-up gpu-accelerated">
                      Você sofre com dores e 
                      <span className="text-gradient-primary block"> inchaços nas pernas</span>
                      há anos?
                    </h1>
                    
                    <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed animate-fade-in-up animation-delay-100">
                      Pode ser <strong className="text-primary font-bold">LIPEDEMA</strong> - uma condição que afeta 11% das mulheres e é frequentemente confundida com obesidade
                    </p>
                  </div>
                  
                  {/* CTA with Modern Styling */}
                  <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-200">
                    <MicroInteraction effect="elastic">
                      <WhatsAppButton location="hero" />
                    </MicroInteraction>
                    <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <span>4.9 ⭐ (500+ pacientes)</span>
                    </div>
                  </div>
                </div>

                {/* Visual Elements - Right Side */}
                <div className="lg:col-span-5 relative animate-fade-in-up animation-delay-300">
                  {/* Trust Elements */}
                  <div className="space-y-6">
                    {/* Social Proof Card */}
                    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg gpu-accelerated">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="live-indicator">
                          <div className="pulse-dot"></div>
                          <span className="text-sm font-medium">{onlineUsers} pessoas online</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">{socialProofCount}</div>
                      <div className="text-sm text-muted-foreground">Pacientes já atendidas</div>
                    </div>

                    {/* Trust Badges - Vertical Stack */}
                    <div className="space-y-3 stagger-children" style={{"--stagger-delay": "100ms"} as React.CSSProperties}>
                      {[
                        { icon: Check, text: "Equipe multidisciplinar", color: "success" },
                        { icon: Users, text: "Criada por pacientes", color: "primary" },
                        { icon: Shield, text: "Resultados comprovados", color: "accent" }
                      ].map((item, index) => (
                        <MicroInteraction key={index} effect="glow">
                          <div 
                            className="flex items-center gap-3 bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/30 gpu-accelerated transition-all duration-300 hover:scale-105"
                            style={{"--stagger-index": index} as React.CSSProperties}
                          >
                            <div className={`w-8 h-8 rounded-full bg-${item.color}/20 flex items-center justify-center`}>
                              <item.icon className={`w-4 h-4 text-${item.color}`} />
                            </div>
                            <span className="text-sm font-medium">{item.text}</span>
                          </div>
                        </MicroInteraction>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-parallax-float"></div>
                  <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-parallax-float" style={{animationDelay: '2s'}}></div>
                </div>
              </div>
            </div>
          </section>
        </BeamsBackground>

        {/* Social Proof Bar - Modernized */}
        <section className="py-12 bg-gradient-to-r from-card via-card/95 to-card border-y border-border/30">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Pacientes Atendidas */}
              <div className="text-center space-y-2 animate-scale-bounce animation-delay-100">
                <div className="social-proof-counter">
                  <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-1">
                    {socialProofCount}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Pacientes Transformadas
                  </div>
                </div>
                <div className="progress-line w-24 mx-auto"></div>
              </div>

              {/* Pessoas Online */}
              <div className="text-center space-y-2 animate-scale-bounce animation-delay-200">
                <div className="live-indicator flex items-center justify-center gap-3">
                  <div className="pulse-dot"></div>
                  <div className="space-y-1">
                    <div className="text-2xl font-display font-bold text-foreground">
                      {onlineUsers}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      Online Agora
                    </div>
                  </div>
                </div>
              </div>

              {/* Avaliações */}
              <div className="text-center space-y-2 animate-scale-bounce animation-delay-300">
                <div className="flex justify-center items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-rotate-in" 
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-foreground">4.9</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Avaliação Google
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Problema */}
        <AnimatedSection animation="fade-up" delay={100}>
          <section className="section-padding bg-card">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient-primary">
                  Você se identifica com estes sintomas?
                </h2>
              </div>
              
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 mb-12 stagger-children" style={{"--stagger-delay": "150ms"} as React.CSSProperties}>
                  {symptoms.map((symptom, index) => <div key={index} className={`group benefit-card bg-gradient-to-br from-background to-background/50 border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 gpu-accelerated hover:scale-[1.02] hover:border-primary/30`} style={{"--stagger-index": index} as React.CSSProperties}>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 group-hover:bg-success/30 transition-colors">
                          <Check className="w-5 h-5 text-success" />
                        </div>
                        <span className="text-foreground font-medium leading-relaxed">{symptom}</span>
                      </div>
                    </div>)}
                </div>
                
                <div className="text-center">
                  <MicroInteraction effect="ripple">
                    <WhatsAppButton location="problema">
                      Quero falar com especialistas
                    </WhatsAppButton>
                  </MicroInteraction>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Seção Amplificação - Warning Modernizada */}
        <section className="section-padding bg-gradient-to-br from-destructive/5 via-background to-destructive/5">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              {/* Header with Animation */}
              <div className="text-center mb-12 animate-slide-in-left">
                <div className="inline-flex items-center gap-3 bg-destructive/10 text-destructive px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                  Alerta Importante
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient-primary">
                  O lipedema não tratado pode piorar progressivamente
                </h2>
              </div>
              
              {/* Modern Warning Card */}
              <div className="warning-modern glass-card rounded-3xl p-8 md:p-12 animate-slide-in-right">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left: Content */}
                  <div className="space-y-6">
                    <p className="text-lg font-medium text-foreground leading-relaxed">
                      Sem o diagnóstico e tratamento adequados, o lipedema pode evoluir através de seus 4 estágios, causando:
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        "Aumento progressivo do volume e da dor",
                        "Limitação severa de mobilidade", 
                        "Impacto emocional e isolamento social",
                        "Desenvolvimento de linfedema secundário",
                        "Necessidade de procedimentos mais invasivos"
                      ].map((item, index) => (
                        <div 
                          key={index} 
                          className={`flex items-start gap-4 animate-stagger-fade-in`}
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <div className="w-3 h-3 bg-destructive rounded-full"></div>
                          </div>
                          <span className="text-foreground font-medium leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right: Visual Element */}
                  <div className="relative">
                    <div className="glass-card rounded-2xl p-8 text-center space-y-4">
                      <div className="w-20 h-20 mx-auto bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                        <Clock className="w-10 h-10 text-destructive animate-pulse" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-destructive">
                        Tempo é Essencial
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Cada dia sem tratamento é um dia a mais de sofrimento desnecessário.
                      </p>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-destructive/5 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
                  </div>
                </div>
                
                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                  <div className="glass-card rounded-2xl p-6 bg-success/5 border-success/20">
                    <p className="text-lg font-semibold text-success mb-4">
                      ✨ Mas existe esperança e tratamento eficaz disponível
                    </p>
                    <p className="text-muted-foreground">
                      Nossa equipe especializada está pronta para ajudar você a recuperar sua qualidade de vida
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Solução - Tratamento Modernizado */}
        <AnimatedSection animation="slide-right" delay={200}>
          <section className="section-padding bg-gradient-to-br from-background via-card/30 to-background">
            <div className="container-custom">
              {/* Header */}
              <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <Shield className="w-4 h-4" />
                  Nossa Solução
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient-primary">
                  Tratamento integrado e humanizado
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  A primeira clínica de Sorocaba criada <strong className="text-primary">POR pacientes PARA pacientes</strong>
                </p>
              </div>
              
              {/* Cards com Layout Assimétrico */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 stagger-children" style={{"--stagger-delay": "200ms"} as React.CSSProperties}>
                {differentials.map((item, index) => (
                  <MicroInteraction key={index} effect="glow">
                    <div 
                      className={`group glass-card glass-card-hover rounded-3xl p-8 text-center gpu-accelerated hover:scale-105 transition-transform duration-300`}
                      style={{"--stagger-index": index} as React.CSSProperties}
                    >
                      {/* Icon with Modern Styling */}
                      <div className="relative mb-6">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 animate-parallax-float">
                          <item.icon className="w-10 h-10 text-primary" />
                        </div>
                        {/* Decorative Ring */}
                        <div className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl border-2 border-primary/0 group-hover:border-primary/20 transition-colors duration-300"></div>
                      </div>
                      
                      <h3 className="font-display text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {item.description}
                      </p>
                      
                      {/* Progress indicator */}
                      <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </MicroInteraction>
                ))}
              </div>
              
              {/* Enhanced CTA Section */}
              <div className="text-center">
                <div className="glass-card rounded-3xl p-8 max-w-2xl mx-auto mb-8 animate-scale-bounce">
                  <h3 className="font-display text-2xl font-bold mb-4 text-gradient-primary">
                    Pronta para transformar sua vida?
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Nossa avaliação gratuita inclui diagnóstico completo e plano de tratamento personalizado
                  </p>
                  <MicroInteraction effect="elastic">
                    <WhatsAppButton location="solucao" />
                  </MicroInteraction>
                </div>
                
                {/* Trust Elements */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span>Sem compromisso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span>Atendimento humanizado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span>Especialistas dedicadas</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Seção Timeline do Tratamento */}
        <AnimatedSection animation="fade-up" delay={200}>
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <Clock className="w-4 h-4" />
                  Processo de Tratamento
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient-primary">
                  Como funciona o seu tratamento
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Conheça cada etapa do processo que vai transformar sua vida
                </p>
              </div>
              
              <InteractiveTimeline />
            </div>
          </section>
        </AnimatedSection>

        {/* Seção Nossa Equipe */}
        <section className="section-padding section-gradient-warm">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Conheça as Especialistas que Vão Transformar sua Vida
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Duas médicas renomadas, formadas nas melhores universidades do país, 
                unidas para devolver qualidade de vida às mulheres com lipedema
              </p>
            </div>
            
            {/* Cards das Médicas */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
              {/* Card Dra. Daniela */}
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Foto */}
                  <div className="relative">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative cursor-pointer group">
                          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                            <img src="https://res.cloudinary.com/dkobjk4qi/image/upload/v1753898475/dani_h1khcg.webp" alt="Dra. Daniela Persinotti - Especialista em Ginecologia e Metabolismo" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                          </div>
                          <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full -z-10 blur-lg"></div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <div className="flex flex-col items-center space-y-4 p-6">
                          <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                            <img src="https://res.cloudinary.com/dkobjk4qi/image/upload/v1753898475/dani_h1khcg.webp" alt="Dra. Daniela Persinotti - Especialista em Ginecologia e Metabolismo" className="w-full h-full object-cover" />
                          </div>
                          <div className="text-center space-y-2">
                            <h3 className="text-3xl font-bold text-primary">Dra. Daniela Persinotti</h3>
                            <p className="text-xl font-semibold text-muted-foreground">CRM 99148</p>
                            <p className="text-lg text-muted-foreground">Especialista em Saúde Feminina e Metabolismo</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  {/* Informações */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-primary">Dra. Daniela Persinotti</h3>
                    <p className="text-lg font-semibold text-muted-foreground">CRM 99148</p>
                    <p className="text-base text-muted-foreground">Especialista em Saúde Feminina e Metabolismo</p>
                  </div>
                  
                  {/* Badges Principais */}
                  <div className="space-y-3 w-full">
                    <AwardBadge type="especialista-lipedema" title="Ginecologista e Obstetra" subtitle="Residência em Ginecologia e Obstetrícia" />
                    <AwardBadge type="pos-graduacao" title="Especialista em Metabolismo" subtitle="Longevidade e Saúde Hormonal" />
                  </div>
                  
                  {/* Quote */}
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                    <p className="text-sm italic text-muted-foreground">
                      "Cada mulher é única. Trato o lipedema considerando hormônios, metabolismo e história 
                      de vida para criar um protocolo verdadeiramente personalizado."
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Dra. Fernanda */}
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Foto */}
                  <div className="relative">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative cursor-pointer group">
                          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                            <img src="https://res.cloudinary.com/dkobjk4qi/image/upload/v1753898475/fernanda_f4tjey.webp" alt="Dra. Fernanda T. Sales Antila - Cirurgiã Vascular UNICAMP" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                          </div>
                          <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full -z-10 blur-lg"></div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <div className="flex flex-col items-center space-y-4 p-6">
                          <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                            <img src="https://res.cloudinary.com/dkobjk4qi/image/upload/v1753898475/fernanda_f4tjey.webp" alt="Dra. Fernanda T. Sales Antila - Cirurgiã Vascular UNICAMP" className="w-full h-full object-cover" />
                          </div>
                          <div className="text-center space-y-2">
                            <h3 className="text-3xl font-bold text-primary">Dra. Fernanda T. Sales Antila</h3>
                            <p className="text-xl font-semibold text-muted-foreground">CRM 169587 / RQE 83864</p>
                            <p className="text-lg text-muted-foreground">Cirurgiã Vascular pela UNICAMP</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  {/* Informações */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-primary">Dra. Fernanda T. Sales Antila</h3>
                    <p className="text-lg font-semibold text-muted-foreground">CRM 169587 / RQE 83864</p>
                    <p className="text-base text-muted-foreground">Cirurgiã Vascular pela UNICAMP</p>
                  </div>
                  
                  {/* Badges Principais */}
                  <div className="space-y-3 w-full">
                    <AwardBadge type="especialista-lipedema" title="Cirurgiã Vascular UNICAMP" subtitle="Cirurgia Geral e Cirurgia Vascular" />
                    <AwardBadge type="membro-sociedade" title="Membro SBACV" subtitle="Sociedade Brasileira de Cirurgia Vascular" />
                  </div>
                  
                  {/* Quote */}
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                    <p className="text-sm italic text-muted-foreground">
                      "Com minha formação vascular especializada, identifico e trato alterações circulatórias 
                      do lipedema que outros profissionais podem não perceber."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Métricas de Confiança */}
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border max-w-2xl mx-auto mb-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">500+</div>
                  <div className="text-xs text-muted-foreground">Pacientes Atendidas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">25+</div>
                  <div className="text-xs text-muted-foreground">Anos de Experiência</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">92%</div>
                  <div className="text-xs text-muted-foreground">Taxa de Satisfação</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-semibold mb-6">
                Junte-se às centenas de mulheres que recuperaram sua qualidade de vida
              </p>
              <WhatsAppButton location="equipe">
                Quero ser atendida por estas especialistas
              </WhatsAppButton>
            </div>
          </div>
        </section>

        {/* Seção Métricas em Tempo Real */}
        <AnimatedSection animation="scale-in" delay={150}>
          <section className="section-padding bg-gradient-to-br from-card/50 via-background to-card/50">
            <div className="container-custom">
              <LiveMetrics />
            </div>
          </section>
        </AnimatedSection>

        {/* Seção Benefícios */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                O que você vai conquistar com nosso tratamento
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {benefits.map((benefit, index) => <div key={index} className={`benefit-card text-center animate-fade-in-up animation-delay-${(index + 1) * 100}`}>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mb-4">
                    <benefit.icon className="w-6 h-6 text-success" />
                  </div>
                  <p className="font-medium">{benefit.text}</p>
                </div>)}
            </div>
            
            <div className="text-center">
              <WhatsAppButton location="beneficios" />
            </div>
          </div>
        </section>

        {/* Seção Depoimentos */}
        <AnimatedSection animation="slide-left" delay={300}>
          <section className="section-padding bg-gradient-to-br from-card via-background to-card">
            <div className="container-custom">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <Heart className="w-4 h-4" />
                  Histórias Reais de Transformação
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient-primary">
                  Veja os resultados de quem já transformou sua vida
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Depoimentos reais de pacientes que encontraram na Integra Lipecare a solução para seus problemas
                </p>
              </div>
              
              {/* Testimonials Carousel */}
              <TestimonialsCarousel />
            </div>
          </section>
        </AnimatedSection>

        {/* Seção Formulário Inteligente */}
        <AnimatedSection animation="slide-right" delay={200}>
          <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="container-custom">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-success/10 text-success px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <Check className="w-4 h-4" />
                  Avaliação Gratuita
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient-primary">
                  Descubra se você tem lipedema
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Responda algumas perguntas e receba uma avaliação personalizada da nossa equipe
                </p>
              </div>
              
              <SmartForm onSubmit={(data) => console.log('Form submitted:', data)} />
            </div>
          </section>
        </AnimatedSection>

        {/* Seção FAQ */}
        <AnimatedSection animation="fade-up" delay={100}>
          <section className="section-padding bg-card">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Perguntas Frequentes
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Esclarecemos as principais dúvidas sobre lipedema e nossos tratamentos
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <FAQAccordion />
              </div>
              
              <div className="text-center mt-12">
                <WhatsAppButton location="faq">
                  Tenho outras dúvidas
                </WhatsAppButton>
              </div>
            </div>
          </section>
        </AnimatedSection>

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
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.9023121073!2d-47.46444579999999!3d-23.536015699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c58a65fcb4e499%3A0x97dd13700a6c9e23!2sIguatemi%20Business%20Esplanada!5e0!3m2!1spt-BR!2sbr!4v1755618105980!5m2!1spt-BR!2sbr" className="w-full h-96 border-0 rounded-2xl shadow-lg" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localização da Integra Lipecare" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <AnimatedSection animation="scale-in" delay={300}>
          <section className="section-padding bg-primary text-primary-foreground">
            <div className="container-custom text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Não espere mais para cuidar da sua saúde
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Agende sua primeira consulta com 30% de desconto e comece sua jornada de transformação hoje mesmo
              </p>
              
              <div className="mb-6">
                <MicroInteraction effect="glow">
                  <WhatsAppButton location="cta-final" className="bg-card text-card-foreground hover:bg-card/90">
                    Agendar minha consulta agora
                  </WhatsAppButton>
                </MicroInteraction>
              </div>
              
              <p className="text-sm opacity-75">
                Oferta válida até sexta-feira • Vagas limitadas
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Footer */}
        <footer className="bg-background border-t border-border/40">
          <div className="container-custom py-12">
            <div className="flex flex-col items-center text-center space-y-8">
              {/* Logo */}
              <div className="flex justify-center">
                <img src={integraLipecareLogotipo} alt="Integra Lipecare - Clínica Especializada em Lipedema" className="h-16 md:h-20 w-auto opacity-90" loading="lazy" />
              </div>
              
              {/* Informações da Clínica */}
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl w-full">
                {/* Endereço */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Localização</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Avenida Gisele Constantino, 1850<br />
                    Sala 1313 - Votorantim, SP<br />
                    CEP: 18110-150
                  </p>
                </div>
                
                {/* Contato */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Contato</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    (15) 99115-9866<br />
                    contato@integralipecare.com.br<br />
                    Segunda a Sexta: 8h às 18h<br />
                    Sábado: 8h às 13h
                  </p>
                </div>
                
                {/* Redes Sociais */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <Instagram className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Siga-nos</h3>
                  </div>
                  <div className="flex justify-center">
                    <a href="https://instagram.com/integralipecare" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      
                      @integralipecare
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Linha separadora */}
              <div className="w-full border-t border-border/40"></div>
              
              {/* Copyright e informações legais */}
              <div className="space-y-2 text-center">
                <p className="text-sm text-muted-foreground">
                  © 2024 Integra Lipecare. Todos os direitos reservados.
                </p>
                <p className="text-xs text-muted-foreground">
                  Clínica especializada em lipedema • CRM 99148 - Dra. Daniela Persinotti • CRM 157622 - Dra. Fernanda Heloisa
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* WhatsApp Fixo */}
        <WhatsAppFixed />
      </div>
    </>;
};
export default IntegraLipecare;