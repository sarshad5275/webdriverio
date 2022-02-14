
import Page from './page';
import apiurls from '../../resources/baseurls';
import AllureReporter from '@wdio/allure-reporter';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class NexportHomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get baseurl() {
        return apiurls.nexportURL;
    }

    get title() {
        return $('title');
    }

    get home() { return $('*=HOME') }

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
        const home = await this.home ;
        return home;
    }

    async getTitle(){       
        await this.title ;
    }
}

export default new NexportHomePage();
