import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';
import { renderWithProviders } from '../../test/helpers/renderWithProviders';
import { mockValidJwtToken } from '../../test/mocks/handlers';

describe('Navbar component', () => {
  it('renders navigation links and login button when unauthenticated', () => {
    renderWithProviders(<Navbar />, { authToken: null });

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /войти|login/i })).toBeInTheDocument();
  });

  it('renders admin menu and logout button when authenticated', () => {
    renderWithProviders(<Navbar />, { authToken: mockValidJwtToken });

    expect(screen.getByRole('button', { name: /выйти|logout/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /войти|login/i })).not.toBeInTheDocument();
  });

  it('opens LoginDialog when login button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />, { authToken: null });

    const loginBtn = screen.getByRole('button', { name: /войти|login/i });
    await user.click(loginBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    const themeBtns = screen.getAllByRole('button', { name: /toggle theme/i });
    await user.click(themeBtns[0]);

    expect(localStorage.getItem('theme')).toBeTruthy();
  });
});
