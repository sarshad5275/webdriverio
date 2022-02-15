import supertest from 'supertest';
import Asserts from '../../common/Asserts';
import Reporter from '../../common/Reporter';
import apiurls from '../../resources/baseurls';
import apiendpoints from '../../resources/apiendpoints';
//import credentials from '../../testdata/creds.json';
import managepassword from '../../utility/managepassword';
import loginproperties from '../../resources/secretproperties'

class NexHoliday {

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

export default new NexHoliday();