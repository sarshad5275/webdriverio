import Page from './page';
import apiurls from '../resources/baseurls';
import elementActions from '../common/elementActions';
import managepassword from '../utility/managepassword';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class BambooLoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get baseurl() { return apiurls.bambooURL };
    get email() { return $('#lemail') };    
    get inputPassword() { return $('#password') };
    get btnLoginSubmit() { return $("//button[@type = 'submit']") };
    get rememberMe() { return $('[type = "checkbox"]') };

    async login(email, password) {      
        await elementActions.setValue(await this.email, 'EMAIL', email); 
        const decryptedPassword = managepassword.decrypt(password);
        await elementActions.setValue(await this.inputPassword, 'PASSWORD', decryptedPassword);        
        await elementActions.click(await this.btnLoginSubmit, "Login Submit");
        await browser.maximizeWindow();      
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    async open() {
        console.log("Baseurl = " + this.baseurl);
        await super.open(this.baseurl, null);
    }
}

export default new BambooLoginPage();
