import { act, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Toast } from '../Toast';

vi.useFakeTimers();

describe('Toast Component', () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    // Mock the root-portal element for React Portal
    const rootPortal = document.createElement('div');
    rootPortal.setAttribute('id', 'root-portal');
    document.body.appendChild(rootPortal);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    document.body.innerHTML = ''; // Clean up DOM
  });

  it('renders the toast when visible is true', () => {
    render(
      <Toast message="Test Message" visible={true} onClose={onCloseMock} />,
    );
    const toastElement = screen.getByText('Test Message');
    expect(toastElement).toBeInTheDocument();
  });

  it('does not render the toast when visible is false', () => {
    render(
      <Toast message="Test Message" visible={false} onClose={onCloseMock} />,
    );
    const toastElement = screen.queryByText('Test Message');
    expect(toastElement).not.toBeInTheDocument();
  });

  it('displays the fallback message when no message is provided', () => {
    render(<Toast message={''} visible={true} onClose={onCloseMock} />);
    const fallbackMessage = screen.getByText('An unexpected error occured');
    expect(fallbackMessage).toBeInTheDocument();
  });

  it('renders the toast inside the root portal', () => {
    render(
      <Toast message="Test Portal" visible={true} onClose={onCloseMock} />,
    );

    const rootPortal = document.getElementById('root-portal');
    expect(rootPortal).toContainElement(screen.getByText('Test Portal'));
  });

  it('calls onClose after the specified duration', () => {
    const duration = 3000;
    render(
      <Toast
        message="Test Auto-Close"
        visible={true}
        onClose={onCloseMock}
        duration={duration}
      />,
    );
    expect(onCloseMock).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(duration));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <Toast
        message="Test Close Button"
        visible={true}
        onClose={onCloseMock}
      />,
    );
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('applies the correct animation classes during transitions', () => {
    const { rerender } = render(
      <Toast message="Test Animation" visible={true} onClose={onCloseMock} />,
    );

    const toastElement = screen.getByText('Test Animation').closest('div'); // Get the correct outer div
    act(() => vi.advanceTimersByTime(100));
    expect(toastElement).toHaveClass('opacity-100 -translate-y-0');

    rerender(
      <Toast message="Test Animation" visible={false} onClose={onCloseMock} />,
    );
    act(() => vi.advanceTimersByTime(300));
    expect(toastElement).toHaveClass('opacity-70 -translate-y-12');
  });
});
