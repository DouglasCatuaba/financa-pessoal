import React from 'react';

interface TagProps {
  children: React.ReactNode;
  colour?: 'primary' | 'success' | 'warning' | 'danger';
}

/**
 * Small coloured label component. Used to annotate items with their
 * category or status. Colour maps to the theme palette.
 */
const Tag: React.FC<TagProps> = ({ children, colour = 'primary' }) => {
  const colourMap: Record<string, string> = {
    primary: 'bg-primary text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    danger: 'bg-danger text-white',
  };
  return (
    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${colourMap[colour]}`}>
      {children}
    </span>
  );
};

export default Tag;