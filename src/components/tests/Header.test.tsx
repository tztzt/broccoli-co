import { render, screen } from '@testing-library/react';

import { Header } from '../Header';

it('should have company name', () => {
  const companyName = 'ABC Co.';
  render(<Header companyName={companyName} />);
  const text = screen.getByText(companyName.toUpperCase());

  expect(text).toBeVisible();
});

it('should have company logo', () => {
  const companyName = 'ABC Co.';
  render(<Header companyName={companyName} />);
  const image: HTMLImageElement = screen.getByAltText('broccoli logo');
  expect(image.src).toContain('http://localhost:3000/src/assets/broccoli.svg');
});
