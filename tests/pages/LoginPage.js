// Login Page Object Model
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.inventoryList = page.locator('.inventory_list');
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isErrorMessageVisible() {
    return await this.errorMessage.isVisible();
  }

  async isInventoryListVisible() {
    return await this.inventoryList.isVisible();
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}

module.exports = LoginPage;
