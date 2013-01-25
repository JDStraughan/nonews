/*
    nonews.js

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
*/

if (typeof localStorage.nonews_blacklist_urls === "undefined") {
  // Get the file for the blacklist to load from json
  var fileURL = chrome.extension.getURL("../assets/blacklist.json"); 
  var xmlreq = new XMLHttpRequest();
  xmlreq.open("GET", fileURL, false);
  xmlreq.send();

  // The file should be in xmlreq.responseText array
  blacklist = json_parse(xmlreq.responseText);
  localStorage.nonews_blacklist_urls = JSON.stringify(blacklist.urls);
}

// Add the event listener with filters
chrome.webRequest.onBeforeRequest.addListener(
  function(tab) {
    // Check for manual bypass via query string
    if (tab.url.indexOf("nonews_bypass=true") > 0) {
      return;
    }
    // Check for snooze option
    now = new Date().getTime();
    if (localStorage.nonews_snooze_end > now) {
      return;
    }
    // Redirect to blocked site page, passing url for bypass option
    return { 
      redirectUrl: 'http://www.nonews.info/blocked-site.html?site=' + tab.url
    }
  },
  // filters
  {
    urls: JSON.parse(localStorage.nonews_blacklist_urls),
    types: ["main_frame"]
  },
  // extratabSpec
  ["blocking"]
);