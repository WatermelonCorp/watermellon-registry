
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import SuccessStories from './components/SuccessStories';
import Comparison from './components/Comparison';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import "./index.css"

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#011616] selection:bg-emerald-500 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Value Proposition Section */}
        <section className="py-24 px-6 bg-white text-slate-900">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              At <span className="text-emerald-600">ApexFlow</span>, we engineer real growth through 
              <span className="text-emerald-600"> data-driven strategies</span> designed to 
              scale your business, capture the right market, and 
              <span className="text-emerald-600"> amplify ROI with precision.</span>
            </h2>
          </div>
        </section>

        <Services />
        
        {/* Why Choice Section Banner */}
        <section className="bg-[#011616] py-24 px-6 grid-bg border-t border-emerald-900/30">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why we're the right choice</h2>
            <p className="text-slate-400 text-lg">
              We create impactful frameworks, refine brand positioning, and drive measurable 
              results through intelligent content and scalable marketing architectures.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl font-extrabold text-white mb-2">99%</div>
              <div className="text-slate-400 font-medium">Partner Success Rate</div>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-white mb-2">350+</div>
              <div className="text-slate-400 font-medium">Growth Systems Deployed</div>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-white mb-2">$500M+</div>
              <div className="text-slate-400 font-medium">Revenue Impact Generated</div>
            </div>
          </div>
        </section>

        <SuccessStories />
        <Comparison />
        <Testimonials />
        <Team />
        <FAQ />

        {/* Final CTA */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto glass-card rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to dominate your sector and unlock exponential growth?</h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              With decades of collective expertise, we've helped disruptive brands generate millions. Partner with us to scale with absolute confidence.
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20">
              Launch your growth
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
