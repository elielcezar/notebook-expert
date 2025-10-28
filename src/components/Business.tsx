import { Building2, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Business = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              🏢 Atendimento para Empresas
            </h2>
            <div className="h-1 w-24 bg-accent mx-auto mb-6 rounded" />
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Oferecemos planos corporativos e parcerias B2B, ideais para empresas 
              que utilizam grande volume de notebooks.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex items-start gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Atendimento Prioritário</h3>
                <p className="text-primary-foreground/80">
                  Sua empresa sempre em primeiro lugar, com prazos diferenciados e suporte dedicado
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Descontos Exclusivos</h3>
                <p className="text-primary-foreground/80">
                  Condições especiais e descontos em volume para empresas parceiras
                </p>
              </div>
            </div>
          </div>

          {/* Clients */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-accent" />
              <h3 className="text-2xl font-bold">Nossos Clientes Corporativos</h3>
            </div>
            <p className="text-primary-foreground/90 mb-4">
              Entre nossos clientes estão instituições de ensino, coworkings, escritórios e 
              empresas de tecnologia que confiam na qualidade dos nossos serviços.
            </p>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-primary-foreground shadow-lg"
            >
              Solicitar Proposta Corporativa
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Business;
