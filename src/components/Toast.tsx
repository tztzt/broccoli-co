import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({
  message,
  show,
  onClose,
  duration = 3000,
}: ToastProps) => {
  const root = document.getElementById('root-portal');
  const displayMessage = message ?? 'Unexpected error occured';
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    root &&
    ReactDOM.createPortal(
      <div
        className={`fixed top-0  left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded shadow-md transition-transform duration-200 ${
          show ? 'translate-y-6' : '-translate-y-12'
        } z-50`}
      >
        <div className="flex justify-between items-center">
          <span>{displayMessage}</span>
          <button
            onClick={onClose}
            className="ml-4 text-red-400 hover:text-red-600"
          >
            ✖
          </button>
        </div>
      </div>,
      root,
    )
  );
};
