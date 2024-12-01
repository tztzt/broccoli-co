interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const IconButton = (props: ButtonProps) => {
  const { children, onClick } = props;
  const basicButton = `p-0.5 rounded`;

  const hover =
    'h-8 w-8 hover:bg-gray-200 focus:ring-gray-200 active:bg-gray-300';
  const className = [basicButton, hover].join(' ');

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};
