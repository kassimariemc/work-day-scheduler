$(document).ready(function() {
  var events = [];
  
  // listen for save button clicks
  $(".saveBtn").on("click", function() {
    // get nearby values
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    events.push({description: value, time: time});

    // save the value in localStorage as time
    localStorage.setItem("events", JSON.stringify(events));
    
  });

  function hourUpdater() {
    // get current number of hours
    var currentHour = moment().hours();
    console.log('current hour:', currentHour);

    // clear day
    if(currentHour > 23) {
      for(var i = 0; i < events.length; i++) {
      events[i].description = "";
      events[i].time = "";
      events.length = 0;
      }
    }

    // loop over time blocks
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // check if we've moved past this time
      // if the current hour is greater than the block hour
      // then add class "past"
      if(currentHour > blockHour) {
        $(this).addClass("past");
      }
      // if they are equal
      // then remove class "past" and add class "present"
      else if(currentHour === blockHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      }
      // else
      // remove class "past", remove class "present", add class "future"
      else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
      
    });
  }

  hourUpdater();

  // set up interval to check if current time needs to be updated
  // which means execute hourUpdater function every 15 seconds
  var secondsLeft = 15;
  function setTime() {
    setInterval(function() {
      secondsLeft--;
  
      if(secondsLeft === 0) {
        hourUpdater();
        secondsLeft = 15;
      }
  
    }, 1000);
  }
  setTime();

  // load any saved data from localStorage
  var storedEvents = JSON.parse(localStorage.getItem("events"));

  if (storedEvents !== null) {
    events = storedEvents;
  }

  for(var i = 0; i < events.length; i++) {
    var userDescription = events[i].description;
    $("#" + events[i].time).children(".description").text(userDescription);
  }


  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
