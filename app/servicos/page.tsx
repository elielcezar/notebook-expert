import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  MemoryStick
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

const services = [
  {
    icon: Cpu,
    title: "Reparo de Placa-Mãe",
    description: "Diagnóstico e conserto de falhas eletrônicas, curtos e defeitos na placa-mãe. Recuperamos o funcionamento do notebook sem precisar trocar toda a peça.",
    color: "text-blue-600"
  },
  {
    icon: Monitor,
    title: "Troca de Tela / Display",
    description: "Substituímos telas quebradas, com manchas ou sem imagem. Peças novas e instalação segura, devolvendo a qualidade original da imagem.",
    color: "text-purple-600"
  },
  {
    icon: Keyboard,
    title: "Troca de Teclado",
    description: "Realizamos a troca de teclados danificados, com teclas falhando ou sem resposta. Serviço rápido e compatível com todas as marcas.",
    color: "text-green-600"
  },
  {
    icon: Battery,
    title: "Troca de Bateria",
    description: "Bateria durando pouco ou não carregando? Fazemos a substituição por modelos originais ou compatíveis de alta durabilidade.",
    color: "text-yellow-600"
  },
  {
    icon: Wrench,
    title: "Troca de Carcaça / Dobradiça",
    description: "Reparo e substituição de carcaças trincadas e dobradiças quebradas. Restauramos a estrutura e aparência do seu notebook.",
    color: "text-orange-600"
  },
  {
    icon: HardDrive,
    title: "Upgrade de SSD e Memória",
    description: "Aumente a velocidade e o desempenho do seu notebook com upgrades de SSD e memória RAM. Instalação e configuração completa.",
    color: "text-indigo-600"
  },
  {
    icon: Thermometer,
    title: "Limpeza e Pasta Térmica",
    description: "Limpeza interna completa e troca da pasta térmica para evitar superaquecimento e aumentar a vida útil do equipamento.",
    color: "text-red-600"
  },
  {
    icon: Droplet,
    title: "Reparo Após Líquido Derramado",
    description: "Tratamento especializado para notebooks que sofreram contato com líquidos. Limpeza, recuperação e substituição de componentes afetados.",
    color: "text-cyan-600"
  },
  {
    icon: Settings,
    title: "Formatação e Otimização",
    description: "Instalação limpa do sistema, remoção de vírus e otimização para melhor desempenho. Notebook rápido e pronto para uso.",
    color: "text-gray-600"
  },
];

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="landscape:pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[var(--darkblue)] via-[var(--deepblue)] to-[var(--blue)] text-white py-20 portrait:py-16 portrait:pt-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in portrait:mb-3">
                <div className="h-1 w-12 bg-accent rounded" />
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  Assistência Especializada
                </span>
                <div className="h-1 w-12 bg-accent rounded" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up portrait:text-4xl">
                Nossos Serviços
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 portrait:text-base">
                Soluções completas para todas as necessidades do seu notebook. 
                Atendemos todas as marcas com qualidade e garantia.
              </p>
            </div>
          </div>
          
          {/* Decorative Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Services Grid */}
        <section className="py-16 portrait:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 portrait:gap-6">
              {services.map((service, index) => {
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
        <section className="py-16 bg-gradient-to-r from-[var(--darkblue)] via-[var(--deepblue)] to-[var(--blue)] text-white portrait:py-12">
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
      
      <Footer />
    </div>
  );
}

