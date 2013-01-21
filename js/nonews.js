/*
    nonews.js

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
*/

// Get the file for the blacklist to load from json
var fileURL = chrome.extension.getURL("../assets/blacklist.json"); 
var xmlreq = new XMLHttpRequest();
xmlreq.open("GET", fileURL, false);
xmlreq.send();

// The file should be in xmlreq.responseText array
var blacklist = json_parse(xmlreq.responseText);

// Add the event listener with filters
chrome.webRequest.onBeforeRequest.addListener(
  function(tab) {
		return { 
			redirectUrl: 'http://jdstraughan.github.com/nonews/blocked-site.html' 
		}
  },
  // filters
  {
    urls: blacklist.urls,
    types: ["main_frame"]
  },
  // extratabSpec
  ["blocking"]
);