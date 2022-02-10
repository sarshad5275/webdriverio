import NexportLoginPage from '../pageobjects/nexportLogin.page';
import NexportSearchPage from '../pageobjects/search.page';
import NexportHomePage from '../pageobjects/nexportHome.page';
import Asserts from '../common/Asserts';
import testdata from '../testdata/td.json';
import logindata from '../resources/loginproperties'

describe('My Nexport Login application', () => {   
    it('Login to Nexport with valid credentials', async () => {       
        await NexportLoginPage.open();
        await NexportLoginPage.loginClick();
        //getting the username and password from .env file
        //process.env.NEXUSERNAME and process.env.NEXPASSWORD
        await NexportLoginPage.login(logindata.NEXUSERNAME, logindata.NEXPASSWORD);
       // await NexportLoginPage.loginWithBcrypt(process.env.NEXUSERNAME, process.env.NEXPASSWORD);
        const nexHome = await NexportHomePage.homeLink();       
        Asserts.equal(await nexHome.getText(), 'HOME');
    }); 
    
    it('User should be able to search with Admin in JobTitle Field', async () => {        
        await NexportSearchPage.clickSearch();
        await NexportSearchPage.setTitle("Admin");
        await browser.pause(5000);       
        const adminsActual = await NexportSearchPage.getEmpList();
        var expectedListOfEmployees = testdata.AdminData; 
        Asserts.isArrayEqual(adminsActual, expectedListOfEmployees);
    });

    it('User should be able to search Skill Field using Automation Testing', async () => { 
        await NexportSearchPage.clickSearch();
        await NexportSearchPage.clearValues();  
        await NexportSearchPage.setSkill("Automation Testing");
        await browser.pause(5000);       
        const qeListActual = await NexportSearchPage.getEmpList();
        var expectedListOfEmployees = testdata.Qe_Automation_Emp_Data; 
        Asserts.isArrayEqual(qeListActual.sort(), expectedListOfEmployees.sort());
    });   
}); 