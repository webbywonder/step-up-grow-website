import React, { useState } from "react";

const Calculator = () => {
  const [investmentType, setInvestmentType] = useState("sip");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [roi, setRoi] = useState("");
  const [result, setResult] = useState(null);

  const calculateReturn = () => {
    const principal = parseFloat(amount);
    const years = parseFloat(period);
    const rate = parseFloat(roi) / 100;

    if (investmentType === "sip") {
      const monthlyRate = rate / 12;
      const months = years * 12;
      const totalAmount =
        principal *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
      const totalInvestment = principal * months;
      const interestEarned = totalAmount - totalInvestment;

      setResult({
        totalAmount: totalAmount.toFixed(2),
        totalInvestment: totalInvestment.toFixed(2),
        interestEarned: interestEarned.toFixed(2),
      });
    } else {
      const totalAmount = principal * Math.pow(1 + rate, years);
      const interestEarned = totalAmount - principal;

      setResult({
        totalAmount: totalAmount.toFixed(2),
        totalInvestment: principal.toFixed(2),
        interestEarned: interestEarned.toFixed(2),
      });
    }
  };

  return (
    <section id="calculator" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Investment Calculator
        </h2>
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Investment Type
            </label>
            <div className="flex">
              <button
                className={`flex-1 py-2 px-4 ${
                  investmentType === "sip"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setInvestmentType("sip")}
              >
                SIP
              </button>
              <button
                className={`flex-1 py-2 px-4 ${
                  investmentType === "lumpsum"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setInvestmentType("lumpsum")}
              >
                Lump Sum
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amount"
            >
              {investmentType === "sip"
                ? "Monthly Investment"
                : "Principal Amount"}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="period"
            >
              Investment Period (Years)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="period"
              type="number"
              placeholder="Enter period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="roi"
            >
              Expected Return (% per annum)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="roi"
              type="number"
              placeholder="Enter expected return"
              value={roi}
              onChange={(e) => setRoi(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={calculateReturn}
            >
              Calculate
            </button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-gray-100 rounded">
              <h3 className="text-lg font-bold mb-2">Results:</h3>
              <p>Total Investment: ₹{result.totalInvestment}</p>
              <p>Total Returns: ₹{result.totalAmount}</p>
              <p>Interest Earned: ₹{result.interestEarned}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Calculator;
