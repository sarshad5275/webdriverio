import AllureReporter from "@wdio/allure-reporter";
import cucumberJson from 'wdio-cucumberjs-json-reporter';

class Reporter {
    addStep(text) {
        console.log(text);
        AllureReporter.addStep(text);
        cucumberJson.attach(text);
    }

    //This adds the value as an attachment to the report
    addAttachment(text) {
        console.log(text);
        AllureReporter.addAttachment(text);
        cucumberJson.attach(text);
    }

    async addScreenshot(fileName = 'Screenshot'){
       let png = await browser.takeScreenshot();
       AllureReporter.addAttachment(fileName, new Buffer(png, 'base64') );
       cucumberJson.attach(png, 'image/png');
    }
}

export default new Reporter();