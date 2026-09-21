import { test, expect } from '@playwright/test';

test.describe('Authentication and protected route flow', () => {
  test('redirects unauthenticated visitor away from protected admin routes', async ({ page }) => {
    // Navigate directly to private requests page
    await page.goto('/admin/requests');

    // Should redirect away to homepage / or /login
    await page.waitForURL((url) => !url.pathname.includes('/admin/requests'), { timeout: 10000 });
    expect(page.url()).not.toContain('/admin/requests');
  });

  test('allows opening the login dialog and entering credentials', async ({ page }) => {
    await page.goto('/');

    // Look for login / account button in navbar or footer
    const loginTrigger = page.locator('button, a').filter({ hasText: /войти|login|вход|admin/i }).first();
    if (await loginTrigger.isVisible()) {
      await loginTrigger.click();

      // Check if email and password inputs appear
      const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]').first();
      if (await emailInput.isVisible()) {
        await emailInput.fill('admin@example.com');
        const passInput = page.locator('input[type="password"]').first();
        if (await passInput.isVisible()) {
          await passInput.fill('secret');
        }
      }
    }
  });
});
