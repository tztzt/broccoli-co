import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { IconButton } from '../IconButton';

describe('IconButton Component', () => {
  const mockOnClick = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the IconButton component', () => {
    render(<IconButton onClick={mockOnClick}>Test</IconButton>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders the children content', () => {
    render(<IconButton onClick={mockOnClick}>Test Icon</IconButton>);
    const childElement = screen.getByText('Test Icon');
    expect(childElement).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    render(<IconButton onClick={mockOnClick}>Click Me</IconButton>);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct class names for styling', () => {
    render(<IconButton onClick={mockOnClick}>Styled</IconButton>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('p-0.5 rounded');
    expect(buttonElement).toHaveClass(
      'h-8 w-8 hover:bg-gray-200 focus:ring-gray-200 active:bg-gray-300',
    );
  });
});
