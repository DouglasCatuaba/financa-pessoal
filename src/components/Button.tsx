import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger';
}

/**
 * Reusable button component. Variants map to theme colours defined in
 * Tailwind. Additional props are forwarded to the underlying button
 * element.
 */
const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const base = 'px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants: Record<string, string> = {
    primary: 'bg-primary text-white hover:bg-blue-700',
    success: 'bg-success text-white hover:bg-green-700',
    warning: 'bg-warning text-white hover:bg-yellow-600',
    danger: 'bg-danger text-white hover:bg-red-700',
  };
  const variantClasses = variants[variant];
  return (
    <button className={`${base} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;