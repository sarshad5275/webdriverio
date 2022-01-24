
import Page from './page';
import configdata from '../resources/configdata';
import AllureReporter from '@wdio/allure-reporter';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class BambooHomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get baseurl() {
        return configdata.bambooURL;
    }

    get title() {
        return $('title');
    }

    get home() { return $("//a[@aria-label= 'Home']") }

    get companyLinks() {
        return $('#LINKS');
    }
    
    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open(baseurl, 'home');
    }

    async homeLink(){
        AllureReporter.addStep("Get the Home element..");
        return await this.home ;
    }

    async getTitle(){       
        return await this.title ;
    }
}

export default new BambooHomePage();
