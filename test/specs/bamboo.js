//import 'chai/register-should';
import BambooLoginPage from '../pageobjects/bambooLogin.page';
import BambooHomePage from '../pageobjects/bambooHome.page';

describe('My Nexport Login application', () => {

    it('should login with valid credentials1', async () => {
        await BambooLoginPage.open();     
        //get the data from json                                          
        await BambooLoginPage.login(process.env.BAMBOO_USERNAME, process.env.BAMBOO_PASSWORD);
        const bambooHome = await BambooHomePage.homeLink();
        const homeTxt = await bambooHome.getText();
        console.log("nexHome  = " + homeTxt);
        await cExpect(homeTxt).to.equal('HOME');
    }); 

});