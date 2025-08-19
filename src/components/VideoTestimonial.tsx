import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { MicroInteraction } from './MicroInteraction';
import { cn } from '@/lib/utils';

interface VideoTestimonialProps {
  videoUrl: string;
  thumbnailUrl: string;
  patientName: string;
  patientAge: number;
  treatmentDuration: string;
  title: string;
  description: string;
}

export const VideoTestimonial = ({
  videoUrl,
  thumbnailUrl,
  patientName,
  patientAge,
  treatmentDuration,
  title,
  description
}: VideoTestimonialProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you would control the actual video element
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto animate-fade-in-up">
      {/* Video Container */}
      <div 
        className="relative aspect-video bg-black/90 overflow-hidden cursor-pointer group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Thumbnail/Video */}
        <div className="absolute inset-0">
          {!isPlaying ? (
            <img 
              src={thumbnailUrl} 
              alt={`Depoimento de ${patientName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8" />
                </div>
                <p className="text-sm opacity-75">Video reproduzindo...</p>
              </div>
            </div>
          )}
        </div>

        {/* Overlay */}
        <div className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-300",
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        )}>
          {/* Center Play Button */}
          {!isPlaying && (
            <MicroInteraction effect="elastic">
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-primary ml-1" />
                </div>
              </button>
            </MicroInteraction>
          )}

          {/* Controls Bar */}
          <div className={cn(
            "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-all duration-300",
            showControls || !isPlaying ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <MicroInteraction effect="elastic">
                  <button
                    onClick={handlePlay}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </button>
                </MicroInteraction>

                <MicroInteraction effect="elastic">
                  <button
                    onClick={handleMute}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                </MicroInteraction>

                {/* Progress Bar */}
                <div className="flex-1 mx-4">
                  <div className="w-full bg-white/30 rounded-full h-1">
                    <div className="bg-white h-1 rounded-full w-1/3 transition-all duration-300"></div>
                  </div>
                </div>

                <MicroInteraction effect="elastic">
                  <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Maximize className="w-5 h-5 text-white" />
                  </button>
                </MicroInteraction>
              </div>
            </div>
          </div>
        </div>

        {/* Live Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            DEPOIMENTO REAL
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Left: Testimonial Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
            
            {/* Patient Info */}
            <div className="bg-background/60 rounded-xl p-4 space-y-2">
              <div className="font-semibold text-primary">
                {patientName}, {patientAge} anos
              </div>
              <div className="text-sm text-muted-foreground">
                Tratamento: {treatmentDuration}
              </div>
            </div>
          </div>

          {/* Right: Key Points */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground mb-3">
              Principais Resultados:
            </h4>
            <div className="space-y-3">
              {[
                "85% redução das dores nas pernas",
                "Volta às atividades físicas normais",
                "Melhora significativa na autoestima",
                "Controle completo da progressão"
              ].map((result, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm font-medium">{result}</span>
                </div>
              ))}
            </div>

            {/* Verification Badge */}
            <div className="bg-success/10 border border-success/20 rounded-xl p-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-success" />
                </div>
                <div>
                  <div className="font-semibold text-success text-sm">
                    Depoimento Verificado
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Paciente real da Integra Lipecare
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};