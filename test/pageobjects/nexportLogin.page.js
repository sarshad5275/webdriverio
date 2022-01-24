import Page from './page';
import configdata from '../resources/configdata';
import elementActions from '../common/elementActions';
import managepassword from '../utility/managepassword';


/**
 * sub page containing specific selectors and methods for a specific page
 */
class NexportLoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get baseurl() { return configdata.nexportURL };
    get inputUsername() { return $('#input_0') };
    get btnloginNextport() { return $("//a[text() = 'login']") };
    get inputPassword() { return $('#input_1') };
    get btnLoginSubmit() { return $("//button[@type = 'submit']") };
    get rememberMe() { return $('[type = "checkbox"]') };

 
    async loginClick() {       
        await elementActions.click(await this.btnloginNextport, 'Nexport Login');     
    }  

    async login(username, password) {      
        await elementActions.setValue(await this.inputUsername, 'USERNAME', username); 
        const decryptedPassword = managepassword.decrypt(password);
        await elementActions.setValue(await this.inputPassword, 'PASSWORD', decryptedPassword); 
        await elementActions.selectCheckbox(await this.rememberMe, 'RememberMe Checkbox'); 
        await elementActions.click(await this.btnLoginSubmit, "Login Submit");          
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    async open() {
        console.log("Baseurl = " + this.baseurl);
        await super.open(this.baseurl, null);
    }
}

export default new NexportLoginPage();
