import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MEXIQUI.TO BANNER', () => {
  render(<App />);
  const linkElement = screen.getByText(/MEXIQUI.TO/i);
  expect(linkElement).toBeInTheDocument();
});
