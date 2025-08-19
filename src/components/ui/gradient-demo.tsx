import { GradientButton } from "./gradient-button"
import { MessageCircle, Phone, Calendar, ArrowRight } from "lucide-react"

export function GradientDemo() {
  return (
    <div className="flex flex-wrap gap-6 p-8">
      <h2 className="w-full text-2xl font-light mb-4">Botões Gradientes - Integra Lipecare</h2>
      
      {/* Variante Primary */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Primary (Marrom da Marca)</h3>
        <div className="flex gap-3">
          <GradientButton variant="primary" size="sm">
            <ArrowRight className="w-4 h-4" />
            Pequeno
          </GradientButton>
          <GradientButton variant="primary">
            <Calendar className="w-5 h-5" />
            Agendar Consulta
          </GradientButton>
          <GradientButton variant="primary" size="lg">
            <Phone className="w-6 h-6" />
            Ligar Agora
          </GradientButton>
        </div>
      </div>

      {/* Variante Secondary */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Secondary (Areia Clara)</h3>
        <div className="flex gap-3">
          <GradientButton variant="secondary" size="sm">
            Saiba Mais
          </GradientButton>
          <GradientButton variant="secondary">
            Conhecer Equipe
          </GradientButton>
          <GradientButton variant="secondary" size="lg">
            Ver Depoimentos
          </GradientButton>
        </div>
      </div>

      {/* Variante WhatsApp */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">WhatsApp</h3>
        <div className="flex gap-3">
          <GradientButton variant="whatsapp" size="sm">
            <MessageCircle className="w-4 h-4" />
            Conversar
          </GradientButton>
          <GradientButton variant="whatsapp">
            <MessageCircle className="w-5 h-5" />
            Quero entender meu caso
          </GradientButton>
          <GradientButton variant="whatsapp" size="lg">
            <MessageCircle className="w-6 h-6" />
            Falar com Especialista
          </GradientButton>
        </div>
      </div>

      {/* Variante Accent */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Accent (Dourado Premium)</h3>
        <div className="flex gap-3">
          <GradientButton variant="accent" size="sm">
            Premium
          </GradientButton>
          <GradientButton variant="accent">
            Avaliação VIP
          </GradientButton>
          <GradientButton variant="accent" size="lg">
            Tratamento Exclusivo
          </GradientButton>
        </div>
      </div>
    </div>
  )
}