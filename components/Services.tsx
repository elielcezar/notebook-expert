'use client';

import { Monitor, Zap, Cpu, Wrench, HardDrive, Thermometer, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import AutoPlay from 'embla-carousel-autoplay';

// Ícones padrão mapeados por índice
const defaultIcons: LucideIcon[] = [Monitor, Wrench, Thermometer, Cpu, Zap, HardDrive, Cpu, Thermometer, Monitor, Cpu, Cpu];

// Dados hardcoded como fallback
const fallbackTitle = "Serviços Oferecidos";
const fallbackDescription = "Oferecemos uma ampla gama de serviços para todas as marcas e modelos de notebooks";
const fallbackServices = [
  { titulo: "Troca de Tela", descricao: "Substituição de telas quebradas ou com falhas de imagem" },
  { titulo: "Teclado e Carcaça", descricao: "Substituição de teclado, dobradiças e carcaças" },
  { titulo: "Resfriamento", descricao: "Troca de cooler e reparo de superaquecimento" },
  { titulo: "Placa-Mãe", descricao: "Reparo de placa-mãe e componentes eletrônicos" },
  { titulo: "Energia", descricao: "Recuperação de notebooks com problemas de liga/desliga" },
  { titulo: "SSD Installation", descricao: "Aumente a velocidade do seu notebook em até 10x" },
  { titulo: "Memória RAM", descricao: "Expansão de memória para melhor desempenho" },
  { titulo: "Limpeza Profunda", descricao: "Limpeza interna e troca de pasta térmica" },
  { titulo: "Sistema Operacional", descricao: "Formatação e otimização do sistema" },
  { titulo: "Reparo de BIOS", descricao: "Reparo de BIOS e chips de memória" },
  { titulo: "Troca de conectores", descricao: "Troca de conectores de energia e portas USB" },
];

export interface ServicesProps {
  title?: string;
  description?: string;
  services?: Array<{ titulo: string; descricao: string }>;
}

const Services = ({ title, description, services }: ServicesProps) => {
  const displayTitle = title || fallbackTitle;
  const displayDescription = description || fallbackDescription;
  const displayServices = services && services.length > 0 ? services : fallbackServices;

  // Configuração do Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {    
      loop: true,
      align: 'center',
      slidesToScroll: 1,
    },
    [
      AutoPlay({ 
        delay: 1500,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      })
    ]
  );

  // Funções de navegação
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="servicos" className="py-20 px-10 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {displayTitle}
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6 rounded" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {displayDescription}
          </p>
        </div>
      </div>

      {/* Carousel Container */}
        <div className="relative mx-auto xl:px-20">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-accent text-accent-foreground rounded-full shadow-lg hover:bg-accent/90 transition-all duration-300 flex items-center justify-center portrait:hidden"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-accent text-accent-foreground rounded-full shadow-lg hover:bg-accent/90 transition-all duration-300 flex items-center justify-center portrait:hidden"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 pr-8 pl-8">
              {displayServices.map((service, index) => {
                const Icon = defaultIcons[index % defaultIcons.length];
                return (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(25%-16px)]"
                  >
                    <div className="group bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all duration-300 h-full">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">{service.titulo}</h4>
                      <p className="text-muted-foreground text-sm">{service.descricao}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6 lg:hidden">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 bg-accent text-accent-foreground rounded-full shadow-lg hover:bg-accent/90 transition-all duration-300 flex items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 bg-accent text-accent-foreground rounded-full shadow-lg hover:bg-accent/90 transition-all duration-300 flex items-center justify-center"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
        </div>  
      

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
           
            <a 
              href="https://wa.me/5541998870606?text=Olá! Gostaria de solicitar um orçamento para assistência técnica do meu notebook."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wpp"
            >
              <i className="fab fa-whatsapp mr-2 text-5xl"></i> 
              <span className="flex flex-col items-start justify-start items-center">                
                Orçamento Gratuito
                <strong>(41) 99887-0606</strong>
              </span>              
            </a>
          </div>
        </div>

      
    </section>
  );
};

export default Services;
