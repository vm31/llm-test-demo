```typescript
import { test, expect } from '@playwright/test';
import * as path from 'path';

test('User Sign-In Functionality Test Suite', async ({ page }) => {
  // Login Page URL
  const loginPageUrl = 'https://example.com/login';

  // Dashboard Page URL
  const dashboardPageUrl = 'https://example.com/dashboard';

  // Test Case 1: Successful Login
  test('Successful Login', async () => {
    await page.goto(loginPageUrl);
    await page.fill('#email', 'valid_email@example.com');
    await page.fill('#password', 'valid_password');
    await page.click('#sign-in-button');
    await expect(page).toHaveURL(dashboardPageUrl);
    await expect(page.locator('text')).not.toContain('Error');
  });

  // Test Case 2: Invalid Email Address
  test('Invalid Email Address', async () => {
    await page.goto(loginPageUrl);
    await page.fill('#email', 'invalid_email@example.com');
    await page.fill('#password', 'valid_password');
    await page.click('#sign-in-button');
    await expect(page.locator('text')).toContain('Invalid email or password. Please try again.');
  });

  // Test Case 3: Invalid Password
  test('Invalid Password', async () => {
    await page.goto(loginPageUrl);
    await page.fill('#email', 'valid_email@example.com');
    await page.fill('#password', 'invalid_password');
    await page.click('#sign-in-button');
    await expect(page.locator('text')).toContain('Invalid email or password. Please try again.');
  });

  // Test Case 4: Empty Email Field
  test('Empty Email Field', async () => {
    await page.goto(loginPageUrl);
    await page.fill('#email', '');
    await page.fill('#password', 'valid_password');
    await page.click('#sign-in-button');
    await expect(page.locator('text')).toContain('Please fill out all required fields.');
  });

  // Test Case 5: Empty Password Field
  test('Empty Password Field', async () => {
    await page.goto(loginPageUrl);
    await page.fill('#email', 'valid_email@example.com');
    await page.fill('#password', '');
    await page.click('#sign-in-button');
    await expect(page.locator('text')).toContain('Please fill out all required fields.');
  });

  // Test Case 6: Forgot Password
  test('Forgot Password', async () => {
    await page.goto(loginPageUrl);
    await page.click('text=Forgot Password');
    await page.fill('#email', 'valid_email@example.com');
    await page.click('text=Submit');
    await expect(page.locator('text')).toContain('Password recovery initiated.');
  });

  // Test Case 7: CAPTCHA
  test('CAPTCHA', async () => {
    await page.goto(loginPageUrl);
    await page.fill('#email', 'valid_email@example.com');
    await page.fill('#password', 'valid_password');
    await page.click('#sign-in-button');
    await expect(page.locator('text')).not.toContain('CAPTCHA');
    await page.locator('img').first().click();
    await expect(page.locator('text')).toContain('CAPTCHA complete. You can now sign in.');
  });

  // Test Case 8: Lockout
  test('Lockout', async () => {
    await page.goto(loginPageUrl);
    await page.fill('#email', 'invalid_email@example.com');
    await page.fill('#password', 'invalid_password');
    for (let i = 0; i < 5; i++) {
      await page.click('#sign-in-button');
    }
    await expect(page.locator('text')).toContain('Account locked. Multiple failed login attempts.');
  });
});
```