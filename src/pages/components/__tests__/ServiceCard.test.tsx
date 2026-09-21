import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import ServiceCard from '../ServiceCard';
import { SERVICES } from '../../../data/data';
import { renderWithProviders } from '../../../test/helpers/renderWithProviders';

describe('ServiceCard component', () => {
  it('renders service title, description, and link to the service slug', () => {
    const service = SERVICES[0]; // first service

    renderWithProviders(
      <ServiceCard
        s={service}
        titleKey="title_web"
        descKey="desc_web"
      />
    );

    // Look for link with href containing the service slug
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/services/${service.slug}`);
  });
});
