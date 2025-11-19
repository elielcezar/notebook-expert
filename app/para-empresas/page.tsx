import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { Building2, Star, Clock } from "lucide-react";


const businessItems = [
  {
    icon: <Clock className="w-6 h-6 text-accent" />,
    title: "Atendimento Prioritário",
    description: "Sua empresa sempre em primeiro lugar, com prazos diferenciados e suporte dedicado"
  },  
  {
    icon: <Star className="w-6 h-6 text-accent" />,
    title: "Descontos Exclusivos",
    description: "Condições especiais e descontos em volume para empresas parceiras"
  },  
  {
    icon: <Building2 className="w-8 h-8 text-accent" />,
    title: "Nossos Clientes Corporativos",
    description: "Entre nossos clientes estão instituições de ensino, coworkings, escritórios e empresas de tecnologia que confiam na qualidade dos nossos serviços."
  }
]


export const metadata: Metadata = {
  title: "Serviços de Assistência Técnica | Notebook Expert",
  description: "Conheça todos os nossos serviços especializados em reparo e manutenção de notebooks em Curitiba. Reparo de placa-mãe, troca de tela, upgrade de SSD, bateria e muito mais.",
  keywords: "reparo notebook, troca tela notebook, upgrade SSD, troca bateria notebook, limpeza notebook, assistência técnica Curitiba",
  openGraph: {
    title: "Serviços de Assistência Técnica | Notebook Expert",
    description: "Conheça todos os nossos serviços especializados em reparo e manutenção de notebooks em Curitiba.",
    url: "https://eliel.dev/clients/notebookexpert/servicos",
    type: "website",
    images: [
      {
        url: "/hero-tech.jpg",
        width: 1200,
        height: 630,
        alt: "Serviços de Assistência Técnica - Notebook Expert",
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
              Atendimento para Empresas
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 portrait:text-base">
              Oferecemos planos corporativos e parcerias B2B, ideais para empresas 
              que utilizam grande volume de notebooks.
              </p>
            </div>
          </div>
          
          {/* Decorative Bottom Gradient */}
          {/*<div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-background to-transparent" />*/}
        </section>

        {/* Services Grid */}

        <section className="py-20 bg-white text-primary">
          <div className="container mx-auto px-4">
            <div className="mx-auto">
              <div className="flex items-start justify-center gap-12 portrait:flex-col-reverse">

              <div 
                className="relative w-full max-w-md min-h-[420px] md:min-h-[420px]"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >      
                  <img 
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/business.jpg`}
                    alt="Business" 
                    className="absolute inset-0 w-full h-full rounded-md object-cover"
                  />
              </div>

              <div             
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >                   

                  {businessItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all duration-300 mb-8">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-primary/80">{item.description}</p>
                      </div>
                    </div>
                  ))}                

                </div>
              </div>

              
              
            </div>
          </div>
        </section>

        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[var(--darkblue)] via-[var(--deepblue)] to-[var(--blue)] text-white portrait:py-12" style={{ backgroundImage: 'url(/bg-faq.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 portrait:text-3xl">
                Precisa de Assistência Técnica?
              </h2>
              <p className="text-xl mb-8 text-white/90 portrait:text-base portrait:mb-6 max-w-xl mx-auto">
                Entre em contato agora mesmo e receba um orçamento gratuito para o reparo do seu notebook.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://wa.me/5541998870606?text=Olá! Gostaria de solicitar um orçamento para assistência técnica do meu notebook."
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

