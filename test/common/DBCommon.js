const mysql = require('mysql');
import Reporter from '../common/Reporter';
import Asserts from './Asserts';

class DBCommon{

    async dbConnect(hostURL, DBUserName, DBPassword){
        const dbcon = mysql.createConnection({
        host: hostURL,
        user: DBUserName,
        password: DBPassword
        });
        dbcon.connect(function(error) {
        if (error) {
        console.log("DB Connection failed. Please check the input parameters");
        Reporter.addStep("DB Connection failed. Please check the input parameters");
        }else{
        console.log("DB Connection successfull");
        Reporter.addStep("DB Connection Successful");
        return dbcon;
        }
        })
    }

    async dbQuery(dbconnect, SQLQuery){
        dbconnect.query(SQLQuery, function (error, result) {
            if (error) {
            console.log("Please check the Query again");
            dbconnect.destroy;
            return false;
            }
            console.log("Result from the Query Execution : " + result);
            dbconnect.destroy;
            return result;
          });
    }
    
    async databaseCreation(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        port:"3306"
      });
      
      con.connect(function(err) {
        if (err) throw err;
        console.log("Database Connection successful");
        con.query("CREATE DATABASE QAAutomationDB", function (err, result) {
          if (err) throw err;
          console.log("Database created");
        });
      });
    }

    result = dbConnection();
}