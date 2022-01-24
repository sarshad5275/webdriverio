//import 'chai/register-should';
import BambooLoginPage from '../pageobjects/bambooLogin.page';
import BambooHomePage from '../pageobjects/bambooHome.page';
import credentials from '../testdata/creds.json';

describe('My Nexport Login application', () => {

    it('should login with valid credentials1', async () => {
        await BambooLoginPage.open();     
        //get the data from json                                          
        await BambooLoginPage.login(credentials.nexport.username, process.env.BambooPassword);
        const bambooHome = await BambooHomePage.homeLink();
        const homeTxt = await bambooHome.getText();
        console.log("nexHome  = " + homeTxt);
        await cExpect(homeTxt).to.equal('HOME');
    }); 

});