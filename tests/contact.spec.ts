import {test, expect} from "@playwright/test"
import ContactPage from "../pages/contact.page";
// import {faker} from '@faker-js/faker'
const { faker } = require('@faker-js/faker');

test.describe('Contact', () => {
    let contactPage: ContactPage
    test('Fill contact form and verify success message', async ({ page }) => {
        contactPage = new ContactPage(page)
        
        //open contact page
        await contactPage.navigate()

        //fill out the input fields
        await contactPage.submitForm(faker.person.fullName(),faker.internet.email(),faker.phone.number(),faker.lorem.paragraphs(2))

        //add a soft assertion
        // await expect.soft(page.locator('.contact-message textarea')).toHaveText('')

        //verify no soft assertion failures here, if any failures then stop here
        expect(test.info().errors.length).toBeLessThan(1)        
        
        //verify success message
        const successAlert = contactPage.successMessage
        await expect(successAlert).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
    });
    
});
