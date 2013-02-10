var now = new Date().getTime();
var snooze_end = localStorage.nonews_snooze_end;
setSnoozeContents(now, snooze_end);
var el = document.getElementById("nonews_snooze"); 

if (el) {
  el.addEventListener("click", function() { snooze(now, snooze_end) }); 
}

// Set the snooze period to stop filter from blocking sites
function snooze(now, snooze_end) {
  
  // Do nothing if stored is still valid
  if (snooze_end > now) {
    return;
  }

  // Set new snooze time (in unix timestamp (in milliseconds))
  // Set for 15 minutes in the future (90000ms = 15mins)
  localStorage.nonews_snooze_end = now + 900000;

  // Update the class to reflect snooziness
  setSnoozeContents(now, localStorage.nonews_snooze_end);

}

// Human readable amount of time left in snooze period
function snoozeTimeRemaining(now, snooze_end) {
  secs_remain = Math.ceil((snooze_end - now) / 1000);
  if (secs_remain < 60) {
    return secs_remain + ' seconds';
  } else {
    mins_remain = Math.ceil(secs_remain / 60);
    unit_of_measure = (mins_remain == 1) ? ' minute' : ' minutes'; 
    return mins_remain + unit_of_measure; 
  }
}

// Updates the snooze container with proper html to operate snooze bar
function setSnoozeContents(now, snooze_end) {
  if (snooze_end > now) {
    contents = '<span class="snoozing">NoNews is snoozing for  the next ' + snoozeTimeRemaining(now, snooze_end) + '.</span>';
  } else {
    contents = '<button id="nonews_snooze" href="#">Snooze NoNews Filtering for 15 Minutes</button>';
  }
  document.getElementById("snooze_container").innerHTML = contents;
}