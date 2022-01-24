import ElementActions from '../common/elementActions';
import Asserts from '../common/Asserts';
import elementActions from '../common/elementActions';

describe('My Login application', () => {
    it('TC1: should login with valid credentials', async () => {
        await browser.url('https://www.ebay.com/b/Watches-Parts-Accessories/260324/bn_2408535');
        const getCouponBtn = await $('//*[@id="mainContent"]').$('*=Find the one');
        console.log("getCouponBtn = " + await getCouponBtn.getText());
        await getCouponBtn.click();
        const title = await $('h1.title-banner__title');
        title.getText().then((y) => console.log("value = " + y));
        expect(title).toHaveTextContaining('Up to 30% off Rolex');
    });

    it('TC2: Ebay mobile search', async () => {

        await browser.url('https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=mobile&_sacat=0&LH_TitleDesc=0&_odkw=mobile&_osacat=0');

        let list =  $$('#x-refine__group__0 > ul > li> ul > li >ul > li a span');

        const items = await elementActions.getTextFromList(list);

        console.log("Mobile list = " + items);
    });

    it('Auto complete Controls', async () => {

        await browser.url("https://rahulshettyacademy.com/AutomationPractice/");
        const suggessionField = $("#autocomplete");

        await suggessionField.setValue("ind");
        await $(".ui-menu-item div").waitForDisplayed();

        ElementActions.clickElementNameFromList(".ui-menu-item div", "India");

        await browser.pause(1000);
        console.log('suggessionField test= ' + await $("#autocomplete").getValue());

        await Asserts.equal(await $("#autocomplete").getValue(),"India" );
      
    });

    it.only('Obj compare test', async () => {

        const obj1 = { name: 'John', age: 33, info: { married: true, hobbies: ['sport', 'art'] } };
        const obj2 = { age: 33, name: 'John', info: { hobbies: ['sport', 'art'], married: true } };
        const obj3 = { name: 'John', age: 33 };

        const arr1 = ["Amir Mondal","Amit Gupta","Arijeet Nag","Biju Mathew","Celina Tanyag","Dalton Bristow","Jennifer Dominguez","Kim Abbott","Rony Rakshit","Tejendra Karena","Varsha Tejendra Karena","Vishal Bothra"];
        const arr2 = ["Kim Abbott","Vishal Bothra","Jennifer Dominguez","Dalton Bristow","Tejendra Karena","Amit Gupta","Biju Mathew","Varsha Tejendra Karena","Arijeet Nag","Amir Mondal","Celina Tanyag","Rony Rakshit"];
       // Asserts.deepEqual(obj2, obj1); // true      
       // Asserts.deepEqual(obj2, obj3); // fail   
       Asserts.isArrayEqual(arr1, arr2);

    });
});