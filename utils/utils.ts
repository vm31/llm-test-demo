import { Page } from '@playwright/test';
import * as yaml from 'js-yaml';
import * as fs from 'fs/promises';

export const utils = {
    
    launch: async (page: Page, url: string): Promise<void> => {
        await page.goto(url);
    },
    isVisible: async (page: Page, selector: string): Promise<boolean> => {
        const element = page.locator(selector);
        return element.isVisible();
    },
    checkUrlContains: async (page: Page, path: string): Promise<boolean> => {
        const currentUrl = page.url();
        return currentUrl.includes(path);
    },
    clickElementBySelector: async (page: Page, selector: string): Promise<void> => {
        await page.locator(selector).click();
    },
    clickElementText: async (page: Page, text: string): Promise<void> => {
        await page.locator(`text=${text}`).click();
    },
    enterText: async (page: Page, selector: string, inputText: string): Promise<void> => {
        await page.locator(selector).fill(inputText);
    },
    getText: async (page: Page, selector: string): Promise<string> => {
        const text = await page.locator(selector).textContent();
        return text?.trim() || '';
    },
    loadLocators: async (): Promise<any> => {
        const fileContents = await fs.readFile('locators.yaml', 'utf8');
        return yaml.load(fileContents);
    },
};
