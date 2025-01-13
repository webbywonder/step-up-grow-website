import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Packages from "./components/Packages";
import Calculator from "./components/Calculator";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <About />
      <Services />
      <Packages />
      <Calculator />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default App;
