
var elTimeBlock = $('#row-timeblock');
var elCurrentDay = $('#currentDay');


//capture and format today's date
var today = moment().format("dddd, MMMM Do YYYY");
var currentHour = moment().format("MM-DD-YYYY hh:00 A");

elCurrentDay.append(today);

//var time = '8:00 PM'

//var eventDateTime = moment(today + ' ' + time, "dddd, MMMM Do YYYY hh:00 A").format("MM-DD-YYYY hh:00 A") ;

//log storage
let eventStorage = localStorage.getItem("calendarEvents") || [];

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
        case "same":
            colorClass = 'present';
            break;

    }

    console.log(colorClass);

    //format div for calendar day row
    elTimeBlock.append(`
        <div class="row">
            <div class="col" data-time="${x}:00${ap}">
                ${time}
            </div>
            <div class="col-8 ${colorClass}" data-event-time="${x}:00${ap}">
                <textarea></textarea>
            </div>
            <div class="col event-save" data-event-button="$ {x}:00${ap}">
               <p><i class="fas fa-book fa-2x"></i></p>
            </div>
        </div>`);
}

function functionFormatDate(){

}

function checkDate(eventDateTime){
    var colorVal = '';

   if(moment(eventDateTime,"MM-DD-YYYY hh:00 A").isBefore(moment(currentHour,"MM-DD-YYYY hh:00 A")))
   {
       colorVal = 'before';
   }

   if(moment(eventDateTime,"MM-DD-YYYY hh:00 A").isSame(moment(currentHour,"MM-DD-YYYY hh:00 A")))
   {
       colorVal = 'same';
   }

   if(moment(eventDateTime,"MM-DD-YYYY hh:00 A").isAfter(moment(currentHour,"MM-DD-YYYY hh:00 A")))
   {
       colorVal = 'after';
   }

   return colorVal;

}

//save user calendar events to storage
function saveEvent(event){
   
   let enteredEvent = $(event.target).attr('data-letter');

   console.log(enteredEvent);

    var userEvent = {
        userDate: today,
        userTime: "",
        userEvent: ""
    };
    
    eventStorage.push(userEvent);
    localStorage.setItem("userEvent",JSON.stringify(userEvent));
  
}
//capture event to save event
elTimeBlock.on("click",".event-save", saveEvent)
