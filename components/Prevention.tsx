import { ShieldCheck, TrendingUp, DollarSign, Database, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Prevention = () => {
  const benefits = [
    {
      icon: AlertCircle,
      title: "Evita superaquecimento",
      description: "A poeira acumulada impede a ventilação, causando lentidão e danos à placa-mãe."
    },
    {
      icon: TrendingUp,
      title: "Aumenta a vida útil",
      description: "Limpezas periódicas e troca da pasta térmica reduzem o desgaste interno."
    },
    {
      icon: ShieldCheck,
      title: "Melhora o desempenho",
      description: "Um sistema limpo e otimizado roda mais rápido e com menos travamentos."
    },
    {
      icon: Database,
      title: "Reduz riscos de perda de dados",
      description: "A prevenção ajuda a identificar problemas em HDs e SSDs antes que falhem."
    },
    {
      icon: DollarSign,
      title: "Economiza dinheiro",
      description: "Corrigir um defeito no início é muito mais barato do que trocar peças danificadas."
    }
  ];

  const dailyCare = [
    "Evite usar o notebook sobre superfícies macias (como cama ou sofá). Elas bloqueiam a ventilação e causam superaquecimento.",
    "Não mantenha o notebook sempre ligado na tomada. Isso reduz a vida útil da bateria.",
    "Mantenha o teclado limpo e protegido. Poeira e migalhas podem danificar as teclas.",
    "Use mochilas ou capas acolchoadas para transporte.",
    "Faça backup regularmente para proteger seus dados."
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Preventive Maintenance */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Por Que Fazer Manutenção Preventiva?
            </h2>
            <div className="h-1 w-24 bg-accent mx-auto mb-6 rounded" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A manutenção preventiva consiste em revisar e limpar o notebook antes que ocorram falhas, 
              evitando danos mais sérios e gastos desnecessários.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex-1 relative w-full max-w-md h-96">
              <Image 
              src="/business.jpg" 
              alt="Business" 
              fill 
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex-1 space-y-4 max-w-5xl mx-auto mb-12">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all portrait:text-center"
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

          <div className="text-center mt-12">
            <button className="btn-wpp">
                <i className="fab fa-whatsapp mr-2 text-3xl"></i>
                Agendar manutenção preventiva (41) 99887.0606 
            </button>     
          </div>
        </div>

        {/* Daily Care */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-primary/10 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">
            Cuidados Diários Que Fazem Diferença
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            Além da manutenção técnica, algumas práticas simples ajudam a conservar o notebook no dia a dia:
          </p>
          
          <div className="space-y-4">
            {dailyCare.map((tip, index) => (
              <div 
              key={index}
              className="flex items-center gap-4 bg-card rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all portrait:text-center">
                <span className="text-accent font-bold text-lg flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center portrait:mx-auto">
                  {index + 1}
                </span>
                <p className="text-foreground pt-1">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prevention;
