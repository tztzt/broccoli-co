import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { submitRequestInvite } from '../../../services/submitRequestInvite';
import { UserEmailForm } from '../UserEmailForm';

vi.mock('../../../services/submitRequestInvite');

const mockOnSuccess = vi.fn();
const mockOnSubmitError = vi.fn();

describe('UserEmailForm', () => {
  beforeEach(() => {
    mockOnSuccess.mockClear();
    mockOnSubmitError.mockClear();
  });

  it('should show an error if the name is empty', async () => {
    render(
      <UserEmailForm
        onSuccess={mockOnSuccess}
        onSubmitError={mockOnSubmitError}
      />,
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(screen.getByText('Please fill in your name')).toBeInTheDocument(),
    );
  });

  it('should show an error if the email is empty', async () => {
    render(
      <UserEmailForm
        onSuccess={mockOnSuccess}
        onSubmitError={mockOnSubmitError}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { value: 'Joe' },
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(screen.getByText('Please fill in your email')).toBeInTheDocument(),
    );
  });

  it('should show an error if the name is too short', async () => {
    render(
      <UserEmailForm
        onSuccess={mockOnSuccess}
        onSubmitError={mockOnSubmitError}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { value: 'Jo' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(
        screen.getByText(
          'Please ensure your name is at least 3 characters long',
        ),
      ).toBeInTheDocument(),
    );
  });

  it('should show an error if the email is invalid', async () => {
    render(
      <UserEmailForm
        onSuccess={mockOnSuccess}
        onSubmitError={mockOnSubmitError}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm email'), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(
        screen.getByText('Please enter a valid email'),
      ).toBeInTheDocument(),
    );
  });

  it('should show an error if emails do not match', async () => {
    render(
      <UserEmailForm
        onSuccess={mockOnSuccess}
        onSubmitError={mockOnSubmitError}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm email'), {
      target: { value: 'wrong@example.com' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(
        screen.getByText('Please check if your email was entered correctly'),
      ).toBeInTheDocument(),
    );
  });

  it('should call onSubmitError invalid data is submitted', async () => {
    render(
      <UserEmailForm
        onSuccess={mockOnSuccess}
        onSubmitError={mockOnSubmitError}
      />,
    );
    (submitRequestInvite as jest.Mock).mockRejectedValueOnce(
      new Error('Request failed'),
    );

    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { value: 'Bad' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(mockOnSubmitError).toHaveBeenCalledTimes(1));
  });

  it('should call onSuccess and clear form when valid data is submitted', async () => {
    render(
      <UserEmailForm
        onSuccess={mockOnSuccess}
        onSubmitError={mockOnSubmitError}
      />,
    );

    (submitRequestInvite as jest.Mock).mockResolvedValue('Success');

    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { value: 'Good' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(mockOnSuccess).toHaveBeenCalledTimes(1));
  });
});
