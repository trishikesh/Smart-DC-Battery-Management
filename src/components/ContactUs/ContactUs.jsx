import React from 'react';

const ContactUs = () => {
  return (
    <section id="contact" className="py-8 bg-[#010007] text-white">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center bg-[#110026] p-8 rounded-lg shadow-lg">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img 
              src="https://imgur.com/dUU1TYe.png" 
              alt="Contact Us"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold mb-6">
              Fill the form to <span className="text-blue-400">contact us.</span>
            </h2>
            <form className="space-y-4">
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-1/2 p-3 rounded border border-gray-600 bg-[#110026] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-1/2 p-3 rounded border border-gray-600 bg-[#110026] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <input 
                type="email" 
                placeholder="E-mail" 
                className="w-full p-3 rounded border border-gray-600 bg-[#110026] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea 
                placeholder="How can we help you? Describe here your problem" 
                rows="4" 
                className="w-full p-3 rounded border border-gray-600 bg-[#110026] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
              <button 
                className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;