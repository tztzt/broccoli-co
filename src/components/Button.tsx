import { Loading } from './Loading';

interface ButtonProps {
  children: string | React.ReactNode;
  onClick: () => void;
  block?: boolean;
  loading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { children, onClick, block, loading } = props;
  const width = block ? 'w-full' : 'm-w-fit';
  const basicButton = `flex justify-center items-center gap-4 py-2 px-4 rounded`;
  const color =
    'text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500';
  const className = [width, basicButton, color].join(' ');

  return (
    <button className={className} onClick={onClick} style={{ width }}>
      {children}
      {loading && <Loading />}
    </button>
  );
};
