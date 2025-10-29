import { Laptop, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-tech.jpg";
import { openWhatsApp } from '../utils/helpers'

const handleWhatsAppClick = () => {
  openWhatsApp('Olá! Vi o site e gostaria de solicitar um orçamento para assistência técnica do meu notebook.');
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Assistência Técnica Profissional" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--tech-blue-dark))]/95 via-[hsl(var(--tech-blue-dark))]/85 to-[hsl(var(--tech-blue-dark))]/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-6 animate-fade-in">
            <div className="h-1 w-12 bg-accent rounded" />
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              16 anos de excelência
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up">
            Assistência técnica para          
            <span className="block text-accent">notebooks em Curitiba</span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl animate-fade-in-up animation-delay-200">
            A melhor de Curitiba em conserto de notebooks e computadores, com atendimento personalizado e garantia total.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in-up animation-delay-300">
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/20">
              <Shield className="w-6 h-6 text-accent flex-shrink-0" />
              <span className="text-primary-foreground font-medium">Garantia Assegurada</span>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/20">
              <Zap className="w-6 h-6 text-accent flex-shrink-0" />
              <span className="text-primary-foreground font-medium">Atendimento Rápido</span>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/20">
              <Laptop className="w-6 h-6 text-accent flex-shrink-0" />
              <span className="text-primary-foreground font-medium">Todas as Marcas</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
            <button 
                onClick={handleWhatsAppClick}
                className="btn-primary flex items-center justify-center bg-green-500 hover:bg-darkblue transition-colors hover:cursor-pointer border-2 border-green-500 hover:border-darkblue"
            >
                <i className="fab fa-whatsapp mr-2 text-3xl"></i>
                Ligue agora! (41) 3029-8746
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
