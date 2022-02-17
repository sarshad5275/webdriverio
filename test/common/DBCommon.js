let mysql = require('mysql');
import Reporter from '../common/Reporter';
import Asserts from './Asserts';

let dbcon = "";

class DBCommon{

     async dbConnect(hostURL, DBUserName, DBPassword){
        dbcon = mysql.createConnection({
        host: hostURL,
        user: DBUserName,
        password: DBPassword
        });
        await dbcon.connect((error)=> {
        if (error) {
        console.log("DB Connection failed. Please check the input parameters");
        Reporter.addStep("DB Connection failed. Please check the input parameters");
        return false;
        }
        console.log("DB Connection successfull");
        Reporter.addStep("DB Connection Successful");
        return dbcon;
        })
    }

     async dbQuery(dbconnect, SQLQuery){
         await dbconnect.query(SQLQuery,(error,result)=>{
            if (error) {
            console.log("Please check the Query again");
            return false;
            }
            console.log("Result from the Query Execution : " + result);
            return result;
          });
    }

    async dbClose(dbCon){
        await dbCon.destroy;
        console.log("DB Connection Closed");
        Reporter.addStep("DB Connection Closed");
    }
}

export default new DBCommon();