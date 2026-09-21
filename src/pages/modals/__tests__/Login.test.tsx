import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginDialog from '../Login';
import { renderWithProviders } from '../../../test/helpers/renderWithProviders';

describe('LoginDialog component', () => {
  it('does not render dialog when open is false', () => {
    renderWithProviders(<LoginDialog open={false} onClose={vi.fn()} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders email and password inputs and submit button when open', () => {
    renderWithProviders(<LoginDialog open={true} onClose={vi.fn()} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('submits credentials, triggers login, and calls onClose upon success', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    renderWithProviders(<LoginDialog open={true} onClose={handleClose} />);

    const emailInput = screen.getByPlaceholderText('you@example.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /войти|sign in/i });

    await user.type(emailInput, 'admin@example.com');
    await user.type(passwordInput, 'secret');
    await user.click(submitBtn);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('displays an error message when login fails', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    renderWithProviders(<LoginDialog open={true} onClose={handleClose} />);

    const emailInput = screen.getByPlaceholderText('you@example.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /войти|sign in/i });

    await user.type(emailInput, 'wrong@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitBtn);

    // Expect error message from MSW handler
    expect(
      await screen.findByText('Неверный логин или пароль')
    ).toBeInTheDocument();
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    renderWithProviders(<LoginDialog open={true} onClose={handleClose} />);

    const cancelBtn = screen.getByRole('button', { name: /отмена|cancel/i });
    await user.click(cancelBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
