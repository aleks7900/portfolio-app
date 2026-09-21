import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import ServicePages from '../ServicePages';
import { renderWithProviders } from '../../../test/helpers/renderWithProviders';
import { SERVICES } from '../../../data/data';

describe('ServicePages dynamic routing component', () => {
  it('renders breadcrumbs and loads registered service page', async () => {
    const webService = SERVICES.find((s) => s.slug === 'web')!;

    renderWithProviders(
      <Routes>
        <Route path="/services/:slug" element={<ServicePages />} />
      </Routes>,
      { initialRoute: '/services/web' }
    );

    // Breadcrumb contains service title
    expect(screen.getByText(webService.title)).toBeInTheDocument();
    expect(screen.getByText(/главная/i)).toBeInTheDocument();
  });

  it('renders generic fallback block if service exists but has no custom page registered', () => {
    // Add temporary service item with no page in SERVICE_PAGE_MAP
    const testSlug = 'custom-test-svc';
    SERVICES.push({
      id: 9999,
      slug: testSlug,
      title: 'Уникальная нестандартная услуга',
      lead: 'Описание уникальной услуги',
      icon: SERVICES[0].icon,
      titleKey: 'custom_test_title',
      descKey: 'custom_test_desc',
      features: [],
      sections: [],
      faqs: [],
    });

    try {
      renderWithProviders(
        <Routes>
          <Route path="/services/:slug" element={<ServicePages />} />
        </Routes>,
        { initialRoute: `/services/${testSlug}` }
      );

      expect(
        screen.getByRole('heading', { name: 'Уникальная нестандартная услуга' })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/для этой услуги ещё нет отдельной страницы/i)
      ).toBeInTheDocument();
    } finally {
      // Clean up
      const idx = SERVICES.findIndex((s) => s.slug === testSlug);
      if (idx !== -1) SERVICES.splice(idx, 1);
    }
  });

  it('redirects to /service when slug is unknown', () => {
    renderWithProviders(
      <Routes>
        <Route path="/services/:slug" element={<ServicePages />} />
        <Route path="/service" element={<div>Service List Root</div>} />
        <Route path="/service/:lang" element={<div>Localized Service List</div>} />
      </Routes>,
      { initialRoute: '/services/non-existent-slug' }
    );

    expect(
      screen.getByText(/service list/i)
    ).toBeInTheDocument();
  });
});
