import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "item-1",
    question: "O que é lipedema?",
    answer: "É uma doença crônica do tecido adiposo que causa acúmulo desproporcional de gordura, principalmente nas pernas, acompanhado de dor e fácil formação de hematomas. Afeta 11% das mulheres e é frequentemente confundida com obesidade ou linfedema."
  },
  {
    id: "item-2", 
    question: "Lipedema tem cura?",
    answer: "Não existe cura, mas com tratamento adequado é possível controlar os sintomas, melhorar significativamente a qualidade de vida e evitar a progressão. O diagnóstico precoce é fundamental para melhores resultados."
  },
  {
    id: "item-3",
    question: "O tratamento é coberto por convênio?",
    answer: "Sim, trabalhamos com os principais convênios médicos. Nossa equipe auxilia com toda documentação necessária para reembolso e autorização dos procedimentos. Entre em contato para verificar sua cobertura específica."
  },
  {
    id: "item-4",
    question: "Quanto tempo dura o tratamento?",
    answer: "O tratamento é contínuo e personalizado para cada paciente. Os primeiros resultados aparecem entre 30-60 dias. Criamos um plano de tratamento específico baseado no estágio da doença e nas necessidades individuais."
  },
  {
    id: "item-5",
    question: "Preciso de cirurgia?",
    answer: "A maioria dos casos responde bem ao tratamento clínico conservador (drenagem linfática, compressão, fisioterapia, nutrição). A cirurgia (lipoaspiração específica para lipedema) é indicada apenas em casos selecionados e estágios mais avançados."
  },
  {
    id: "item-6",
    question: "Como é feito o diagnóstico?",
    answer: "O diagnóstico é principalmente clínico, baseado no histórico da paciente e exame físico detalhado. Utilizamos ultrassom para complementar a avaliação e diferenciar de outras condições. Nossa equipe tem experiência específica em lipedema."
  }
];

const FAQAccordion = () => {
  const handleAccordionClick = (value: string) => {
    console.log('[LandingIntegra] FAQ opened:', value);
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'FAQ',
        event_label: `FAQ_${value}`,
        value: 1
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <AccordionItem 
            key={item.id} 
            value={item.id} 
            className={`faq-item animate-fade-in-up animation-delay-${(index + 1) * 100}`}
          >
            <AccordionTrigger 
              className="faq-trigger"
              onClick={() => handleAccordionClick(item.id)}
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;