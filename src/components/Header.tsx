import logo from '../assets/broccoli.svg';

export const Header = ({ companyName }: { companyName: string }) => {
  return (
    <header className="bg-grey-600 py-4 shadow-md border-b-4">
      <div className="flex container mx-auto px-4 space-x-2">
        <img className={'w-8 md:w-10'} src={logo} alt="broccoli logo" />
        <h1 className="text-2xl md:text-4xl font-bold">
          {companyName.toUpperCase()}
        </h1>
      </div>
    </header>
  );
};
