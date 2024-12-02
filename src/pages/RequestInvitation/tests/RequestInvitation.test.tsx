import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { RequestInvitation } from '../';

// Render the component// Mock UserInputModal to avoid testing its internal behavior
vi.mock('../UserInputModal', () => ({
  UserInputModal: () => <div>Mocked UserInputModal</div>,
}));

describe('RequestInvitation', () => {
  it('renders the correct heading and paragraph', () => {
    // Render the component
    render(<RequestInvitation />);

    // Check if the heading is rendered correctly
    screen.debug();
    expect(
      screen.getByText('A better way to enjoy every day.'),
    ).toBeInTheDocument();

    // Check if the paragraph text is rendered correctly
    expect(
      screen.getByText('Be the first to know when we launch!'),
    ).toBeInTheDocument();
  });

  it('renders the mocked UserInputModal component', () => {
    render(<RequestInvitation />);

    // Check if the mocked UserInputModal is rendered
    expect(screen.getByText('Mocked UserInputModal')).toBeInTheDocument();
  });
});
