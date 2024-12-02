import { fireEvent, render, screen } from '@testing-library/react';
// Update this path based on your file structure
import { vi } from 'vitest';

import { SubmitResult } from '../SubmitResult';

describe('SubmitResult Component', () => {
  it('renders the success message', () => {
    // Render the SubmitResult component
    render(<SubmitResult handleClose={vi.fn()} />);

    // Check if the success message is displayed
    const message = screen.getByText(
      /You will be one of the first to experience Broccoli & Co. when we launch!/,
    );
    expect(message).toBeInTheDocument();
  });

  it('renders the Ok button', () => {
    // Render the SubmitResult component
    render(<SubmitResult handleClose={vi.fn()} />);

    // Check if the Ok button is displayed
    const button = screen.getByText('Ok');
    expect(button).toBeInTheDocument();
  });

  it('calls handleClose when the Ok button is clicked', () => {
    // Create a mock function for handleClose
    const handleCloseMock = vi.fn();

    // Render the SubmitResult component with the mock function
    render(<SubmitResult handleClose={handleCloseMock} />);

    // Find the Ok button and click it
    const button = screen.getByText('Ok');
    fireEvent.click(button);

    // Assert that the handleClose function is called once when the button is clicked
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  it('passes the correct class names for styling', () => {
    // Render the SubmitResult component
    render(<SubmitResult handleClose={vi.fn()} />);

    // Check if the classes are correctly applied to the main div
    const submitResultElement = screen.getByText(
      'You will be one of the first to experience Broccoli & Co. when we launch!',
    ).parentElement;

    expect(submitResultElement).toHaveClass('flex', 'flex-col', 'gap-16');
  });
});
