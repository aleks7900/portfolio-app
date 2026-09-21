import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';

describe('Button component', () => {
  it('renders button with text content', () => {
    render(<Button>Нажмите меня</Button>);
    expect(
      screen.getByRole('button', { name: 'Нажмите меня' })
    ).toBeInTheDocument();
  });

  it('handles user click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Отправить</Button>);

    await user.click(screen.getByRole('button', { name: 'Отправить' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders disabled attribute and prevents clicks when disabled prop is true', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Недоступно
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Недоступно' });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading state and disables interaction when loading prop is true', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button loading onClick={handleClick}>
        Загрузка
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Загрузка' });
    expect(button).toBeDisabled();
    // Verify spinning SVG icon is present
    const svgIcon = button.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon).toHaveClass('animate-spin');

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with variants and size classes', () => {
    const { rerender } = render(
      <Button variant="glow" size="lg">
        Glow Button
      </Button>
    );
    let button = screen.getByRole('button', { name: 'Glow Button' });
    expect(button.className).toContain('from-indigo-600');
    expect(button.className).toContain('h-12');

    rerender(
      <Button variant="destructive" size="sm">
        Delete
      </Button>
    );
    button = screen.getByRole('button', { name: 'Delete' });
    expect(button.className).toContain('bg-destructive');
    expect(button.className).toContain('h-8');
  });

  it('delegates rendering to child element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/target">Ссылка кнопка</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Ссылка кнопка' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/target');
  });
});
