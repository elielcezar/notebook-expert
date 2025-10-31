import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Business from "@/components/Business";
import ExpertTip from "@/components/ExpertTip";
import Testimonials from "@/components/Testimonials";
import Prevention from "@/components/Prevention";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="landscape:pt-16">
        <Hero />
        <About />
        <Services />
        <Business />
        <ExpertTip />
        <Testimonials />
        <Prevention />        
      </main>
      <Footer />
    </div>
  );
};

export default Index;
