import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandsCarousel from "@/components/BrandsCarousel";
/*import About from "@/components/About";*/
import Services from "@/components/Services";
import Business from "@/components/Business";
import ExpertTip from "@/components/ExpertTip";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import Prevention from "@/components/Prevention";
import DailyCare from "@/components/DailyCare";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { getPageById, getLatestExpertTip, getTestimonials } from "@/lib/wordpress";

export default async function Home() {
  // Buscar dados do WordPress em paralelo
  const [whyChooseUsPage, servicesPage, businessPage, expertTip, wpTestimonials, preventionPage, dailyCarePage, faqPage] = await Promise.all([
    getPageById(42), // "Por Que Escolher Nossa Assistência?"
    getPageById(57), // "Serviços Oferecidos"
    getPageById(69), // "Atendimento para Empresas"
    getLatestExpertTip(), // Dica do Especialista (mais recente)
    getTestimonials(12), // Últimos 12 depoimentos
    getPageById(81), // "Por Que Fazer Manutenção Preventiva?"
    getPageById(88), // "Cuidados Diários Que Fazem Diferença"
    getPageById(94), // "Perguntas Frequentes"
  ]);

  const whyChooseUsProps = whyChooseUsPage
    ? {
        title: whyChooseUsPage.title.rendered,
        content: whyChooseUsPage.content.rendered,
        items: (whyChooseUsPage.acf?.itens as Array<{ icone: string | null; item: string }>) || [],
        featuredImage: whyChooseUsPage._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      }
    : {};

  const servicesProps = servicesPage
    ? {
        title: servicesPage.title.rendered,
        description: servicesPage.content.rendered.replace(/<[^>]*>/g, '').trim(),
        services: (servicesPage.acf?.servicos as Array<{ titulo: string; descricao: string }>) || [],
      }
    : {};

  const businessProps = businessPage
    ? {
        title: businessPage.title.rendered,
        description: businessPage.content.rendered.replace(/<[^>]*>/g, '').trim(),
        items: (businessPage.acf?.aendimento as Array<{ titulo: string; descricao: string }>) || [],
        featuredImage: businessPage._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      }
    : {};

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="landscape:pt-16">
        <Hero />
        <BrandsCarousel />
        <WhyChooseUs {...whyChooseUsProps} />        
        <Services {...servicesProps} />
        <Business {...businessProps} />
        <ExpertTip
          title={expertTip?.title.rendered}
          content={expertTip?.content.rendered.replace(/<[^>]*>/g, '').trim()}
        />
        <Testimonials
          testimonials={wpTestimonials.length > 0
            ? wpTestimonials.map(t => ({
                name: t.title.rendered,
                content: t.content.rendered.replace(/<[^>]*>/g, '').trim(),
              }))
            : undefined
          }
        />
        <Prevention
          {...(preventionPage
            ? {
                title: preventionPage.title.rendered,
                description: preventionPage.content.rendered.replace(/<[^>]*>/g, '').trim(),
                items: (preventionPage.acf?.item as Array<{ titulo: string; descricao: string }>) || [],
                featuredImage: preventionPage._embedded?.['wp:featuredmedia']?.[0]?.source_url,
              }
            : {}
          )}
        />
        <DailyCare
          {...(dailyCarePage
            ? {
                title: dailyCarePage.title.rendered,
                description: dailyCarePage.content.rendered.replace(/<[^>]*>/g, '').trim(),
                items: (dailyCarePage.acf?.cuidado as Array<{ item: string }>) || [],
              }
            : {}
          )}
        />
        <FAQ
          {...(faqPage
            ? {
                title: faqPage.title.rendered,
                description: faqPage.content.rendered.replace(/<[^>]*>/g, '').trim(),
                items: (faqPage.acf?.item as Array<{ pergunta: string; resposta: string }>) || [],
              }
            : {}
          )}
        />
      </main>
      <Map />
      <Footer />
    </div>
  );
}

