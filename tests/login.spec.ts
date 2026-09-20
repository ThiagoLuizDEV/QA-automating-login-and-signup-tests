import { expect, test } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(await page.title()).toBe('Swag Labs');
  

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    const productsTitle = await page.locator('.header_secondary_container > span');
    await expect(productsTitle).toHaveText('Products');
});

test('Login with invalid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(await page.title()).toBe('Swag Labs');

    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill('invalid_password');
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = await page.getByText('Epic sadface: Username and password do not match any user in this service');
    await expect(errorMessage).toBeVisible();

    await page.locator('[data-test="error-button"]').click();
});
