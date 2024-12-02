import { fireEvent, render, screen, within } from '@testing-library/react';
import { ReactNode } from 'react';
import { vi } from 'vitest';

import { UserInputModal } from '../UserInputModal';

// Mock components
vi.mock('../../../components', async () => ({
  Button: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: ReactNode;
  }) => <button onClick={onClick}>{children}</button>,
  Modal: ({
    title,
    visible,
    onClose,
    content,
  }: {
    title: string;
    visible: boolean;
    onClose: () => void;
    content: ReactNode;
  }) =>
    visible ? (
      <div data-testid="modal">
        <h1>{title}</h1>
        <div>{content}</div>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
  Toast: ({
    message,
    visible,
    onClose,
  }: {
    message: string;
    visible: boolean;
    onClose: () => void;
  }) =>
    visible ? (
      <div>
        {message} <button onClick={onClose}>Close Toast</button>
      </div>
    ) : null,
}));

vi.mock('../UserEmailForm', async () => ({
  UserEmailForm: ({
    onSubmitError,
    onSuccess,
  }: {
    onSubmitError: (message: string) => void;
    onSuccess: () => void;
  }) => (
    <>
      <button onClick={() => onSubmitError('Error Message')}>
        Trigger error
      </button>

      <button onClick={() => onSuccess()}>Trigger success</button>
    </>
  ),
}));

describe('UserInputModal', () => {
  it('should render and show the request invite button', () => {
    render(<UserInputModal />);
    expect(screen.getByText('Request an invite')).toBeInTheDocument();
  });

  it('should show invite modal when request invite button is clicked', async () => {
    render(<UserInputModal />);
    fireEvent.click(screen.getByText('Request an invite'));
    const modal = screen.getByTestId('modal');
    const modalTitle = within(modal).getByText('Request an invite');
    expect(modalTitle).toBeInTheDocument();
  });

  it('should close invite modal when close button is clicked', async () => {
    render(<UserInputModal />);
    fireEvent.click(screen.getByText('Request an invite'));
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('Close')).not.toBeInTheDocument();
  });

  it('should show error toast when handleError is called', async () => {
    render(<UserInputModal />);
    fireEvent.click(screen.getByText('Request an invite'));
    fireEvent.click(screen.getByText('Trigger error'));
    expect(screen.getByText('Error Message')).toBeInTheDocument();
  });

  it('should hide error toast when toast closed is clicked', async () => {
    render(<UserInputModal />);
    fireEvent.click(screen.getByText('Request an invite'));
    fireEvent.click(screen.getByText('Trigger error'));
    expect(screen.getByText('Error Message')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close Toast'));
    const toast = screen.queryByText('Error Message');
    expect(toast).not.toBeInTheDocument();
  });

  it('should show success modal toast when onSuccess is called', async () => {
    render(<UserInputModal />);
    fireEvent.click(screen.getByText('Request an invite'));
    fireEvent.click(screen.getByText('Trigger success'));
    const modal = screen.getByTestId('modal');
    const modalTitle = within(modal).getByText('All done!');
    expect(modalTitle).toBeInTheDocument();
  });
});
