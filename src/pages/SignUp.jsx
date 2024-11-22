import React, { useState } from 'react';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import Footer from '../components/footer/Footer';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
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

  const onAuthSuccess = (isNewUser) => {
    console.log(isNewUser ? 'User signed up successfully' : 'User logged in successfully');
    // Add any additional logic you want to execute on successful authentication
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
                onClick={() => navigate('/contact-us')}
                className={`relative px-4 py-2 text-white transition-all duration-300 ease-in-out cursor-pointer `}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col justify-between min-h-screen bg-blue-900 bg-opacity-80 backdrop-blur-md pt-20">
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <SignUpForm onAuthSuccess={onAuthSuccess} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SignUp; 