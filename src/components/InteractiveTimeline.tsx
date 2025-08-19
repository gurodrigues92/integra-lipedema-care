import { useState } from 'react';
import { Check, Clock, Calendar, Target, TrendingUp } from 'lucide-react';
import { MicroInteraction } from './MicroInteraction';
import { AnimatedSection } from './AnimatedSection';
import { cn } from '@/lib/utils';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: React.ElementType;
  results: string[];
  isCompleted?: boolean;
  isActive?: boolean;
}

const timelineSteps: TimelineStep[] = [
  {
    id: 1,
    title: "Avaliação Inicial Completa",
    description: "Consulta detalhada com nossa equipe multidisciplinar, incluindo anamnese completa, exame físico e definição do estágio do lipedema.",
    duration: "1ª semana",
    icon: Calendar,
    results: [
      "Diagnóstico preciso do estágio",
      "Plano de tratamento personalizado",
      "Orientações iniciais"
    ],
    isCompleted: false,
    isActive: true
  },
  {
    id: 2,
    title: "Início do Protocolo Integrado",
    description: "Começamos com drenagem linfática manual especializada, orientações nutricionais e suporte psicológico.",
    duration: "2ª - 4ª semana",
    icon: Target,
    results: [
      "Redução inicial do inchaço",
      "Alívio das dores",
      "Melhora da mobilidade"
    ]
  },
  {
    id: 3,
    title: "Intensificação do Tratamento",
    description: "Ajustes no protocolo baseados na resposta inicial, introdução de novos métodos e acompanhamento nutricional avançado.",
    duration: "2º - 3º mês",
    icon: TrendingUp,
    results: [
      "Resultados mais visíveis",
      "Melhora na qualidade do sono",
      "Aumento da disposição"
    ]
  },
  {
    id: 4,
    title: "Consolidação dos Resultados",
    description: "Manutenção dos ganhos obtidos, ajustes finos no tratamento e preparação para a fase de manutenção.",
    duration: "4º - 6º mês",
    icon: Check,
    results: [
      "Estabilização dos resultados",
      "Melhora significativa na autoestima",
      "Retorno às atividades normais"
    ]
  }
];

export const InteractiveTimeline = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
  };

  return (
    <AnimatedSection animation="fade-up">
      <div className="max-w-6xl mx-auto">
        {/* Timeline Header */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient-primary">
            Sua Jornada de Transformação
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Acompanhe cada etapa do seu tratamento e veja como cada fase contribui para sua recuperação
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30"></div>
          
          {/* Timeline Steps */}
          <div className="space-y-8">
            {timelineSteps.map((step, index) => {
              const isActive = activeStep === step.id;
              const isHovered = hoveredStep === step.id;
              const isEven = index % 2 === 1;

              return (
                <MicroInteraction key={step.id} effect="glow">
                  <div 
                    className={cn(
                      "relative transition-all duration-500",
                      `md:${isEven ? 'ml-auto md:pl-8' : ''}`,
                      "md:w-1/2"
                    )}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {/* Timeline Node */}
                    <div 
                      className={cn(
                        "absolute left-4 md:left-auto",
                        isEven ? "md:-left-4" : "md:-right-4",
                        "top-6 w-8 h-8 rounded-full border-4 transition-all duration-300 cursor-pointer z-10",
                        isActive || isHovered
                          ? "bg-primary border-primary scale-125 shadow-glow"
                          : step.isCompleted
                          ? "bg-success border-success"
                          : "bg-background border-border hover:border-primary"
                      )}
                      onClick={() => handleStepClick(step.id)}
                    >
                      <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
                        <step.icon 
                          className={cn(
                            "w-3 h-3 transition-colors",
                            isActive || isHovered ? "text-primary" : "text-muted-foreground"
                          )} 
                        />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div 
                      className={cn(
                        "ml-16 md:ml-0 cursor-pointer transition-all duration-500 gpu-accelerated",
                        isActive ? "scale-105" : "hover:scale-102"
                      )}
                      onClick={() => handleStepClick(step.id)}
                    >
                      <div className={cn(
                        "glass-card rounded-2xl p-6 border-2 transition-all duration-300",
                        isActive 
                          ? "border-primary/50 shadow-glow bg-primary/5" 
                          : "border-border/30 hover:border-primary/30"
                      )}>
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className={cn(
                              "text-lg font-bold mb-2 transition-colors",
                              isActive ? "text-primary" : "text-foreground"
                            )}>
                              {step.title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                              <Clock className="w-4 h-4" />
                              <span>{step.duration}</span>
                            </div>
                          </div>
                          
                          {/* Step Number */}
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                            isActive 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted text-muted-foreground"
                          )}>
                            {step.id}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {step.description}
                        </p>

                        {/* Results */}
                        <div className={cn(
                          "transition-all duration-500 overflow-hidden",
                          isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        )}>
                          <div className="bg-background/60 rounded-xl p-4 space-y-3">
                            <h5 className="font-semibold text-primary text-sm mb-3">
                              Resultados Esperados:
                            </h5>
                            {step.results.map((result, idx) => (
                              <div 
                                key={idx}
                                className="flex items-center gap-3 animate-fade-in-up"
                                style={{ animationDelay: `${idx * 100}ms` }}
                              >
                                <div className="w-2 h-2 bg-success rounded-full"></div>
                                <span className="text-sm font-medium text-foreground">
                                  {result}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </MicroInteraction>
              );
            })}
          </div>
        </div>

        {/* Progress Summary */}
        <div className="mt-12 glass-card rounded-2xl p-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">6 meses</div>
              <div className="text-sm text-muted-foreground">Duração média do tratamento</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-success">95%</div>
              <div className="text-sm text-muted-foreground">Taxa de sucesso</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-accent">500+</div>
              <div className="text-sm text-muted-foreground">Pacientes tratadas</div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};