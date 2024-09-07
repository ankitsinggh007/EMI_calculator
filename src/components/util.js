export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  currencyDisplay: "symbol",
});

export const calculateEmi = (
  loanAmount,
  annualInterestRate,
  tenureYears,
  extraEmi = 0,
  prepayment = 0
) => {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  // EMI Calculation using the formula
  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  let remainingBalance = loanAmount;
  let totalInterestPaid = 0;
  const monthWiseBreakup = [];

  for (let month = 1; month <= totalMonths; month++) {
    const interestForMonth = remainingBalance * monthlyInterestRate;
    let principalForMonth = emi - interestForMonth;

    // Apply extra EMI if applicable
    if (extraEmi > 0) {
      principalForMonth += extraEmi;
    }

    // Apply prepayment if applicable
    if (prepayment > 0 && month === 1) {
      remainingBalance -= prepayment; // Deduct prepayment in the first month
    }

    remainingBalance -= principalForMonth;

    if (remainingBalance < 0) remainingBalance = 0; // To avoid negative balance

    totalInterestPaid += interestForMonth;

    // Save month-wise details
    monthWiseBreakup.push({
      month,
      emi: emi.toFixed(2),
      interestPaid: interestForMonth.toFixed(2),
      principalPaid: principalForMonth.toFixed(2),
      remainingBalance: remainingBalance.toFixed(2),
    });

    // Stop further calculations if the loan is fully repaid
    if (remainingBalance <= 0) break;
  }

  const totalAmount = emi * totalMonths - prepayment - extraEmi * totalMonths;
  const totalInterest = totalInterestPaid.toFixed(2);

  return {
    emi: emi.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    totalInterest: totalInterest,
    principalAmount: loanAmount.toFixed(2),
    monthWiseBreakup,
  };
};
