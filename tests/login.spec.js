const { test, expect } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');
const users = require('./users.json');
const fs = require('fs');
const path = require('path');

test.describe('SauceDemo Login Tests', () => {
  // TEST CASE 1 — Successful Login with Valid Credentials
  test('TC1: Successful Login with Valid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users.validUser.username, users.validUser.password);
    
    // Assert URL contains /inventory.html
    expect(page.url()).toContain('/inventory.html');
    
    // Assert page title or inventory list is visible
    await expect(loginPage.inventoryList).toBeVisible();
  });

  // TEST CASE 2 — Login Using Storage State (Session Reuse)
  test('TC2: Login Using Storage State (Session Reuse)', async ({ page, context, browser }) => {
    // First, perform login to generate storageState
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users.validUser.username, users.validUser.password);
    
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');
    
    // Save storage state
    const storageState = await context.storageState();
    const storageStatePath = path.join(__dirname, 'storageState.json');
    fs.writeFileSync(storageStatePath, JSON.stringify(storageState));

    // Now use the storageState for a new context and page
    const newContext = await browser.newContext({ storageState: storageState });
    const sessionPage = await newContext.newPage();
    const sessionLoginPage = new LoginPage(sessionPage);
    
    // Navigate directly to inventory page
    await sessionPage.goto('https://www.saucedemo.com/inventory.html');
    
    // Assert inventory page loads without login redirect
    expect(sessionPage.url()).toContain('/inventory.html');
    
    // Assert product list is visible
    await expect(sessionLoginPage.inventoryList).toBeVisible();
    
    await newContext.close();
  });

  // TEST CASE 3 — Login Failure with Locked Out User
  test('TC3: Login Failure with Locked Out User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    const lockedUser = users.users.find(u => u.username === 'locked_out_user');
    await loginPage.login(lockedUser.username, lockedUser.password);
    
    // Assert error message is visible
    await expect(loginPage.errorMessage).toBeVisible();
    
    // Assert error message contains "locked out"
    const errorText = await loginPage.getErrorMessage();
    expect(errorText.toLowerCase()).toContain('locked out');
  });

  // TEST CASE 4 — Login Failure with Empty Credentials
  test('TC4: Login Failure with Empty Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.clickLogin();
    
    // Assert error message is visible
    await expect(loginPage.errorMessage).toBeVisible();
    
    // Assert error message contains "Username is required"
    const errorText = await loginPage.getErrorMessage();
    expect(errorText.toLowerCase()).toContain('username is required');
  });

  // TEST CASE 5 — Login Failure with Wrong Password
  test('TC5: Login Failure with Wrong Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users.validUser.username, 'wrongpassword');
    
    // Assert error message is visible
    await expect(loginPage.errorMessage).toBeVisible();
    
    // Assert error contains "Username and password do not match"
    const errorText = await loginPage.getErrorMessage();
    expect(errorText.toLowerCase()).toContain('username and password do not match');
  });
});
