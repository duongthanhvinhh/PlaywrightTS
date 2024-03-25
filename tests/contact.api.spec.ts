import {test, expect, APIRequestContext, APIResponse} from "@playwright/test"
import ContactPage from "../pages/contact.page";
import {faker} from '@faker-js/faker'
import apiController from "../controller/api.controller";

test.describe('Contact', () => {
    let contactPage: ContactPage
    // let fakeApi: APIRequestContext
    let randomPerson: APIResponse

test.beforeAll(async ({ playwright }) => {
    await apiController.init()

    randomPerson = await apiController.getUsers()
    const newUserTodo = await apiController.createUserTodo()

});


    test('Fill contact form and verify success message', async ({ page }) => {
        contactPage = new ContactPage(page)
        
        //open contact page
        await contactPage.navigate()

        //fill out the input fields
        await contactPage.submitForm(randomPerson['name'],randomPerson['email'],randomPerson['phone'],randomPerson['website'])

        //add a soft assertion
        // await expect.soft(page.locator('.contact-message textarea')).toHaveText('')

        //verify no soft assertion failures here, if any failures then stop here
        expect(test.info().errors.length).toBeLessThan(1)        
        
        //verify success message
        const successAlert = contactPage.successMessage
        await expect(successAlert).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
    });
    
});
