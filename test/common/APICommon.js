
import Asserts from '../common/Asserts';
import Reporter from '../common/Reporter';
import nexlogin from '../pageobjects/api/nexlogin.page'

class APICommon {

    async nxToken() {
        Reporter.addStep("Login API is called to get the Accesstoken");
        const loginAPI = await nexlogin.nexLoginAPI();
        if (loginAPI.status == 200) {
            const token = await loginAPI.headers.accesstoken;
            Reporter.addStep("Access Token = " + await loginAPI.headers.accesstoken);  
            return token;
        } else {
            Asserts.fail("Failed to get the Login Token..");
        }
    }
}
export default new APICommon();