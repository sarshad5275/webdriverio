import supertest from 'supertest';
import Asserts from '../../common/Asserts';
import Reporter from '../../common/Reporter';
import apiurls from '../../resources/baseurls';
import apiendpoints from '../../resources/apiendpoints';
//import credentials from '../../testdata/creds.json';
import managepassword from '../../utility/managepassword';
import loginproperties from '../../resources/secretproperties'

class APIClient {
    async nxToken() {
        Reporter.addStep("Login API is called to get the Accesstoken");
        const loginAPI = await this.nexLoginAPI();
        if (loginAPI.status == 200) {
            const token = await loginAPI.headers.accesstoken;
            Reporter.addStep("Access Token = " + await loginAPI.headers.accesstoken);  
            return token;
        } else {
            Asserts.fail("Failed to get the Login Token..");
        }
    }

    async nexLoginAPI() {
        console.log("NEXPORT Login API is called..");
        console.log("apiendpoints.nxLoginEndpoint = " + apiendpoints.nxLoginEndpoint);
        const request = supertest(apiurls.nxAPIBaseUrl);
        const loginResponse = await request
            .post(apiendpoints.nxLoginEndpoint)
            .send({
                //username: process.env.NEXUSERNAME,
                //password: managepassword.decrypt(process.env.NEXPASSWORD)
                username: loginproperties.NEXUSERNAME,
                password: managepassword.decrypt(loginproperties.NEXPASSWORD)
            })
            .set('version', apiurls.nxVersion_2);
        return loginResponse;
    }

    async nexProfileAPI(employeeId, accessToken) {
        Reporter.addStep("NEXPORT Profile API is called..");
        Reporter.addStep("apiendpoints.nxProfileEndpoint = " + apiendpoints.nxProfileEndpoint + '/' + employeeId);
        const request = supertest(apiurls.nxAPIBaseUrl);
        const profileResponse = await request
            .get(apiendpoints.nxProfileEndpoint + '/' + employeeId)
            .set('X-Authorization', accessToken)
            .set('tenantId', apiurls.nxTenentId)
            .set('version', apiurls.nxVersion_2);
        return profileResponse;
    }


    async holidayAPI(accessToken) {
        Reporter.addStep("NEXPORT Holiday API is called..");
        Reporter.addStep("apiendpoints.nxHolidaysEndpoint = " + apiendpoints.nxHolidaysEndpoint);      
        const request = supertest(apiurls.nxAPIBaseUrl);
        const response = await request
            .get(apiendpoints.nxHolidaysEndpoint)
            .set('X-Authorization', accessToken)
            .set('tenantId', apiurls.nxTenentId)
            .set('version', apiurls.nxVersion_1);

        Asserts.equal(response.status,200);        
        return response;
    }

}

export default new APIClient();