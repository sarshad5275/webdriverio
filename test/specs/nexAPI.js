//import 'chai/register-should';
import supertest from 'supertest';
//import configdata from '../resources/configdata';
import HolidayList from '../dataobjects/holidaylist';
import apicommon from '../common/APICommon';
import nexprofile from '../pageobjects/api/nexprofile.page';
import nexholiday from '../pageobjects/api/nexholiday.page';
import Reporter from '../common/Reporter';
import Asserts from '../common/Asserts';
import ProfileData from '../dataobjects/profileobj';
import logindata from '../resources/secretproperties'

let accessToken = "";

describe('Nexport API Test', () => {      
    before(async () => {
        accessToken = await apicommon.nxToken();
    });

    it('API test1: get Employee Profile data', async () => { 
        const profileResponse = await nexprofile.nexProfileAPI(logindata.NEXUSERNAME,accessToken);
        const data = new ProfileData(profileResponse.body);
        Reporter.addStep("Profile Data = " + JSON.stringify(data));  
        Asserts.equal(profileResponse.status,200);   
    });

    it('API test2: get Holidays List', async () => {
        const holidaysRespose = await nexholiday.holidayAPI(accessToken);
        Asserts.equal(holidaysRespose.status,200);
        var holidaylist =  new HolidayList(holidaysRespose.body); 
        
        var actualList = holidaylist.getAllHolidays;       
        Reporter.addStep("All Holidays List = " + JSON.stringify(actualList));       
        //Asserts.deepEqual(actualList, testData.HolidaysData);

        var filteredHolidays = holidaylist.getAllHolidaysInBetween('2022-01-01', '2022-08-01');
        filteredHolidays.forEach(holiday => console.log("filteredHolidays = " + JSON.stringify(holiday) + " \n"));
        Reporter.addStep("Holidays List between 2022-01-01 and 2022-08-01 = " + JSON.stringify(filteredHolidays));
    });

});
