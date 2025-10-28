import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empresária",
      content: "Excelente atendimento! Meu notebook voltou como novo e muito mais rápido. A equipe é muito profissional e transparente.",
      rating: 5,
      location: "São Paulo, SP"
    },
    {
      name: "João Santos",
      role: "Designer",
      content: "Já é a terceira vez que trago meu MacBook aqui. Sempre rápidos, honestos e com preço justo. Recomendo!",
      rating: 5,
      location: "Rio de Janeiro, RJ"
    },
    {
      name: "Ana Costa",
      role: "Professora",
      content: "Fizeram um upgrade de SSD no meu notebook antigo e ele ficou incrivelmente rápido! Valeu cada centavo.",
      rating: 5,
      location: "Belo Horizonte, MG"
    },
    {
      name: "Carlos Oliveira",
      role: "Gestor de TI",
      content: "Atendimento corporativo impecável. Cuidam de toda frota de notebooks da empresa com rapidez e qualidade.",
      rating: 5,
      location: "Brasília, DF"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            💬 Depoimentos de Clientes
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6 rounded" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja o que nossos clientes dizem sobre nossos serviços
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-accent/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-accent font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role} • {testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-6 py-3 shadow-sm">
            <Star className="w-5 h-5 fill-accent text-accent" />
            <span className="font-semibold text-foreground">4.9/5.0</span>
            <span className="text-muted-foreground">• Baseado em avaliações do Google</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
