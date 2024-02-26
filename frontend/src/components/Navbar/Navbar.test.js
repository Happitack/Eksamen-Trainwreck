import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Navbar from './Navbar';
import { getFilms } from '../../utils/filmAPI';

jest.mock('../../utils/filmAPI');

beforeEach(() => {
  getFilms.mockResolvedValue([]);
});

it('renders without crashing', () => {
  render(<Navbar />);
});

it('changes class when scrolled', async () => {
  const { container } = render(<Navbar />);
  expect(container.firstChild.className).toBe('navbar');

  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });

  expect(container.firstChild.className).toBe('navbar scrolled');
});

it('opens and closes the menu when the menu button is clicked', () => {
  const { getByText } = render(<Navbar />);
  const menuButton = getByText('MENU');

  fireEvent.click(menuButton);
  expect(getByText('CLOSE')).toBeInTheDocument();

  fireEvent.click(menuButton);
  expect(getByText('MENU')).toBeInTheDocument();
});

it('shows the login component when the login button is clicked', () => {
  const { getByText, queryByText } = render(<Navbar />);
  const loginButton = getByText('LOGIN');

  expect(queryByText('Admin Access')).not.toBeInTheDocument();

  fireEvent.click(loginButton);
  expect(queryByText('Admin Access')).toBeInTheDocument();
});