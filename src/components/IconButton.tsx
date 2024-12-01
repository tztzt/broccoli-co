interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const IconButton = (props: ButtonProps) => {
  const { children, onClick } = props;
  const basicButton = `p-1 rounded`;
  const color = "text-white hover:bg-gray-200 focus:ring-gray-200";
  const className = [basicButton, color].join(" ");

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};
