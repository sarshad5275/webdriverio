import { Given, When, Then } from '@wdio/cucumber-framework';
//import cucumberJson from 'wdio-cucumberjs-json-reporter';

import NexportLoginPage from '../../test/pageobjects/ui/nexportLogin.page';
import NexportSearchPage from '../../test/pageobjects/ui/search.page';
import NexportHomePage from '../../test/pageobjects/ui/nexportHome.page';
import Asserts from '../../test/common/Asserts';
import testdata from '../../test/testdata/td.json';
import logindata from '../../test/resources/secretproperties'
import allureReporter from '@wdio/allure-reporter';
import managepassword from '../../test/utility/managepassword';
//Adding comments for test
let nexHome = "";

Given(/^User is on the Nexport login page$/, async () => {
    nexHome = await NexportHomePage.homeLink();
    if(!(await nexHome.isDisplayed())){
    await NexportLoginPage.open();
    await NexportLoginPage.loginClick();
}
});
When(/^User logins with given Nexport credentials$/, async () => {
    if(!(await nexHome.isDisplayed())){
    const encryptedpwd =   managepassword.encrypt(logindata.NEXPASSWORD); 
    await NexportLoginPage.login(logindata.NEXUSERNAME, encryptedpwd);
    }
});
Then(/^User successfully logged into Nexport Application$/, async () => {   
    Asserts.equal(await nexHome.getText(), 'HOME');
});

When(/^User searches with \"(.*)\" in JobTitle$/, async(pageTitle)=>
{
    if(pageTitle == 'Admin'){
        await NexportSearchPage.clickSearch();
        await NexportSearchPage.setTitle("Admin");
        await browser.pause(5000);       
    }else if(pageTitle == 'Skill'){
        await NexportSearchPage.clickSearch();
        await NexportSearchPage.clearValues();  
        await NexportSearchPage.setSkill("Automation Testing");
        await browser.pause(5000); 
    }
}
);
Then(/^compare with the given \"(.*)\" value$/, async(expectedValue)=>{
    if(expectedValue == 'AdminData'){
        const adminsActual = await NexportSearchPage.getEmpList();
        var expectedListOfEmployees = testdata.AdminData; 
        console.log("Admin data length:"+adminsActual.length)
        Asserts.isArrayEqual(adminsActual, expectedListOfEmployees);
    }else if(expectedValue == 'AutomationData'){
        const qeListActual = await NexportSearchPage.getEmpList();
        var expectedListOfEmployees = testdata.Qe_Automation_Emp_Data; 
        console.log("Automation skill data length:"+qeListActual.length)
        Asserts.isArrayEqual(qeListActual.sort(), expectedListOfEmployees.sort());
    }
}
);
