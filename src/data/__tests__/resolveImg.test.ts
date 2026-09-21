import { describe, expect, it } from 'vitest';
import { resolveImg, placeholderUrl, ORIGIN, IMAGES_BASE, UPLOADS_BASE } from '../resolveImg';

describe('resolveImg utility', () => {
  it('returns absolute http and https URLs untouched', () => {
    expect(resolveImg('https://example.com/photo.jpg')).toBe(
      'https://example.com/photo.jpg'
    );
    expect(resolveImg('http://cdn.org/image.png')).toBe(
      'http://cdn.org/image.png'
    );
  });

  it('maps public /img/ paths to the current origin', () => {
    const result = resolveImg('/img/banner.webp');
    expect(result).toBe(`${ORIGIN}/img/banner.webp`);

    const resultWithoutSlash = resolveImg('img/icons/check.svg');
    expect(resultWithoutSlash).toBe(`${ORIGIN}/img/icons/check.svg`);
  });

  it('handles uploads paths with correct subpath normalization', () => {
    expect(resolveImg('uploads/products/item.jpg')).toBe(
      `${UPLOADS_BASE}/products/item.jpg`
    );
    expect(resolveImg('/uploads/documents/spec.pdf')).toBe(
      `${UPLOADS_BASE}/documents/spec.pdf`
    );
    expect(resolveImg('some/nested/uploads/file.png')).toBe(
      `${UPLOADS_BASE}/file.png`
    );
  });

  it('handles windows backslashes in paths', () => {
    expect(resolveImg('uploads\\sub\\photo.jpg')).toBe(
      `${UPLOADS_BASE}/sub/photo.jpg`
    );
  });

  it('maps /images/ catalog paths correctly', () => {
    expect(resolveImg('/images/steel-table.jpg')).toBe(
      `${IMAGES_BASE}/steel-table.jpg`
    );
    expect(resolveImg('images/sink.png')).toBe(
      `${IMAGES_BASE}/sink.png`
    );
  });

  it('maps other root-relative paths to the origin', () => {
    expect(resolveImg('/custom/asset.png')).toBe(
      `${ORIGIN}/custom/asset.png`
    );
  });

  it('treats bare relative paths as catalog images', () => {
    expect(resolveImg('catalog/shelf.jpg')).toBe(
      `${IMAGES_BASE}/catalog/shelf.jpg`
    );
  });

  it('returns empty string for empty or null inputs by default', () => {
    expect(resolveImg(null)).toBe('');
    expect(resolveImg(undefined)).toBe('');
    expect(resolveImg('')).toBe('');
    expect(resolveImg('   ')).toBe('');
  });

  it('returns placeholderUrl when placeholderFallback option is true', () => {
    expect(resolveImg(null, { placeholderFallback: true })).toBe(
      placeholderUrl()
    );
    expect(resolveImg('', { placeholderFallback: true })).toBe(
      placeholderUrl()
    );
  });

  describe('placeholderUrl', () => {
    it('returns the placeholder image path on the origin', () => {
      expect(placeholderUrl()).toBe(
        `${ORIGIN}/img/elementor-placeholder-image.png`
      );
    });
  });
});
