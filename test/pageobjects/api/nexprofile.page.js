import supertest from 'supertest';
import Asserts from '../../common/Asserts';
import Reporter from '../../common/Reporter';
import apiurls from '../../resources/baseurls';
import apiendpoints from '../../resources/apiendpoints';
//import credentials from '../../testdata/creds.json';
import managepassword from '../../utility/managepassword';
import loginproperties from '../../resources/secretproperties'

class NexProfile {

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

}

export default new NexProfile    ();