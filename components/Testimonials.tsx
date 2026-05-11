'use client';

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// Dados hardcoded como fallback
const fallbackTestimonials = [
  {
    name: "Yulli Meireles",
    content: "Levei meu notebook para arrumar as dobradiças e o serviço ficou impecável. Super indico, atendimento e concerto rápido, super solicitos para explicar sobre o concerto!",
  },
  {
    name: "Leonardo Della Costa",
    content: "Atendimento excepcional e muita qualidade de seriedade na prestação de serviço. Recomendo!",
  },
  {
    name: "Álex Dias",
    content: "Arrumaram 2 notebooks da minha família, ambos de reparo em placa.",
  },
  {
    name: "Carlos Oliveira",
    content: "Atendimento corporativo impecável. Cuidam de toda frota de notebooks da empresa com rapidez e qualidade.",
  },
];

export interface TestimonialsProps {
  testimonials?: Array<{ name: string; content: string }>;
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const displayTestimonials = testimonials && testimonials.length > 0
    ? testimonials
    : fallbackTestimonials;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            💬 Depoimentos de Clientes
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6 rounded" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja o que nossos clientes dizem sobre nossos serviços
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {displayTestimonials.map((testimonial, index) => (
            <motion.div             
              initial={{ opacity: 0, y: 120 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              key={index}
              className="bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-all duration-300 relative"
            >        
              <Quote className="absolute top-6 right-6 w-10 h-10 text-accent/20" />
              
                <div className="flex items-center mb-4 gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <span className="text-accent font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                        <div className="flex text-yellow-500 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                        </div>
                    </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.content}</p>  
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <div className="text-center mt-12 flex flex-col items-center">

          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-6 py-3 shadow-sm mb-4">
            <Star className="w-7 h-7 fill-amber-400 text-amber-400 mx-0" />
            <Star className="w-7 h-7 fill-amber-400 text-amber-400 mx-0" />
            <Star className="w-7 h-7 fill-amber-400 text-amber-400 mx-0" />
            <Star className="w-7 h-7 fill-amber-400 text-amber-400 mx-0" />
            <Star className="w-7 h-7 fill-amber-400 text-amber-400 mx-0" />
            <p>
              <span className="font-semibold text-foreground text-3xl font-bold">4.8</span>
              <span className="font-semibold text-foreground text-lg font-normal">/5.0</span>
            </p>            
          </div>

          <p id="reviews-count" className="text-gray-600">Baseado em mais de 850 avaliações no Google</p>

          <div className="flex items-center justify-center mt-4 space-x-4 portrait:flex-col">
              <div className="bg-white px-4 pt-2 pb-1 rounded-lg shadow-md border">
                  <div className="flex items-center">
                      <img 
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/google-logo.png`}
                        alt="Google" 
                        width="90" 
                        height="30" 
                        className="mr-2" 
                      />
                      <span className="text-sm font-medium text-gray-700">Empresa Verificada</span>
                  </div>
              </div>
              <a href="https://www.google.com/search?q=notebook+expert+curitiba#lrd=0x94dce46fc56256a1:0xe0af021b7a876101,3,,,," 
              target="_blank" 
              className="btn-primary text-lg font-medium">
                  <span>Deixe sua Avaliação</span>
                  <i className="fa-solid fa-right-long ml-2"></i>
              </a>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Testimonials;
