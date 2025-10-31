import { Monitor, Zap, Cpu, Wrench, HardDrive, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const maintenanceServices = [
    { icon: Monitor, title: "Troca de Tela", description: "Substituição de telas quebradas ou com falhas de imagem" },
    { icon: Wrench, title: "Teclado e Carcaça", description: "Substituição de teclado, dobradiças e carcaças" },
    { icon: Thermometer, title: "Resfriamento", description: "Troca de cooler e reparo de superaquecimento" },
    { icon: Cpu, title: "Placa-Mãe", description: "Reparo de placa-mãe e componentes eletrônicos" },
    { icon: Zap, title: "Energia", description: "Recuperação de notebooks com problemas de liga/desliga" },
  ];

  const upgradeServices = [
    { icon: HardDrive, title: "SSD Installation", description: "Aumente a velocidade do seu notebook em até 10x" },
    { icon: Cpu, title: "Memória RAM", description: "Expansão de memória para melhor desempenho" },
    { icon: Thermometer, title: "Limpeza Profunda", description: "Limpeza interna e troca de pasta térmica" },
    { icon: Monitor, title: "Sistema Operacional", description: "Formatação e otimização do sistema" },
  ];

  const advancedServices = [
    { icon: Cpu, title: "Reparo de BIOS", description: "Reparo de BIOS e chips de memória" },
    { icon: Cpu, title: "Troca de conectores", description: "Troca de conectores de energia e portas USB" },
  ];

  return (
    <section id="servicos" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Serviços Oferecidos
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6 rounded" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Oferecemos uma ampla gama de serviços para todas as marcas e modelos de notebooks
          </p>
        </div>

        {/* Maintenance Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
          <i class="fa-solid fa-screwdriver-wrench"></i> Manutenção e Reparos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maintenanceServices.map((service, index) => (
              <div 
                key={index}
                className="group bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{service.title}</h4>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
          <i class="fa-solid fa-bolt"></i> Upgrades e Desempenho
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upgradeServices.map((service, index) => (
              <div 
                key={index}
                className="group bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{service.title}</h4>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
          <i class="fa-solid fa-gears"></i> Serviços Avançados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advancedServices.map((service, index) => (
              <div 
                key={index}
                className="group bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{service.title}</h4>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="btn-wpp">
              <i className="fab fa-whatsapp mr-2 text-3xl"></i>
              Solicite um orçamento (41) 99887.0606 
          </button>     
        </div>
      </div>
    </section>
  );
};

export default Services;
