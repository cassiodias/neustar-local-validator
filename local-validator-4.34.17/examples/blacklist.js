// demonstrates blacklisting sites
// scripting documentation is available at http://docs.wpm.neustar.biz/testscript-api/index.html

var httpClient = test.openHttpClient();

var blackListedResponseCode = 707; 

var testListedUrl = function ( expectedCode, url ) {
	var httpResponse = httpClient.get( url );
	var httpInfoObj = httpResponse.getInfo();
	if( httpInfoObj ) {
        test.assertEquals( expectedCode, httpInfoObj.getStatusCode() );
	}
}

var assertBlackListed = function (url) {
	testListedUrl( blackListedResponseCode, url);
}

// a transaction in a script contains basic timing information, such as the start and end time,
// as well as the total number of bytes transferred during the transaction.
// It also holds a flag that indicates if the transaction is considered a success or a failure.
test.beginTransaction();

// breaking a script into discrete steps allows complex, lengthy procedures to be logically compartmentalized
// beginStep must be called from within a transaction.
// this override allows the script to set the step's label and set a timeout after which the transaction
// will fail if the step has not completed
test.beginStep("test blacklist");

//add a couple of domains to the blacklist
httpClient.blacklistRequests("http://www\\.google\\.com", blackListedResponseCode);
httpClient.blacklistRequests("http://www\\.twitter\\.com", blackListedResponseCode);

//check whether these urls get blacklisted
assertBlackListed("http://www.google.com");
assertBlackListed("http://www.twitter.com");

//modify the blacklist
httpClient.blacklistRequests("http(s)?://plus\\.google\\.com/.*", blackListedResponseCode);

httpClient.get("https://plus.google.com/"); 
		
httpClient.blacklistRequests("http://www.repubblica.it", blackListedResponseCode);

//check whether the previous entries are still valid
assertBlackListed("http://www.google.com");
assertBlackListed("http://www.twitter.com");

//check whether the new entry is recognised too
assertBlackListed("http://www.repubblica.it");

test.endStep();

test.endTransaction();
