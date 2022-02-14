import NexportLoginPage from '../pageobjects/ui/nexportLogin.page';
import NexportSearchPage from '../pageobjects/ui/search.page';
import NexportHomePage from '../pageobjects/ui/nexportHome.page';
import Asserts from '../common/Asserts';
import testdata from '../testdata/td.json';
import logindata from '../resources/secretproperties'
import managepassword from '../utility/managepassword';

describe('My Nexport Login application', () => {   
    it('Login to Nexport with valid credentials', async () => {       
        await NexportLoginPage.open();
        await NexportLoginPage.loginClick();
        const encryptedpwd =   managepassword.encrypt(logindata.NEXPASSWORD); 
        await NexportLoginPage.login(logindata.NEXUSERNAME, encryptedpwd);
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
        Asserts.isArrayEqual(qeListActual, expectedListOfEmployees);
    });   
}); 