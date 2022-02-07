class DBCommon{

    async dbConnection(hostURL, DBUserName, DBPassword,SQLQuery){
        const mysql = require('mysql');
        const dbcon = mysql.createConnection({
        host: hostURL,
        user: DBUserName,
        password: DBPassword
        });
        dbcon.connect(function(err) {
        if (err) {
            console.log("Connection failed. Please check");
            throw err;
            }
        console.log("DB Connection successfull");
        con.query(SQLQuery, function (err, result) {
            if (err) {
            console.log("Query failed. Please check");
            throw err;
            }
            console.log("Query result is " + result);
            return result;
          });
        })
    }

    async databaseCreation(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "testing",
        password: "password"
      });
      
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("CREATE DATABASE TestDB", function (err, result) {
          if (err) throw err;
          console.log("Database created");
        });
      });
    }

    async db(){
        var connection = sql.connect(config); //config has all the parameters
        var request = new sql.Request();
        request.query('select * from myTable');
    }

    result = dbConnection();
}