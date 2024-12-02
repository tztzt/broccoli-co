/**
 * @returns {JSX.Element} A JSX element representing a loading state with an animated spinner
 */
export const Loading = () => (
  <div
    className="flex items-center justify-center"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <div className="w-4 h-4 border-4 border-black border-dashed rounded-full animate-spin"></div>
  </div>
);
