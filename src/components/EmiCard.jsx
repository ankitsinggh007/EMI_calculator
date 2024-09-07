import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { currencyFormatter } from "./util";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmiCard = ({
  Monthly_emi,
  principal_amt,
  total_intrest,
  total_amount,
}) => {
  const data = {
    labels: ["Principal Amount", "Interest Amount"],
    datasets: [
      {
        data: [principal_amt, total_intrest],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${currencyFormatter.format(value)}`;
          },
        },
      },
    },
  };

  return (
    <div className="  lg:w-1/2 flex flex-col place-items-center">
      <div className="w-full max-w-md mx-auto">
        <Pie data={data} options={options} />
      </div>
      <div className="bg-green-100 p-4 mt-5 w-[90%]">
        <div className="mb-2 flex justify-between">
          <span>Monthly EMI</span>
          <span>{currencyFormatter.format(Monthly_emi)}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>Principal amount</span>
          <span>{currencyFormatter.format(principal_amt)}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>Total interest</span>
          <span>{currencyFormatter.format(total_intrest)}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>Total amount</span>
          <span>{currencyFormatter.format(total_amount)}</span>
        </div>
      </div>
    </div>
  );
};

export default EmiCard;
