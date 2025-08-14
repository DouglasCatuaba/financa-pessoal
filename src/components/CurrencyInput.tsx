import React from 'react';

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  /**
   * Current value in centavos. Internally, the input displays the value as
   * a decimal number (e.g. 12345 -> 123.45). When the user edits the
   * field, onValueChange is called with the updated centavos amount.
   */
  value: number;
  onValueChange: (cents: number) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, value, onValueChange, className = '', ...props }) => {
  // Convert cents to decimal for display
  const display = (value / 100).toString();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Replace comma with dot for decimal separation, then parse
    const normalized = newValue.replace(',', '.');
    const parsed = parseFloat(normalized);
    if (!isNaN(parsed)) {
      onValueChange(Math.round(parsed * 100));
    } else {
      onValueChange(0);
    }
  };
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type="number"
        step="0.01"
        className={`border rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600 ${className}`}
        value={display}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default CurrencyInput;