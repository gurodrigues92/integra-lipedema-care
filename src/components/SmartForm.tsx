import { useState, useEffect } from 'react';
import { Check, AlertCircle, Loader2, Calendar, Phone, User, Mail } from 'lucide-react';
import { MicroInteraction } from './MicroInteraction';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  phone: string;
  age: string;
  symptoms: string[];
  urgency: string;
  preferredTime: string;
}

interface FormStep {
  id: number;
  title: string;
  description: string;
  fields: string[];
}

const formSteps: FormStep[] = [
  {
    id: 1,
    title: "Dados Pessoais",
    description: "Vamos começar com suas informações básicas",
    fields: ["name", "email", "phone", "age"]
  },
  {
    id: 2,
    title: "Sintomas",
    description: "Nos conte sobre o que você está sentindo",
    fields: ["symptoms"]
  },
  {
    id: 3,
    title: "Agendamento",
    description: "Quando podemos conversar com você?",
    fields: ["urgency", "preferredTime"]
  }
];

const symptomOptions = [
  "Dores nas pernas que pioram durante o dia",
  "Inchaço que não melhora com repouso",
  "Pernas com aspecto desproporcional",
  "Facilidade para formar hematomas",
  "Sensação de peso constante nas pernas",
  "Pele com textura irregular nas pernas",
  "Dificuldade para encontrar roupas que sirvam",
  "Limitação para atividades físicas"
];

const urgencyOptions = [
  { value: "baixa", label: "Posso aguardar algumas semanas", color: "success" },
  { value: "media", label: "Gostaria de ser atendida em breve", color: "accent" },
  { value: "alta", label: "Preciso de atendimento urgente", color: "destructive" }
];

export const SmartForm = ({ onSubmit }: { onSubmit?: (data: FormData) => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    age: "",
    symptoms: [],
    urgency: "",
    preferredTime: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    const stepFields = formSteps[step - 1].fields;

    stepFields.forEach(field => {
      switch (field) {
        case "name":
          if (!formData.name.trim()) {
            newErrors.name = "Nome é obrigatório";
          } else if (formData.name.trim().length < 2) {
            newErrors.name = "Nome deve ter pelo menos 2 caracteres";
          }
          break;
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!formData.email.trim()) {
            newErrors.email = "Email é obrigatório";
          } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email inválido";
          }
          break;
        case "phone":
          const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
          if (!formData.phone.trim()) {
            newErrors.phone = "Telefone é obrigatório";
          } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Telefone inválido. Use o formato (11) 99999-9999";
          }
          break;
        case "age":
          const age = parseInt(formData.age);
          if (!formData.age) {
            newErrors.age = "Idade é obrigatória";
          } else if (age < 18 || age > 100) {
            newErrors.age = "Idade deve estar entre 18 e 100 anos";
          }
          break;
        case "symptoms":
          if (formData.symptoms.length === 0) {
            newErrors.symptoms = "Selecione pelo menos um sintoma";
          }
          break;
        case "urgency":
          if (!formData.urgency) {
            newErrors.urgency = "Selecione o nível de urgência";
          }
          break;
        case "preferredTime":
          if (!formData.preferredTime) {
            newErrors.preferredTime = "Selecione um horário preferido";
          }
          break;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, formSteps.length));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const formatFormDataToWhatsApp = (data: FormData): string => {
    const urgencyText = urgencyOptions.find(opt => opt.value === data.urgency)?.label || data.urgency;
    const timeText = {
      'manha': 'Manhã (8h às 12h)',
      'tarde': 'Tarde (12h às 18h)', 
      'noite': 'Noite (18h às 20h)',
      'qualquer': 'Qualquer horário'
    }[data.preferredTime] || data.preferredTime;

    return `*SOLICITAÇÃO DE CONSULTA - INTEGRA LIPECARE*

*Dados Pessoais:*
• Nome: ${data.name}
• Idade: ${data.age} anos
• Email: ${data.email}
• Telefone: ${data.phone}

*Sintomas Relatados:*
${data.symptoms.map(symptom => `• ${symptom}`).join('\n')}

*Informações do Agendamento:*
• Urgência: ${urgencyText}
• Horário Preferido: ${timeText}

*Observação:* Mensagem enviada através do formulário do site. Favor entrar em contato para agendar a primeira consulta especializada.`;
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Format WhatsApp message
      const whatsappMessage = formatFormDataToWhatsApp(formData);
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/5515991159866?text=${encodedMessage}`;
      
      // Debug logs
      console.log('[SmartForm] Dados do formulário:', formData);
      console.log('[SmartForm] Mensagem formatada:', whatsappMessage);
      console.log('[SmartForm] URL WhatsApp gerada:', whatsappUrl);
      
      // Track conversion
      if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
          value: 1,
          currency: 'BRL'
        });
        
        gtag('event', 'form_submit', {
          event_category: 'Formulário',
          event_label: 'Smart_Form_Complete',
          value: 1
        });
      }

      if (typeof fbq !== 'undefined') {
        fbq('track', 'CompleteRegistration', {
          content_name: 'Formulário_Consulta',
          content_category: 'Lead'
        });
      }

      // Immediate redirection to WhatsApp
      console.log('[SmartForm] Tentando abrir WhatsApp...');
      const newWindow = window.open(whatsappUrl, '_blank');
      
      // Check if popup was blocked
      if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
        console.warn('[SmartForm] Popup bloqueado, oferecendo fallback');
        // Store URL for fallback display
        (window as any).whatsappFallbackUrl = whatsappUrl;
      } else {
        console.log('[SmartForm] WhatsApp aberto com sucesso');
      }
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmit?.(formData);
      
    } catch (error) {
      console.error('[SmartForm] Erro no envio:', error);
      setIsSubmitting(false);
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const toggleSymptom = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  if (isSubmitted) {
    const fallbackUrl = (window as any).whatsappFallbackUrl;
    
    return (
      <div className="glass-card rounded-3xl p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-success">Formulário Enviado!</h3>
        <p className="text-muted-foreground mb-6">
          Suas informações foram encaminhadas para o WhatsApp. Nossa equipe entrará em contato em breve.
        </p>
        
        {fallbackUrl && (
          <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl">
            <p className="text-sm text-muted-foreground mb-3">
              Se o WhatsApp não abriu automaticamente, clique no link abaixo:
            </p>
            <a 
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Abrir WhatsApp
            </a>
          </div>
        )}
        
        <div className="text-sm text-muted-foreground">
          Tempo estimado de resposta: <strong>até 2 horas</strong>
        </div>
      </div>
    );
  }

  const currentStepData = formSteps[currentStep - 1];
  const progress = (currentStep / formSteps.length) * 100;

  return (
    <div className="glass-card rounded-3xl p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 text-gradient-primary">
          Primeira Consulta Especializada
        </h3>
        <p className="text-muted-foreground">
          {currentStepData.description}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Etapa {currentStep} de {formSteps.length}</span>
          <span>{Math.round(progress)}% concluído</span>
        </div>
        <div className="w-full bg-border/30 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {/* Step 1: Personal Data */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border backdrop-blur-lg bg-background/50 transition-all duration-300",
                    errors.name 
                      ? "border-destructive focus:border-destructive" 
                      : "border-border/50 focus:border-primary/60 hover:border-primary/40"
                  )}
                  placeholder="Seu nome completo"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Idade *</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border backdrop-blur-lg bg-background/50 transition-all duration-300",
                    errors.age 
                      ? "border-destructive focus:border-destructive" 
                      : "border-border/50 focus:border-primary/60 hover:border-primary/40"
                  )}
                  placeholder="Ex: 35"
                  min="18"
                  max="100"
                />
                {errors.age && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.age}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border backdrop-blur-lg bg-background/50 transition-all duration-300",
                  errors.email 
                    ? "border-destructive focus:border-destructive" 
                    : "border-border/50 focus:border-primary/60 hover:border-primary/40"
                )}
                placeholder="seu.email@exemplo.com"
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Telefone/WhatsApp *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border backdrop-blur-lg bg-background/50 transition-all duration-300",
                  errors.phone 
                    ? "border-destructive focus:border-destructive" 
                    : "border-border/50 focus:border-primary/60 hover:border-primary/40"
                )}
                placeholder="(11) 99999-9999"
                maxLength={15}
              />
              {errors.phone && (
                <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Symptoms */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium mb-4">
                Quais sintomas você tem sentido? (Selecione todos que se aplicam) *
              </label>
              <div className="grid gap-3">
                {symptomOptions.map((symptom, index) => (
                  <label 
                    key={index}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.01]",
                      formData.symptoms.includes(symptom)
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border/50 hover:border-primary/50 hover:bg-primary/2"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={formData.symptoms.includes(symptom)}
                      onChange={() => toggleSymptom(symptom)}
                      className="sr-only"
                    />
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300",
                      formData.symptoms.includes(symptom)
                        ? "border-primary bg-primary scale-110"
                        : "border-border hover:border-primary/70"
                    )}>
                      {formData.symptoms.includes(symptom) && (
                        <Check className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                    <span className="text-sm flex-1">{symptom}</span>
                  </label>
                ))}
              </div>
              {errors.symptoms && (
                <p className="text-destructive text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.symptoms}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Scheduling */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium mb-4">
                Como classificaria a urgência do seu caso? *
              </label>
              <div className="space-y-3">
                {urgencyOptions.map((option) => (
                  <label 
                    key={option.value}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.01]",
                      formData.urgency === option.value
                        ? `border-${option.color} bg-${option.color}/5 shadow-sm`
                        : "border-border/50 hover:border-primary/50 hover:bg-primary/2"
                    )}
                  >
                      <input
                        type="radio"
                        value={option.value}
                        checked={formData.urgency === option.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                        className="sr-only"
                      />
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                        formData.urgency === option.value
                          ? `border-${option.color} bg-${option.color}`
                          : "border-border"
                      )}>
                        {formData.urgency === option.value && (
                          <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                        )}
                      </div>
                      <span className="text-sm flex-1">{option.label}</span>
                    </label>
                ))}
              </div>
              {errors.urgency && (
                <p className="text-destructive text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.urgency}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Qual o melhor horário para nossa ligação? *
              </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border backdrop-blur-lg bg-background/50 transition-all duration-300",
                    errors.preferredTime 
                      ? "border-destructive focus:border-destructive" 
                      : "border-border/50 focus:border-primary/60 hover:border-primary/40"
                  )}
                >
                <option value="">Selecione um horário</option>
                <option value="manha">Manhã (8h às 12h)</option>
                <option value="tarde">Tarde (12h às 18h)</option>
                <option value="noite">Noite (18h às 20h)</option>
                <option value="qualquer">Qualquer horário</option>
              </select>
              {errors.preferredTime && (
                <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.preferredTime}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <MicroInteraction effect="elastic">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={cn(
              "px-6 py-3 rounded-xl transition-all",
              currentStep === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-muted"
            )}
          >
            Anterior
          </button>
        </MicroInteraction>

        <MicroInteraction effect="ripple">
          {currentStep === formSteps.length ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Formulário"
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all"
            >
              Próximo
            </button>
          )}
        </MicroInteraction>
      </div>
    </div>
  );
};