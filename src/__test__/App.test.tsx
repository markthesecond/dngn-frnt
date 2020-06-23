import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('App renders and allows sign in', () => {
  const { getByText } = render(<App />);

  const homeElement = getByText(/DngnBddy/);
  expect(homeElement).toBeInTheDocument();

  const signInButton = getByText(/Sign In/);
  expect(signInButton).toBeInTheDocument();
});

