import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders mexiqui.to', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>);
  const linkElement = screen.getByText(/mexiqui.to/i);
  expect(linkElement).toBeInTheDocument();
});
