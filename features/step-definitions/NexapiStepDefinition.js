import { Given, When, Then } from '@wdio/cucumber-framework';

import supertest from 'supertest';
import HolidayList from '../../test/dataobjects/holidaylist';
import apiPage from '../../test/pageobjects/api/apiclient.page';
import Reporter from '../../test/common/Reporter';
import Asserts from '../../test/common/Asserts';
import ProfileData from '../../test/dataobjects/profileobj';
import testData from '../../test/testdata/td.json';
import logindata from '../../test/resources/secretproperties'

let accessToken = "";
let profileResponse = "";
let data = "";
let holidaysRespose = "";

Given(/^User has Nexport login credentials$/, async () => {
    accessToken = await apiPage.nxToken();
    profileResponse = await apiPage.nexProfileAPI(logindata.NEXUSERNAME,accessToken);
});

Then(/^User successfully connected Nexport Application$/, async () => {   
    Asserts.equal(profileResponse.status,200); 
    Reporter.addStep("User successfully connected to Nexport API")
});

When(/^User provides required parameters for getting \"(.*)\" data$/, async (desiredapi) => {
    if("profile data"==desiredapi){
     data = new ProfileData(profileResponse.body);
     Reporter.addStep("Providing profile data in Profile object : "+ProfileData)
    }else if("holiday list"==desiredapi){
        holidaysRespose = await apiPage.holidayAPI(accessToken);
        Reporter.addStep("Retrieving holiday Response object : "+holidaysRespose)
    }
});

Then(/^User successfully retrieves \"(.*)\" data$/, async (desiredapi) => {   
    if("profile data"==desiredapi){
    Reporter.addStep("Profile Data = " + JSON.stringify(data));  
    }else if("holiday list"==desiredapi){
        Asserts.equal(holidaysRespose.status,200);
        var holidaylist =  new HolidayList(holidaysRespose.body); 
        var actualList = holidaylist.getAllHolidays;       
        Reporter.addStep("All Holidays List = " + JSON.stringify(actualList));       
        //Asserts.deepEqual(actualList, testData.HolidaysData);
        var filteredHolidays = holidaylist.getAllHolidaysInBetween('2022-01-01', '2022-08-01');
        filteredHolidays.forEach(holiday => console.log("filteredHolidays = " + JSON.stringify(holiday) + " \n"));
        Reporter.addStep("Holidays List between 2022-01-01 and 2022-08-01 = " + JSON.stringify(filteredHolidays));
    }
});