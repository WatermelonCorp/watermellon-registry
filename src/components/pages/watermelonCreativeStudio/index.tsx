
import  { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  Star,  
  Clock, 
  Zap, 

} from 'lucide-react';
import "./index.css"

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-xl py-4 border-b border-gray-100' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 relative z-[110]">
          <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${isScrolled || mobileMenuOpen ? 'text-black' : 'text-white'}`}>Watermelon.</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#studio" className={`${isScrolled ? 'text-gray-600' : 'text-white/80'} hover:text-black transition-colors`}>Studio</a>
          <a href="#projects" className={`${isScrolled ? 'text-gray-600' : 'text-white/80'} hover:text-black transition-colors`}>Projects</a>
          <a href="#blog" className={`${isScrolled ? 'text-gray-600' : 'text-white/80'} hover:text-black transition-colors`}>Blog</a>
          <a href="#contact" className={`px-5 py-2 border rounded-full text-[10px] uppercase tracking-widest font-black transition-all duration-300 ${isScrolled ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white/40 text-white hover:bg-white hover:text-black'}`}>Contact us</a>
        </div>

        <button 
          className={`md:hidden p-2 rounded-xl transition-all duration-300 relative z-[110] ${isScrolled || mobileMenuOpen ? 'text-black bg-gray-100' : 'text-white bg-white/10'}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0  bg-white z-[100] transition-all duration-500 ease-in-out md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex bg-white/70 backdrop-blur-md flex-col h-auto pt-32 pb-12 px-8 overflow-y-auto">
          <div className="flex flex-col gap-8">
            <a href="#studio" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-black tracking-tighter text-black">Studio</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-black tracking-tighter text-black">Projects</a>
            <a href="#blog" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-black tracking-tighter text-black">Blog</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-5xl font-black tracking-tighter text-black">Contact</a>
          </div>
          
          <div className="mt-auto pt-12">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Watermelon Creative Studio®</p>
            <div className="space-y-1">
              <p className="text-xl font-bold">watermeloncorpui@gmail.com</p>
              <p className="text-xl font-bold text-gray-400">+1 9173397849</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-[100svh] min-h-[500px] flex flex-col justify-end bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80" 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-50 transition-transform duration-[15000ms] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pb-12 sm:pb-24">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-10">
          <div className="flex flex-col max-w-full">
            <span className="text-[10px] sm:text-xs text-gray-400 mb-3 sm:mb-6 tracking-[0.4em] uppercase font-black">EST. 2010 — NYC</span>
            <h1 className="text-huge font-black tracking-tighter animate-in fade-in slide-in-from-bottom-12 duration-1000">
              Watermelon <br/> Studio®
            </h1>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-6 mb-8 lg:mb-16">
            <div className="hidden sm:flex flex-col gap-2">
              <button className="bg-white text-black px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-between w-56 shadow-2xl">
                Start Project <ArrowUpRight size={16} />
              </button>
              <button className="bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-between w-56">
                Our Work <ArrowUpRight size={16} />
              </button>
            </div>
            <p className="max-w-[280px] sm:max-w-[340px] text-xs sm:text-base lg:text-right text-gray-300 leading-relaxed font-medium">
              We're a cutting-edge digital design studio dedicated to crafting bold, immersive brand experiences that define industries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const stats = [
    { label: "Experience", value: "15+" },
    { label: "Completed", value: "100+" },
    { label: "Satisfaction", value: "97%" },
    { label: "Improvement", value: "75%" }
  ];

  return (
    <section id="studio" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
          <div className="lg:w-1/4 w-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#ff3b3b]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Our Studio</span>
            </div>
          </div>
          <div className="lg:w-3/4 w-full">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-gray-900 mb-16 lg:mb-24">
              We blend creativity with precision, transforming ideas <span className="text-gray-300">into impactful brand identities, sleek user interfaces, and standout digital assets.</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="p-8 sm:p-10 border border-gray-100 rounded-[2.5rem] flex flex-col justify-center bg-gray-50/20 hover:bg-white hover:shadow-2xl hover:border-transparent transition-all duration-500 group">
                    <span className="text-4xl sm:text-5xl font-black mb-3 group-hover:scale-105 transition-transform origin-left">{stat.value}</span>
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{stat.label}</span>
                  </div>
                ))}
                <button className="col-span-2 bg-black text-white p-10 rounded-[2.5rem] flex items-center justify-between group hover:shadow-2xl transition-all">
                  <span className="font-black text-xl">Our Story</span>
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </button>
              </div>
              <div className="rounded-[3rem] overflow-hidden aspect-[4/5] sm:aspect-auto mt-6 lg:mt-0">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" alt="Studio" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ScrollingText = () => {
  const phrases = ["Bold Ideas", "Striking Designs", "Precision Pixels", "No Limits", "Watermelon Studio®", "Creative Freedom", "Digital Excellence"];
  
  return (
    <section className="py-24 sm:py-32 border-t border-b border-gray-100 overflow-hidden bg-white">
      <div className="flex flex-col gap-12 sm:gap-20">
        <div className="flex animate-marquee whitespace-nowrap gap-12">
          {[...phrases, ...phrases].map((p, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className={`text-6xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter ${i % 2 === 0 ? 'text-black' : 'text-gray-100'}`}>{p}</span>
              <div className="w-24 sm:w-48 h-14 sm:h-24 rounded-full overflow-hidden bg-gray-100 shrink-0">
                 <img src={`https://picsum.photos/400/200?random=${i+200}`} className="w-full h-full object-cover grayscale opacity-80" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SelectedWork = () => {
  const projects = [
    { title: "Zenith Finance", year: "2024", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" },
    { title: "BoldTech", year: "2024", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" },
    { title: "Velocity Motors", year: "2023", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80" },
    { title: "NovaFit", year: "2024", img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80" },
  ];

  return (
    <section id="projects" className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 lg:mb-24 gap-10">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none">Selected <br/> <span className="text-gray-200">Work.</span></h2>
          <div className="max-w-xs lg:text-right">
            <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">Elevating digital presence through precision design and bold strategy for global brands.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden aspect-[4/3] cursor-pointer bg-gray-50 border border-gray-100">
              <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 flex flex-col justify-end p-8 sm:p-14">
                <div className="flex justify-between items-end">
                   <div>
                     <h3 className="text-white text-3xl sm:text-4xl font-black">{project.title}</h3>
                     <span className="text-white/40 text-[10px] sm:text-xs uppercase tracking-widest font-black mt-3 block">{project.year}</span>
                   </div>
                   <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                     <ArrowUpRight size={24} />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Offerings = () => {
  const services = [
    { id: 1, title: "Branding & Identity", description: "Bold, memorable brand identities that define industries. From iconic logos to comprehensive brand ecosystems.", timeline: "2-4 Weeks", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80" },
    { id: 2, title: "Web Architecture", description: "High-performance digital products combining avant-garde design with robust technological foundations.", timeline: "4-8 Weeks", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80" },
    { id: 3, title: "Experience Design", description: "User-centric journeys that merge functionality with aesthetic pleasure for seamless digital interaction.", timeline: "3-6 Weeks", image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, title: "Visual Arts", description: "Bringing static concepts to life through cinematic motion graphics and high-fidelity visual storytelling.", timeline: "2-4 Weeks", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80" }
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-24 sm:py-32 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 mb-20 lg:mb-32">
          <div className="lg:w-1/2">
             <div className="flex items-center gap-3 mb-10">
              <div className="w-2 h-2 rounded-full bg-[#ff3b3b]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Service Suite</span>
            </div>
            <h2 className="text-6xl sm:text-7xl lg:text-[7rem] font-black tracking-tighter leading-none">Our Core <br/> Skills.</h2>
          </div>
          <div className="lg:w-1/2 flex items-end">
             <p className="max-w-sm text-sm sm:text-lg text-gray-500 leading-relaxed lg:ml-auto lg:text-right">
              Specialized in engineering high-impact digital experiences for the next generation of industry leaders.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col gap-3">
            {services.map((s, idx) => (
              <button 
                key={s.id}
                onClick={() => setActiveTab(idx)}
                className={`p-8 sm:p-12 text-left rounded-[2.5rem] transition-all duration-700 relative overflow-hidden group ${activeTab === idx ? 'bg-white text-black translate-x-4' : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10'}`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-8">
                    <span className="text-[10px] font-black opacity-30">0{idx + 1}</span>
                    <span className="text-xl sm:text-4xl font-black tracking-tighter">{s.title}</span>
                  </div>
                  {activeTab === idx && <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"><ArrowUpRight size={20} /></div>}
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-7 flex flex-col bg-[#111] rounded-[3.5rem] p-10 sm:p-20 border border-white/5 overflow-hidden">
            <div className="flex flex-col gap-12 h-full">
              <div className="space-y-8">
                <h3 className="text-3xl sm:text-5xl font-black tracking-tight">{services[activeTab].title}</h3>
                <p className="text-base sm:text-2xl text-gray-400 leading-relaxed font-medium">{services[activeTab].description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 border-t border-white/10 pt-10">
                  <div>
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-2">Duration</span>
                    <span className="text-xl font-black text-white">{services[activeTab].timeline}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-2">Process</span>
                    <span className="text-xl font-black text-white">Full Iterative</span>
                  </div>
                </div>
              </div>
              <div className="rounded-[2.5rem] overflow-hidden aspect-video bg-gray-900 shadow-2xl">
                <img 
                  key={services[activeTab].image}
                  src={services[activeTab].image} 
                  className="w-full h-full object-cover grayscale opacity-60 animate-in fade-in zoom-in-95 duration-700" 
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  return (
    <section className="py-24 sm:py-32 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
         <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#ff3b3b]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Advantages</span>
            </div>
            <h2 className="text-5xl sm:text-8xl font-black tracking-tighter leading-[0.9]">Why Partner <br/> <span className="text-gray-200">With Us?</span></h2>
          </div>
          <button className="px-10 py-5 bg-white border border-gray-200 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-sm">Start Partnership ↗</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-white rounded-[3rem] p-10 sm:p-14 flex flex-col justify-between shadow-sm border border-gray-100 group">
            <h3 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none mb-14">Avant-Garde <br/> <span className="text-gray-200">Creative.</span></h3>
            <div className="rounded-[2rem] overflow-hidden aspect-[3/4] shadow-xl">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
            </div>
          </div>
          
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[3rem] p-12 flex flex-col justify-between min-h-[260px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500">
                <div className="flex justify-between items-start">
                  <h4 className="font-black text-2xl">Elite Support</h4>
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400"><Clock size={20} /></div>
                </div>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">Global presence allows us to offer 24/7 strategic support for our high-value partners.</p>
              </div>
              <div className="bg-white rounded-[3rem] p-12 flex flex-col justify-between min-h-[260px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500">
                <div className="flex justify-between items-start">
                  <h4 className="font-black text-2xl">Peak Output</h4>
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400"><Zap size={20} /></div>
                </div>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">Infinite creative requests with expedited delivery. We never compromise on industry standards.</p>
              </div>
            </div>

            <div className="bg-white rounded-[3.5rem] overflow-hidden relative min-h-[350px] sm:min-h-[450px] shadow-sm border border-gray-100 group">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-12 sm:p-16 flex flex-col justify-end">
                <h3 className="text-white text-4xl sm:text-6xl font-black tracking-tight leading-[0.95]">Precision Design <br/> Ecosystem.</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    { name: "Starter", price: "$1,999", description: "For startups seeking high-end aesthetic elevation.", features: ["10 Tasks / Month", "Social Media Assets", "2 Round Revisions", "3-5 Day Delivery", "Cancel Anytime"] },
    { name: "Elite", price: billing === 'yearly' ? "$3,499" : "$4,499", description: "For brands requiring consistent world-class output.", features: ["Infinite Requests", "Full UI/UX Systems", "Motion Graphics", "Priority Concierge", "2-3 Day Delivery", "Cancel Anytime"], isPopular: true },
    { name: "Enterprise", price: "$6,999", description: "A complete creative studio integrated into your team.", features: ["Everything in Elite", "Custom Illustrations", "3D Motion Design", "1:1 Strategy Calls", "Next-Day Delivery", "Cancel Anytime"] }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 sm:mb-24">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-2 h-2 rounded-full bg-[#ff3b3b]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Member Access</span>
          </div>
          <h2 className="text-5xl sm:text-8xl font-black tracking-tighter mb-12 leading-none">Creative <br/> <span className="text-gray-100">Capital.</span></h2>

          <div className="inline-flex p-2 bg-gray-100 rounded-full shadow-inner">
            <button onClick={() => setBilling('monthly')} className={`px-10 py-3 rounded-full text-xs font-black transition-all ${billing === 'monthly' ? 'bg-white shadow-lg text-black' : 'text-gray-400 hover:text-black'}`}>Monthly</button>
            <button onClick={() => setBilling('yearly')} className={`px-10 py-3 rounded-full text-xs font-black transition-all ${billing === 'yearly' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}>Yearly</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan, i) => (
            <div key={i} className={`p-10 sm:p-14 rounded-[3.5rem] border flex flex-col h-full transition-all duration-500 relative group ${plan.isPopular ? 'border-black bg-white shadow-[0_40px_100px_rgba(0,0,0,0.1)] lg:scale-[1.05] z-10' : 'border-gray-100 bg-gray-50/30 hover:bg-white hover:border-gray-200'}`}>
              {plan.isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">Premier Selection</div>}
              
              <div className="mb-14">
                <h3 className="text-2xl font-black mb-8">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl sm:text-6xl font-black tracking-tighter">{plan.price}</span>
                  <span className="text-xs text-gray-400 font-bold">/mo</span>
                </div>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">{plan.description}</p>
              </div>

              <button className={`w-full py-7 rounded-[1.5rem] flex items-center justify-between px-10 mb-14 transition-all font-black text-xs uppercase tracking-widest group ${plan.isPopular ? 'bg-black text-white hover:bg-gray-900' : 'bg-white text-black border border-black hover:bg-black hover:text-white'}`}>
                <span>Join Now</span>
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <div className="space-y-5">
                <span className="text-[10px] text-gray-300 font-black uppercase tracking-[0.3em] block mb-8">Service Parameters:</span>
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-5 text-xs sm:text-sm font-bold text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff3b3b] shrink-0"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const feedbacks = [
    { name: "Emma R.", role: "CEO, Zenith", text: "Watermelon transformed our brand ecosystem. The design was avant-garde, functional, and helped us secure our Series B.", rating: 5.0 },
    { name: "James M.", role: "Founder, BoldTech", text: "Professional, creative, and remarkably fast. Our digital product now defines the standard in our industry.", rating: 5.0 },
    { name: "Sophia L.", role: "Director, NovaFit", text: "The attention to detail is obsessive. Their design approach resonated deeply with our premium demographic.", rating: 4.9 },
    { name: "Daniel W.", role: "SaaS Founder", text: "The subscription model is the future. World-class design capital that scales perfectly with our growth.", rating: 4.8 }
  ];

  return (
    <section className="py-24 sm:py-32 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-20 lg:mb-24">
         <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-2 h-2 rounded-full bg-[#ff3b3b]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Client Feedback</span>
          </div>
          <h2 className="text-5xl sm:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">Trusted By <br/> <span className="text-gray-400">Innovators.</span></h2>
      </div>

      <div className="flex gap-8   overflow-x-auto no-scrollbar pb-16 px-6 snap-x">
        {feedbacks.map((f, i) => (
          <div key={i} className="min-w-[320px]  sm:min-w-[500px] p-12 sm:p-16 bg-[#111] border border-white/5 rounded-[4rem] flex flex-col justify-between h-[380px] sm:h-[500px] snap-center hover:border-white/20 transition-all duration-500 group"
          
          >
             <div className="flex gap-1 text-[#ff3b3b] mb-10">
                {Array.from({length: 5}).map((_, star) => <Star key={star} size={16} fill="currentColor" />)}
             </div>
             <p className="text-xl sm:text-3xl font-bold text-gray-200 leading-[1.2] italic mb-10">"{f.text}"</p>
             <div className="flex items-center gap-6 pt-2  border-t border-white/5">
                <div className="w-16 h-16 rounded-full bg-white/5 overflow-hidden border border-white/10">
                  <img src={`https://picsum.photos/200/200?random=${i+500}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="" />
                </div>
                <div>
                   <p className="font-black text-lg">{f.name}</p>
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-1">{f.role}</p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    { title: "Engineering visual identities for the global stage", date: "Mar 20, 2025", category: "Strategy", img: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80" },
    { title: "The architecture of high-performance design ops", date: "Mar 13, 2025", category: "Operations", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" }
  ];

  return (
    <section id="blog" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-10">
          <h2 className="text-5xl sm:text-8xl font-black tracking-tighter leading-[0.9]">News & <br/> <span className="text-gray-200">Insights.</span></h2>
          <button className="px-10 py-5 border border-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all w-fit">Full Journal ↗</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {posts.map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="rounded-[4rem] overflow-hidden aspect-[16/10] mb-10 relative shadow-2xl">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-xl px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-black shadow-lg">
                  {post.category}
                </div>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black mb-6 group-hover:text-[#ff3b3b] transition-colors leading-[1.1]">{post.title}</h3>
              <div className="flex items-center gap-6">
                 <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">{post.date}</span>
                 <div className="h-[1px] w-12 bg-gray-100"></div>
                 <span className="text-[10px] text-black font-black uppercase tracking-[0.3em]">Read Article</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FooterCTA = () => {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-black rounded-[4rem] sm:rounded-[6rem] p-10 lg:p-28 relative overflow-hidden flex flex-col lg:flex-row items-center gap-20 shadow-2xl">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[#ff3b3b]/5 blur-[150px] -z-0"></div>
          <div className="lg:w-3/5 relative z-10 w-full">
            <h2 className="text-huge text-white font-black tracking-tighter mb-14 animate-pulse duration-[3000ms]">Let's Create <br/> Brilliance.</h2>
            <p className="text-lg sm:text-2xl text-gray-400 max-w-xl mb-16 leading-relaxed font-medium">
              Ready to redefine your digital presence? Our team is standing by to turn your vision into a stunning reality.
            </p>
            
            <button className="bg-white text-black px-12 py-8 rounded-[2rem] flex items-center justify-between w-full max-w-md group hover:scale-[1.02] transition-all shadow-2xl">
              <span className="font-black text-2xl">Start Now</span>
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform shadow-lg">
                <ArrowUpRight size={32} />
              </div>
            </button>

            <div className="mt-24 space-y-12">
               <div className="space-y-4">
                 <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Direct Correspondence</p>
                 <a href="mailto:watermeloncorpui@gmail.com" className="text-2xl sm:text-5xl font-black text-white hover:text-[#ff3b3b] transition-colors break-all leading-tight">watermeloncorpui@gmail.com</a>
                 <p className="text-xl sm:text-3xl font-black text-gray-500 mt-4">+1 9173397849</p>
               </div>
               <div className="flex flex-wrap gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
                  <a href="#" className="hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
               </div>
            </div>
          </div>
          <div className="lg:w-2/5 relative z-10 w-full hidden sm:block">
            <div className="rounded-[5rem] overflow-hidden aspect-[4/5] shadow-[0_50px_100px_rgba(0,0,0,0.5)] bg-gray-900 border border-white/5 group">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-32 pb-12 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32 relative z-10">
          <div className="lg:col-span-5">
             <span className="text-6xl font-black tracking-tighter mb-8 block">Watermelon.</span>
             <p className="text-base text-gray-500 font-medium max-w-xs leading-relaxed">
               Crafting high-fidelity digital experiences for brands that dare to redefine their industries. Based in NYC, serving the world.
             </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-16">
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-700">Studio</span>
              <ul className="space-y-4 text-sm font-black uppercase tracking-widest">
                <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Approach</a></li>
                <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Journal</a></li>
                <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-700">Policies</span>
              <ul className="space-y-4 text-sm font-black uppercase tracking-widest">
                <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            <div className="space-y-8 col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-700">Connect</span>
              <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 group focus-within:border-white/20 transition-all">
                <input type="email" placeholder="Email" className="bg-transparent border-none focus:ring-0 px-6 py-4 text-xs grow outline-none font-bold" />
                <button className="bg-white text-black px-8 py-4 rounded-[1rem] text-[10px] font-black uppercase tracking-widest hover:bg-[#ff3b3b] hover:text-white transition-all shadow-xl">Join</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-10 border-t border-white/5 pt-16 relative z-10">
          <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.2em]">© 2025 Watermelon Design Studio. Global Creative Network.</p>
          <div className="flex gap-12">
             <span className="text-[10px] text-gray-700 font-black uppercase tracking-widest">NY 40.7128° N, 74.0060° W</span>
          </div>
        </div>

        <div className="mt-32 pointer-events-none select-none opacity-5">
           <h2 className="text-[15vw] font-black tracking-tighter leading-none whitespace-nowrap translate-y-1/2">WATERMELON DESIGN STUDIO</h2>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [controlsVisible, setControlsVisible] = useState(true);

  useEffect(() => {
    let timeout: any;
    const handleScroll = () => {
      setControlsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setControlsVisible(false), 4000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative selection:bg-[#ff3b3b] selection:text-white pb-safe">
      <Navbar />
      <Hero />
      <AboutSection />
      <ScrollingText />
      <SelectedWork />
      <Offerings />
      <Benefits />
      <Pricing />
      <Testimonials />
      <Blog />
      <FooterCTA />
      <Footer />

      {/* Optimized Floating UI */}
      <div className={`fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[110] flex flex-col gap-4 transition-all duration-700 ${controlsVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}>
         <div className="hidden sm:flex flex-col gap-4">
           <button className="bg-black text-white px-10 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:shadow-[0_40px_100px_rgba(0,0,0,0.4)] transition-all flex items-center justify-between w-64 group">
              Start Partnership <div className="p-1.5 rounded-full bg-[#ff3b3b] text-white transition-colors shadow-sm"><ArrowUpRight size={18} /></div>
           </button>
         </div>
         {/* Mobile Optimized Action */}
         <button className="sm:hidden bg-black text-white px-8 py-5 rounded-[1.5rem] shadow-2xl flex items-center gap-4 font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">
            <Zap size={20} className="text-[#ff3b3b]" fill="currentColor" />
            Let's Talk
         </button>
      </div>
    </div>
  );
}
