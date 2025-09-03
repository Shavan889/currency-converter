import React, { useId } from 'react';

const InputBox = ({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOption = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) => {
  const amountInputId = useId();

  return (
    <div className={`bg-white/80 p-4 rounded-xl shadow-sm flex items-center justify-between ${className}`}>
      {/* Amount Input */}
      <div className="w-1/2 pr-3">
        <label htmlFor={amountInputId} className="text-gray-500 text-sm font-medium block mb-1">
          {label}
        </label>
        <input
          id={amountInputId}
          className="w-full border rounded-lg px-3 py-2 outline-none text-gray-700 focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
      </div>

      {/* Currency Select */}
      <div className="w-1/2 text-right">
        <p className="text-gray-500 text-sm font-medium mb-1">Currency</p>
        <select
          className="w-full rounded-lg px-3 py-2 bg-gray-100 text-gray-700 cursor-pointer outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-200"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOption.map((currency) => (
            <option value={currency} key={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputBox;
