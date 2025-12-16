import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { Building2, Star, Clock } from "lucide-react";
import { AlertCircle, ShieldCheck, Database, DollarSign } from "lucide-react";


const benefits = [
  {
    icon: AlertCircle,
    title: "Mercado em expansão",
    description: "O uso de notebooks cresce a cada ano – no trabalho, nos estudos e no dia a dia. Isso significa um fluxo contínuo de clientes precisando de manutenção, upgrades e suporte especializado."
  },
  {
    icon: ShieldCheck,
    title: "Marca consolidada e bem avaliada",
    description: "Somos reconhecidos pela qualidade do serviço, transparência e atendimento humano. Como franqueado, você assume uma unidade já respaldada por credibilidade e reputação no mercado."
  },
  {
    icon: Clock,
    title: "Treinamento completo e suporte contínuo",
    description: "Você não precisa ter experiência técnica. Oferecemos capacitação inicial, treinamentos periódicos, suporte operacional e acompanhamento próximo para garantir o crescimento da sua unidade."
  },
  {
    icon: Database,
    title: "Processos padronizados e eficientes",
    description: "Nossa metodologia de diagnóstico, reparo e atendimento ao cliente foi desenvolvida ao longo dos anos para garantir agilidade, precisão e alta taxa de satisfação."
  },
  {
    icon: DollarSign,
    title: "Baixo investimento inicial",
    description: "Com infraestrutura enxuta, equipamentos acessíveis e custos operacionais reduzidos, o modelo de franquia foi criado para gerar retorno rápido e previsível."
  }
];

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



export default function ServicosPage() {
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
                  Assistência Especializada
                </span>
                <div className="h-1 w-12 bg-accent rounded" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up portrait:text-4xl">
                Seja um Franqueado
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 portrait:text-base">
                Transforme tecnologia em oportunidade de negócio
              </p>
            </div>
          </div>

        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {/* Preventive Maintenance */}
            <div className="mb-20">
              <div className="text-center mb-12 max-w-4xl mx-auto">
                
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Por que investir em uma franquia Notebook Expert?</h2>

                <div className="h-1 w-24 bg-accent mx-auto mb-6 rounded" />
                
               
              </div>

              <p className="text-lg text-muted-foreground mx-auto text-center mb-12">
                  A Notebook Expert nasceu com o propósito de oferecer assistência técnica especializada e de alta qualidade para notebooks, garantindo segurança, confiança e excelência em cada atendimento. Com o crescimento constante do setor de tecnologia e a demanda por serviços qualificados, criamos um modelo de franquia acessível, lucrativo e pensado para quem deseja empreender com suporte total e estrutura sólida.
                </p>

              <div className="flex items-start justify-center gap-12 portrait:flex-col-reverse">
                
              <div 
                className="flex-1"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              > 

                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="w-full flex items-center gap-4 bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all portrait:text-center"
                    >
                      <span className="text-accent font-bold text-lg flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center portrait:mx-auto">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 pt-1">{benefit.title}</h3>
                        <p className="text-muted-foreground text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                </div>

                <div 
                  className="flex-1 max-w-md flex items-center justify-center relative min-h-[520px] md:min-h-[620px] rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >            
                  <img 
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/franquia.png`}
                    alt="Business" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

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

