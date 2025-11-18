import { Award, Users, Target } from "lucide-react";

const About = () => {
  return (
    <section id="sobre" className="py-20 portrait:py-0">
      <div className="container mx-auto px-4 flex animate-fade-in-up animation-delay-400 portrait:flex-col">       

        <div className="flex-1 max-w-4xl mx-auto text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Quem Somos?
          </h2>
          <div className="h-1 w-24 bg-accent mx-left mb-8 rounded" />
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Somos uma assistência técnica especializada em notebooks e MacBooks, com mais de 
            <span className="text-accent font-semibold"> 16 anos de experiência </span>
            no mercado. Atendemos pessoas físicas e empresas com agilidade, transparência e qualidade garantida, 
            oferecendo soluções completas para todos os tipos de problemas em seu equipamento.
          </p>
          
          <p className="text-xl font-semibold text-primary">
            Nossa missão é cuidar do seu notebook como se fosse nosso, zelando pela qualidade e 
            garantindo desempenho, segurança e principalmente durabilidade.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
            <div className="bg-card rounded-xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-5xl font-bold text-primary mb-2">16+</h3>
              <p className="text-muted-foreground">Anos de Experiência</p>
            </div>

            <div className="bg-card rounded-xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-5xl font-bold text-primary mb-2">1000+</h3>
              <p className="text-muted-foreground">Clientes Satisfeitos</p>
            </div>

            <div className="bg-card rounded-xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-5xl font-bold text-primary mb-2">100%</h3>
              <p className="text-muted-foreground">Garantia de Qualidade</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center relative min-h-[500px] md:min-h-[600px]">
          <img 
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/about3.jpg`}
            alt="About" 
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
                
      </div>
    </section>
  );
};

export default About;
