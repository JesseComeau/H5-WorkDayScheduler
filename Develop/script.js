var currentDayEl = $("#currentDay");
var dailyAssignmentsEl  = document.getElementById('dailyAssignments');
var offTime = moment('5', 'h');
var saveBTN = document.getElementById('save');
var startTime = moment('8', 'h');
var hoursWorked = 9
let savedAssignments = []


// timeClock();
displayBlocks();

setInterval (timeClock,1000);

function timeClock () {
    currentDayEl.html(moment().format('dddd, MMM YY - LTS'));
    return timeClock;
}

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

function saveButton() {
    let eventEl = event.target.previousElementSibling
    let eventElValue = eventEl.value 
    

    // object
    // console.log(savedItem)
    let savedItem = {
        value: eventElValue,
        index: eventEl.getAttribute("id")
    }

    savedAssignments.push(savedItem)
    console.log(savedAssignments)

    localStorage.setItem("savedData", JSON.stringify(savedAssignments));
    
}

let localStorageSave = []
let assignmentList = []
function loadSavedData() {
    let localStorageData = localStorage.getItem("savedData");
    let localStorageParse = JSON.parse(localStorageData);
    savedAssignments = localStorageParse;
    savedAssignments.forEach(populateSavedData);

    function populateSavedData(target){
        let assignment = document.getElementById(target.index)
        let text = target.value 
        console.log(target.value)
        assignment.setAttribute("value", text)
        console.log(assignment.text)
        // document.getElementById(target.index).innerHTML = target.value
    }
    }  

