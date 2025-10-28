import { Lightbulb } from "lucide-react";

const ExpertTip = () => {
  return (
    <section className="py-16 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl p-8 md:p-12 border-2 border-accent/20 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  💡 Dica do Especialista
                </h3>
                <blockquote className="text-lg text-foreground italic border-l-4 border-accent pl-4">
                  "A limpeza preventiva e a troca da pasta térmica a cada 12 meses aumentam 
                  significativamente a vida útil do seu notebook."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertTip;
