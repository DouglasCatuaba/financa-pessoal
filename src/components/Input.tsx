import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * Simple labelled input component. Provides basic styling and forwards
 * attributes to the input element. The label is optional.
 */
const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        className={`border rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;