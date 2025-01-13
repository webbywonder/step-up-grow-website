import React from "react";

const Services = () => {
  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-4">
              Expert Investment Strategies
            </h3>
            <p>
              We leverage our expertise to maximize your returns and achieve
              your financial goals.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-4">Principal Growth</h3>
            <p>
              We ensure your principal amount grows steadily while minimizing
              risk.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-4">Hassle-Free Experience</h3>
            <p>
              Enjoy a smooth investment journey with minimal fees and charges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
