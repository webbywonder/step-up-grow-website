import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Step Up Grow</h1>
        <nav>
          <ul className="flex space-x-4">
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
