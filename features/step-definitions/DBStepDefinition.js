import { Given, When, Then } from '@wdio/cucumber-framework';

import dbconnection from '../../test/common/DBCommon';
import logindata from '../../test/resources/secretproperties'
import testdata from '../../test/testdata/sqlqueries.json'

let dbcon = "";

Given(/^User successfully connected Database$/, async () => {
    dbcon = dbconnection.dbConnect(logindata.hostURL,logindata.DBUserName,logindata.DBPassword); 
});


When(/^User creates and inserts data into a table$/, async () => {
    dbconnection.dbQuery(dbcon, testdata.createtable);
    dbconnection.dbQuery(dbcon,testdata.insertdata);
});

Then(/^User retrieves data from the table$/, async () => {
    dbconnection.dbQuery(dbcon,testdata.retrievedata);
    dbconnection.dbClose(dbcon);
});