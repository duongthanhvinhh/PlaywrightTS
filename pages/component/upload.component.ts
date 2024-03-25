import {Page} from '@playwright/test'

class UploadComponent {
  private page: Page
    uploadInput: string
    submitBtn: any
    successTxt: any

  constructor(page: Page) {
    this.page = page
    // const filePath = path.join(__dirname, '../data/logotitle.png')
    this.uploadInput = 'input#upfile_1'
    this.submitBtn = page.locator('#upload_1')
    this.successTxt = page.locator('#wfu_messageblock_header_1_1')
  }

  async uploadFile(filePath: string){
            await this.page.setInputFiles('input#upfile_1',filePath)
            await this.submitBtn.click()
  }
}

export default UploadComponent;