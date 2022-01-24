//import 'chai/register-should';
import supertest from 'supertest';
import configdata from '../resources/configdata';
import moment from 'moment';
import HolidayList from '../dataobjects/holidaylist';
import apiPage from '../pageobjects/api/apiclient.page';
import { assert } from 'chai';
import Reporter from '../common/Reporter';
import credentials from '../testdata/creds.json';
import Asserts from '../common/Asserts';
import ProfileData from '../dataobjects/profileobj';
import testData from '../testdata/td.json';

let accessToken = "";

describe('Nexport API Test', () => {   
    const request = supertest(configdata.nxAPIBaseUrl);
    before(async () => {
        accessToken = await apiPage.nxToken();
    });

    it('API test1: get Employee Profile data', async () => {          
        const employeeId = credentials.nexport.username ;   
        const profileResponse = await apiPage.nexProfileAPI(employeeId,accessToken);
        const data = new ProfileData(profileResponse.body);
        Reporter.addStep("Profile Data = " + JSON.stringify(data));  
        Asserts.equal(profileResponse.status,200);   
    });

    it('API test2: get Holidays List', async () => {
        const holidaysRespose = await apiPage.holidayAPI(accessToken);

        Asserts.equal(holidaysRespose.status,200);

        var holidaylist =  new HolidayList(holidaysRespose.body);               
       // var actualList = holidaylist.sortByDate;
        var actualList = holidaylist.getAllHolidays;
       // actualList.forEach(holiday => console.log("All Holidays Data = " + JSON.stringify(holiday) + " \n"));
        Reporter.addStep("All Holidays List = " + JSON.stringify(actualList));
       // Asserts.equal(JSON.stringify(actualList),JSON.stringify(data_holidays));
        Asserts.deepEqual(actualList, testData.HolidaysData);

        var filteredHolidays = holidaylist.getAllHolidaysInBetween('2022-01-01', '2022-08-01');
        filteredHolidays.forEach(holiday => console.log("filteredHolidays = " + JSON.stringify(holiday) + " \n"));
        Reporter.addStep("Holidays List between 2022-01-01 and 2022-08-01 = " + JSON.stringify(filteredHolidays));
    });


    it.skip('API test: Get Holidays with ObjMap working one', async () => {
        console.log("configdata.nxHolidaysEndpoint = " + configdata.nxHolidaysEndpoint);
        await request
            .get(configdata.nxHolidaysEndpoint)
            .set('X-Authorization', this.accessToken)
            .set('tenantId', configdata.nxTenentId)
            .set('version', configdata.nxVersion_1)
            .then((res) => {
                var holidaylist = new HolidayList(res.body);

                var listTest = holidaylist.getAllHolidays;

                listTest.forEach(holiday => console.log("All Data = " + JSON.stringify(holiday) + " \n"));

                var filteredHolidays = holidaylist.getAllHolidaysInBetween('2022-01-01', '2022-08-01');
                filteredHolidays.forEach(holiday => console.log("filteredHolidays = " + JSON.stringify(holiday) + " \n"));

                cExpect(res.status).to.be.equal(200);
            });
    });


    it.skip('API test: Get Holidays', async () => {
        await request
            .get(configdata.nxHolidaysEndpoint)
            .set('X-Authorization', this.accessToken)
            .set('tenantId', configdata.nxTenentId)
            .set('version', configdata.nxVersion_1)
            .then((res) => {
                const body = JSON.stringify(res.body);
                let myMap = JSON.parse(body);

                var txt = "";

                myMap.forEach(x => txt += x.id + "," + x.name + "," + x.day + "," + x.holidayType + "," + x.corporate + "," + x.workable + '\n \n')

                console.log("Text value from MyMap = " + txt)
                var result = [];
                for (var i in myMap) {
                    result.push(i, myMap[i]);
                    txt += JSON.stringify(myMap[i].id + "," + myMap[i].name + "," + myMap[i].day + "," + myMap[i].holidayType + "," + myMap[i].corporate + "," + myMap[i].workable) + '\n \n';
                };

                Reporter.addAttachment("All Holidays List : Id,   Name,   Day,  HolidayType,   Corporate,   Workable = ", txt);

                result.forEach(obj => console.log("data = " + JSON.stringify(obj)));

                //filter only the last 3 months holidays data
                let dateFrmted = [];
                txt = "";
                result.forEach(y => {
                    var m = moment(y.day, 'YYYY-MM-DD');
                    if (m.isSameOrAfter('2021-01-01') && m.isSameOrBefore('2022-01-01')) {
                        dateFrmted.push(y);
                        txt += JSON.stringify(y.id + "," + y.name + "," + y.day + "," + y.holidayType + "," + y.corporate + "," + y.workable) + '\n \n';
                    }
                })

                Reporter.addAttachment("Holidays List of 2021 Year = : Id,   Name,   Day,  HolidayType,   Corporate,   Workable = ", txt);
                console.log("Holidays List of 2021 Year = " + txt);

                assert.equal(res.status, 200);

              //  cExpect(res.status).to.be.equal(200);
            });
    });

    it.skip('API test: Get Events', async () => {
        await request
            .get(configdata.nxEventsEndpoint)
            .set('X-Authorization', this.accessToken)
            .set('tenantId', configdata.nxTenentId)
            .set('version', configdata.nxVersion_1)
            .then((res) => {
                const body = JSON.stringify(res.body);
                let myMap = JSON.parse(body);

                var txt = "";

                var result = [];
                var j = 0;
                for (var i in myMap) {
                    if (j <= 10) {
                        result.push(i, myMap[i]);
                        txt += JSON.stringify(myMap[i]) + '\n \n';
                        const attendees = [];
                        for (var k in myMap[i]) {
                            attendees.push(k, myMap[i]);
                        }
                        attendees.forEach(x => {
                            console.log('Attendees Data = ' + JSON.stringify(x.attendees));
                        })

                    }
                    j += 1;
                };
                Reporter.addAttachment("All Events List = ", txt);
               
                cExpect(res.status).to.be.equal(200);
            });
    });



});
