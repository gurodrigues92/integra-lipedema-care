import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { MicroInteraction } from './MicroInteraction';

interface Educational {
  id: number;
  title: string;
  content: string;
  source?: string;
  category: 'symptom' | 'treatment' | 'awareness';
}

const educationalContent: Educational[] = [
  {
    id: 1,
    title: "Reconhecimento dos Sintomas",
    content: "O lipedema é caracterizado por dor, sensibilidade ao toque e acúmulo desproporcional de gordura nas extremidades. É importante buscar avaliação médica especializada para diagnóstico adequado.",
    category: "symptom"
  },
  {
    id: 2,
    title: "Abordagem Multidisciplinar",
    content: "O tratamento eficaz do lipedema requer uma equipe especializada incluindo médicos, fisioterapeutas, nutricionistas e apoio psicológico para resultados otimizados.",
    category: "treatment"
  },
  {
    id: 3,
    title: "Importância do Diagnóstico Precoce",
    content: "O diagnóstico precoce do lipedema é fundamental para prevenir a progressão da condição e implementar estratégias de tratamento adequadas.",
    category: "awareness"
  }
];

export const EthicalTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextContent = () => {
    setCurrentIndex((prev) => (prev + 1) % educationalContent.length);
  };

  const prevContent = () => {
    setCurrentIndex((prev) => (prev - 1 + educationalContent.length) % educationalContent.length);
  };

  const currentContent = educationalContent[currentIndex];

  return (
    <AnimatedSection animation="fade-up" delay={100}>
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-card to-card/80 rounded-3xl p-8 md:p-12 shadow-xl border border-border/50 animate-fade-in-up">
          {/* Content */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Quote className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              {currentContent.title}
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {currentContent.content}
            </p>
            
            {currentContent.source && (
              <p className="text-sm text-muted-foreground italic">
                Fonte: {currentContent.source}
              </p>
            )}
            
            <div className="inline-flex items-center gap-1 bg-primary/10 px-4 py-2 rounded-full">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentContent.category === 'symptom' ? 'bg-blue-100 text-blue-700' :
                currentContent.category === 'treatment' ? 'bg-green-100 text-green-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {currentContent.category === 'symptom' ? 'Sintomas' :
                 currentContent.category === 'treatment' ? 'Tratamento' : 'Conscientização'}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <MicroInteraction effect="ripple">
              <button
                onClick={prevContent}
                className="flex items-center justify-center w-12 h-12 bg-background border border-border rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                aria-label="Conteúdo anterior"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
            </MicroInteraction>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {educationalContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Ir para conteúdo ${index + 1}`}
                />
              ))}
            </div>

            <MicroInteraction effect="ripple">
              <button
                onClick={nextContent}
                className="flex items-center justify-center w-12 h-12 bg-background border border-border rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                aria-label="Próximo conteúdo"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </MicroInteraction>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
            * As informações apresentadas têm caráter educativo. Resultados podem variar individualmente. 
            Consulte sempre um profissional de saúde qualificado para avaliação e tratamento adequados.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};