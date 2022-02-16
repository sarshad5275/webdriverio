

Given(/^User is on the Bamboo login page$/, async () => {
    bambooHome = await BambooHomePage.homeLink();
    if(!(await bambooHome.isDisplayed())){
        await BambooLoginPage.open(); 
    }    
});