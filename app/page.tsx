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
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="landscape:pt-16">
        <Hero />
        <BrandsCarousel />
        <WhyChooseUs />        
        <Services />
        <Business />
        <ExpertTip />
        <Testimonials />        
        <Prevention />
        <FAQ />        
      </main>
      <Footer />
    </div>
  );
}

