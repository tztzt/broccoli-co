import { render, screen } from '@testing-library/react';

import { Header } from '../Header';

describe('Header Component', () => {
  it('renders the header component', () => {
    render(<Header companyName="Test Company" />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  it('displays the company name in uppercase', () => {
    render(<Header companyName="Test Company" />);
    const companyNameElement = screen.getByText('TEST COMPANY');
    expect(companyNameElement).toBeInTheDocument();
  });

  it('renders the logo with correct attributes', () => {
    render(<Header companyName="Test Company" />);
    const logoElement = screen.getByAltText('broccoli logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', '/src/assets/broccoli.svg');
    expect(logoElement).toHaveClass('w-8 md:w-10');
  });
});
