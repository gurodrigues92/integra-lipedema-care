import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { MicroInteraction } from './MicroInteraction';
import { AnimatedSection } from './AnimatedSection';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Testimonial {
  id: number;
  name: string;
  age: number;
  location: string;
  condition: string;
  beforeImage?: string;
  afterImage?: string;
  testimonial: string;
  rating: number;
  treatmentDuration: string;
  keyResults: string[];
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Silva",
    age: 42,
    location: "Sorocaba, SP",
    condition: "Lipedema Estágio 2",
    testimonial: "Após anos de sofrimento e diagnósticos incorretos, finalmente encontrei na Integra Lipecare o tratamento que mudou minha vida. Em 6 meses, as dores diminuíram drasticamente e recuperei minha autoestima.",
    rating: 5,
    treatmentDuration: "6 meses",
    keyResults: ["90% redução das dores", "Melhora na mobilidade", "Autoestima recuperada"]
  },
  {
    id: 2,
    name: "Ana Carolina",
    age: 35,
    location: "Votorantim, SP",
    condition: "Lipedema Estágio 1",
    testimonial: "O atendimento humanizado e a expertise da equipe fizeram toda diferença. Hoje consigo usar roupas que não vestia há anos e voltar a fazer atividades que amava.",
    rating: 5,
    treatmentDuration: "4 meses",
    keyResults: ["Redução do inchaço", "Melhora estética", "Volta às atividades"]
  },
  {
    id: 3,
    name: "Juliana Costa",
    age: 38,
    location: "Itu, SP",
    condition: "Lipedema Estágio 2",
    testimonial: "Ser atendida por profissionais que realmente entendem o lipedema fez toda diferença. O protocolo personalizado e o acompanhamento contínuo foram fundamentais para meus resultados.",
    rating: 5,
    treatmentDuration: "8 meses",
    keyResults: ["Controle da progressão", "Melhora na qualidade de vida", "Suporte emocional"]
  },
  {
    id: 4,
    name: "Patricia Oliveira",
    age: 45,
    location: "Sorocaba, SP",
    condition: "Lipedema Estágio 3",
    testimonial: "Depois de anos visitando médicos que não entendiam meu problema, encontrei na Integra uma equipe que mudou minha perspectiva. Hoje tenho esperança e resultados reais.",
    rating: 5,
    treatmentDuration: "10 meses",
    keyResults: ["Estabilização do quadro", "Redução significativa das dores", "Melhora emocional"]
  }
];

export const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;

    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, prefersReducedMotion]);

  const current = testimonials[currentIndex];

  return (
    <AnimatedSection animation="fade-up">
      <div className="relative max-w-6xl mx-auto">
        {/* Main Testimonial Card */}
        <div 
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 shadow-2xl animate-fade-in-up"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iY3VycmVudENvbG9yIi8+Cjwvc3ZnPgo=')] bg-repeat"></div>
          </div>

          <div className="relative p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Testimonial Content */}
              <div className="space-y-6">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {current.rating}.0
                  </span>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl leading-relaxed text-foreground font-medium">
                  "{current.testimonial}"
                </blockquote>

                {/* Patient Info */}
                <div className="space-y-2">
                  <div className="font-semibold text-primary text-lg">
                    {current.name}, {current.age} anos
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {current.location} • {current.condition}
                  </div>
                  <div className="text-sm font-medium text-accent">
                    Tratamento: {current.treatmentDuration}
                  </div>
                </div>
              </div>

              {/* Right: Results & Metrics */}
              <div className="space-y-6">
                <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border/30">
                  <h4 className="font-semibold text-primary mb-4">Principais Resultados:</h4>
                  <div className="space-y-3">
                    {current.keyResults.map((result, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 animate-fade-in-up"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-sm font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border/30">
                  <div className="text-center space-y-3">
                    <div className="text-3xl font-bold text-primary">
                      {current.treatmentDuration}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tempo de tratamento
                    </div>
                    <div className="w-full bg-border/30 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Previous Button */}
          <MicroInteraction effect="elastic">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </MicroInteraction>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <MicroInteraction key={index} effect="elastic">
                <button
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-border hover:bg-primary/50'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              </MicroInteraction>
            ))}
          </div>

          {/* Next Button */}
          <MicroInteraction effect="elastic">
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </MicroInteraction>
        </div>

        {/* Auto-play Indicator */}
        <div className="flex items-center justify-center mt-4 gap-2 text-xs text-muted-foreground">
          <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-success animate-pulse' : 'bg-border'}`}></div>
          <span>
            {isAutoPlaying && !prefersReducedMotion ? 'Reprodução automática ativa' : 'Reprodução pausada'}
          </span>
        </div>
      </div>
    </AnimatedSection>
  );
};