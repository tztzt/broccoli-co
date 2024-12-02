import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import icon from '../assets/close.svg';
import { IconButton } from './IconButton';

interface ModalProps {
  // The title text displayed in the modal header
  title: string;
  // Determines whether the modal is visible or hidden.
  visible: boolean;
  // Callback function invoked when the modal is closed.
  onClose?: () => void;
  // The content to be displayed in the modal body.
  content: string | React.ReactElement;
}

/**
 * A reusable modal component that displays a popup dialog with a title, content,
 * and an optional close button. The modal's visibility is controlled via the `visible` prop.
 * The modal also includes smooth fade-in and fade-out animations during visibility changes.
 *
 * When the modal becomes visible, the body overflow is set to 'hidden' to prevent scrolling,
 * and it is restored to 'auto' when the modal is hidden.
 *
 * The modal is rendered using React Portals to ensure it is rendered outside the root DOM hierarchy,
 * and it supports animation for smooth transitions.
 *
 * @returns {JSX.Element | null} Returns a JSX element representing the modal if `visible` is true,
 * or `null` if `visible` is false, effectively hiding the modal when not needed.
 */
export const Modal = ({ title, visible, onClose, content }: ModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const modalRoot = document.getElementById('root-portal');
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);

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
  }, [onClose, visible]);

  if (!shouldRender || !modalRoot) return null;

  return (
    modalRoot &&
    ReactDOM.createPortal(
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 duration-200 ${
          isAnimating ? 'opacity-100' : 'opacity-0 invisible'
        }
          `}
      >
        <div
          role="dialog"
          className={`bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg p-4 text-center duration-200 ${
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="flex relative text-mobile-md md:text-desktop-md font-bold mb-4 justify-center">
            {title}
            <div className="absolute right-0 text-black">
              {onClose && (
                <IconButton onClick={onClose}>
                  <img src={icon} alt="Orange triangle" />
                </IconButton>
              )}
            </div>
          </div>
          <div className="p-4">{content}</div>
        </div>
      </div>,
      modalRoot,
    )
  );
};
