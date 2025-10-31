import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Yulli Meireles",
      role: "Empresária",
      content: "Levei meu notebook para arrumar as dobradiças e o serviço ficou impecável. Super indico, atendimento e concerto rápido, super solicitos para explicar sobre o concerto!",
      rating: 5,
      location: "São Paulo, SP"
    },
    {
      name: "Leonardo Della Costa",
      role: "Professora",
      content: "Atendimento excepcional e muita qualidade de seriedade na prestação de serviço. Recomendo!",
      rating: 5,
      location: "Belo Horizonte, MG"
    },
    {
      name: "Álex Dias",
      role: "Designer",
      content: "Arrumaram 2 notebooks da minha família, ambos de reparo em placa.",
      rating: 5,
      location: "Rio de Janeiro, RJ"
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

              
                <div class="flex items-center mb-4 gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <span className="text-accent font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-800">{testimonial.name}</h4>
                        <div class="flex text-yellow-500 text-sm">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                        </div>
                    </div>
                </div>
                <p class="text-gray-600 italic">"{testimonial.content}"</p>               
            
              

            </div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <div className="text-center mt-12 flex flex-col items-center">

          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-6 py-3 shadow-sm mb-4">
            <Star className="w-7 h-7 fill-amber-400 text-amber-400 mx-0" />
            <Star className="w-7 h-7 fill-amber-400 text-amber-400 mx-0" />
            <Star className="w-7 h-7 fill-amber-400 text-amber-400 mx-0" />
            <Star className="w-7 h-7 fill-amber-400 text-amber-400 mx-0" />
            <Star className="w-7 h-7 fill-amber-400 text-amber-400 mx-0" />
            <p>
              <span className="font-semibold text-foreground text-3xl font-bold">4.8</span>
              <span className="font-semibold text-foreground text-lg font-normal">/5.0</span>
            </p>            
          </div>

          <p id="reviews-count" className="text-gray-600">Baseado em mais de 850 avaliações no Google</p>

          <div className="flex items-center justify-center mt-4 space-x-4 portrait:flex-col">
              <div className="bg-white px-4 py-2 rounded-lg shadow-md border">
                  <div className="flex items-center">
                      <i className="fab fa-google text-blue-600 mr-2"></i>
                      <span className="text-sm font-medium text-gray-700">Empresa Verificada</span>
                  </div>
              </div>
              <a href="https://www.google.com/search?q=notebook+expert+curitiba" 
              target="_blank" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm">
                  Ver todas as avaliações no Google →
              </a>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Testimonials;
