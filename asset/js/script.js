
var elTimeBlock = $('#row-timeblock');
var elCurrentDay = $('#currentDay');


//capture and format today's date
var today = moment().format("dddd, MMMM Do YYYY");
var currentHour = moment().format("MM-DD-YYYY hh:00 A");

elCurrentDay.append(today);

let eventStorage = []; 

function createDayPlanner(){
    //create day calendar for planner
    for( i=0; i < 24; i++){
        let x = 0;
        let ap = '';
        let colorClass = '';
        var time;
        var eventDateTime;
        var existingEvent = '';

        //set midday
        i < 12 ? ap = 'AM' : ap = 'PM';

        //format time of day
        if(i===0 || i===24){
            x = 12;
        }
        else if(i > 12)
        {
            x = i%12
        }
        else{
            x = i;
        }

        //format the time of day at the hour
        time = `${x}:00 ${ap}`
        eventDateTime = getTimeHour(time);

        //get the CSS color class
        colorClass = getColorCSSClass(eventDateTime);

        //display
        let displayMessage  =  colorClass != 'past' ? true : false 

        eventStorage.filter(x => {
                if(x.userTime === time.replace(' ',''))
                {
                    existingEvent += x.userEvent + " ";
                }       
            });

        //format div for calendar day row
        elTimeBlock.append(`
            <div class="row">
                <div class="col" data-time="${x}:00${ap}">
                    ${time}
                </div>
                <div class="col-8 ${colorClass} " data-event-message-time="${x}:00${ap}">
                        <textarea id="event-message">${existingEvent}</textarea>'
                </div>
                <div class="col event-save" data-event-button="button-${x}:00${ap}">
                <p><i class="fas fa-book fa-2x"></i></p>
                </div>
            </div>`);

    }

    //disable text entry for times in past
    $('.past textarea').prop('disabled', true);
}

//append the day and time
function getTimeHour(time){

    return moment(today + ' ' + time, "dddd, MMMM Do YYYY hh:00 A").format("MM-DD-YYYY hh:00 A") ;

}

//get the color css class based on time of day
function getColorCSSClass(eventDateTime){
    let colorClass = '';
    
    switch (checkDate(eventDateTime))
    {
        case "before": 
            colorClass = 'past';
            break;

        case "after":
            colorClass = 'future';
            break;

        default:
            colorClass = 'present';
            break;

    }

    return colorClass;
}


function checkDate(eventDateTime){
    var colorVal = '';
    var currentHourStart = moment().startOf('hour')
    var currentHourEnd = moment().endOf('hour')

   // console.log(currentHourEnd);

   if(moment(eventDateTime,"MM-DD-YYYY hh:00 A").isBefore(moment(currentHour,"MM-DD-YYYY hh:00 A")))
   {
       colorVal = 'before';
   }

   if(moment(eventDateTime,"MM-DD-YYYY hh:00 A").isAfter(moment(currentHour,"MM-DD-YYYY hh:00 A")))
   {
       colorVal = 'after';
   }

   if(moment(eventDateTime,"MM-DD-YYYY hh:00 A").isBetween(moment(currentHourStart,"MM-DD-YYYY hh:00 A"),moment(currentHourEnd,"MM-DD-YYYY hh:00 A")))
   {
       colorVal = 'same';
   }

   return colorVal;

}

//save user calendar events to storage
function saveEvent(event){
   
  // let enteredEvent = event;
   event.preventDefault();
   
   var dataEventTime = $(this).prev().attr('data-event-message-time');
   var dataEvent = $(this).prev().children().val();

   var userEvent = {
        userDate: today,
        userTime: dataEventTime,
        userEvent: dataEvent
    };
    
    eventStorage.push(userEvent);
    localStorage.setItem("calendarEvents",JSON.stringify(eventStorage));
  
}

function addEventListeners(){

    //capture event to save event
    elTimeBlock.on("click",".event-save", saveEvent)
}


//manage localstorage cleanup
function cleanupStorage(){

    eventStorage = JSON.parse(localStorage.getItem("calendarEvents"));

    if(eventStorage == null)
    {
        eventStorage = [];
    }

    //cleanup localstorage
    eventStorage = eventStorage.filter(x => (x.userDate == today))

    console.log(eventStorage);

}

//call functions to run
function init()
{ 
    cleanupStorage();
    addEventListeners();
    createDayPlanner();
}
//initiate the program
init();