import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import icon from '../assets/close.svg';
import { IconButton } from './IconButton';

export interface ToastProps {
  // The message to be displayed inside the toast.
  message: string;
  // Determines whether the toast is visible.
  visible: boolean;
  // Callback function invoked when the toast is dismissed.
  onClose: () => void;
  /* The time in milliseconds before the toast automatically hides.
   * Defaults to 3000ms if not specified.
   */
  duration?: number;
}

/**
 * A Toast component for displaying brief, non-intrusive messages to the user.
 * It can automatically disappear after a specified duration or be manually dismissed by the user.
 * The toast is displayed at the top of the screen and includes a close button to manually dismiss it.
 * The visibility of the toast is controlled via the `visible` prop, and the `duration` prop
 * determines how long the toast stays visible before automatically hiding (defaults to 3000ms).
 *
 * The component includes a smooth fade-in and fade-out animation during its visibility transition.
 * The `onClose` callback is invoked either when the toast is automatically dismissed after the duration
 * or when the user manually dismisses it by clicking the close button.
 *
 * @returns {JSX.Element | null} Returns the toast JSX element if `visible` is true, or `null` if `visible` is false,
 * effectively hiding the toast when not needed.
 */
export const Toast = ({
  message,
  visible,
  onClose,
  duration = 3000,
}: ToastProps) => {
  const root = document.getElementById('root-portal');
  const displayMessage = message || 'An unexpected error occured';

  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (visible) {
      setShouldRender(true); // Start rendering the toast
      const timer = setTimeout(() => setIsAnimating(true), 100); // Delay animate
      return () => clearTimeout(timer); // Cleanup timer
    } else {
      setIsAnimating(false); // Begin animation (fade-out)
      const timer = setTimeout(() => setShouldRender(false), 300); // Delay unmount
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [duration, onClose, visible]);

  /**
   * Hide the toast a fixed period of time after notifying the user
   */
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => onClose(), duration); // Delay unmount
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [duration, onClose, visible]);

  if (!shouldRender || !root) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed top-0 left-1/2 
        flex justify-between items-center gap-4 transform -translate-x-1/2 bg-white py-2 px-4 rounded shadow-md transition-transform duration-200 ${
          isAnimating
            ? 'opacity-100 -translate-y-0'
            : 'opacity-70 -translate-y-12'
        } z-50`}
    >
      <span>{displayMessage}</span>
      <IconButton onClick={onClose}>
        <img src={icon} alt="Close" />
      </IconButton>
    </div>,
    root,
  );
};
