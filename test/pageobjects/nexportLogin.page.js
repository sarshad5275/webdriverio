import Page from './page';
import apiurls from '../resources/baseurls';
import elementActions from '../common/elementActions';
import managepassword from '../utility/managepassword';
import Asserts from '../common/Asserts';


/**
 * sub page containing specific selectors and methods for a specific page
 */
class NexportLoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get baseurl() { return apiurls.nexportURL };
    //'#input_0': ID
    get inputUsername() { return $('[name="username"]') };
    get btnloginNextport() { return $("//a[text() = 'login']") };
    //#input_1 : ID
    get inputPassword() { return $('[name="password"]') };
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
    //loginWithBcrypt - This would compare the entered password with the encrypted password and verifies. it is highly not possible to decrypt this password 
    async loginWithBcrypt(username, password) {      
        await elementActions.setValue(await this.inputUsername, 'USERNAME', username); 
        const isPasswordMatch = managepassword.compare(process.env.HASHED_NEXPASSWORD, password);   
        if (isPasswordMatch) {
            console.log("Passwords matched.");
            await elementActions.setValue(await this.inputPassword, 'PASSWORD', process.env.TESTPASSWORD); 
        } else {
            Asserts.fail("Incorrect password entered.");
        }  
        
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
