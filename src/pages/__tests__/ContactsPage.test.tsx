import { describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import ContactsPage from '../ContactsPage';
import { renderWithProviders } from '../../test/helpers/renderWithProviders';

describe('ContactsPage component and form handling', () => {
  it('renders contact information and contact form fields', () => {
    const { container } = renderWithProviders(<ContactsPage />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(container.querySelector('input[name="name"]')).toBeInTheDocument();
    expect(container.querySelector('textarea[name="message"]')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /отправить|send/i })
    ).toBeInTheDocument();
  });

  it('validates empty input and shows error alert when submitted', async () => {
    const { container } = renderWithProviders(<ContactsPage />);
    const form = container.querySelector('form')!;

    fireEvent.submit(form);

    expect(
      await screen.findByText(
        /Please enter your name and message|Введите имя и сообщение|Introduceți numele/i
      )
    ).toBeInTheDocument();
  });

  it('submits successfully when required fields are populated', async () => {
    const { container } = renderWithProviders(<ContactsPage />);

    const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement;
    const messageInput = container.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    const form = container.querySelector('form')!;

    fireEvent.change(nameInput, { target: { value: 'Алексей' } });
    fireEvent.change(messageInput, {
      target: { value: 'Здравствуйте, интересует разработка веб-сервиса.' },
    });
    fireEvent.submit(form);

    expect(
      await screen.findByText(/Request sent|Заявка.*отправлена|Cererea a fost trimisă/i)
    ).toBeInTheDocument();
  });
});
