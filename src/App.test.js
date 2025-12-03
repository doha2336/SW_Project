// Full mock for react-router-dom to make Jest tests pass
jest.mock('react-router-dom', () => {
  const React = require('react');
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
    BrowserRouter: ({ children }) => <>{children}</>,
    Routes: ({ children }) => <>{children}</>,
    Route: ({ children }) => <>{children}</>,
    Link: ({ children }) => <>{children}</>,
    Outlet: () => <div />,
  };
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
