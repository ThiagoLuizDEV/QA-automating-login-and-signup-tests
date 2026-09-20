import { expect, test } from '@playwright/test';

test('all products names begin with "Sauce Labs"', async ({ page }) => {
    test.fail(true, 'This test is expected to fail because the product names do not all begin with "Sauce Labs"');

    await test.step('login', async () => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();   
    });

    await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');

    await test.step('check products names', async () => {
        const products = await page.locator('.inventory_item_name');
        const productCount = await products.allTextContents();
        for (const item of productCount) {
            await expect(item.slice(0, 10)).toBe('Sauce Labs');
        };    
    });

    await test.step('check description products', async () => {
        const products = await page.locator('.inventory_item_desc');
        const productCount = await products.allTextContents();
        for (const item of productCount) {
            expect(item).not.toMatch(/[A-Za-z]+\.[A-Za-z]+/);

        }
    });
});
