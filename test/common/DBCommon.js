let mysql = require('mysql');
import Reporter from '../common/Reporter';
import Asserts from './Asserts';
import cucumberJson from 'wdio-cucumberjs-json-reporter';

let dbcon = "";

class DBCommon{

     async dbConnect(hostURL, DBUserName, DBPassword,AutomationDatabase){
         dbcon = mysql.createConnection({
        host: hostURL,
        user: DBUserName,
        password: DBPassword,
        database:AutomationDatabase
        });
        await dbcon.connect((error)=> {
        if (error) {
        Reporter.addStep("DB Connection failed. Please check the input parameters");
        }else{
        Reporter.addStep("DB Connection Successfull");
        dbcon.destroy;
        Reporter.addStep("DB Connection Closed");
        }
    });
  }

     async dbConnect_Execute(hostURL, DBUserName, DBPassword,AutomationDatabase,SQLQuery){
        dbcon = mysql.createConnection({
        host: hostURL,
        user: DBUserName,
        password: DBPassword,
        database:AutomationDatabase
        });
        await dbcon.connect((error)=> {
        if (error) {
        Reporter.addStep("DB Connection failed. Please check the input parameters");
        }else{
          dbcon.query(SQLQuery,(error,result)=>{
            if(error) throw error;
            const query = SQLQuery.toLowerCase();
            if(query.includes("select")){
            Reporter.addStep("Query Result is:");
            Reporter.addStep(result);
            cucumberJson.attach(result);
            }else if(query.includes("update")){
            Reporter.addStep("Query Result is:"+result.affectedRows);
            }else if(query.includes("insert")){
            Reporter.addStep("Inserted records count is:"+result.affectedRows);
            }else if(query.includes("create")){
            Reporter.addStep("Data created:");
            Reporter.addStep(result);
            }
           })
        dbcon.destroy;
        Reporter.addStep("DB Connection Closed");
        }
    });
}
}

export default new DBCommon();