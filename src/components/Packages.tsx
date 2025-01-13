import React from "react";

const Packages = () => {
  const sipPlans = [
    {
      investment: 1000,
      period: "1 Year",
      roi: "12%",
      interest: 1440,
      maturity: 13440,
    },
    {
      investment: 2000,
      period: "1 Year",
      roi: "12%",
      interest: 2880,
      maturity: 26880,
    },
    {
      investment: 3000,
      period: "1 Year",
      roi: "12%",
      interest: 4320,
      maturity: 40320,
    },
    {
      investment: 4000,
      period: "1 Year",
      roi: "12%",
      interest: 5760,
      maturity: 53760,
    },
    {
      investment: 5000,
      period: "1 Year",
      roi: "12%",
      interest: 7200,
      maturity: 67200,
    },
  ];

  const oneTimePlans = [
    {
      principal: 50000,
      period: "1 Year",
      roi: "14%",
      interest: 7000,
      final: 57000,
    },
    {
      principal: 50000,
      period: "3 Year",
      roi: "33%",
      interest: 16500,
      final: 66500,
    },
    {
      principal: 100000,
      period: "1 Year",
      roi: "14%",
      interest: 14000,
      final: 114000,
    },
    {
      principal: 100000,
      period: "3 Year",
      roi: "33%",
      interest: 33000,
      final: 133000,
    },
    {
      principal: 500000,
      period: "1 Year",
      roi: "14%",
      interest: 70000,
      final: 570000,
    },
    {
      principal: 500000,
      period: "3 Year",
      roi: "33%",
      interest: 165000,
      final: 665000,
    },
  ];

  return (
    <section id="packages" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Investment Packages
        </h2>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">SIP Plans</h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Monthly Investment</th>
                  <th className="py-3 px-4 text-left">Time Period</th>
                  <th className="py-3 px-4 text-left">ROI %</th>
                  <th className="py-3 px-4 text-left">Interest Earned</th>
                  <th className="py-3 px-4 text-left">Maturity Amount</th>
                </tr>
              </thead>
              <tbody>
                {sipPlans.map((plan, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-2 px-4">
                      ₹{plan.investment.toLocaleString()}
                    </td>
                    <td className="py-2 px-4">{plan.period}</td>
                    <td className="py-2 px-4">{plan.roi}</td>
                    <td className="py-2 px-4">
                      ₹{plan.interest.toLocaleString()}
                    </td>
                    <td className="py-2 px-4">
                      ₹{plan.maturity.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">One Time Investment Plans</h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Principal Amount</th>
                  <th className="py-3 px-4 text-left">Time Period</th>
                  <th className="py-3 px-4 text-left">ROI %</th>
                  <th className="py-3 px-4 text-left">Interest Earned</th>
                  <th className="py-3 px-4 text-left">Final Amount</th>
                </tr>
              </thead>
              <tbody>
                {oneTimePlans.map((plan, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-2 px-4">
                      ₹{plan.principal.toLocaleString()}
                    </td>
                    <td className="py-2 px-4">{plan.period}</td>
                    <td className="py-2 px-4">{plan.roi}</td>
                    <td className="py-2 px-4">
                      ₹{plan.interest.toLocaleString()}
                    </td>
                    <td className="py-2 px-4">
                      ₹{plan.final.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
