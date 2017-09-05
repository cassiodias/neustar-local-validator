// demonstrates using Selenium to search a retail web site for an item and adding the item to a shopping bag
// scripting documentation is available at http://docs.wpm.neustar.biz/testscript-api/index.html

// uses the test main control interface to start a Selenium WebDriver browser session
var driver = test.openBrowser();

// returns an interface to the Selenium API
var selenium = driver.getSelenium();

// selenium user-facing API for emulating complex user gestures
var action = new Actions(driver);

// this is the base time in milliseconds
// this script waits for network traffic to stop before examining a response
var netListen = 1500;

// the time in milliseconds after which the script will throw an error if network traffic has not stopped
var timeout = 30000;

// set the time in milliseconds Selenium will wait for actions like "open" and "waitFor*" to complete
selenium.setTimeout(timeout);

// a transaction in a script contains basic timing information, such as the start and end time,
// as well as the total number of bytes transferred during the transaction.
// It also holds a flag that indicates if the transaction is considered a success or a failure.
var tx = test.beginTransaction();

// breaking a script into discrete steps allows complex, lengthy procedures to be logically compartmentalized
// beginStep must be called from within a transaction.
// this override allows the script to set the step's label and set a timeout after which the transaction
// will fail if the step has not completed
var step = test.beginStep("Launch Web Site", timeout);

    // Logs some text to the log buffer.
    // Logs are only accessible for transactions run during development (such as script validation)
    // and not during an actual load test.
	test.log("begin step: " + step.getLabel());

	// opens a URL and waits for the page to load before proceeding
	selenium.open("http://www.tiffany.com/international.aspx");

	// confirm script has received the page by searching for an expected string
	selenium.verifyTextPresent("United States");

	// end the first step (retrieving the initial web page) of the script
test.endStep();

step = test.beginStep("Choose your country| Select United States", timeout);
	test.log("begin step: " + step.getLabel());

	// clickAndWait assumes that it causes a page to load and waits for it to complete loading before returning.
	selenium.clickAndWait("//span[text()='United States']");

	selenium.verifyTextPresent("Shopping Bag");
test.endStep();

step = test.beginStep("Search for SKU GRP07303", timeout);
	test.log("begin step: " + step.getLabel());

	// Moves the mouse to the middle of the element. The element is scrolled into view
	action.moveToElement(driver.findElement(By.xpath("//img[@alt='Search']"))).click().perform();

	// pauses the script to allow time for page actions before next search
	test.pause(250);
	var searchBox = driver.findElement(By.xpath("//input[@id='searchInput']"));

	// the element must be made visible to be interacted with, otherwise Selenium will throw an exception
	driver.executeScript("$('#sitesearch').show()");

	searchBox.click();
	searchBox.clear();

	// type SKU to search for into the search box
	searchBox.sendKeys("GRP07303");
	searchBox.sendKeys(Keys.RETURN);

	// waits netListen milliseconds and
	// then continues waiting until timeout milliseconds while network traffic is present
	test.waitForNetworkTrafficToStop(netListen, timeout);
	selenium.verifyTextPresent("Search Results");
test.endStep();

step = test.beginStep("Click Add to Shopping Bag", timeout);
	test.log("begin step: " + step.getLabel());
	action.moveToElement(driver.findElement(By.xpath("//img[starts-with(@alt,'Tiffany Soleste')]"))).perform();

	test.waitForNetworkTrafficToStop(netListen, timeout);
	selenium.click("//a[text()='Add to Shopping Bag']");
	test.waitForNetworkTrafficToStop(netListen, timeout);
test.endStep();

test.endTransaction();
