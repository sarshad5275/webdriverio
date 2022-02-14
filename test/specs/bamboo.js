//import 'chai/register-should';
import BambooLoginPage from '../pageobjects/bambooLogin.page';
import BambooHomePage from '../pageobjects/bambooHome.page';
import logindata from '../resources/secretproperties'

describe('My Nexport Login application', () => {

    it('User should login to Bamboo HR with valid credentials', async () => {
        await BambooLoginPage.open();     
        //get the data from json                                          
        await BambooLoginPage.login(logindata.BAMBOO_USERNAME, logindata.BAMBOO_PASSWORD);
        const bambooHome = await BambooHomePage.homeLink();
        const homeTxt = await bambooHome.getText();
        console.log("nexHome  = " + homeTxt);
        await cExpect(homeTxt).to.equal('Home');
    }); 

});