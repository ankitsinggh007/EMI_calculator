import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { currencyFormatter, calculateEmi } from "./util";

const EmiForm = ({ onCalculate }) => {
  const classForLabel =
    "text-lg font-light text-gray-600 mb-6 block bg-green-100 ";

  const [inputForm, setInputForm] = useState({
    loan_amt: 1000,
    intrest_rate: 4,
    extra_emi: 0,
    month: 0,
    year: 1,
    prepayment: 0,
  });

  const onChangeHandler = (e, type) => {
    setInputForm({
      ...inputForm,
      [type]: +e.target.value,
    });
  };

  useEffect(() => {
    const { loan_amt, intrest_rate, year, month, prepayment } = inputForm;
    const tenureYears = year + month / 12;
    const results = calculateEmi(
      loan_amt,
      intrest_rate,
      tenureYears,
      inputForm.extra_emi,
      prepayment
    );
    onCalculate(results);
  }, [inputForm]);

  return (
    <div className=" p-10">
      <form className="form-horizontal">
        <span className="text-2xl font-semibold text-gray-600 block">
          Get Started With Digital EMI Card Experience
        </span>
        <span className="text-xs font-light text-gray-500">
          Apply for EMI Card in minutes
        </span>
        <div className="p-5 flex flex-col justify-between">
          <div className="flex justify-between">
            <Form.Label className={classForLabel}>Loan Amount</Form.Label>
            <span className={classForLabel}>
              {currencyFormatter.format(inputForm.loan_amt)}
            </span>
          </div>
          <Form.Range
            id="rangeInput"
            min={1000}
            max={11000000}
            step={5000}
            value={inputForm.loan_amt}
            onChange={(e) => onChangeHandler(e, "loan_amt")}
            className="custom-range width-full"
          />
        </div>
        <div className="p-5 flex flex-col justify-between">
          <div className="flex justify-between">
            <Form.Label className={classForLabel}>
              Interest Rate (annual)
            </Form.Label>
            <span className={classForLabel}>
              {`${inputForm.intrest_rate} %`}
            </span>
          </div>
          <Form.Range
            id="rangeInput"
            min={4}
            max={50}
            step={1}
            value={inputForm.intrest_rate}
            onChange={(e) => onChangeHandler(e, "intrest_rate")}
            className="custom-range width-full"
          />
        </div>
        <div className="p-5 flex flex-col justify-between">
          <Form.Label className={classForLabel}>Loan Tenure</Form.Label>
          <div className="flex justify-between">
            <Form.Label className={classForLabel}>Years</Form.Label>
            <span className={classForLabel}>{`${inputForm?.year} Yr`}</span>
          </div>
          <Form.Range
            id="rangeInput"
            min={1}
            max={20}
            step={1}
            value={inputForm.year}
            onChange={(e) => onChangeHandler(e, "year")}
            className="custom-range width-full"
          />
          <br />
          <div className="flex justify-between">
            <Form.Label className={classForLabel}>Months</Form.Label>
            <span className={classForLabel}>{`${inputForm?.month} Mn`}</span>
          </div>
          <Form.Range
            id="rangeInput"
            min={0}
            max={12}
            step={1}
            value={inputForm.month}
            onChange={(e) => onChangeHandler(e, "month")}
            className="custom-range width-full"
          />
        </div>
        <div className="p-5 flex flex-col justify-between">
          <div className="flex justify-between">
            <Form.Label className={classForLabel}>Prepayment</Form.Label>
            <span className={classForLabel}>{`${currencyFormatter.format(
              inputForm?.prepayment
            )}`}</span>
          </div>
          <Form.Range
            id="rangeInput"
            min={0}
            max={inputForm?.loan_amt}
            step={1000}
            disabled={!inputForm.loan_amt}
            value={inputForm.prepayment}
            onChange={(e) => onChangeHandler(e, "prepayment")}
            className="custom-range width-full"
          />
        </div>
      </form>
    </div>
  );
};

export default EmiForm;
