// Takes the query string (if exists) and removes ?site= 
// (making assumption that is the string for now)
// This should be more intelligent, but for now it works
var search = window.location.search.slice(6, window.location.search.length);

// Add a button to view page if site string exists
if (search.length) {
  separator = search.indexOf('?') > 0 ? '&' : '?';
  redirect = search + separator + 'nonews_bypass=true';
  h3 = document.getElementById('still_wanna_view');
  newp = document.createElement('p');
  h3.appendChild(newp);
  newp.innerHTML = '<a class="btn-danger" href="'+unescape(redirect)+'">Click here to visit this page anyway.</a>';
}