import { Button } from "@/components/ui/button";
import { Laptop, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-tech.jpg";

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
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6 animate-fade-in">
            <div className="h-1 w-12 bg-accent rounded" />
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              16 anos de excelência
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up">
            Especialistas em
            <span className="block text-accent">Notebooks e MacBooks</span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl animate-fade-in-up animation-delay-200">
            Manutenção preventiva, reparos e upgrades com qualidade garantida. 
            Atendimento ágil para pessoas físicas e empresas.
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
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
              Solicitar Orçamento
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Nossos Serviços
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
