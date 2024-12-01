export const Footer = ({ companyName }: { companyName: string }) => (
  <footer className="bg-grey-600 py-4 border-t-4">
    <div className="container mx-auto px-4">
      <p className="text-center text-xs md:text-lg">
        &copy; 2024 {companyName} All rights reserved.
      </p>
    </div>
  </footer>
);
