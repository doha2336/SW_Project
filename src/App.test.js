
import { render } from '@testing-library/react';
import App from './App';

// Mock لـ react-router-dom
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: () => null,
  Link: () => null,
  Outlet: () => null,
}));

test('App renders without crashing', () => {
render(<App />);
});
