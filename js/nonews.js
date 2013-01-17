/*
    json_parse.js
    2012-06-20

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
*/

// Get the file for the blacklist to load from json
var fileURL = chrome.extension.getURL("../assets/blacklist.json"); 
var xmlreq = new XMLHttpRequest();
xmlreq.open("GET", fileURL, false);
xmlreq.send();

//The file should be in xmlreq.responseText array
var blacklist = json_parse(xmlreq.responseText);

// Init showConfirm to false
var showConfirm = false;

// Iterate blacklist hostnames and see if we have a match
for (var i = 0; i < blacklist.hostnames.length; i++) {
	if (location.hostname.indexOf(blacklist.hostnames[i]) > -1) {
		showConfirm = true;
	}
}

// If there were matches, show the confirmation dialog
if (showConfirm == true) {
	showConfirmDialog();
}

// Displays confirm dialog and handles action
function showConfirmDialog() {
	var r=confirm("***WARNING!***\n\nThis is a news site, and the content is probably not worth your time.\n\nAre you sure you wish to continue?");
	if (r==false) {
		if (history.length > 1) {
	  		history.back();
		} else {
			window.close();
		}
	}
}