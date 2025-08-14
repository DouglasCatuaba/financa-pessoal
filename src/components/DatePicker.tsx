import React from 'react';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * Simple date picker component using the native HTML date input. A label
 * may be supplied for accessibility.
 */
const DatePicker: React.FC<DatePickerProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type="date"
        className={`border rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600 ${className}`}
        {...props}
      />
    </div>
  );
};

export default DatePicker;