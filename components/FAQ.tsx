'use client';

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  pergunta: string;
  resposta: string;
}

interface FAQProps {
  title?: string;
  description?: string;
  items?: FAQItem[];
}

const FAQ = ({ title, description, items }: FAQProps) => {
  const defaultFaqs: FAQItem[] = [
    {
      pergunta: "Meu notebook não liga. O que pode ser?",
      resposta: "Pode ser bateria, carregador, entrada de energia ou placa-mãe. É necessário uma análise técnica para identificar a falha."
    },
    {
      pergunta: "Tem imagem, mas a tela fica preta. E agora?",
      resposta: "O problema pode ser em diversos componentes como: memória, vídeo, placa-mãe, cabo flat, tela, chip de vídeo ou placa mãe. Diagnóstico rápido no laboratório."
    },
    {
      pergunta: "Está esquentando e fazendo barulho, é normal?",
      resposta: "Não. É preciso fazer a limpeza interna e a troca da pasta térmica. Recomendado a cada 6–12 meses."
    },
    {
      pergunta: "Está muito lento. Dá para melhorar?",
      resposta: "Sim! Fazendo o upgrade de SSD e RAM a velocidade do notebook aumenta em até 10x."
    },
    {
      pergunta: "Não carrega a bateria. O que pode ser?",
      resposta: "Pode ser carregador, bateria ou entrada de energia. Testamos tudo para confirmar."
    },
    {
      pergunta: "Derramei líquido. O que fazer?",
      resposta: "Desligue na hora e não tente ligar. Traga urgente para evitar dano na placa. Leve o notebook o mais rápido possível para o processo de banho químico."
    },
    {
      pergunta: "Tela quebrou. Conserta?",
      resposta: "Sim, fazemos troca de tela para diversas marcas."
    },
    {
      pergunta: "Quanto tempo leva para consertar?",
      resposta: "O prazo do reparo varia com a disponibilidade de componentes e peças em estoque."
    },    
    {
      pergunta: "Fazem orçamento?",
      resposta: "Sim, é feito o diagnóstico e orçamento antes da execução do serviço."
    },
    {
      pergunta: "Tem garantia?",
      resposta: "Sim! Garantia conforme o tipo de serviço de 6 meses a 1 ano."
    }
  ];

  const displayTitle = title || "Perguntas Frequentes";
  const displayDescription = description || "Tire suas dúvidas sobre nossos serviços de assistência técnica";
  const displayItems = items && items.length > 0 ? items : defaultFaqs;

  return (
    <section className="pt-20 pb-12 bg-primary text-primary-foreground" style={{ backgroundImage: 'url(/bg-faq.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {displayTitle}
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6 rounded" />
          <p className="text-lg text-primary-foreground max-w-3xl mx-auto">
            {displayDescription}
          </p>
        </div>

        <motion.div             
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}            
          > 

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {displayItems.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl overflow-hidden transition-colors"
              >
                <AccordionTrigger className="group px-6 py-4 text-left hover:no-underline bg-accent hover:bg-[var(--darkblue)] text-white">
                  <span className="text-lg font-semibold text-foreground pr-4 group-hover:text-white text-white">
                    {faq.pergunta}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-8 text-primary">
                  {faq.resposta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-primary-foreground mb-4">
            Não encontrou a resposta que procurava?
          </p>
          <button className="btn-wpp">              
              <i className="fab fa-whatsapp mr-2 text-5xl"></i> 
              <span className="flex flex-col items-start justify-start items-center">                
                Fale conosco agora
                <strong>(41) 99887-0606</strong>
              </span>              
          </button>     
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center mt-16">              
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Localização
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-0 rounded" />
      </div>
      
    </section>
  );
};

export default FAQ;
