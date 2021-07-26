
var elTimeBlock = $('#row-timeblock');
var elCurrentDay = $('#currentDay');


//capture and format today's date
var today = moment().format("dddd, MMMM Do YYYY");
var currentHour = moment().format("MM-DD-YYYY hh:00 A");

elCurrentDay.append(today);

//create day calendar for planner
for( i=0; i < 24; i++){
    let x = 0;
    let ap = '';
    let colorClass = '';
    var time;
    var eventDateTime;

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

    time = `${x}:00 ${ap}`
    eventDateTime = moment(today + ' ' + time, "dddd, MMMM Do YYYY hh:00 A").format("MM-DD-YYYY hh:00 A") ;

    
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

    //format div for calendar day row
    elTimeBlock.append(`
        <div class="row">
            <div class="col" data-time="${x}:00${ap}">
                ${time}
            </div>
            <div class="col-8 ${colorClass} " data-event-message-time="${x}:00${ap}">
                <textarea id="event-message"></textarea>
            </div>
            <div class="col event-save" data-event-button="button-${x}:00${ap}">
               <p><i class="fas fa-book fa-2x"></i></p>
            </div>
        </div>`);
}

function functionFormatDate(){

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

   let eventStorage = JSON.parse(localStorage.getItem("calendarEvents"));

    if(eventStorage == null)
    {
       eventStorage = [];
    }
   
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

//capture event to save event
elTimeBlock.on("click",".event-save", saveEvent)
