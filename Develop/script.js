var currentDayEl = $("#currentDay");
var dailyAssignmentsEl  = $('#dailyAssignments');

dailyAssignmentsEl.text("hello world");

function timeClock () {
    currentDayEl.html(moment().format('dddd, MMM YY - LTS'));
}

timeClock();

setInterval (timeClock,1000);

