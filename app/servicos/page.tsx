import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { getPageById } from "@/lib/wordpress";
import { 
  Cpu, 
  Monitor, 
  Keyboard, 
  Battery, 
  Wrench, 
  HardDrive, 
  Thermometer, 
  Droplet, 
  Settings,
  MemoryStick,
  Plug,
  type LucideIcon
} from "lucide-react";

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

// Ícones hardcoded mapeados por índice
const iconsList: LucideIcon[] = [
  Monitor,      // Troca de Tela
  Keyboard,     // Teclado e Carcaça
  Thermometer,  // Resfriamento
  Cpu,          // Placa-Mãe
  Battery,      // Energia
  HardDrive,    // SSD Installation
  MemoryStick,  // Memória RAM
  Droplet,      // Limpeza Profunda
  Settings,     // Sistema Operacional
  Wrench,       // Reparo de BIOS
  Plug,         // Troca de conectores
  Cpu,          // Placa-Mãe
];

const defaultServices = [
  {
    title: "Reparo de Placa-Mãe",
    description: "Diagnóstico e conserto de falhas eletrônicas, curtos e defeitos na placa-mãe. Recuperamos o funcionamento do notebook sem precisar trocar toda a peça.",
  },
  {
    title: "Troca de Tela / Display",
    description: "Substituímos telas quebradas, com manchas ou sem imagem. Peças novas e instalação segura, devolvendo a qualidade original da imagem.",
  },
  {
    title: "Troca de Teclado",
    description: "Realizamos a troca de teclados danificados, com teclas falhando ou sem resposta. Serviço rápido e compatível com todas as marcas.",
  },
  {
    title: "Troca de Bateria",
    description: "Bateria durando pouco ou não carregando? Fazemos a substituição por modelos originais ou compatíveis de alta durabilidade.",
  },
  {
    title: "Troca de Carcaça / Dobradiça",
    description: "Reparo e substituição de carcaças trincadas e dobradiças quebradas. Restauramos a estrutura e aparência do seu notebook.",
  },
  {
    title: "Upgrade de SSD e Memória",
    description: "Aumente a velocidade e o desempenho do seu notebook com upgrades de SSD e memória RAM. Instalação e configuração completa.",
  },
  {
    title: "Limpeza e Pasta Térmica",
    description: "Limpeza interna completa e troca da pasta térmica para evitar superaquecimento e aumentar a vida útil do equipamento.",
  },
  {
    title: "Reparo Após Líquido Derramado",
    description: "Tratamento especializado para notebooks que sofreram contato com líquidos. Limpeza, recuperação e substituição de componentes afetados.",
  },
  {
    title: "Formatação e Otimização",
    description: "Instalação limpa do sistema, remoção de vírus e otimização para melhor desempenho. Notebook rápido e pronto para uso.",
  },
];

export default async function ServicosPage() {
  const servicesPage = await getPageById(57);

  const pageTitle = servicesPage?.title.rendered || "Serviços Oferecidos";
  const pageDescription = servicesPage?.content.rendered.replace(/<[^>]*>/g, '').trim() || "Oferecemos uma ampla gama de serviços para todas as marcas e modelos de notebooks";

  const wpServices = servicesPage?.acf?.servicos as Array<{ titulo: string; descricao: string }> | undefined;
  const displayServices = wpServices && wpServices.length > 0
    ? wpServices.map((s, i) => ({
        title: s.titulo,
        description: s.descricao,
        icon: iconsList[i] || Settings,
      }))
    : defaultServices.map((s, i) => ({
        ...s,
        icon: iconsList[i] || Settings,
      }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="landscape:pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[var(--darkblue)] via-[var(--deepblue)] to-[var(--blue)] text-white py-20 portrait:py-16 portrait:pt-40">
          

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
                <div className="h-1 w-12 bg-yellow rounded" />
                <span className="text-yellow font-semibold text-sm uppercase tracking-wider">
                  Assistência Especializada
                </span>
                <div className="h-1 w-12 bg-yellow rounded" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up portrait:text-4xl">
                {pageTitle}
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 portrait:text-base">
                {pageDescription}
              </p>
            </div>
          </div>
          
          {/* Decorative Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Services Grid */}
        <section className="py-16 portrait:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 portrait:gap-6">
              {displayServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="group bg-card border border-border rounded-lg p-8 hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 portrait:p-6"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Icon Container */}
                      <div className="w-20 h-20 rounded-full bg-[var(--blue)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--blue)] transition-colors duration-300 portrait:w-16 portrait:h-16 portrait:mb-4">
                        <Icon className="w-10 h-10 text-[var(--blue)] group-hover:text-white transition-colors duration-300 portrait:w-8 portrait:h-8" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-[var(--blue)] transition-colors portrait:text-lg portrait:mb-3">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed portrait:text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
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
              <p className="text-xl mb-8 text-white/90 portrait:text-base portrait:mb-6">
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
