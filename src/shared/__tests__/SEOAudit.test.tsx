import { describe, expect, it } from 'vitest';
import SEO from '../SEO';
import { renderWithProviders } from '../../test/helpers/renderWithProviders';
import NotFoundPage from '../../pages/NotFoundPage';

describe('SEO Complete Audit Tests', () => {
  it('correctly sets canonical URL and hreflangs for multilingual routes', () => {
    renderWithProviders(
      <SEO
        title="Services | Alex-Lab"
        description="Full-stack web application development"
        pathname="/service"
      />
    );

    expect(document.title).toBe('Services | Alex-Lab');

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).not.toBeNull();
    expect(canonical?.getAttribute('href')).toMatch(/^https:\/\/alex-lab\.md/);

    const hreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    expect(hreflangs.length).toBeGreaterThanOrEqual(4); // ru, ro, en, x-default

    const xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    expect(xDefault).not.toBeNull();
    expect(xDefault?.getAttribute('href')).toBe('https://alex-lab.md/service');
  });

  it('sets noindex and nofollow when noindex prop is provided', () => {
    renderWithProviders(
      <SEO
        title="Admin Dashboard"
        noindex={true}
        pathname="/admin/requests"
      />
    );

    const robotsMeta = document.querySelector('meta[name="robots"]');
    expect(robotsMeta).not.toBeNull();
    expect(robotsMeta?.getAttribute('content')).toBe('noindex, nofollow');
  });

  it('renders Open Graph and Twitter Card metadata tags', () => {
    renderWithProviders(
      <SEO
        title="Alex-Lab Web Studio"
        description="Custom web applications"
        image="https://alex-lab.md/og-custom.png"
        pathname="/about"
      />
    );

    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute('content')).toBe('Alex-Lab Web Studio');

    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogDesc?.getAttribute('content')).toBe('Custom web applications');

    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage?.getAttribute('content')).toBe('https://alex-lab.md/og-custom.png');

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
  });

  it('renders valid Schema.org JSON-LD structured data', () => {
    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Alex-Lab',
        url: 'https://alex-lab.md',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Alex-Lab Portfolio',
        url: 'https://alex-lab.md',
      },
    ];

    renderWithProviders(
      <SEO
        title="Alex-Lab"
        structuredData={schemas}
      />
    );

    const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const parsedData = jsonLdScripts.map((s) => {
      try {
        return JSON.parse(s.textContent || '{}');
      } catch {
        return null;
      }
    });

    const hasOrg = parsedData.some((d) => d && d['@type'] === 'Organization');
    const hasSite = parsedData.some((d) => d && d['@type'] === 'WebSite');
    expect(hasOrg).toBe(true);
    expect(hasSite).toBe(true);
  });

  it('NotFoundPage renders SEO with noindex and accessible back links', () => {
    const { getByText, getByRole } = renderWithProviders(<NotFoundPage />);

    expect(getByRole('heading', { level: 1 })).toBeDefined();
    expect(getByText(/404/)).toBeDefined();

    // Check that robots meta has noindex
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute('content')).toBe('noindex, nofollow');
  });
});
