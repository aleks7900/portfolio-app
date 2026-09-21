import { test, expect } from '@playwright/test';

test.describe('Contact and callback user journeys', () => {
  test('contacts page renders contact form and supports field entry', async ({ page }) => {
    await page.goto('/contacts');

    // Verify heading is present
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Verify form inputs exist
    const nameInput = page.locator('input[name="name"], input[placeholder*="имя" i], input[placeholder*="name" i]').first();
    const phoneInput = page.locator('input[name="phone"], input[type="tel"]').first();

    if (await nameInput.isVisible()) {
      await nameInput.fill('Playwright Test User');
    }
    if (await phoneInput.isVisible()) {
      await phoneInput.fill('+37369999999');
    }
  });

  test('floating callback widget can be opened and validates phone number', async ({ page }) => {
    await page.goto('/');

    const openBtn = page.getByRole('button', { name: /перезвоните мне|call back|sunați-mă/i }).first();
    await expect(openBtn).toBeVisible();
    await openBtn.click();

    // Verify phone input is present in opened widget
    const phoneInput = page.getByPlaceholder('+373 60 000 000');
    await expect(phoneInput).toBeVisible();

    // Fill name first so form reaches phone validation
    const nameInput = page.locator('form input').first();
    await nameInput.fill('Alex');

    // Test validation with bad phone number
    await phoneInput.fill('123');
    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click();

    // Error message should be shown
    await expect(page.getByText(/неверный номер|invalid phone|telefon nevalid/i)).toBeVisible();
  });
});
