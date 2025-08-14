import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  colour?: 'primary' | 'success' | 'warning' | 'danger';
}

/**
 * Horizontal progress bar component. Accepts a value and max and
 * calculates the width accordingly. Colour maps to the theme palette.
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, colour = 'primary' }) => {
  const percentage = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  const colourMap: Record<string, string> = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
  };
  return (
    <div className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
      <div
        className={`h-full ${colourMap[colour]}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;