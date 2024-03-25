import {Page, Locator} from '@playwright/test'

class ContactPage {
  page: Page;
  nameInput: Locator;
  emailInput: Locator;
  phoneInput: Locator;
  messageTxtArea: Locator;
  submitBtn: Locator;
  successMessage: Locator;


  constructor(page: Page) {
    this.page = page
    this.nameInput = page.locator('.contact-name input')
    this.emailInput = page.locator('.contact-email input')
    this.phoneInput = page.locator('.contact-phone input')
    this.messageTxtArea = page.locator('.contact-message textarea')
    this.submitBtn = page.locator('button[type=submit]')
    this.successMessage = page.locator('div[role="alert"]')
  }

  async navigate(){
    await this.page.goto('/contact')
  }

  async submitForm(name: string, email: string, phone: string, message: string){
    await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.phoneInput.fill(phone)
    await this.messageTxtArea.fill(message)
    await this.page.waitForTimeout(5000)
    await this.submitBtn.click()
  }


}

export default ContactPage;