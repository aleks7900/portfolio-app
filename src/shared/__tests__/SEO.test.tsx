import { describe, expect, it } from 'vitest';
import SEO from '../SEO';
import { renderWithProviders } from '../../test/helpers/renderWithProviders';

describe('SEO component', () => {
  it('renders title and meta tags into document head', () => {
    renderWithProviders(
      <SEO
        title="Тестовая страница"
        description="Тестовое описание страницы"
        keywords={['тест', 'react']}
      />
    );

    // In React 19 document head contains hoisted title/meta
    expect(document.title).toBe('Тестовая страница');

    const descMeta = document.querySelector('meta[name="description"]');
    expect(descMeta).toHaveAttribute('content', 'Тестовое описание страницы');

    const kwMeta = document.querySelector('meta[name="keywords"]');
    expect(kwMeta).toHaveAttribute('content', expect.stringContaining('тест'));
  });

  it('renders structured data JSON-LD scripts', () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Alex-Lab Test',
    };

    renderWithProviders(<SEO title="SEO Test" structuredData={jsonLd} />);

    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const matchedScript = Array.from(scripts).find((s) =>
      s.textContent?.includes('Alex-Lab Test')
    );
    expect(matchedScript).toBeDefined();
  });
});
