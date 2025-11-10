import { Calendar, Settings, Shield, Zap, TrendingUp, Star } from "lucide-react";
import Image from "next/image";
import H2 from "./ui/H2";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Calendar,
      text: "Mais de 16 anos de experiência"
    },
    {
      icon: Settings,
      text: "Laboratório técnico especializado"
    },
    {
      icon: Shield,
      text: "Peças de qualidade e garantia"
    },
    {
      icon: Zap,
      text: "Atendimento transparente e rápido"
    },
    {
      icon: TrendingUp,
      text: "Alta taxa de sucesso em reparo avançado"
    },
    {
      icon: Star,
      text: "Melhor avaliação no Google"
    }
  ];

  return (
    <section id="sobre" className="py-20 portrait:py-0">
      <div className="container mx-auto px-4 flex portrait:flex-col gap-12">       

        <div className="flex-1 max-w-4xl mx-auto text-left">         

            <H2 title="Por Que Escolher Nossa Assistência?" marginBorder="mx-left" color="text-foreground" />
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Somos a melhor assistência técnica especializada em notebooks de Curitiba, reconhecida pela excelência no atendimento, alta taxa de sucesso em reparos e pelo compromisso absoluto com a qualidade.
            </p>
            
            <p className="text-xl font-semibold text-primary">
              Com equipe técnica qualificada, laboratório equipado e um padrão elevado de atendimento, somos hoje a assistência mais bem avaliada da Google em Curitiba, conquistando a confiança de clientes individuais e empresas que buscam um serviço seguro, rápido e profissional.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index} 
                    className="bg-card rounded-xl p-4 text-center border border-border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>              
                    <p className="text-muted-foreground">{feature.text}</p>
                  </div>
                );
              })}
            </div>
        </div>

        <div className="flex-1 max-w-lg flex items-center justify-center relative min-h-[500px] md:min-h-[600px] rounded-2xl overflow-hidden">        
          <Image 
            src="/about3.jpg" 
            alt="About" 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
                
      </div>
    </section>
  );
};

export default WhyChooseUs;

