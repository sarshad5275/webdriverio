import supertest from 'supertest';
import apiurls from '../../resources/baseurls';
import apiendpoints from '../../resources/apiendpoints';
//import credentials from '../../testdata/creds.json';
import managepassword from '../../utility/managepassword';
import loginproperties from '../../resources/secretproperties'

class NexLogin {

    async nexLoginAPI() {
        console.log("NEXPORT Login API is called..");
        const encryptedpwd =   managepassword.encrypt(loginproperties.NEXPASSWORD); 
        console.log("apiendpoints.nxLoginEndpoint = " + apiendpoints.nxLoginEndpoint);
        const request = supertest(apiurls.nxAPIBaseUrl);
        const loginResponse = await request
            .post(apiendpoints.nxLoginEndpoint)
            .send({
                username: loginproperties.NEXUSERNAME,
                password: managepassword.decrypt(encryptedpwd)
            })
            .set('version', apiurls.nxVersion_2);
        return loginResponse;
    }
}

export default new NexLogin();