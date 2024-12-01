import { useEffect } from "react";
import ReactDOM from "react-dom";
import logo from "../assets/close.svg";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

interface ModalProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  content: string | React.ReactElement;
}

/**
 * Basic Modal component that accepts a visiblity prop,
 *
 * @param param @link[ModalProps}
 * @returns
 */
export const Modal = ({ title, visible, onClose, content }: ModalProps) => {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    modalRoot && // check if root html exists
    ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg p-4 text-center">
          {/* Content */}
          <div className="flex relative text-mobile-sm md:text-desktop-sm font-bold mb-4 justify-center">
            {title}
            <div className="absolute right-0">
              <IconButton onClick={onClose}>
                <img className={"w-4 md:w-6"} src={logo} alt="React logo" />
              </IconButton>
            </div>
          </div>
          <div className="p-4">{content}</div>
        </div>
      </div>,
      modalRoot,
    )
  );
};
