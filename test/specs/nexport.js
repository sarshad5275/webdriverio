import NexportLoginPage from '../pageobjects/nexportLogin.page';
import NexportSearchPage from '../pageobjects/search.page';
import NexportHomePage from '../pageobjects/nexportHome.page';
import Asserts from '../common/Asserts';
import testdata from '../testdata/td.json';

describe('My Nexport Login application', () => {   
    it('Login to Nexport with valid credentials', async () => {       
        await NexportLoginPage.open();
        await NexportLoginPage.loginClick();
        //get the data from json  
        await NexportLoginPage.login(process.env.NEXUSERNAME, process.env.NEXPASSWORD);
       // await NexportLoginPage.loginWithBcrypt(process.env.NEXUSERNAME, process.env.NEXPASSWORD);
        const nexHome = await NexportHomePage.homeLink();       
        Asserts.equal(await nexHome.getText(), 'HOME');
    }); 
    
    it('Search with Admin in JobTitle Field', async () => {        
        await NexportSearchPage.clickSearch();
        await NexportSearchPage.setTitle("Admin");
        await browser.pause(5000);       
        const adminsActual = await NexportSearchPage.getEmpList();
        var expectedListOfEmployees = testdata.AdminData; 
        Asserts.isArrayEqual(adminsActual, expectedListOfEmployees);
    });

    it('Search Skill Field', async () => { 
        await NexportSearchPage.clickSearch();
        await NexportSearchPage.clearValues();  
        await NexportSearchPage.setSkill("Automation Testing");
        await browser.pause(5000);       
        const qeListActual = await NexportSearchPage.getEmpList();
        var expectedListOfEmployees = testdata.Qe_Automation_Emp_Data; 
        Asserts.isArrayEqual(qeListActual, expectedListOfEmployees);
    });   
});