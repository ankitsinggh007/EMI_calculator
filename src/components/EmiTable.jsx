import React from "react";
import { currencyFormatter } from "./util";

const EmiTable = ({ paymentDetails }) => {
  console.log(paymentDetails, "sd");
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border text-center">Month</th>
            <th className="px-4 py-2 border text-center">EMI Paid</th>
            <th className="px-4 py-2 border text-center">Interest Paid</th>
            <th className="px-4 py-2 border text-center">Principal Paid</th>
            <th className="px-4 py-2 border text-center">Remaining Balance</th>
          </tr>
        </thead>
        <tbody>
          {paymentDetails.map((detail, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border text-center">{detail.month}</td>
              <td className="px-4 py-2 border text-center">
                {currencyFormatter.format(detail.emi)}
              </td>
              <td className="px-4 py-2 border text-center">
                {currencyFormatter.format(detail.interestPaid)}
              </td>
              <td className="px-4 py-2 border text-center">
                {currencyFormatter.format(detail.principalPaid)}
              </td>
              <td className="px-4 py-2 border text-center">
                {currencyFormatter.format(detail.remainingBalance)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmiTable;
