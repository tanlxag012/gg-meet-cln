const getCurrentDate = () =>
{
const currentDate = new Date();
var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();
var day = currentDate.getDay();
var date =  currentDate.getDate();
var month = currentDate.getMonth();

if (minutes < 10) {
    minutes = "0" + minutes;
}

document.getElementById('currentDate').innerHTML = hours + ":" + minutes + " <span>•</span> Th " + day + ", "  + date + " thg " + month;

}

setInterval(getCurrentDate,1000)

