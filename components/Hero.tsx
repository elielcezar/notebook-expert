'use client';

import { Laptop, Shield, Zap } from "lucide-react";
import { openWhatsApp } from '@/utils/helpers';
import { scrollToSection } from '@/utils/helpers';

const handleWhatsAppClick = () => {
  openWhatsApp('Olá! Vi o site e gostaria de solicitar um orçamento para assistência técnica do meu notebook.');
};

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-end justify-center overflow-hidden portrait:min-h-[65vh] portrait:pt-28 portrait:pb-36">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img-02.png`}
          alt="Assistência Técnica Profissional" 
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-8 relative z-10">
        <div className="max-w-4xl">
          <div className="flex h-10 items-center gap-2 animate-fade-in portrait:mb-3">
            <div className="h-1 w-12 bg-white rounded" />
            <span className="text-white font-semibold text-sm uppercase tracking-wider">
              16 anos de excelência
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-6xl font-extrabold text-primary-foreground mb-6 landscape:leading-[1.15] animate-fade-in-up portrait:leading-[1.1]">
            Vale a pena arrumar                   
            <span className="block">meu notebook?</span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl animate-fade-in-up animation-delay-200 portrait:text-base">
            Em 95% dos casos, vale a pena <strong>sim!</strong>
          <br/>
            É mais acessível que você imagina e todos os serviços tem garantia.<br/>
          </p>        

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in-up animation-delay-300 portrait:hidden">
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/20">
              <Shield className="w-6 h-6 text-white flex-shrink-0" />
              <span className="text-primary-foreground font-medium">Orçamento Gratuito</span>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/20">
              <Zap className="w-6 h-6 text-white flex-shrink-0" />
              <span className="text-primary-foreground font-medium">Atendimento Rápido</span>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/20 cursor-pointer" onClick={() => scrollToSection('#brands', 100)}>
              <Laptop className="w-6 h-6 text-white flex-shrink-0" />
              <span className="text-primary-foreground font-medium">Todas as Marcas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
