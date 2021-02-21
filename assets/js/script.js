//declare variables
let todaysDate = $('#currentDay');
let hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];


//display current date
todaysDate.text(moment().format('dddd, MMMM Do'));