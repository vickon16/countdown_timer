
const heading = document.getElementById("heading");
const dateInsert = document.getElementById("date-insert");
const paragraphs = document.querySelectorAll(".countdown-container p");
const elapsed = document.querySelector(".elapsed");

let timer, userDate, LSdate;


window.addEventListener("DOMContentLoaded", () => {
  LSdate = getCalender();
  document.getElementById("heading-content").innerHTML = LSdate.header;
  userDate = LSdate.date;
  const timer = setInterval(countDown, 1000);
  countDown()
})

function saveCalender(items) {
  localStorage.setItem("calender", JSON.stringify(items))
}
const tempDate = new Date();
const tempYear = tempDate.getFullYear();
const tempMonth = tempDate.getMonth();
const tempDay = tempDate.getDate();
const tempHour = tempDate.getHours()
const tempMinute = tempDate.getMinutes()
const tempSeconds = tempDate.getSeconds()

function getCalender() {
  return localStorage.getItem("calender") ? JSON.parse(localStorage.getItem("calender")) : {header: "New Header", date: new Date(tempYear, tempMonth, tempDay, tempHour + 1, tempMinute, tempSeconds)}
};

// setTimeout(() => {
  //   alert("Set your countdown to any date of your choice. \nInput your header and the required date. \nDone!!!. \n\nCreated by VicKon")
  // }, 2000);

function Submit() {
  const currentDate = new Date().getTime();
  const futureDate = new Date(dateInsert.value).getTime();

  if (heading.value !== "" && dateInsert.value !== "") {
    let items = {header: heading.value, date: dateInsert.value};
    
    if(futureDate - currentDate < 0) {
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
}
  
function countDown() {
  const futureTime = new Date(userDate).getTime();
  const currentDate = new Date().getTime();
  const ts = (futureTime - currentDate);
  
  if (ts > 0) {
    const oneday = 24 * 60 * 60 * 1000;
    const onehour = 60 * 60 * 1000;
    const onemin = 60 * 1000;

    let days = Math.floor(ts / oneday);
    let hours = Math.floor((ts % oneday) / onehour)
    let minutes = Math.floor((ts % onehour) / onemin)  
    let seconds = Math.floor((ts % onemin) / 1000)

    const values = [days, hours, minutes, seconds]

    paragraphs.forEach((para, index) => {
      para.innerHTML = formatTime(values[index]);
    })
  } else {
    clearInterval(timer);
    elapsed.classList.add("show");
  }
}

function formatTime(time) {
  return (time < 10) ?  `0${time}` : time;
}

