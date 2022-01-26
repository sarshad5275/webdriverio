"name": "webdriverio-tests",
"version": "1.0.0",
"description": "Automation Framework for WebdriverIO using MOCHA-JS",
"main": "index.js",

Below configs are used for building the project:
mochaJS as Framework
chaiJs for Assertions
wdio for webdriver 
babel as compiler
chrome as a default webdriverservice
superagent/supertest to work with APIs
allure and Specs as Reporters
cryptR for encryption/decryption
moment is to work with date formats


Install Node 16 version
Install Visual Studio Code
Clone the repo to the VSCode
After opening the project in VSCode 
Open a terminal -> new terminal 
Run: 'npm install'  -- This will install all dependencies shown in package.json file

Installations required to generate allure reports:
1. Install latest JDK version from oracle website (https://www.oracle.com/java/technologies/downloads/#jdk17-windows)
2. Install latest version of allure (zip file  from https://github.com/allure-framework/allure2/releases) and extract in the local folder.
3. Added system environment variables as below
    a. allure (please provide allure installation path in the Value) 
    b. JAVA_HOME (set value to local JDK path) 
    c. click on PATH variable, Add New Variable and provide JDK bin path
4. If we run into any ps1 issues, we should run the command "Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted" in the powershell

Folders Used:
allure-report : Generated Alllure Reports are placed in this folder
allure-results : results after running the scripts will be uploaded to allure-results
test -> Main folder where all the code is written 
test/specs --> All test cases are written in this folder
test/pageobjects --> Steps implementation is available in this folder
test/testdata -> Files related to the testdata 
test/utility -> files required to run the projects
test/resources -> all urls and the rqd info is given here
test/dataobjects --> class models(POJO) are added here 
test/common --> element actions, reports, asserts are overriden here 

importatnt files to have:
wdio.conf.js --> all framework level configurations and hooks are defined here
babel.confpig.js --> helps to write the code ES6 and above 
.vscode/launch.json -> Helps to debug the code 

**All passwords(encrypted) must be saved in the environment variables

To get the encrypted password:
Open specs/encryptpassword.js file  
replace with 'Password/txt' you want to encrypt in the below code:
ManagePasswords.encrypt("enter your Password to get the encrypted password");
Save the file

Run in terminal: 'npm run encrypt'
get the encryptedPassword written to the console.log 
and add encryptedPassword  to the .env file
NOTE:'.env' file is not checked in for security reason. Please create a '.env' file at the root directory and add all Environment variables to that file. 


