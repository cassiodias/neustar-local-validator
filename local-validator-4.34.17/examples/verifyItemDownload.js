// demonstrates verifying retrieval of objects using verifyItemDownload
// scripting documentation is available at http://docs.wpm.neustar.biz/testscript-api/index.html

 var driver = test.openBrowser();

// a transaction in a script contains basic timing information, such as the start and end time,
// as well as the total number of bytes transferred during the transaction.
// It also holds a flag that indicates if the transaction is considered a success or a failure.
test.beginTransaction();

// breaking a script into discrete steps allows complex, lengthy procedures to be logically compartmentalized
// beginStep must be called from within a transaction.
// this override allows the script to set the step's label and set a timeout after which the transaction
// will fail if the step has not completed
var step = test.beginStep("verifyItemDownload");

// retrieve page
driver.get("http://cdn.doubleverify.com/monitor/Webmetrics/BS_2.0_Mon-NonSSL.html");

test.waitForNetworkTrafficToStop(30000, 30000);
 
// verify item has been downloaded
step.verifyItemDownload("http://cdn.doubleverify.com/monitor/Webmetrics/BS_2.0_Mon-NonSSL.html")

// verify item has been downloaded
step.verifyItemDownload("http://cdn.doubleverify.com/monitor/Webmetrics/300x250.jpg")

// end the step (retrieving the initial web page) of the script
test.endStep();

// end the transaction
test.endTransaction();
