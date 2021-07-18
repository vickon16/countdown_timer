
const heading = document.getElementById("heading");
const dateInsert = document.getElementById("date-insert");

function saveCalender(items) {
  localStorage.setItem("calender", JSON.stringify(items))
}

function getCalender() {
  return localStorage.getItem("calender") ? JSON.parse(localStorage.getItem("calender")) : {header: "Set Header", date: ""};
};

const timer = setInterval(countDown, 1000);
let userDate = "";

const LSdate = getCalender();
document.getElementById("heading-content").innerHTML = LSdate.header;
userDate = LSdate.date;


// setTimeout(() => {
//   alert("Set your countdown to any date of your choice. \nInput your header and the required date. \nDone!!!. \n\nCreated by VicKon")
// }, 2000);



function Submit() {
  const currentDate = new Date();
  const oldDate = new Date(dateInsert.value);

  try {
    if (heading.value !== "" && dateInsert.value !== "") {
      let items = {header: heading.value, date: dateInsert.value};

      if(oldDate - currentDate < 0) {
        alert("Choose a date beyound today's date");
        document.getElementById("heading-content").innerHTML = LSdate.header;
        userDate = LSdate.date;
      } else {
        saveCalender(items)
        document.getElementById("heading-content").innerHTML = heading.value;
        userDate = dateInsert.value;

        heading.value = "";
        dateInsert.value = "";
      }

    } else {
      alert("please fill in the field");
      return;
    }
  } catch(e) {
    clearInterval(timer)
    alert(e);
  }

  
  

}

function countDown() {
  if (userDate !== "") {
    const newYearDate = new Date(userDate);
    const currentDate = new Date();
    
    const totalSeconds = (newYearDate - currentDate) / 1000; //converting to milli totalSeconds 
    
    let days = Math.floor(totalSeconds / 3600 / 24);

    let hours = Math.floor(totalSeconds / 3600) % 24;

    let mins = Math.floor(totalSeconds / 60) % 60;

    let seconds = Math.floor(totalSeconds) % 60;

    days = formatTime(days)
    hours = formatTime(hours);
    mins = formatTime(mins);
    seconds = formatTime(seconds);

    display(days, hours, mins, seconds)

    if(newYearDate - currentDate < 0) {
      clearInterval(timer);
    }
  }
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

// localStorage.removeItem("calender")
