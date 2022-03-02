import { Given, When, Then } from '@wdio/cucumber-framework';

import dbconnection from '../../test/common/DBCommon';
import logindata from '../../test/resources/secretproperties'
import testdata from '../../test/testdata/sqlqueries.json'

Given(/^User successfully connected Database$/, async () => {
  dbconnection.dbConnect(logindata.hostURL,logindata.DBUserName,logindata.DBPassword,logindata.Database); 
});


When(/^User inserts data into a table$/, async () => {
    //dbconnection.dbConnect_Execute(logindata.hostURL,logindata.DBUserName,logindata.DBPassword,logindata.Database,testdata.createtable);
    dbconnection.dbConnect_Execute(logindata.hostURL,logindata.DBUserName,logindata.DBPassword,logindata.Database,testdata.insertdata);
});

Then(/^User retrieves data from the table$/, async () => {
    dbconnection.dbConnect_Execute(logindata.hostURL,logindata.DBUserName,logindata.DBPassword,logindata.Database,testdata.retrievedata);
});