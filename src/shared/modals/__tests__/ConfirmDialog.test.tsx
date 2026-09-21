import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmDialog from '../ConfirmDialog';

describe('ConfirmDialog modal component', () => {
  it('does not render content when open is false', () => {
    render(
      <ConfirmDialog
        open={false}
        title="Удалить запись?"
        message="Вы уверены?"
        onConfirm={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title, message, and action buttons when open is true', () => {
    render(
      <ConfirmDialog
        open={true}
        title="Подтверждение действия"
        message="Вы действительно хотите удалить?"
        confirmText="Да, удалить"
        cancelText="Отмена"
        onConfirm={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Подтверждение действия')).toBeInTheDocument();
    expect(screen.getByText('Вы действительно хотите удалить?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Да, удалить' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Отмена' })).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <ConfirmDialog
        open={true}
        cancelText="Отмена"
        onConfirm={vi.fn()}
        onClose={handleClose}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Отмена' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm and then onClose when confirm button is clicked', async () => {
    const user = userEvent.setup();
    const handleConfirm = vi.fn();
    const handleClose = vi.fn();

    render(
      <ConfirmDialog
        open={true}
        confirmText="Подтвердить"
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Подтвердить' }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <ConfirmDialog
        open={true}
        onConfirm={vi.fn()}
        onClose={handleClose}
      />
    );

    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
