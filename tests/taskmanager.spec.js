const { test, expect } = require('@playwright/test');

     test('should add and delete a task', async ({ page }) => {
       await page.goto('/');
       await page.fill('input[placeholder="Task Title"]', 'Test Task');
       await page.fill('textarea[placeholder="Task Description"]', 'Test Description');
       await page.click('button[type="submit"]');
       await expect(page.locator('h3:has-text("Test Task")')).toBeVisible();
       await page.click('button:has-text("Delete")');
       await expect(page.locator('h3:has-text("Test Task")')).not.toBeVisible();
     });