import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import RequestsPage from '../RequestsPage';
import { renderWithProviders } from '../../../test/helpers/renderWithProviders';
import { mockValidJwtToken } from '../../../test/mocks/handlers';

describe('RequestsPage (Admin)', () => {
  it('loads and displays requests from the server', async () => {
    renderWithProviders(<RequestsPage />, {
      authToken: mockValidJwtToken,
    });

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();

    // Requests from mockSampleRequests
    expect(await screen.findByText('Иван Петров')).toBeInTheDocument();
    expect(await screen.findByText('Мария Сидорова')).toBeInTheDocument();
  });
});
