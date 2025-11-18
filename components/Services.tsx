'use client';

import { Monitor, Zap, Cpu, Wrench, HardDrive, Thermometer, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import AutoPlay from 'embla-carousel-autoplay';

const Services = () => {
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

  // Todos os serviços em uma única lista
  const allServices = [
    { icon: Monitor, title: "Troca de Tela", description: "Substituição de telas quebradas ou com falhas de imagem" },
    { icon: Wrench, title: "Teclado e Carcaça", description: "Substituição de teclado, dobradiças e carcaças" },
    { icon: Thermometer, title: "Resfriamento", description: "Troca de cooler e reparo de superaquecimento" },
    { icon: Cpu, title: "Placa-Mãe", description: "Reparo de placa-mãe e componentes eletrônicos" },
    { icon: Zap, title: "Energia", description: "Recuperação de notebooks com problemas de liga/desliga" },
    { icon: HardDrive, title: "SSD Installation", description: "Aumente a velocidade do seu notebook em até 10x" },
    { icon: Cpu, title: "Memória RAM", description: "Expansão de memória para melhor desempenho" },
    { icon: Thermometer, title: "Limpeza Profunda", description: "Limpeza interna e troca de pasta térmica" },
    { icon: Monitor, title: "Sistema Operacional", description: "Formatação e otimização do sistema" },
    { icon: Cpu, title: "Reparo de BIOS", description: "Reparo de BIOS e chips de memória" },
    { icon: Cpu, title: "Troca de conectores", description: "Troca de conectores de energia e portas USB" },
  ];

  return (
    <section id="servicos" className="py-20 px-10 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Serviços Oferecidos
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6 rounded" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Oferecemos uma ampla gama de serviços para todas as marcas e modelos de notebooks
          </p>
        </div>
      </div>

      {/* Carousel Container */}
        <div className="relative mx-auto px-20">
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
              {allServices.map((service, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(25%-16px)]"
                >
                  <div className="group bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all duration-300 h-full">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <service.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{service.title}</h4>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </div>
                </div>
              ))}
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
              href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/servicos`}
              className="btn-primary text-base px-8 py-3"
            >
              Ver Todos os Serviços
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
            
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
