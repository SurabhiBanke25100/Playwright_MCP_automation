const { chromium } = require('@playwright/test')
const users = require('./users.json')

async function saveStorageState() {
  console.log('Launching browser...')
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    await page.goto('https://www.saucedemo.com')
    console.log('Navigated to SauceDemo')

    await page.locator('#user-name').fill(users.validUser.username)
    await page.locator('#password').fill(users.validUser.password)
    await page.locator('#login-button').click()

    await page.waitForURL('**/inventory.html')
    console.log('✅ Login successful!')

    await context.storageState({ path: 'tests/storageState.json' })
    console.log('💾 Storage state saved!')

  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  } finally {
    await browser.close()
    console.log('Browser closed.')
  }
}

saveStorageState()