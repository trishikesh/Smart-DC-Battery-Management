import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";

const PublicPage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "contact"];

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#010009]">
      {/* Hero Section with Overlaid Navbar */}
      <section id="home" className="relative min-h-screen bg-[#1a1a1a]">
        <div className="absolute inset-0 bg-black/100"></div>

        {/* Glassmorphism Navbar overlaid on hero */}
        <nav className="fixed w-full top-0 backdrop-blur-md bg-black/30 shadow-lg z-50 transition-all duration-300 hover:bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <img
                src="images/logowhite.png"
                alt="Logo"
                className="h-10 sm:h-12 mb-4 sm:mb-0"
              />
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
                {["home", "about", "services"].map((section) => (
                  <a
                    key={section}
                    href={`#${section}`}
                    className={`relative px-3 sm:px-4 py-2 text-sm sm:text-base transition-all duration-300 ease-in-out ${
                      activeSection === section
                        ? "text-blue-600 bg-white rounded-l-full rounded-r-full"
                        : "text-white hover:text-blue-400"
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                ))}
                <a
                  onClick={() => navigate("/contact-us")}
                  className="relative px-3 sm:px-4 py-2 text-sm sm:text-base text-white transition-all duration-300 ease-in-out cursor-pointer hover:text-blue-400"
                >
                  Contact
                </a>
                <a
                  href="/sign-up"
                  className="px-4 sm:px-6 py-2 border-2 border-white text-white text-sm sm:text-base rounded-full hover:bg-white/10 transition"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative flex items-center min-h-screen px-4 sm:px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8">
                  Smart Battery <br />
                  <span className="text-blue-400">Management System</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-200 mb-8 sm:mb-12">
                  Revolutionize your energy management with cutting-edge battery
                  monitoring and optimization solutions.
                </p>
                <div className="flex justify-center lg:justify-start gap-4">
                  <button
                    onClick={() => navigate("/sign-up")}
                    className="px-6 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-blue-600 text-blue-400 text-base sm:text-lg rounded-full hover:bg-blue-400/10 transition shadow-lg"
                  >
                    Get Started
                  </button>
                </div>
              </div>
              <div className="relative flex items-center justify-center mt-8 lg:mt-0">
                <img
                  src="images/nobgbattery1.gif"
                  alt="Battery Animation"
                  className="w-full max-w-lg lg:max-w-2xl object-contain z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-[#010009] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            ABOUT US
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-[40%] h-[200px] bg-[#1a1a1a] rounded-xl  overflow-hidden">
              <img
                src="images/mission-image.jpg"
                alt="About Us"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-[60%] backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-lg border border-blue-400">
              <h3 className="text-2xl font-semibold mb-6">Our Story</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                We are dedicated to revolutionizing battery management through innovative solutions. 
                Our mission is to enhance efficiency and sustainability in energy systems, 
                driving the future of smart battery technology. With cutting-edge monitoring 
                and optimization capabilities, we're helping businesses achieve better 
                performance and reliability in their energy management systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-[#010009] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                title: "Battery Monitoring",
                description:
                  "Real-time monitoring and analysis of battery health and performance metrics.",
                color: "bg-blue-400",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
              },
              {
                title: "Performance Analytics",
                description:
                  "Advanced analytics and insights to optimize battery efficiency and usage patterns.",
                color: "bg-purple-600",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              },
              {
                title: "Predictive Maintenance",
                description:
                  "Predictive maintenance to prevent battery failures and extend battery life.",
                color: "bg-blue-600",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full ${service.color} flex items-center justify-center mb-6`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 sm:h-16 sm:w-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={service.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-16 sm:py-20 bg-[#010009] text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Chen",
                role: "Energy Manager",
                quote:
                  "The battery monitoring system has revolutionized our energy management. Exceptional results!",
              },
              {
                name: "Michael Torres",
                role: "Technical Director",
                quote:
                  "Real-time analytics have helped us optimize our battery performance significantly.",
              },
              {
                name: "Emma Wilson",
                role: "Operations Manager",
                quote:
                  "The predictive maintenance features have saved us from multiple potential failures.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] p-6 sm:p-8 rounded-xl shadow-lg border border-blue-400"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={`images/avatar${index + 1}.jpg`}
                    alt="Avatar"
                    className="w-16 h-16 rounded-full mb-4"
                  />
                  <p className="text-base sm:text-lg italic mb-4 text-center">
                    {testimonial.quote}
                  </p>
                  <p className="font-semibold text-blue-400">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PublicPage;
