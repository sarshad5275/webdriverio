import { Given, When, Then } from '@wdio/cucumber-framework';
import BambooLoginPage from '../../test/pageobjects/bambooLogin.page';
import BambooHomePage from '../../test/pageobjects/bambooHome.page';
import Asserts from '../../test/common/Asserts';
import logindata from '../../test/resources/loginproperties'
import allureReporter from '@wdio/allure-reporter';

Given(/^User is on the Bamboo login page$/, async () => {
    const bambooHome = await BambooHomePage.homeLink();
    if(!(await bambooHome.isDisplayed())){
        await BambooLoginPage.open(); 
    }    
});

When(/^User logins with given Bamboo credentials$/, async () => {
    const bambooHome = await BambooHomePage.homeLink();
    if(!(await bambooHome.isDisplayed())){
    await BambooLoginPage.login(logindata.BAMBOO_USERNAME,logindata.BAMBOO_PASSWORD);
    }
});

Then(/^User successfully logged into Bamboo Application$/, async () => {
        const bambooHome = await BambooHomePage.homeLink();
        const homeTxt = await bambooHome.getText();
        Asserts.equal(homeTxt, 'Home');
});