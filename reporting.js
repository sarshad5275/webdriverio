const report = require('multiple-cucumber-html-reporter');

report.generate({
	jsonDir: 'features/cucumber-reports/json/',
	reportPath: 'features/cucumber-reports/',
    openReportInBrowser:true,
    staticFilePath:true,
    saveCollectedJSON:true,
    pageTitle:'CucumberReport',
    reportName:'CucumberReport',
    pageFooter:'Developed by Nexient LLC',
    displayDuration:true,
    hideMetadata:true,
    displayReportTime:true,
	metadata:{
        browser: {
            name: 'chrome',
            version: 'Latest'
        },
        device: 'My Laptop',
        platform: {
            name: 'Windows',
            version: 'Latest'
        }
    },
    customData: {
        title: 'WebDriverIO Automation',
        data: [
            {label: 'Project', value: 'WebDriverIO Automation project'},
            {label: 'Release', value: '1'},
            {label: 'Cycle', value: '1'}
           // {label: 'Execution Start Time', value: 'Nov 19th 2017, 02:31 PM EST'},
           // {label: 'Execution End Time', value: 'Nov 19th 2017, 02:56 PM EST'}
        ]
    }
});