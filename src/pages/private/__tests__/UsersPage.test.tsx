import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersPage from '../UsersPage';
import { renderWithProviders } from '../../../test/helpers/renderWithProviders';
import { server } from '../../../test/mocks/server';
import { http, HttpResponse } from 'msw';

describe('UsersPage component', () => {
  it('renders summary statistics and user table', async () => {
    renderWithProviders(<UsersPage />);

    // Check user rows first (confirms data loaded)
    expect(await screen.findByText('usr-1')).toBeInTheDocument();
    expect(screen.getByText('usr-2')).toBeInTheDocument();

    // Check that summary metrics load from MSW (1420 may be formatted with space, comma, or unformatted)
    expect(screen.getByText(/1[,\s\u00A0]?420/)).toBeInTheDocument();
    expect(screen.getByText('350')).toBeInTheDocument();
    expect(screen.getByText('980')).toBeInTheDocument();

    // 210s = 00:03:30
    expect(screen.getByText('00:03:30')).toBeInTheDocument();
  });

  it('allows entering search query and filtering users', async () => {
    const user = userEvent.setup();
    renderWithProviders(<UsersPage />);

    // Wait for initial load
    expect(await screen.findByText('usr-1')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(
      /search.*user|поиск.*user/i
    );
    await user.type(searchInput, 'usr-1');

    // Click filter button
    const filterBtn = screen.getByRole('button', {
      name: /apply|применить|filtrează/i,
    });
    await user.click(filterBtn);

    expect(screen.getByText('usr-1')).toBeInTheDocument();
  });

  it('displays error alert when user list request fails', async () => {
    server.use(
      http.get('*/users/list', () => {
        return HttpResponse.json(
          { message: 'Internal Server Error' },
          { status: 500 }
        );
      })
    );

    renderWithProviders(<UsersPage />);

    const errors = await screen.findAllByText(/internal server error|500/i);
    expect(errors.length).toBeGreaterThan(0);
  });
});
