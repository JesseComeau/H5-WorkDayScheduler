var currentDayEl = $("#currentDay");
var dailyAssignmentsEl  = document.getElementById('dailyAssignments');
var offTime = moment('5', 'h');
var saveBTN = document.getElementById('save');
var startTime = moment('8', 'h');
var hoursWorked = 9
let savedAssignments = []
let localStorageSave = []
let assignmentList = []

displayBlocks();

// Time clock funtionality with moment.js
function timeClock () {
    currentDayEl.html(moment().format('dddd, MMM YY - LTS'));
    return timeClock;
}
setInterval (timeClock,1000);

// display initial time blocks
function displayBlocks () {
    for (var index = 0; index < hoursWorked; index++) {
        let timeLoop = ""
        timeLoop = startTime.add(1, `h`);
        timeLoopId = timeLoop.hours();
        timeLoopEl = timeLoop.format("hh:mm A")
        dailyAssignmentsEl.innerHTML += `   <div class="container">
                                                <div class="row">
                                                    <div class="col-1 text-center px-3 py-4 mb-1 text-nowrap align-middle hour" id="time${index}" data="${timeLoopId}">
                                                        ${timeLoopEl}
                                                    </div>

                                                    <input class ="col-10 h-100 text-left text-wrap" id="assignments${index}" type="text">
                                                    
                                                    <button class="col-1 text-center text-white text-nowrap saveBtn fa fa-save" onclick="saveButton()">
                                                        
                                                    </button>
                                                </div>
                                            </div>`
    }
    // console.log(document.getElementById("assignments0"))
    checkTime ()
}

// functionality to color code time blocks based on current time
function checkTime (){
    for (let index = 0; index < hoursWorked; index++) {
        let timeCheck = document.getElementById(`time${index}`);
        let timeCheckData = timeCheck.getAttribute("data")
            if (timeCheckData > moment().hours()) {
                document.getElementById(`assignments${index}`).classList.add("future")
        }  
            if (timeCheckData == moment().hours()) {
                document.getElementById(`assignments${index}`).classList.add("present")
        }  
            if (timeCheckData < moment().hours()) {
                document.getElementById(`assignments${index}`).classList.add("past")
        }            
    }
}  

// Save button funcationality. Also updates local storage as it continues.
function saveButton() {
    let eventEl = event.target.previousElementSibling
    let eventElValue = eventEl.value 
    let savedItem = {
        value: eventElValue,
        index: eventEl.getAttribute("id")
    }

    savedAssignments.push(savedItem)

    localStorage.setItem("savedData", JSON.stringify(savedAssignments));
    
}

// populate local storage data on page load
function loadSavedData() {
    let localStorageData = localStorage.getItem("savedData");
    let localStorageParse = JSON.parse(localStorageData);
    savedAssignments = localStorageParse;
    savedAssignments.forEach(populateSavedData);

    function populateSavedData(target){
        let assignment = document.getElementById(target.index)
        let text = target.value 
        assignment.setAttribute("value", text)
     
    }
}  

