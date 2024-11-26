import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactUs from '../components/ContactUs/ContactUs';
import Footer from '../components/footer/Footer';

const ContactPage = () => {
  const [activeSection] = useState('contact');
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#010009]">
      {/* Glassmorphism Navbar */}
      <nav className="fixed w-full top-0 backdrop-blur-md bg-black/30 shadow-lg z-50 transition-all duration-300 hover:bg-black/50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <img src="images/logowhite.png" alt="Logo" className="h-12" onClick={() => handleNavigation('home')} style={{cursor: 'pointer'}} />
            <div className="flex items-center gap-8">
              {['home', 'about', 'services'].map((section) => (
                <a 
                  key={section}
                  onClick={() => handleNavigation(section)}
                  className={`relative px-4 py-2 text-white transition-all duration-300 ease-in-out cursor-pointer hover:text-blue-400`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
              <a 
                onClick={() => navigate('/contact')}
                className={`relative px-4 py-2 text-white transition-all duration-300 ease-in-out cursor-pointer ${
                  activeSection === 'contact' ? 'text-blue-400 bg-blue-400 rounded-l-full rounded-r-full' : 'hover:text-blue-400'
                }`}
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

      {/* Add padding top to account for fixed navbar */}
      <div className="pt-20">
        <ContactUs />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
