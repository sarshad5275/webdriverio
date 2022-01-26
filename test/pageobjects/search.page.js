import Page from './page';
import configdata from '../resources/configdata';
import elementActions from '../common/elementActions';


/**
 * sub page containing specific selectors and methods for a specific page
 */
class NexportSearchPage extends Page {
    /**
     * define selectors using getter methods
     */
    get baseurl() { return configdata.nexportURL };
    get search() { return $("a[aria-label='View Directory'] i[class='material-icons md-24 md-light ng-scope']") };
    get jobTitle() {return $("input[type='text']")};
    get skill() {return $("input[aria-label$='Skill']")};
    get autoCompleteScope_single() {return $("li md-autocomplete-parent-scope")};
    get autoCompleteScope() {return $$("li md-autocomplete-parent-scope")};
    get empName() {return $("input[aria-label$='Employee Name:']")};
    get allEmployees() {return $$(".employee-search-padding")};

    async setTitle(text) {       
        await elementActions.setValue(await this.jobTitle,"JobTitle", text);     
    }  

    async clearValues() {       
         await this.jobTitle.clearValue();         
         await this.skill.clearValue();   
         await this.empName.clearValue();  
    }  

    async setSkill(text) {       
        await elementActions.setValue(await this.skill,"Skill Field", text);  
        await this.autoCompleteScope_single.waitForDisplayed();
        await elementActions.clickElementNameFromList(this.autoCompleteScope, text);
    }  

    async clickSearch() {       
        await elementActions.click(await this.search, 'Search Button');     
    }    

    async getEmpList() {       
      let employees = await elementActions.getTextFromList(this.allEmployees);       
      return employees;
    }  
   
    /**
     * overwrite specific options to adapt it to page object
     */
    async open() {
        console.log("Baseurl = " + this.baseurl);
        await super.open(this.baseurl, null);
    }
}

export default new NexportSearchPage();
