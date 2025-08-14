import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Generic card component. Provides a padded container with rounded
 * corners and subtle shadows. Accepts additional class names.
 */
const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-md shadow p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;