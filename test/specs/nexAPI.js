//import 'chai/register-should';
import supertest from 'supertest';
import configdata from '../resources/configdata';
import HolidayList from '../dataobjects/holidaylist';
import apiPage from '../pageobjects/api/apiclient.page';
import Reporter from '../common/Reporter';
import credentials from '../testdata/creds.json';
import Asserts from '../common/Asserts';
import ProfileData from '../dataobjects/profileobj';
import testData from '../testdata/td.json';

let accessToken = "";

describe('Nexport API Test', () => {      
    before(async () => {
        accessToken = await apiPage.nxToken();
    });

    it('API test1: get Employee Profile data', async () => { 
        const profileResponse = await apiPage.nexProfileAPI(process.env.NEXUSERNAME,accessToken);
        const data = new ProfileData(profileResponse.body);
        Reporter.addStep("Profile Data = " + JSON.stringify(data));  
        Asserts.equal(profileResponse.status,200);   
    });

    it('API test2: get Holidays List', async () => {
        const holidaysRespose = await apiPage.holidayAPI(accessToken);

        Asserts.equal(holidaysRespose.status,200);

        var holidaylist =  new HolidayList(holidaysRespose.body); 
        
        var actualList = holidaylist.getAllHolidays;       
        Reporter.addStep("All Holidays List = " + JSON.stringify(actualList));       
        Asserts.deepEqual(actualList, testData.HolidaysData);

        var filteredHolidays = holidaylist.getAllHolidaysInBetween('2022-01-01', '2022-08-01');
        filteredHolidays.forEach(holiday => console.log("filteredHolidays = " + JSON.stringify(holiday) + " \n"));
        Reporter.addStep("Holidays List between 2022-01-01 and 2022-08-01 = " + JSON.stringify(filteredHolidays));
    });

});
