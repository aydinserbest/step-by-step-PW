import { Page } from "@playwright/test";

export class Helper {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async login(email: string, password: string) {
        await this.page.fill("#email", email);
        await this.page.fill("#password", password);
        await this.page.click("#login-btn");
    }
    
}
//this class is used to create helper methods that can be used in all page objects
//with inheritance