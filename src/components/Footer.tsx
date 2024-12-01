import { COMPANY_NAME } from "../common";

export const Footer = () => (
  <footer className="bg-grey-600 py-4 border-t-4">
    <div className="container mx-auto px-4">
      <p className="text-center text-xs md:text-lg">
        &copy; 2024 {COMPANY_NAME} All rights reserved.
      </p>
    </div>
  </footer>
);
