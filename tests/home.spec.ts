import {expect, test} from "@playwright/test"
import HomePage from "../pages/home.page"

test.describe('Home page tests', () => {
    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.navigate()
    })
    
    
    test('Click get started button using CSS Selector', async ({ page }) => {

        await expect(page).not.toHaveURL(/.*#get-started/)
    
        //click the button
        // await page.locator('#get-started').click()
        await homePage.getStartedBtn.click()
    
        await expect(page).toHaveURL(/.*#get-started/)
        await expect(page).toHaveURL('https://practice.sdetunicorns.com/#get-started')
    })
    
    
    test('Verify heading text is visible using text selector', async () => {
        //find the text locator 
        // const headingText = page.locator('text=Think different. Make different.')
        const headingText = homePage.headingText

        //verify heading text is visible
        await expect(headingText).toBeVisible()
        // await expect(headingText).not.toBeHidden()
    })
    
    test('Verify home link is enabled using text and css selector', async () => {
        //find the home text
        // const homeText = page.locator('#zak-primary-menu >> text=Home')
        // const homeText = page.locator('#zak-primary-menu:has-text("Home")')
        const homeText = homePage.homeLink
    
        //verify heading text is visible
        await expect(homeText).toBeEnabled()
    })
    
    test('Verify text of all nav links', async () => {
        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account"
        ]
        //find the nav links
        // const navLinks = page.locator('#zak-primary-menu li[id*=menu]')
        const navLinks = homePage.navLinks
        const navLinks3th = navLinks.nth(3)
    
        //print out all the nav links
        for (const navLink of await navLinks.elementHandles()) {
            console.log(await navLink.textContent());
            
        }
    
        //verify nav link texts
        expect(await homePage.getNavLinksText()).toEqual(expectedLinks)
        await expect(navLinks3th).toHaveText(expectedLinks[3])
    })
});
