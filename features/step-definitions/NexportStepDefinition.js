import { Given, When, Then } from '@wdio/cucumber-framework';

//import LoginPage from '../pageobjects/login.page';
//import SecurePage from '../pageobjects/secure.page';

import NexportLoginPage from '../../test/pageobjects/nexportLogin.page';
import NexportSearchPage from '../../test/pageobjects/search.page';
import NexportHomePage from '../../test/pageobjects/nexportHome.page';
import Asserts from '../../test/common/Asserts';
import testdata from '../../test/testdata/td.json';
import logindata from '../../test/resources/loginproperties'

//const NexportLoginPage = require('././test/pageobjects/nexportLogin.page');

Given(/^I am on the (\w+) page$/, async (page) => {
    await NexportLoginPage.open();
    await NexportLoginPage.loginClick();
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await NexportLoginPage.login(logindata.NEXUSERNAME, logindata.NEXPASSWORD);
});

Then(/^I should see a message saying (.*)$/, async (message) => {
    const nexHome = await NexportHomePage.homeLink();       
    Asserts.equal(await nexHome.getText(), 'HOME');
});

