import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';

const PublicPage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#010009]">
      {/* Hero Section with Overlaid Navbar */}
      <section 
        id="home" 
        className="relative min-h-screen bg-[#1a1a1a]"
      >
        <div className="absolute inset-0 bg-black/100"></div>
        
        {/* Glassmorphism Navbar overlaid on hero */}
        <nav className="fixed w-full top-0 backdrop-blur-md bg-black/30 shadow-lg z-50 transition-all duration-300 hover:bg-black/50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <img src="images/logowhite.png" alt="Logo" className="h-12" />
              <div className="flex items-center gap-8">
                {['home', 'about', 'services'].map((section) => (
                  <a 
                    key={section}
                    href={`#${section}`} 
                    className={`relative px-4 py-2 text-white transition-all duration-300 ease-in-out ${
                      activeSection === section ? 'text-blue-400 bg-white rounded-l-full rounded-r-full' : 'hover:text-blue-400'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                ))}
                <a 
                  onClick={() => navigate('/contact-us')}
                  className={`relative px-4 py-2 text-white transition-all duration-300 ease-in-out cursor-pointer hover:text-blue-400`}
                >
                  Contact
                </a>
                <a href="/sign-up" className="px-6 py-2 border-2 border-white text-white rounded-full hover:bg-white/10 transition">
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 gap-8">
            <div className="text-left">
              <h1 className="text-7xl font-bold text-white leading-tight mb-8">
                Smart Battery <br/>
                <span className="text-blue-400">Management System</span>
              </h1>
              <p className="text-2xl text-gray-200 mb-12">
                Revolutionize your energy management with cutting-edge battery monitoring and optimization solutions.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/sign-up')}
                  className="px-10 py-4 bg-transparent border-2 border-blue-600 text-blue-400 text-lg rounded-full hover:bg-blue-400/10 transition shadow-lg"
                >
                  Get Started
                </button>
         
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <img 
                src="images/nobgbattery1.gif" 
                alt="Battery Animation"
                className="absolute right-0 max-w-2xl w-full object-contain z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-10 bg-[#010009] text-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Our Mission</h3>
              <p className="text-gray-300">
                We strive to revolutionize battery management through innovative solutions that enhance efficiency and sustainability.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Our Vision</h3>
              <p className="text-gray-300">
                To be the global leader in smart battery management solutions, driving the future of energy optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#010009] text-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-3 gap-8">
            {['Battery Monitoring', 'Performance Analytics', 'Predictive Maintenance'].map((service) => (
              <div key={service} className="bg-[#010009] p-6 rounded-xl shadow-lg border-2 border-gradient-to-r from-yellow-500 to-yellow-600">
                <h3 className="text-xl font-semibold mb-4">{service}</h3>
                <p className="text-gray-300">
                  Comprehensive solutions for optimal battery performance and longevity.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-10 bg-[#010009] text-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-[#010009] p-6 rounded-xl shadow-lg border-2 border-gradient-to-r from-yellow-500 to-yellow-600">
              <p className="text-lg italic mb-4">"This system has transformed our energy management process. Highly recommend!"</p>
              <p className="text-right font-semibold">- Alex Johnson</p>
            </div>
            <div className="bg-[#010009] p-6 rounded-xl shadow-lg border-2 border-gradient-to-r from-yellow-500 to-yellow-600">
              <p className="text-lg italic mb-4">"Incredible insights and analytics. A must-have for any business."</p>
              <p className="text-right font-semibold">- Emily Davis</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PublicPage;