import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import LandingHero3D from '../LandingHero3D';
import { renderWithProviders } from '../../../../test/helpers/renderWithProviders';

describe('LandingHero3D component (WebGL boundary & HTML overlay)', () => {
  it('always renders semantic HTML headings and action buttons', () => {
    renderWithProviders(<LandingHero3D />);

    // H1 heading from HeroDOMOverlay
    expect(
      screen.getByRole('heading', { level: 1 })
    ).toBeInTheDocument();

    // Primary and secondary CTA buttons
    expect(
      screen.getByRole('button', { name: /to services|все услуги/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /contact|связаться/i })
    ).toBeInTheDocument();
  });

  it('renders the scroll indicator button', () => {
    renderWithProviders(<LandingHero3D />);

    const scrollBtn = screen.getByRole('button', {
      name: /scroll to explore|scroll/i,
    });
    expect(scrollBtn).toBeInTheDocument();
  });
});
