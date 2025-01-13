import React from "react";

const Hero = () => {
  return (
    <section id="home" className="bg-blue-500 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Invest With Confidence, Grow With Purpose
        </h2>
        <p className="text-xl mb-8">
          Empower your financial future with Step Up Grow
        </p>
        <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
