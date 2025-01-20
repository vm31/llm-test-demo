import { askOllama } from "../askOllama";

const regressionSuite ='requirements/swagger.ui.md';
const outputFilePath = 'tests/swagger.spec.ts';
const customPrompt = `You are a software test engineer. Generate functional test cases for a Swagger application using Playwright in TypeScript based on the following requirement document:\n\n{content}.Generate only the test content without any commentary or extra text
    Example:    
    import { test, expect } from '@playwright/test';

    test.describe('Login Tests', () => {
        test.beforeEach(async ({ page }) => {
        await page.goto('https://swagger.io');
        const acceptCoockiesBtn = await page.getByRole('button', { name: 'Allow all cookies' });
        await expect(acceptCoockiesBtn).toBeVisible();
        acceptCoockiesBtn.click();
        page.getByTitle('Sign In').click();
        });

        test('should log in with valid credentials', async ({ page }) => {
        // Add test implementation here
        });

        test('should show an error for invalid credentials', async ({ page }) => {
        // Add test implementation here
        });
});`

askOllama(regressionSuite, outputFilePath,customPrompt)
    .then(() => console.log('Test cases generated cypress test suite successfully!'))
    .catch(error => console.error('Failed to generate test cases:', error));
