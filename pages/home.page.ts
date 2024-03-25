import {Page, Locator} from '@playwright/test'

class HomePage {
  page: Page;
  getStartedBtn: Locator;
  headingText: Locator;
  homeLink: Locator;
  navLinks: Locator;

  constructor(page: Page) {
    this.page = page
    this.getStartedBtn = page.locator('#get-started')
    this.headingText = page.locator('text=Think different. Make different.')
    this.homeLink = page.locator('#zak-primary-menu:has-text("Home")')
    this.navLinks = page.locator('#zak-primary-menu li[id*=menu]')
  }

  async navigate(){
    await this.page.goto('/')
  }

  async getNavLinksText(){
    return this.navLinks.allTextContents()
  }
}

export default HomePage;