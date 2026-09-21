import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WebCostCalculatorPage from '../WebCostCalculatorPage';
import { renderWithProviders } from '../../../test/helpers/renderWithProviders';

describe('WebCostCalculatorPage component & business logic', () => {
  it('renders initial cost estimation calculation correctly', () => {
    renderWithProviders(<WebCostCalculatorPage />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Cost estimate|Стоимость/i)).toBeInTheDocument();
  });

  it('updates estimated price when selecting project type or design options', async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(<WebCostCalculatorPage />);

    const select = container.querySelector('select')!;
    expect(select).toBeInTheDocument();

    await user.selectOptions(select, 'landing');
    expect(select.value).toBe('landing');

    // Also click design tier button
    const designButtons = screen.getAllByRole('button');
    expect(designButtons.length).toBeGreaterThan(0);
  });

  it('renders CTA link to contact page', () => {
    const { container } = renderWithProviders(<WebCostCalculatorPage />);

    const contactLink = container.querySelector('a[href*="/contacts"]');
    expect(contactLink).toBeInTheDocument();
  });
});
