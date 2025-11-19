'use client';

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Meu notebook não liga. O que pode ser?",
      answer: "Pode ser bateria, carregador, entrada de energia ou placa-mãe. Precisamos avaliar para identificar a falha."
    },
    {
      question: "Tem imagem, mas a tela fica preta. E agora?",
      answer: "Geralmente é problema na memória, vídeo ou placa-mãe. Diagnóstico rápido no laboratório."
    },
    {
      question: "Está esquentando e fazendo barulho. Normal?",
      answer: "Não. Precisa de limpeza interna e pasta térmica. Recomendado a cada 6–12 meses."
    },
    {
      question: "Está muito lento. Dá para melhorar?",
      answer: "Sim! Upgrade para SSD e RAM costuma deixar até 10x mais rápido."
    },
    {
      question: "Não carrega a bateria. O que pode ser?",
      answer: "Pode ser carregador, bateria ou entrada de energia. Testamos tudo para confirmar."
    },
    {
      question: "Derramei líquido. O que fazer?",
      answer: "Desligue na hora e não tente ligar. Traga urgente para evitar dano na placa."
    },
    {
      question: "Tela quebrou. Conserta?",
      answer: "Sim, fazemos troca de tela para diversas marcas."
    },
    {
      question: "Quanto tempo leva para consertar?",
      answer: "Diagnóstico em até 24h. Prazo do reparo varia conforme a peça."
    },
    {
      question: "Tem garantia?",
      answer: "Sim! Garantia conforme o tipo de serviço de 6 meses a 1 ano."
    },
    {
      question: "Fazem orçamento?",
      answer: "Sim, orçamento com diagnóstico técnico antes do serviço."
    }
  ];

  return (
    <section className="pt-20 pb-12 bg-primary text-primary-foreground" style={{ backgroundImage: 'url(/bg-faq.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6 rounded" />
          <p className="text-lg text-primary-foreground max-w-3xl mx-auto">
            Tire suas dúvidas sobre nossos serviços de assistência técnica
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
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl overflow-hidden transition-colors"
              >
                <AccordionTrigger className="group px-6 py-4 text-left hover:no-underline bg-accent hover:bg-[var(--darkblue)] text-white">
                  <span className="text-lg font-semibold text-foreground pr-4 group-hover:text-white text-white">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-8 text-primary">
                  {faq.answer}
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

