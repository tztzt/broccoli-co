import { render, screen } from '@testing-library/react';

import { Loading } from '../Loading';

describe('LoadingSpinner Component', () => {
  it('should render the spinner', () => {
    render(<Loading />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('should have the correct ARIA attributes', () => {
    render(<Loading />);
    const spinner = screen.getByRole('status');

    // Check ARIA attributes
    expect(spinner).toHaveAttribute('aria-live', 'polite');
    expect(spinner).toHaveAttribute('aria-busy', 'true');
  });

  it('should contain a spinning element', () => {
    render(<Loading />);
    const spinnerChild = screen.getByRole('status').firstChild;

    // Check if the spinner child is present and styled correctly
    expect(spinnerChild).toBeInTheDocument();
    expect(spinnerChild).toHaveClass(
      'w-4 h-4 border-4 border-dashed rounded-full animate-spin',
    );
  });
});
