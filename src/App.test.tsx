import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import App from './App';

// Mock the components
vi.mock('./components', () => ({
  Header: () => <div>Header</div>,
  Footer: () => <div>Footer</div>,
}));

vi.mock('./pages/RequestInvitation', () => ({
  RequestInvitation: () => <div>Request Invitation Form</div>,
}));

describe('App Component', () => {
  it('renders Header, Main, and Footer components', () => {
    render(<App />);

    // Check if the Header and Footer are rendered
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();

    // Check if the RequestInvitation is rendered inside main
    expect(screen.getByText('Request Invitation Form')).toBeInTheDocument();
  });
});
