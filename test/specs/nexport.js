import NexportLoginPage from '../pageobjects/nexportLogin.page';
import NexportHomePage from '../pageobjects/nexportHome.page';
import credentials from '../testdata/creds.json';
import Asserts from '../common/Asserts';
import elementActions from '../common/elementActions';
import testdata from '../testdata/td.json';

describe('My Nexport Login application', () => {

    it('should login with valid credentials', async () => {
        await NexportLoginPage.open();
        await NexportLoginPage.loginClick();
        //get the data from json                    
        console.log("process.env.NexPassword = " + process.env.NexPassword);
        await NexportLoginPage.login(credentials.nexport.username, process.env.NexPassword);
        const nexHome = await NexportHomePage.homeLink();
        // const homeTxt = await nexHome.getText().then(x => x);
        Asserts.equal(await nexHome.getText(), 'HOME');
    });

    //Below is created without POM design pattern - TODO - Will be chnaged to POM soon 
    it('Search with Admin', async () => {
        const searchBtn = await $("a[aria-label='View Directory'] i[class='material-icons md-24 md-light ng-scope']");
        expect(searchBtn).toBeExisting();
        await searchBtn.click();
        const searchJobTitle = $("input[type='text']");
        await searchJobTitle.setValue("Admin");
        browser.pause(5000);
        const allEmployees = $$(".employee-search-padding");
        const adminsActual = await elementActions.getTextFromList(allEmployees);
        var expectedListOfEmployees = testdata.AdminData;
        console.log("Actual list on UI = " + adminsActual);
        console.log("Expected list = " + expectedListOfEmployees);

        Asserts.isArrayEqual(adminsActual, expectedListOfEmployees);
    });

    //Below is created without POM design pattern - TODO - Will be chnaged to POM soon
    it('Search QE Employees', async () => {
        await $("input[type='text']").clearValue();
        const searchBtn = await $("a[aria-label='View Directory'] i[class='material-icons md-24 md-light ng-scope']");
        expect(searchBtn).toBeExisting();
        searchBtn.click();
        const searchSkill = $("input[aria-label$='Skill']");

        await searchSkill.setValue("Automation Testing");

        $("li md-autocomplete-parent-scope").waitForDisplayed();

        $("li:nth-child(2) md-autocomplete-parent-scope:nth-child(1) span:nth-child(1)").click();

        await browser.pause(5000);
        const listOfEmployees = $$("div[class='employee-search-padding ng-binding']");

        const actualList = await elementActions.getTextFromList(listOfEmployees);

        const expectedList = testdata.Qe_Automation_Emp_Data;

        console.log("actualList = " + actualList);
        console.log("expectedList = " + expectedList);

        Asserts.isArrayEqual(actualList, expectedList);

    });  

});