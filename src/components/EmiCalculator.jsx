import React, { useState } from "react";
import EmiForm from "./EmiForm";
import EmiCard from "./EmiCard";
import EmiTable from "./EmiTable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useTheme } from "./ThemeContext";
import { FaFilePdf } from "react-icons/fa";

const EmiCalculator = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  // Conditional class names for light and dark modes
  const containerClass = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-black";
  const cardClass = isDarkMode ? "bg-gray-800" : "bg-white ";
  const buttonClass = isDarkMode
    ? "bg-red-600 hover:bg-red-700"
    : "bg-red-500 hover:bg-red-600 ";

  const [calculatedData, setCalculatedData] = useState({});

  const handleCalculate = (results) => {
    setCalculatedData(results);
  };

  const generatePdf = () => {
    const doc = new jsPDF();

    doc.text("EMI Calculation Report", 10, 10);
    const tableData = (calculatedData.monthWiseBreakup || []).map((detail) => [
      detail.month,
      detail.emi,
      detail.interestPaid,
      detail.principalPaid,
      detail.remainingBalance,
    ]);
    doc.autoTable({
      startY: 20,
      head: [
        [
          "Month",
          "EMI Paid",
          "Interest Paid",
          "Principal Paid",
          "Remaining Balance",
        ],
      ],
      body: tableData,
    });

    doc.save("emi_calculation_report.pdf");
  };

  return (
    <div>
      <span>EMI Calculator</span>
      <button
        className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
        onClick={toggleTheme}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div
        className={`flex flex-col md:flex-row ${cardClass} border-black justify-between`}
      >
        <EmiForm onCalculate={handleCalculate} />
        <EmiCard
          Monthly_emi={calculatedData.emi}
          principal_amt={calculatedData.principalAmount}
          total_intrest={calculatedData.totalInterest}
          total_amount={calculatedData.totalAmount}
        />
      </div>

      {/* Button to generate PDF */}
      <div className="flex justify-end p-4">
        <button
          className="bg-red-500 text-white rounded p-2 hover:bg-red-600 flex items-center"
          onClick={generatePdf}
        >
          <FaFilePdf className="inline mr-2" />
          Download PDF
        </button>
      </div>

      <EmiTable paymentDetails={calculatedData.monthWiseBreakup || []} />
    </div>
  );
};

export default EmiCalculator;
