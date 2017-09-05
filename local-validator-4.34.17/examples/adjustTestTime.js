// demonstrates posting form parameters
// scripting documentation is available at http://docs.wpm.neustar.biz/testscript-api/index.html

// uses the test main control interface to start a browser session
var webDriver = test.openBrowser();

// Returns the HTTP client through which browser requests are proxied.
var c = webDriver.getHttpClient();

// a transaction in a script contains basic timing information, such as the start and end time,
// as well as the total number of bytes transferred during the transaction.
// It also holds a flag that indicates if the transaction is considered a success or a failure.
test.beginTransaction();

// the time in milliseconds after which the script will throw an error if network traffic has not stopped
var timeout = 10000;

// breaking a script into discrete steps allows complex, lengthy procedures to be logically compartmentalized
// beginStep must be called from within a transaction.
// this override allows the script to set the step's label and set a timeout after which the transaction
// will fail if the step has not completed
var s = test.beginStep("get test.stagingwpm.neustar.biz", timeout);

// get the page at a URL, specifying the expected status code
c.get("http://test.stagingwpm.neustar.biz/", 200);

// end this step
test.endStep();

// Sets the time you want recorded for the step. Call after test.endStep() otherwise the length of time between test.beginStep() and test.endStep() will be recorded.
s.setTimeActive(50);

test.endTransaction();
