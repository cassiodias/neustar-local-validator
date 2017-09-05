var testURL = "http://www.gmail.com";
var fileUploadURL = "<URL FOR FILE TO UPLOAD COMES HERE>";  // fileUpload URL following url accepts file upload
var statusCode = 200;    // status code for OK response
var httpClientObj = test.openHttpClient();

test.beginTransaction();
test.beginStep("Post method http request to test url");
var postHttpResponse = httpClientObj.post(testURL);

var postHttpResponseStatusCode = postHttpResponse.getStatusCode();
if (postHttpResponseStatusCode == statusCode) // check for status code
	test.log("Post method status code is " + postHttpResponseStatusCode);
else
	throw "Post method operation fails expected status code is " + statusCode
			+ " actual status code is " + postHttpResponseStatusCode;
test.endStep();
test.beginStep("Get method http request to test url");
test.waitForNetworkTrafficToStop(2000, 10000);  // Wait for http traffic to stop maximum limit set 10 seconds
var getHttpResponse = httpClientObj.get(testURL);
var getHttpResponseStatusCode = getHttpResponse.getStatusCode();
if (getHttpResponseStatusCode == statusCode)
	test.log("Get method status code is " + getHttpResponseStatusCode);
else
	throw "Get method operation fails expected status code is " + statusCode
			+ " actual status code is " + getHttpResponseStatusCode;
test.endStep();
test.beginStep("File upload section");
var file = test.getFile("uploadTestFile.txt");
test.log(file.readContents());
test.log(file.readLine());
test.endStep();
test.beginStep("Create http request object and execute httpRequest to upload file");
var httpRequest = httpClientObj.newGet(fileUploadURL);
httpRequest.addFileUpload(fileUploadURL, file, "text/plain");//upload text/plain file
var fileUploadResponse = httpRequest.execute();
//check for file upload response code 
var fileUploadResponseStatusCode = fileUploadResponse.getStatusCode();
if (fileUploadResponseStatusCode == statusCode)
	test.log("Response status code after uploading a file "
			+ fileUploadResponseStatusCode);
else
	throw "File upload operation fails expected status code is " + statusCode
			+ " actual status code is " + fileUploadResponseStatusCode;
test.endStep();
test.endTransaction();
