import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Footer } from '../Footer';

describe('Footer Component', () => {
  it('renders the footer component', () => {
    render(<Footer companyName="Test Company" />);
    const footerElement = screen.getByRole('contentinfo'); // footer has role="contentinfo"
    expect(footerElement).toBeInTheDocument();
  });

  it('displays the correct company name', () => {
    render(<Footer companyName="Test Company" />);
    const companyNameText = screen.getByText(
      /© 2024 Test Company All rights reserved./i,
    );
    expect(companyNameText).toBeInTheDocument();
  });

  it('renders copyright text with proper format', () => {
    render(<Footer companyName="Test Company" />);
    const copyrightText = screen.getByText(
      /© 2024 Test Company All rights reserved./i,
    );
    expect(copyrightText).toHaveTextContent(
      '© 2024 Test Company All rights reserved.',
    );
  });
});
