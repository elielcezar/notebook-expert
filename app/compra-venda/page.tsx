import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { 
  ShoppingCart, 
  RefreshCw, 
  Shield, 
  CheckCircle, 
  Laptop, 
  Award,
  Zap,
  TrendingUp,
  DollarSign,
  Package
} from "lucide-react";

export const metadata: Metadata = {
  title: "Compra e Venda de Notebooks Seminovos | Notebook Expert",
  description: "Compre notebooks seminovos revisados com garantia de 1 ano ou venda seu notebook usado. Equipamentos testados, otimizados e com preços acessíveis em Curitiba.",
  keywords: "comprar notebook seminovo, vender notebook usado, notebook com garantia, troca notebook Curitiba, notebook revisado",
  openGraph: {
    title: "Compra e Venda de Notebooks Seminovos | Notebook Expert",
    description: "Compre notebooks seminovos revisados com garantia de 1 ano ou venda seu notebook usado em Curitiba.",
    url: "https://eliel.dev/clients/notebookexpert/compra-venda",
    type: "website",
    images: [
      {
        url: "/hero-tech.jpg",
        width: 1200,
        height: 630,
        alt: "Compra e Venda de Notebooks - Notebook Expert",
      },
    ],
  },
};

export default function CompraVendaPage() {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Equipamentos revisados",
      description: "Por técnicos especializados com 16 anos de experiência"
    },
    {
      icon: Shield,
      title: "Garantia real de 12 meses",
      description: "Cobertura completa para sua segurança"
    },
    {
      icon: Laptop,
      title: "Prontos para uso",
      description: "Formatados, otimizados e testados"
    },
    {
      icon: Zap,
      title: "Com SSD e upgrades",
      description: "Opções disponíveis para melhor desempenho"
    }
  ];

  const sellBenefits = [
    {
      icon: DollarSign,
      title: "Avaliação justa",
      description: "Pagamos o valor real do seu equipamento"
    },
    {
      icon: RefreshCw,
      title: "Aceitamos como parte do pagamento",
      description: "Troque seu usado por um seminovo mais potente"
    },
    {
      icon: Package,
      title: "Compramos mesmo com defeitos",
      description: "Pequenos problemas não são empecilho"
    },
    {
      icon: TrendingUp,
      title: "Processo rápido",
      description: "Sem burocracia, avaliação na hora"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="landscape:pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[var(--darkblue)] via-[var(--deepblue)] to-[var(--blue)] text-white py-20 portrait:py-16 portrait:pt-28">
        
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
                  Qualidade e Garantia
                </span>
                <div className="h-1 w-12 bg-accent rounded" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up portrait:text-4xl">
                Compra e Venda de Notebooks
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 portrait:text-base">
                Notebooks seminovos impecáveis, testados, revisados e com garantia de 1 ano. 
                Também compramos seu notebook usado!
              </p>
            </div>
          </div>
          
          {/* Decorative Bottom Gradient */}
          {/*<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />*/}
        </section>

        {/* Main Content Section */}
        <section className="pt-16 portrait:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Intro Text */}
              <div className="text-center mb-16 portrait:mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Na <span className="font-bold text-[var(--blue)]">Notebook Expert</span> você encontra notebooks seminovos impecáveis, 
                  testados, revisados e com garantia de 1 ano. Cada equipamento passa por uma rigorosa inspeção técnica, 
                  garantindo desempenho, qualidade e aparência de novo — mas com um preço muito mais acessível.
                </p>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 portrait:gap-8 portrait:mb-12">
                {/* Buy Section */}
                <div className="bg-gradient-to-br from-[var(--blue)]/5 to-[var(--lightblue)]/5 rounded-2xl p-8 border-2 border-[var(--blue)]/20 portrait:p-6">
                  <div className="w-16 h-16 bg-[var(--blue)] rounded-full flex items-center justify-center mb-6 portrait:w-12 portrait:h-12 portrait:mb-4">
                    <ShoppingCart className="w-8 h-8 text-white portrait:w-6 portrait:h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4 portrait:text-2xl">
                    Compre um<br/>Seminovo
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed portrait:text-sm">
                    <strong>Equipamentos revisados, com garantia real de 12 meses.</strong> 
                    <br/>
                    Notebooks prontos para uso, formatados e otimizados, com opções de SSD e upgrades disponíveis.
                  </p>
                  <a 
                    href="https://wa.me/5541998870606?text=Olá! Gostaria de saber mais sobre os notebooks seminovos disponíveis."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center inline-block"
                  >
                    Ver Disponíveis
                    <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>

                {/* Sell Section */}
                <div className="bg-gradient-to-br from-green-500/5 to-green-600/5 rounded-2xl p-8 border-2 border-green-500/20 portrait:p-6">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 portrait:w-12 portrait:h-12 portrait:mb-4">
                    <RefreshCw className="w-8 h-8 text-white portrait:w-6 portrait:h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4 portrait:text-2xl">
                    Quer trocar de notebook?
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed portrait:text-sm">
                    <strong>Nós aceitamos o seu usado como parte do pagamento!</strong> 
                    <br/>
                    Fazemos uma avaliação justa e transparente, para que você possa sair com um modelo mais novo e potente sem pesar no bolso.
                  </p>
                  <a 
                    href="https://wa.me/5541998870606?text=Olá! Gostaria de vender ou trocar meu notebook usado."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-wpp w-full text-center inline-block mx-0"
                  >
                    <i className="fab fa-whatsapp text-2xl"></i>
                    <span className="ml-2">Avaliar Meu Notebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Buy Section */}
        <section className="py-16 bg-muted/30 portrait:py-12" style={{ backgroundImage: 'url(/bg-faq.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 portrait:mb-8">
                <h2 className="text-4xl font-bold text-white mb-4 portrait:text-3xl">
                  Por que comprar conosco?
                </h2>
                <div className="h-1 w-24 bg-accent mx-auto rounded" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 portrait:gap-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 portrait:p-4"
                    >
                      <div className="w-16 h-16 bg-[var(--blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4 portrait:w-12 portrait:h-12 portrait:mb-3">
                        <Icon className="w-12 h-12 text-[var(--blue)] portrait:w-6 portrait:h-6" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-foreground portrait:text-base">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground portrait:text-xs">
                        {benefit.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Sell Your Notebook Section */}
        <section className="py-16 portrait:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 portrait:mb-8">
                <h2 className="text-4xl font-bold text-foreground mb-4 portrait:text-3xl">
                  Venda ou troque seu notebook usado
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto portrait:text-base">
                  Compramos notebooks usados em bom estado, mesmo com pequenos defeitos. 
                  Assim, você ganha praticidade e segurança sem precisar se preocupar com anúncios ou negociações.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 portrait:gap-4">
                {sellBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-green-500/5 to-green-600/5 border-2 border-green-500/20 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 portrait:p-4"
                    >
                      <div className="w-16 h-16 bg-green-600/10 rounded-full flex items-center justify-center mx-auto mb-4 portrait:w-12 portrait:h-12 portrait:mb-3">
                        <Icon className="w-8 h-8 text-green-600 portrait:w-6 portrait:h-6" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-foreground portrait:text-base">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground portrait:text-xs">
                        {benefit.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badge Section */}
        <section className="pt-16 pb-8 bg-gradient-to-r from-[var(--darkblue)] via-[var(--deepblue)] to-[var(--blue)] text-white portrait:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">              
              <h2 className="text-4xl font-bold text-primary-foreground mb-4">
                Qualidade, confiança e garantia
              </h2>
              <div className="h-1 w-24 bg-accent mx-auto mb-8 rounded" />
          
              <p className="text-xl mb-8 text-white/90 portrait:text-base portrait:mb-6">
                Tudo o que você procura em um notebook, com o atendimento de quem entende do assunto.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 portrait:gap-6 mb-10">

                <div className="text-center bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
                  <div className="w-16 h-16 bg-[var(--blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-12 h-12 text-[var(--lightblue)]" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Garantia de 1 Ano</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Todos os seminovos com cobertura completa
                  </p>
                </div>

                <div className="text-center bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
                  <div className="w-16 h-16 bg-[var(--blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-[var(--lightblue)]" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Testados e Revisados</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Inspeção rigorosa em todos os equipamentos
                  </p>
                </div>

                <div className="text-center bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
                  <div className="w-16 h-16 bg-[var(--blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-12 h-12 text-[var(--lightblue)]" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">16 Anos de Experiência</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Referência em notebooks em Curitiba
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://wa.me/5541998870606?text=Olá! Gostaria de saber mais sobre compra e venda de notebooks."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wpp mx-0"
                >
                  <i className="fab fa-whatsapp text-2xl"></i>
                  <span className="ml-2">(41) 99887-0606</span>
                </a>
              
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center mt-16">              
              <h2 className="text-4xl font-bold text-primary-foreground mb-4">
                Localização
              </h2>
              <div className="h-1 w-24 bg-accent mx-auto mb-0 rounded" />
          </div>
         

        </section>
       
      </main>
      <Map />
      <Footer />
    </div>
  );
}

