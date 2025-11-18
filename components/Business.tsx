'use client';

import { Building2, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";

const businessItems = [
  {
    icon: <Clock className="w-6 h-6 text-accent" />,
    title: "Atendimento Prioritário",
    description: "Sua empresa sempre em primeiro lugar, com prazos diferenciados e suporte dedicado"
  },  
  {
    icon: <Star className="w-6 h-6 text-accent" />,
    title: "Descontos Exclusivos",
    description: "Condições especiais e descontos em volume para empresas parceiras"
  },  
  {
    icon: <Building2 className="w-8 h-8 text-accent" />,
    title: "Nossos Clientes Corporativos",
    description: "Entre nossos clientes estão instituições de ensino, coworkings, escritórios e empresas de tecnologia que confiam na qualidade dos nossos serviços."
  }
]

const Business = () => {
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
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/business.jpg`}
                alt="Business" 
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
                  Atendimento para Empresas
                </h2>
                <div className="h-1 w-24 bg-accent mx-left mb-6 rounded portrait:mx-auto" />
                <p className="text-xl text-primary-foreground/90 max-w-3xl mx-left">
                  Oferecemos planos corporativos e parcerias B2B, ideais para empresas 
                  que utilizam grande volume de notebooks.
                </p>
              </div>

              {businessItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 mb-8">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-primary-foreground/80">{item.description}</p>
                  </div>
                </div>
              ))}                

            </motion.div>
          </div>

          
          
        </div>
      </div>
    </section>
  );
};

export default Business;
