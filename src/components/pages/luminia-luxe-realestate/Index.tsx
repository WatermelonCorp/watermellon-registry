
import { useState, useEffect } from 'react';
import Navbar from './ui/Navbar';
import Hero from './ui/Hero';
import Services from './ui/Services';
import FeaturedProperties from './ui/FeaturedProperties';
import About from './ui/About';
import Agents from './ui/Agents';
import Testimonials from './ui/Testimonials';
import FAQSection from './ui/FAQ';
import Contact from './ui/Contact';
import Footer from './ui/Footer';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar isScrolled={isScrolled} />
      
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="services" className="pt-24 lg:pt-32">
          <Services />
        </section>

        <section id="properties" className="pt-24 lg:pt-32">
          <FeaturedProperties />
        </section>

        <section id="about" className="pt-24 lg:pt-32">
          <About />
        </section>

        <section id="agents" className="pt-24 lg:pt-32">
          <Agents />
        </section>

        <section id="testimonials" className="py-24 lg:py-32">
          <Testimonials />
        </section>

        <section id="faq" className="py-24 lg:py-32 bg-zinc-50">
          <FAQSection />
        </section>

        <section id="contact" className="relative">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
