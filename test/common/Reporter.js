import AllureReporter from "@wdio/allure-reporter";

class Reporter {
    addStep(text) {
        console.log(text);
        AllureReporter.addStep(text);
    }

    //This adds the value as an attachment to the report
    addAttachment(text) {
        console.log(text);
        AllureReporter.addAttachment(text);
    }

    async addScreenshot(fileName = 'Screenshot'){
       let png = await browser.takeScreenshot();
       AllureReporter.addAttachment(fileName, new Buffer(png, 'base64') );
    }
}

export default new Reporter();