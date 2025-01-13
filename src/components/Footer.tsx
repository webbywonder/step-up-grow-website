import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Step Up Grow</h3>
            <p className="mb-4">
              Empowering your financial future through strategic investments.
            </p>
            <p>UDYAM-MH-33-0506992</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul>
              <li>
                <a href="#home" className="hover:text-blue-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-200">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-200">
                  Services
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-blue-200">
                  Packages
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-4">Contact Information</h4>
            <p>Room no 1 Varatak Lane</p>
            <p>Penkarpada Mira Road (E) Thane</p>
            <p>401107</p>
            <p>Email: stepupgrow1@gmail.com</p>
            <p>Phone: 9321593269</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-200">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-500 mt-8 pt-8 text-center">
          <p>&copy; 2023 Step Up Grow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
