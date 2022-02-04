import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MEXIQUITO BANNER', () => {
  render(<App />);
  const linkElement = screen.getByText(/MEXIQUITO BANNER/i);
  expect(linkElement).toBeInTheDocument();
});
