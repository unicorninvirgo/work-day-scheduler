
var elTimeBlock = $('#row-timeblock');
var elCurrentDay = $('#currentDay');


//capture and format today's date
const today = moment().format("dddd, MMMM Do YYYY");
elCurrentDay.append(today);

//log storage
let eventStorage = localStorage.getItem("calendarEvents") || [];

//create day calendar for planner
for( i=0; i < 24; i++){
    let x = 0;
    let ap = '';

    //set midday
    i < 12 ? ap = 'AM' : ap = 'PM';

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

    //format div for calendar day row
    elTimeBlock.append(`
        <div class="row">
            <div class="col" data-time="${x}:00${ap}">
                ${x}:00 ${ap}
            </div>
            <div class="col-8" data-event-time="${x}:00${ap}">
                <input type="textarea" class="form-control"  aria-describedby="inputGroup-sizing-lg">
            </div>
            <div class="col" data-event-button="">
               <p><i class="fas fa-book"></i></p>
            </div>
        </div>`);
}


//capture event to save event
elTimeBlock.on("click",function(){
    alert("hello");
})
