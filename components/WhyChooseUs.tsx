import { CheckCircle2 } from "lucide-react";
import { Award, Users, Target } from "lucide-react";
import Image from "next/image";

const WhyChooseUs = () => {
  const reasons = [
    "Mais de 16 anos de experiência",
    "Laboratório técnico especializado",
    "Peças de qualidade e garantia",
    "Atendimento transparente e rápido",
    "Alta taxa de sucesso em reparo avançado"
  ];

  return (
    <section id="sobre" className="py-20 portrait:py-0">
      <div className="container mx-auto px-4 flex animate-fade-in-up animation-delay-400 portrait:flex-col">       

        <div className="flex-1 max-w-4xl mx-auto text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Por Que Escolher Nossa Assistência? 
          </h2>
          <div className="h-1 w-24 bg-accent mx-left mb-8 rounded" />
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Somos a melhor assistência técnica especializada em notebooks de Curitiba, reconhecida pela excelência no atendimento, alta taxa de sucesso em reparos e pelo compromisso absoluto com a qualidade.
          </p>
          
          <p className="text-xl font-semibold text-primary">
            Com equipe técnica qualificada, laboratório equipado e um padrão elevado de atendimento, somos hoje a assistência mais bem avaliada da Google em Curitiba, conquistando a confiança de clientes individuais e empresas que buscam um serviço seguro, rápido e profissional.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
            <div className="bg-card rounded-xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-accent" />
              </div>              
              <p className="text-muted-foreground">Mais de 16 anos de experiência</p>
            </div>

            <div className="bg-card rounded-xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-accent" />
              </div>              
              <p className="text-muted-foreground">Laboratório técnico especializado</p>
            </div>

            <div className="bg-card rounded-xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-accent" />
              </div>              
              <p className="text-muted-foreground">Peças de qualidade e garantia</p>
            </div>

            <div className="bg-card rounded-xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-accent" />
              </div>              
              <p className="text-muted-foreground">Atendimento transparente e rápido</p>
            </div>

            <div className="bg-card rounded-xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-accent" />
              </div>              
              <p className="text-muted-foreground">Alta taxa de sucesso em reparo avançado</p>
            </div>

            <div className="bg-card rounded-xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-accent" />
              </div>              
              <p className="text-muted-foreground">Peças de qualidade e garantia</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center relative min-h-[500px] md:min-h-[600px]">
          <Image 
            src="/about2.png" 
            alt="About" 
            fill 
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
                
      </div>
    </section>
  );
};

export default WhyChooseUs;

