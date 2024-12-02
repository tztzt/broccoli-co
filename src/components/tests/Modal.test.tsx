import { act, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Modal } from '../Modal';

vi.useFakeTimers();

describe('Modal Component', () => {
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

  it('renders the modal when visible is true', () => {
    render(
      <Modal
        title="Test Modal"
        visible={true}
        onClose={onCloseMock}
        content="This is the modal content"
      />,
    );
    const modalElement = screen.getByText('Test Modal');
    expect(modalElement).toBeInTheDocument();
  });

  it('does not render the modal when visible is false', () => {
    render(
      <Modal
        title="Test Modal"
        visible={false}
        onClose={onCloseMock}
        content="This is the modal content"
      />,
    );
    const modalElement = screen.queryByText('Test Modal');
    expect(modalElement).not.toBeInTheDocument();
  });

  it('sets overflow to hidden when modal is visible', () => {
    render(
      <Modal
        title="Test Modal"
        visible={true}
        onClose={onCloseMock}
        content="This is the modal content"
      />,
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores overflow to auto when modal is closed', () => {
    render(
      <Modal
        title="Test Modal"
        visible={false}
        onClose={onCloseMock}
        content="This is the modal content"
      />,
    );
    expect(document.body.style.overflow).toBe('auto');
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <Modal
        title="Test Modal"
        visible={true}
        onClose={onCloseMock}
        content="This is the modal content"
      />,
    );
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('renders the modal inside the root portal', () => {
    render(
      <Modal
        title="Test Modal"
        visible={true}
        onClose={onCloseMock}
        content="This is the modal content"
      />,
    );
    const rootPortal = document.getElementById('root-portal');
    expect(rootPortal).toContainElement(screen.getByText('Test Modal'));
  });

  it('applies the correct animation classes when visible is true', () => {
    const { rerender } = render(
      <Modal
        title="Test Modal"
        visible={true}
        onClose={onCloseMock}
        content="This is the modal content"
      />,
    );
    const modalBackdrop = screen.getByRole('dialog').parentElement;
    act(() => vi.advanceTimersByTime(100));
    expect(modalBackdrop).toHaveClass('opacity-100');

    const modalContent = screen.getByRole('dialog');
    expect(modalContent).toHaveClass('opacity-100 scale-100');

    rerender(
      <Modal
        title="Test Modal"
        visible={false}
        onClose={onCloseMock}
        content="This is the modal content"
      />,
    );
    act(() => vi.advanceTimersByTime(300));
    expect(modalBackdrop).toHaveClass('opacity-0 invisible');
    expect(modalContent).toHaveClass('opacity-0 scale-95');
  });
});
