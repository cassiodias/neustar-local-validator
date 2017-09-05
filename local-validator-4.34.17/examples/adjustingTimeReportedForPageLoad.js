var webDriver = test.openBrowser();
var selenium=webDriver.getSelenium();
selenium.waitForPageToLoad("30000"); //wait for page to load maximum limit set 30 seconds
test.beginTransaction();
test.beginStep("Open Neustar URL and search for wpm");
webDriver.get("http://www.neustar.biz/");
test.log("Neustar URL open Successfully");
selenium.waitForElementPresent("id=query");  //wait for search value text box
var searchTxtBx=webDriver.findElement(By.id("query"));
searchTxtBx.sendKeys("WPM");
var searchBtn=webDriver.findElement(By.xpath("//input[@value='search']"));
searchBtn.click();
selenium.assertTextPresent("Search Results");
test.endStep();
test.beginStep("Click on search again button");
var searchAgainBtn=webDriver.findElement(By.xpath("//input[@value='Search']"));
searchAgainBtn.click();  //Click on search again button
test.endStep();
test.endTransaction();
	