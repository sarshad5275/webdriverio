//import 'chai/register-should';
import BambooLoginPage from '../pageobjects/ui/bambooLogin.page';
import BambooHomePage from '../pageobjects/ui/bambooHome.page';
import logindata from '../resources/secretproperties'
import managepassword from '../utility/managepassword';

describe('My Nexport Login application', () => {

    it('User should login to Bamboo HR with valid credentials', async () => {
        await BambooLoginPage.open();     
        //get the data from json  
        console.log("Bamboo details:"+logindata.BAMBOO_PASSWORD)
        const encryptedpwd =   managepassword.encrypt(logindata.BAMBOO_PASSWORD);    
        console.log("Bamboo details- encryption:"+encryptedpwd)                                  
        await BambooLoginPage.login(logindata.BAMBOO_USERNAME, encryptedpwd);
        const bambooHome = await BambooHomePage.homeLink();
        const homeTxt = await bambooHome.getText();
        console.log("nexHome  = " + homeTxt);
        await cExpect(homeTxt).to.equal('Home');
    }); 

});