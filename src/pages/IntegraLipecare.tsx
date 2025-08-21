import React, { useEffect, useState, useCallback } from "react";
import { Check, Heart, Star, Users, Shield, Clock, Award, MapPin, Phone, Mail, Instagram } from "lucide-react";
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
import { EthicalTestimonials } from "@/components/EthicalTestimonials";
import { InteractiveTimeline } from "@/components/InteractiveTimeline";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SmartForm } from "@/components/SmartForm";
import { SEOHead } from "@/components/SEOHead";
import TouchGestures from "@/components/TouchGestures";
import NetworkStatus from "@/components/NetworkStatus";


// Optimized IntegraLipecare - v4.0.0
const IntegraLipecare = () => {
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) console.log("IntegraLipecare component is rendering");
  
  const [imageModalOpen, setImageModalOpen] = useState<'daniela' | 'fernanda' | null>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  
  // Optimized scroll handler with useCallback
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY;
    const threshold = 150;
    setHeaderVisible(scrolled <= threshold);
  }, []);

  useEffect(() => {
    // Throttled scroll handler for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Simplified tracking - let AnalyticsTracker handle this
    if (isDev) console.log('[LandingIntegra] Page loaded');

    // Cache clear confirmation
    console.log('✅ PWA completamente removido - sem referências');
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll, isDev]);

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

  return (
    <>
      {/* SEO Head Component */}
      <SEOHead section="hero" />
      
      {/* Analytics & Performance Monitoring */}
      <AnalyticsTracker />
      <PerformanceMonitor enableRealTimeTracking={!isDev} enableConsoleLogging={isDev} />
      
      {/* Network Features */}
      <NetworkStatus />
      
      <ErrorBoundary>
        <TouchGestures
          onSwipeUp={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onSwipeDown={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
        >
          <div className="min-h-screen" id="main-content">
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
        <BeamsBackground className="min-h-screen flex items-center relative" intensity="subtle">
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
                      <WhatsAppButton location="hero" variant="primary" />
                    </MicroInteraction>
                    <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span>Clínica especializada em Lipedema</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Image - Right Side */}
                <div className="lg:col-span-5 relative animate-fade-in-up animation-delay-300 flex justify-center">
                  <div className="relative max-w-md lg:max-w-lg">
                    <img 
                      src="https://res.cloudinary.com/dkobjk4qi/image/upload/v1755459488/DSC03885_qsgeyv.jpg"
                      alt="Integra Lipecare - Equipe Especializada em Lipedema"
                      className="w-full aspect-square object-cover object-left-center rounded-2xl shadow-lg"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-2 right-2 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-parallax-float"></div>
                  <div className="absolute bottom-2 left-2 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-parallax-float" style={{animationDelay: '2s'}}></div>
                </div>
              </div>
            </div>
          </section>
        </BeamsBackground>

        {/* Information Bar */}
        <section className="py-12 bg-gradient-to-br from-primary via-primary/95 to-primary/80 border-y border-primary/20">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Especialização */}
              <div className="group text-center space-y-2 animate-scale-bounce animation-delay-100">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary-foreground/20 transition-all duration-300">
                    <Users className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-lg font-bold text-primary-foreground">
                    Equipe Multidisciplinar
                  </div>
                  <div className="text-sm text-primary-foreground/80">
                    Médicos, fisioterapeutas, nutricionistas e psicólogas
                  </div>
                </div>
              </div>

              {/* Especialização em Lipedema */}
              <div className="group text-center space-y-2 animate-scale-bounce animation-delay-200">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary-foreground/20 transition-all duration-300">
                    <Heart className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-lg font-bold text-primary-foreground">
                    Especialista em Lipedema
                  </div>
                  <div className="text-sm text-primary-foreground/80">
                    Protocolo exclusivo e personalizado
                  </div>
                </div>
              </div>

              {/* Atendimento Humanizado */}
              <div className="group text-center space-y-2 animate-scale-bounce animation-delay-300">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary-foreground/20 transition-all duration-300">
                    <Shield className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-lg font-bold text-primary-foreground">
                    Atendimento Humanizado
                  </div>
                  <div className="text-sm text-primary-foreground/80">
                    Cuidado integral e acolhimento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Problema */}
        <AnimatedSection animation="fade-up" delay={100}>
          <section className="section-padding bg-gradient-to-br from-background via-card/95 to-muted/30">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient-primary">
                  Você se identifica com estes sintomas?
                </h2>
              </div>
              
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 mb-12 stagger-children" style={{"--stagger-delay": "150ms"} as React.CSSProperties}>
                  {symptoms.map((symptom, index) => (
                    <div key={index} className="hover-container">
                      <div className={`group benefit-card bg-gradient-to-br from-background to-background/50 border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 gpu-accelerated hover:border-primary/30 animate-fade-in-up`} style={{"--stagger-index": index, "animationDelay": `${(index + 1) * 100}ms`} as React.CSSProperties}>
                        <div className="flex items-start gap-4">
                          <div className="icon-container">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors icon-hover-effect">
                              <Check className="w-5 h-5 text-primary" />
                            </div>
                            <div className="icon-decorative-ring w-8 h-8 rounded-full"></div>
                          </div>
                          <span className="text-foreground font-medium leading-relaxed">{symptom}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <MicroInteraction effect="ripple">
                    <WhatsAppButton location="problema" variant="primary">
                      Quero falar com especialistas
                    </WhatsAppButton>
                  </MicroInteraction>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Seção Amplificação - Warning Modernizada */}
        <section className="section-padding bg-gradient-to-br from-amber-50/80 via-background to-amber-50/80">
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
              <div className="warning-earth glass-card rounded-3xl p-8 md:p-12 animate-slide-in-right">
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
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                          </div>
                          <span className="text-foreground font-medium leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right: Visual Element */}
                  <div className="relative">
                    <div className="glass-card rounded-2xl p-8 text-center space-y-4">
                      <div className="w-20 h-20 mx-auto bg-amber-100/80 rounded-full flex items-center justify-center mb-4">
                        <Clock className="w-10 h-10 text-amber-700 animate-pulse" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-amber-800">
                        Tempo é Essencial
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Cada dia sem tratamento é um dia a mais de sofrimento desnecessário.
                      </p>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-2 right-2 w-16 h-16 bg-amber-100/30 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-2 left-2 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
                  </div>
                </div>
                
                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                  <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-primary via-primary/95 to-primary/80">
                    <p className="text-lg font-semibold text-primary-foreground mb-4 flex items-center justify-center gap-3">
                      <Heart className="w-5 h-5 text-primary-foreground" />
                      Mas existe esperança e tratamento eficaz disponível
                    </p>
                    <p className="text-primary-foreground/80">
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
                  <div 
                    key={item.title}
                    className={`group glass-card glass-card-hover rounded-3xl p-8 text-center gpu-accelerated hover:scale-105 transition-transform duration-300 animate-fade-in-up`}
                    style={{"--animation-delay": `${(index + 1) * 100}ms`, "animationDelay": `${(index + 1) * 100}ms`} as React.CSSProperties}
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
                    <WhatsAppButton location="solucao" variant="primary" />
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
              <div className="bg-gradient-to-br from-card/90 via-muted/20 to-card/80 backdrop-blur-sm p-6 rounded-2xl border hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{"animationDelay": "200ms"} as React.CSSProperties}>
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Foto */}
                  <div className="relative">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative cursor-pointer group p-4">
                          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                            <img src="https://res.cloudinary.com/dkobjk4qi/image/upload/v1753898475/dani_h1khcg.webp" alt="Dra. Daniela Persinotti - Especialista em Ginecologia e Metabolismo" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                          </div>
                          <div className="absolute inset-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
                          <div className="absolute inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full -z-10 blur-lg"></div>
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
                   <div className="flex flex-col items-center space-y-3 w-full">
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
              <div className="bg-gradient-to-br from-card/90 via-muted/20 to-card/80 backdrop-blur-sm p-6 rounded-2xl border hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{"animationDelay": "300ms"} as React.CSSProperties}>
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Foto */}
                  <div className="relative">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative cursor-pointer group p-4">
                          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                            <img src="https://res.cloudinary.com/dkobjk4qi/image/upload/v1753898475/fernanda_f4tjey.webp" alt="Dra. Fernanda T. Sales Antila - Cirurgiã Vascular UNICAMP" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                          </div>
                          <div className="absolute inset-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
                          <div className="absolute inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full -z-10 blur-lg"></div>
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
                   <div className="flex flex-col items-center space-y-3 w-full">
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

            {/* Informações Éticas */}
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border max-w-2xl mx-auto mb-8 animate-fade-in-up">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-primary">Compromisso com a Transparência</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Somos uma clínica nova em Votorantim, dedicada ao atendimento especializado 
                  em lipedema. Nossa equipe tem experiência comprovada e está comprometida 
                  em fornecer o melhor tratamento baseado em evidências científicas.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-semibold mb-6">
                Receba atendimento especializado de uma equipe dedicada ao lipedema
              </p>
              <WhatsAppButton location="equipe" variant="primary">
                Quero ser atendida por estas especialistas
              </WhatsAppButton>
            </div>
          </div>
        </section>

        {/* Seção Benefícios */}
        <section className="section-padding bg-gradient-to-br from-muted/20 via-card to-background/80">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                O que você vai conquistar com nosso tratamento
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {benefits.map((benefit, index) => <div key={`benefit-${index}`} className={`group benefit-card text-center animate-fade-in-up`} style={{"animationDelay": `${(index + 1) * 100}ms`} as React.CSSProperties}>
                  <div className="icon-container">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-4 icon-hover-effect">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="icon-decorative-ring w-12 h-12 rounded-full"></div>
                  </div>
                  <p className="font-medium">{benefit.text}</p>
                </div>)}
            </div>
            
            <div className="text-center">
              <WhatsAppButton location="beneficios" variant="primary" />
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
                   Informações Importantes
                 </div>
                 <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient-primary">
                   Conhecimento que Transforma Vidas
                 </h2>
                 <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                   Informações educativas essenciais para entender e tratar adequadamente o lipedema
                 </p>
              </div>
              
              {/* Testimonials Carousel */}
              <EthicalTestimonials />
            </div>
          </section>
        </AnimatedSection>

        {/* Seção Formulário Inteligente */}
        <AnimatedSection animation="slide-right" delay={200}>
          <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="container-custom">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <Check className="w-4 h-4" />
                  Avaliação Especializada
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
          <section className="section-padding bg-gradient-to-br from-card via-muted/10 to-background/60">
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
                <WhatsAppButton location="faq" variant="primary">
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
                Fácil acesso em Sorocaba
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
                    <WhatsAppButton location="localizacao" variant="primary">
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
                  <WhatsAppButton location="cta-final" variant="primary" className="bg-card text-card-foreground hover:bg-card/90">
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

        </div>
        
        {/* WhatsApp Fixed Button */}
        <WhatsAppFixed />
        </TouchGestures>
      </ErrorBoundary>
    </>
  );
};

export default IntegraLipecare;
