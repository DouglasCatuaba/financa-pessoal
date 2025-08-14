import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  duration?: number;
}

/**
 * Lightweight toast component. Displays a temporary notification on top of
 * the interface. It automatically disappears after a specified duration.
 */
const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);
  const colourMap: Record<string, string> = {
    success: 'bg-success',
    error: 'bg-danger',
    info: 'bg-primary',
    warning: 'bg-warning',
  };
  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow text-white ${colourMap[type]}`}>
      {message}
    </div>
  );
};

export default Toast;