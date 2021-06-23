
const heading = document.getElementById("heading");
const dateInsert = document.getElementById("date-insert");

let newYear = "16 july 2021";


function Submit() {
  try {
    if (heading.value !== "" && dateInsert.value !== "") {
      document.getElementById("heading-content").innerHTML = heading.value;
      newYear = dateInsert.value;
    } else {
      alert("please fill in the field");
      return;
    }
  } catch(e) {
    alert(e);
  }

  const currentDate = new Date();
  const oldDate = new Date(dateInsert.value);
  if(oldDate - currentDate < 0) {
    alert("Choose a date beyound today's date");
    document.getElementById("heading-content").innerHTML = "VICTOR'S BIRTHDAY.";
    newYear = "16 july 2021";
  }

}

function countDown(days, hours, mins, seconds) {
  const newYearDate = new Date(newYear);
  const currentDate = new Date();
  
  const totalSeconds = (newYearDate - currentDate) / 1000; //converting to milli totalSeconds 
  
  days = Math.floor(totalSeconds / 3600 / 24);

  hours = Math.floor(totalSeconds / 3600) % 24;

  mins = Math.floor(totalSeconds / 60) % 60;

  seconds = Math.floor(totalSeconds) % 60;

  days = formatTime(days)
  hours = formatTime(hours);
  mins = formatTime(mins);
  seconds = formatTime(seconds);

  display(days, hours, mins, seconds)

}


function display(days, hours, mins, seconds) {
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("mins").innerHTML = mins;
  document.getElementById("seconds").innerHTML = seconds;
}

function formatTime(time) {
  return (time < 10 && time > 0) ?  `0${time}` : time;
}



setInterval(countDown, 1000);