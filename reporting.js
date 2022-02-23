var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'features/cucumber-reports/json',
        output: 'features/cucumber-reports/cucumber_report.html',
        screenshotsDirectory: 'features/cucumber-reports/screenshots/',
        storeScreenshots: true,
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
           // "App Version":"0.3.2",
            "Test Environment": "WebDriverIO Automation",
            "Browser": "Chrome",
           // "Platform": "Windows 10",
           // "Parallel": "Scenarios",
            "Executed": "local"
        }
    };

    reporter.generate(options);