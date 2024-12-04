import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Input } from '../Input';

describe('Input Component', () => {
  const mockOnChange = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the input field', () => {
    render(<Input fieldName="testField" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('displays the placeholder text when provided', () => {
    render(
      <Input
        fieldName="testField"
        placeholder="Enter text"
        onChange={mockOnChange}
      />,
    );
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('displays an error message when the error prop is provided', () => {
    render(
      <Input
        fieldName="testField"
        error="This is an error"
        onChange={mockOnChange}
      />,
    );
    const errorMessage = screen.getByText('This is an error');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-red-500');
  });

  it('applies error styles to the input when error prop is provided', () => {
    render(
      <Input
        fieldName="testField"
        error="This is an error"
        onChange={mockOnChange}
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-300');
  });

  it('renders with default value when value is undefined', () => {
    render(<Input fieldName="testField" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });
});
