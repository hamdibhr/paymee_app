import { render, screen } from '@testing-library/react';
import Paymee from './paymee';

test('renders learn react link', () => {
  render(<Paymee />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
