'use client';

import { motion } from "framer-motion";

interface DailyCareProps {
  title?: string;
  description?: string;
  items?: Array<{ item: string }>;
}

const DailyCare = ({ title, description, items }: DailyCareProps) => {
  const defaultItems = [
    "Evite usar o notebook sobre superfícies macias (como cama ou sofá). Elas bloqueiam a ventilação e causam superaquecimento.",
    "Não mantenha o notebook sempre ligado na tomada. Isso reduz a vida útil da bateria.",
    "Mantenha o teclado limpo e protegido. Poeira e migalhas podem danificar as teclas.",
    "Use mochilas ou capas acolchoadas para transporte.",
    "Faça backup regularmente para proteger seus dados."
  ];

  const displayTitle = title || "Cuidados Diários Que Fazem Diferença";
  const displayDescription = description || "Além da manutenção técnica, algumas práticas simples ajudam a conservar o notebook no dia a dia:";
  const displayItems = items && items.length > 0 ? items.map(i => i.item) : defaultItems;

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-primary/10 max-w-5xl mx-auto mb-20">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        {displayTitle}
      </h2>
      <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
        {displayDescription}
      </p>
      
      <motion.div             
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}            
      >  
        <div className="space-y-4">
          {displayItems.map((tip, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all portrait:text-center"
            >
              <span className="text-accent font-bold text-lg flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center portrait:mx-auto">
                {index + 1}
              </span>
              <p className="text-foreground pt-1">{tip}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DailyCare;
