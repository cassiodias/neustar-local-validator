// demonstrates using Selenium to search a page for a element using verifyElementPresent
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

// Start a new transaction.  This is needed to start recording HTTP traffic and timings.
test.beginTransaction();

// Transactions are grouped into "steps".  You can do work outside of a step, but it won't
// be recorded in the reports and charts. To record timings, start a step.
test.beginStep("Description of Step 1");

// Navigate the browser to the given URL
selenium.open("http://www.neustar.biz");

// verify that a given element is present
selenium.verifyElementPresent("//div[@id='prev']");

// End the step. You can begin additional steps after this call if you'd like.
test.endStep();

// Finally, end the transaction, saving the transaction, its steps and the total time the
// transaction was executing.
test.endTransaction();

