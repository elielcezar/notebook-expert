'use client';

import { Building2, Star, Clock, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

// Ícones padrão mapeados por índice
const defaultIcons: LucideIcon[] = [Clock, Star, Building2];

// Dados hardcoded como fallback
const fallbackTitle = "Atendimento para Empresas";
const fallbackDescription = "Oferecemos planos corporativos e parcerias B2B, ideais para empresas que utilizam grande volume de notebooks.";
const fallbackItems = [
  { titulo: "Atendimento Prioritário", descricao: "Sua empresa sempre em primeiro lugar, com prazos diferenciados e suporte dedicado" },
  { titulo: "Descontos Exclusivos", descricao: "Condições especiais e descontos em volume para empresas parceiras" },
  { titulo: "Nossos Clientes Corporativos", descricao: "Entre nossos clientes estão instituições de ensino, coworkings, escritórios e empresas de tecnologia que confiam na qualidade dos nossos serviços." },
];

export interface BusinessProps {
  title?: string;
  description?: string;
  items?: Array<{ titulo: string; descricao: string }>;
  featuredImage?: string;
}

const Business = ({ title, description, items, featuredImage }: BusinessProps) => {
  const displayTitle = title || fallbackTitle;
  const displayDescription = description || fallbackDescription;
  const displayItems = items && items.length > 0 ? items : fallbackItems;
  const displayImage = featuredImage || `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/business.jpg`;

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="mx-auto">
          <div className="flex items-start justify-center gap-12 portrait:flex-col-reverse">

          <motion.div 
            className="relative w-full max-w-md h-96 min-h-[620px] md:min-h-[620px]"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >      
              <img 
                src={displayImage}
                alt={displayTitle} 
                className="absolute inset-0 w-full h-full rounded-md object-cover"
              />
          </motion.div>

          <motion.div             
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >      

            
              <div className="text-left mb-12 portrait:text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {displayTitle}
                </h2>
                <div className="h-1 w-24 bg-accent mx-left mb-6 rounded portrait:mx-auto" />
                <p className="text-xl text-primary-foreground/90 max-w-3xl mx-left">
                  {displayDescription}
                </p>
              </div>

              {displayItems.map((item, index) => {
                const Icon = defaultIcons[index % defaultIcons.length];
                return (
                  <div key={index} className="flex items-start gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 mb-8">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.titulo}</h3>
                      <p className="text-primary-foreground/80">{item.descricao}</p>
                    </div>
                  </div>
                );
              })}                

            </motion.div>
          </div>

          
          
        </div>
      </div>
    </section>
  );
};

export default Business;
