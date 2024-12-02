import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Button } from '../Button';

vi.mock('./Loading', () => ({
  Loading: () => <div data-testid="loading-spinner">Loading...</div>,
}));

describe('Button Component', () => {
  it('should render the button with children content', () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
  });

  it('should have the correct classes when loading is false', () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-white text-gray-700 border-gray-700 border-2',
    );
    expect(button).not.toHaveClass('cursor-wait');
  });

  it('should have the "cursor-wait" class when loading is true', () => {
    render(
      <Button onClick={() => {}} loading={true}>
        Click Me
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('cursor-wait');
  });

  it('should display the Loading spinner when loading is true', () => {
    render(
      <Button onClick={() => {}} loading={true}>
        Click Me
      </Button>,
    );
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('should call the onClick function when clicked and not loading', () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock}>Click Me</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick function when loading', () => {
    const onClickMock = vi.fn();
    render(
      <Button onClick={onClickMock} loading={true}>
        Click Me
      </Button>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('should have the full width when "block" prop is true', () => {
    render(
      <Button onClick={() => {}} block={true}>
        Click Me
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('should have the fit width when "block" prop is false', () => {
    render(
      <Button onClick={() => {}} block={false}>
        Click Me
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-fit');
  });

  it('should have the correct type when type prop is "submit"', () => {
    render(
      <Button onClick={() => {}} type="submit">
        Submit
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should have the default type "button" when not specified', () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});
