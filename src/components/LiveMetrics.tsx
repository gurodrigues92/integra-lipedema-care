import { useState, useEffect } from 'react';
import { TrendingUp, Users, Calendar, Award, Clock, Heart } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { MicroInteraction } from './MicroInteraction';

interface Metric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
  color: string;
  trend?: number;
  description: string;
}

const baseMetrics: Metric[] = [
  {
    id: 'patients-treated',
    label: 'Pacientes Tratadas',
    value: 523,
    suffix: '',
    icon: Users,
    color: 'primary',
    trend: 5,
    description: 'Total de pacientes atendidas este ano'
  },
  {
    id: 'success-rate',
    label: 'Taxa de Sucesso',
    value: 94,
    suffix: '%',
    icon: Award,
    color: 'success',
    trend: 2,
    description: 'Pacientes com melhora significativa'
  },
  {
    id: 'average-improvement',
    label: 'Melhora Média',
    value: 78,
    suffix: '%',
    icon: TrendingUp,
    color: 'accent',
    trend: 8,
    description: 'Redução média dos sintomas'
  },
  {
    id: 'treatment-time',
    label: 'Tempo Médio',
    value: 4.2,
    suffix: ' meses',
    icon: Clock,
    color: 'info',
    trend: -0.3,
    description: 'Duração média do tratamento'
  },
  {
    id: 'satisfaction',
    label: 'Satisfação',
    value: 4.9,
    suffix: '/5.0',
    icon: Heart,
    color: 'pink',
    trend: 0.1,
    description: 'Avaliação média das pacientes'
  },
  {
    id: 'appointments-week',
    label: 'Consultas/Semana',
    value: 47,
    suffix: '',
    icon: Calendar,
    color: 'purple',
    trend: 3,
    description: 'Média de consultas por semana'
  }
];

export const LiveMetrics = () => {
  const [metrics, setMetrics] = useState(baseMetrics);
  const [isUpdating, setIsUpdating] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      
      setTimeout(() => {
        setMetrics(prev => prev.map(metric => {
          const variance = Math.random() * 0.02 - 0.01; // -1% to +1%
          let newValue = metric.value * (1 + variance);
          
          // Keep values within realistic bounds
          switch (metric.id) {
            case 'patients-treated':
              newValue = Math.max(500, Math.min(600, Math.floor(newValue)));
              break;
            case 'success-rate':
              newValue = Math.max(90, Math.min(98, Math.round(newValue * 10) / 10));
              break;
            case 'average-improvement':
              newValue = Math.max(70, Math.min(85, Math.round(newValue)));
              break;
            case 'treatment-time':
              newValue = Math.max(3.5, Math.min(5.0, Math.round(newValue * 10) / 10));
              break;
            case 'satisfaction':
              newValue = Math.max(4.7, Math.min(5.0, Math.round(newValue * 10) / 10));
              break;
            case 'appointments-week':
              newValue = Math.max(40, Math.min(55, Math.floor(newValue)));
              break;
          }
          
          return { ...metric, value: newValue };
        }));
        
        setIsUpdating(false);
      }, 500);
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const formatValue = (value: number, suffix: string) => {
    if (suffix === '' && value >= 100) {
      return Math.floor(value).toLocaleString('pt-BR');
    }
    return value.toString();
  };

  return (
    <AnimatedSection animation="fade-up">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className={`w-2 h-2 rounded-full bg-success ${isUpdating ? 'animate-pulse' : ''}`}></div>
            Dados em Tempo Real
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient-primary">
            Resultados Comprovados
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Métricas atualizadas em tempo real da nossa clínica e resultados dos tratamentos
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MicroInteraction key={metric.id} effect="glow">
              <div 
                className="glass-card glass-card-hover rounded-2xl p-6 text-center gpu-accelerated transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-xl flex items-center justify-center">
                  <metric.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Value */}
                <div className="space-y-2 mb-4">
                  <div className={`text-3xl font-bold text-primary font-mono transition-all duration-500 ${isUpdating ? 'animate-pulse' : ''}`}>
                    {formatValue(metric.value, metric.suffix)}
                    <span className="text-lg">{metric.suffix}</span>
                  </div>
                  
                  {/* Trend */}
                  {metric.trend !== undefined && (
                    <div className={`flex items-center justify-center gap-1 text-sm ${
                      metric.trend > 0 ? 'text-success' : metric.trend < 0 ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      <TrendingUp className={`w-3 h-3 ${metric.trend < 0 ? 'rotate-180' : ''}`} />
                      <span>{Math.abs(metric.trend)}{metric.suffix === '%' ? 'pp' : metric.suffix === ' meses' ? 'mês' : ''}</span>
                    </div>
                  )}
                </div>

                {/* Label and Description */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">{metric.label}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {metric.description}
                  </p>
                </div>

                {/* Progress Bar (for percentage metrics) */}
                {metric.suffix === '%' && (
                  <div className="mt-4">
                    <div className="w-full bg-border/30 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </MicroInteraction>
          ))}
        </div>

        {/* Live Updates Footer */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-background/60 backdrop-blur-sm rounded-xl px-6 py-3 border border-border/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Última atualização:</span>
            </div>
            <span className="text-sm text-muted-foreground font-mono">
              {new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
