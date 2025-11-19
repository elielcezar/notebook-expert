import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Users, Target, Shield, Heart, Zap } from "lucide-react";
import Map from "@/components/Map";

export const metadata: Metadata = {
  title: "Sobre Nós | Notebook Expert - 16 Anos de Experiência",
  description: "Assistência técnica especializada em notebooks e MacBooks com mais de 16 anos de experiência em Curitiba. Qualidade, confiança e garantia no atendimento.",
  keywords: "sobre notebook expert, assistência técnica Curitiba, experiência notebooks, empresa especializada notebooks",
  openGraph: {
    title: "Sobre Nós | Notebook Expert - 16 Anos de Experiência",
    description: "Assistência técnica especializada em notebooks e MacBooks com mais de 16 anos de experiência em Curitiba.",
    url: "https://eliel.dev/clients/notebookexpert/sobre",
    type: "website",
    images: [
      {
        url: "/about3.jpg",
        width: 1200,
        height: 630,
        alt: "Sobre Notebook Expert",
      },
    ],
  },
};

export default function SobrePage() {
  const values = [
    {
      icon: Shield,
      title: "Confiança",
      description: "Transparência total em cada serviço prestado, do diagnóstico à entrega."
    },
    {
      icon: Heart,
      title: "Compromisso",
      description: "Cuidamos do seu notebook como se fosse nosso, com dedicação e responsabilidade."
    },
    {
      icon: Zap,
      title: "Agilidade",
      description: "Atendimento rápido sem comprometer a qualidade dos serviços."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="landscape:pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[var(--darkblue)] via-[var(--deepblue)] to-[var(--blue)] text-white py-20 portrait:py-16 portrait:pt-28">
          <div className="container mx-auto px-4">

          <div className="absolute inset-0 z-0">
          <img 
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/hero-tech.jpg`}
            alt="Assistência Técnica Profissional" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--tech-blue-dark))]/95 via-[hsl(var(--tech-blue-dark))]/85 to-[hsl(var(--tech-blue-dark))]/70" />
        </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in portrait:mb-3">
                <div className="h-1 w-12 bg-accent rounded" />
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  Conheça Nossa História
                </span>
                <div className="h-1 w-12 bg-accent rounded" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up portrait:text-4xl">
                Sobre Nós
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 portrait:text-base">
                16 anos de excelência em assistência técnica especializada para notebooks em Curitiba.
              </p>
            </div>
          </div>
          </div>
          {/* Decorative Bottom Gradient */}
          {/*<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />*/}
        </section>

        {/* Main Content Section */}
        <section className="py-16 portrait:py-12">
        <div className="container mx-auto px-4 flex portrait:flex-col gap-12">       

          <div className="flex-1 max-w-4xl mx-auto text-left">
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
                <p className="text-muted-foreground">Anos de<br/>Experiência</p>
              </div>

              <div className="bg-card rounded-xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-5xl font-bold text-primary mb-2">1000+</h3>
                <p className="text-muted-foreground">Clientes<br/>Satisfeitos</p>
              </div>

              <div className="bg-card rounded-xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-5xl font-bold text-primary mb-2">100%</h3>
                <p className="text-muted-foreground">Garantia de<br/>Qualidade</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-lg flex items-center justify-center relative min-h-[500px] md:min-h-[600px] rounded-2xl overflow-hidden">
            <img 
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/about3.jpg`}
              alt="About" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
                  
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 portrait:py-12 border-t-4 border-accent">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 portrait:mb-8">
                <h2 className="text-4xl font-bold text-foreground mb-4 portrait:text-3xl">
                  Nossos Valores
                </h2>
                <div className="h-1 w-24 bg-accent mx-auto rounded" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 portrait:gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 portrait:p-6"
                    >
                      <div className="w-16 h-16 bg-[var(--blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4 portrait:w-14 portrait:h-14">
                        <Icon className="w-12 h-12 text-[var(--blue)] portrait:w-7 portrait:h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 portrait:text-lg">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed portrait:text-sm">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gradient-to-r from-[var(--darkblue)] via-[var(--deepblue)] to-[var(--blue)] text-white portrait:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 portrait:mb-8">
                <h2 className="text-4xl font-bold mb-4 portrait:text-3xl">
                  Por Que Escolher a Notebook Expert?
                </h2>
                <p className="text-xl text-white/90 portrait:text-base">
                  Somos a melhor assistência técnica especializada em notebooks de Curitiba
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 portrait:gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 portrait:p-4">
                  <h3 className="text-xl font-bold mb-2 portrait:text-lg">Equipe Especializada</h3>
                  <p className="text-white/90 portrait:text-sm">
                    Técnicos qualificados e em constante atualização com as novas tecnologias do mercado.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 portrait:p-4">
                  <h3 className="text-xl font-bold mb-2 portrait:text-lg">Laboratório Equipado</h3>
                  <p className="text-white/90 portrait:text-sm">
                    Ferramentas e equipamentos profissionais para diagnóstico e reparo preciso.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 portrait:p-4">
                  <h3 className="text-xl font-bold mb-2 portrait:text-lg">Peças de Qualidade</h3>
                  <p className="text-white/90 portrait:text-sm">
                    Trabalhamos apenas com peças originais ou de primeira linha com garantia.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 portrait:p-4">
                  <h3 className="text-xl font-bold mb-2 portrait:text-lg">Melhor Avaliação</h3>
                  <p className="text-white/90 portrait:text-sm">
                    Assistência mais bem avaliada no Google em Curitiba, com 4.8 estrelas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 portrait:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-foreground mb-6 portrait:text-3xl">
                Precisando de Assistência Técnica?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 portrait:text-base portrait:mb-6">
                Entre em contato agora e receba um atendimento personalizado com orçamento gratuito.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://wa.me/5541998870606?text=Olá! Vi a página Sobre e gostaria de conhecer mais sobre os serviços."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wpp mx-0"
                >
                  <i className="fab fa-whatsapp text-2xl"></i>
                  <span className="ml-2">WhatsApp: (41) 99887-0606</span>
                </a>                
               
              </div>
            </div>
          </div>
        </section>
      </main>

      <Map />
      
      <Footer />
    </div>
  );
}

