import { render, screen } from '@testing-library/react';

import { Footer } from '../Footer';

it('should have company name', () => {
  const companyName = 'ABC Co.';
  render(<Footer companyName={companyName} />);
  const text = screen.getByText('© 2024 ABC Co. All rights reserved.');
  expect(text).toBeVisible();
});
