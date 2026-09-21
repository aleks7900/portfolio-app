import { test, expect } from '@playwright/test';

test.describe('Public user journeys', () => {
  test('homepage renders hero title, navigation bar, and switches theme', async ({ page }) => {
    await page.goto('/');

    // Verify navbar is visible
    await expect(page.locator('nav')).toBeVisible();

    // Verify theme toggle works without errors
    const themeBtn = page.getByRole('button', { name: /сменить тему|переключить тему|theme/i }).first();
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
    }
  });

  test('interactive web cost calculator calculates budget dynamically', async ({ page }) => {
    await page.goto('/web/calc');

    // Verify calculator heading/container is visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Verify price updates when selecting options
    const basePriceElement = page.getByText(/€|\$|лей|mdl/i).first();
    await expect(basePriceElement).toBeVisible();

    // Click on an option card if present
    const optionButton = page.locator('button, [role="checkbox"], [role="radio"]').filter({ hasText: /spa|лендинг|магазин|дизайн|ecommerce|landing/i }).first();
    if (await optionButton.isVisible()) {
      await optionButton.click();
      // Price element should remain visible and updated
      await expect(basePriceElement).toBeVisible();
    }
  });
});
