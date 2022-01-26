import Reporter from '../common/Reporter';
import Asserts from './Asserts';

class ElementActions {

    async click(element, elementName) {
        try {
            if (element) {
                Reporter.addStep(elementName + " is found.");
                await element.click();
                Reporter.addStep(elementName + " is clicked.");
            } else {
                await Reporter.addScreenshot(elementName + " is not found");
                Reporter.addStep(elementName + " is not found.");
                await expect(element).not.toBeNull();
            }
        } catch (error) {
            console.error(error);
            Reporter.addStep("Exception occurred while clicking the element," + elementName + " . Error Message = " + error.message);
            throw error;
        }

    }

    async setValue(element, elementName, text) {
        try {
            let text1 = elementName.toLowerCase().includes("password") ? "*******" : text;
            console.log(`Setting value ${text1} to element, ` + elementName);
            if (element !== 'undefined') {
                Reporter.addStep(elementName + " is found.");
                await element.setValue(text);
                Reporter.addStep(elementName + ` is set to ${text1}`);
                Reporter.addScreenshot();
            } else {
                await Reporter.addScreenshot(elementName + " is not found.");
                Reporter.addStep(elementName + " is not found.");
                await expect(element).not.toBeNull();
            }
        } catch (error) {
            console.error(error);
            Reporter.addStep("Exception occurred while Setting the Value to an element," + elementName + " . Error Message = " + error.message);
            throw error;
        }

    }

    async gettext(element, elementName) {
        try {
            //await element.waitForExists({timeout: 5000});
            if (element) {
                Reporter.addStep(elementName + " is found.");
                await element.gettext();
                Reporter.addStep(`${elementName} = ${text1}`);
            } else {
                await browser.takeScreenshot();
                Reporter.addStep(elementName + " is not found.");
                await expect(element).not.toBeNull();
            }
        } catch (error) {
            console.error(error);
            Reporter.addStep("Exception occurred while Getting the Value to an element," + elementName + " . Error Message = " + error.message);
            throw error;
        }

    }

    async selectCheckbox(element, elementName) {
        try {
            let chkBox = await getAttr(element, 'aria-checked');
            if (chkBox != null && chkBox.includes('false')) {
                element.click();
                Reporter.addStep(elementName + " is ckecked.");
            } else {
                Reporter.addStep(elementName + " is already ckecked.");
            }
        } catch (error) {
            console.error(error);
            Reporter.addStep("Exception occurred while Setting the Value to an element," + elementName + " . Error Message = " + error.message);
            throw error;
        }
    }

    //params: selector and the Name of the element to check
    async clickElementNameFromListBySelector(listOfElementsSelector, elementNameToClick) {
        try {
            const elems = await $$(listOfElementsSelector);
            elems.forEach(async element => {
                console.log("Element = " + await element.getText());
                await element.getText() === elementNameToClick ? await element.click() : "";
            });

            await browser.pause(1000);
        } catch (error) {           
            Asserts.fail("Exception occured. Error Message = " + error.message);
        }

    }

    async clickElementNameFromList(listOfElements, elementNameToClick) {
        try {            
            await listOfElements.forEach(async element => {
                console.log("Element = " + await element.getText());
                await element.getText() === elementNameToClick ? await element.click() : "";
            });

            await browser.pause(1000);
        } catch (error) {           
            Asserts.fail("Exception occured. Error Message = " + error.message);
        }
    }

    async getTextFromList(listOfElements) {
        try {          
            let list = [];
            await listOfElements.forEach(async element => {
                list.push(await element.getText());
            });

            var list2 =  list.filter(x => x.length > 0);

            return list2;
        } catch (error) {
            Reporter.addScreenshot();
            Asserts.fail("Exception occured. Error Message = " + error.message);
        }
    }



}

export const getAttr = async (element, attributeName) => {
    try {
        if (element) {
            Reporter.addStep("Attribute is found for the given element");
            return await element.getAttribute(attributeName);
        } else {
            await browser.takeScreenshot();
            Reporter.addStep(elementName + " is not found.");
            await expect(element).not.toBeNull();
        }
    } catch (error) {
        console.error("Exception occurred while checking the Attributes in getAttr Method " + error);
        Reporter.addStep("Exception occurred while checking the Attributes in getAttr Method Error Message = " + error.message);
        throw error;
    }

}

export default new ElementActions();