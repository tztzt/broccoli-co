import { Loading } from './Loading';

interface ButtonProps {
  // Content to be rendered inside the button, plain text or a React node.
  children: string | React.ReactNode;
  // Callback function to handle button click events.
  onClick?: () => void;
  // Optional. If `true`, displays a loading state (e.g., spinner) instead of the button content.
  loading?: boolean;
  /**
   * Optional. Specifies the button type. Defaults to `"button"`, but can be `"submit"`
   * when used in forms.
   */
  type?: 'submit' | 'button';
  /**
   * Optional. Specifies if the button is a full-width block, or default
   */
  block?: boolean;
}
/**
 * A basic Button component that supports custom content, loading transition state,
 * and full-width layout. Designed for reuse in various UI contexts.
 *
 * @returns {JSX.Element} A JSX element representing the button, styled and functional.
 */
export const Button = ({
  children,
  onClick,
  loading,
  type = 'button',
  block,
}: ButtonProps): JSX.Element => {
  const basicButton = `flex justify-center items-center gap-4 py-2 px-4 rounded-md ${block ? 'w-full' : 'w-fit'}`;
  const color = 'bg-white text-gray-700 border-gray-700 border-2';
  const cursor = loading ? 'cursor-wait' : '';
  const transition = `transition duration-200 ease-in-out  hover:bg-gray-100  active:bg-gray-200 focus:outline-none`;
  const className = [basicButton, color, cursor, transition].join(' ');

  const handleClick = () => {
    if (loading) return;
    onClick?.();
  };

  return (
    <button className={className} onClick={handleClick} type={type}>
      {children}
      {loading && <Loading />}
    </button>
  );
};
