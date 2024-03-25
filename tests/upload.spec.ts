import {test, expect} from "@playwright/test"
import CartPage from "../pages/cart.page";
import path from "path";

test.describe('Upload file', () => {
    let carPage: CartPage

    const fileName: string[] = [
        'logotitle.png',
        'stepsPublicationWorkflow.png'
    ]

    for(const name of fileName){
        test(`Verify can upload a ${name} file`, async ({ page }) => {

            carPage = new CartPage(page)
    
            //open cart page
            await page.goto('/cart')
    
            //provide test file path
            const filePath = path.join(__dirname, `../data/${name}`)
            
            //upload test file
            carPage.uploadComponent().uploadFile(filePath)
    
            //hardcoded sleep - Wrong way
            // await page.waitForTimeout(5000)
    
            //conditional wait
            // await page.locator('#wfu_messageblock_header_1_1').waitFor({state: 'visible', timeout: 10000})
    
            //assertion wait
            await expect(carPage.uploadComponent().successTxt).toContainText('uploaded successfully',{timeout: 8000})
    
            //assertions
            await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully')
    
        });
    }
    
    test('Verify can upload a file', async ({ page }) => {

        carPage = new CartPage(page)

        //open cart page
        await page.goto('/cart')

        //provide test file path
        const filePath = path.join(__dirname, '../data/logotitle.png')
        
        //upload test file
        carPage.uploadComponent().uploadFile(filePath)

        //hardcoded sleep - Wrong way
        // await page.waitForTimeout(5000)

        //conditional wait
        // await page.locator('#wfu_messageblock_header_1_1').waitFor({state: 'visible', timeout: 10000})

        //assertion wait
        await expect(carPage.uploadComponent().successTxt).toContainText('uploaded successfully',{timeout: 8000})

        //assertions
        await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully')

    });
    
    test('Verify can upload a file on a hidden input field', async ({ page }) => {

        //open blog page
        await page.goto('/cart')

        //provide test file path
        const filePath = path.join(__dirname, '../data/logotitle.png')

        //DOM manipulation
        await page.evaluate(()=>{
            const selector = document.querySelector('input#upfile_1')
            if(selector){
                selector.className = ''
            }
        })
        
        //upload test file
        await page.setInputFiles('input#upfile_1',filePath)

        //click the submit button

        await page.locator('#upload_1').click()

        //assertions
        await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully')

    });
    
});
