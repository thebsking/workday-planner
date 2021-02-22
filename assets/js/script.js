//declare variables
let todaysDate = $('#currentDay');
let mainArea = $('#main-content');
let hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

//display current date
todaysDate.text(moment().format('dddd, MMMM Do'));

//display time blocks
for (var i = 0; i < hours.length; i++) {
   mainArea.append($('<div>').addClass('time-block').attr('id', 'hour-'+i));
   $('div.time-block').eq(i).append($('<div>').addClass('row'))
   $('div.row').eq(i).append($('<span>').addClass('hour').text(hours[i]).css('padding-top', '5px')).append($('<textarea>').addClass('description')).append($('<button>').addClass('saveBtn').text('save'))
};

//color code time rows
let rowCount = mainArea.children().length;
for (var x = 0; x < rowCount; x++) {
    let currentRow = $(`#hour-${x} > div > span`);
    if (currentRow.text() < moment().format('hA')) {
       currentRow.next($('textarea')).addClass("past");
    } else if (currentRow .text() > moment().format('hA')){
        currentRow.next($('textarea')).addClass("future");
    } else {
        currentRow.next($('textarea')).addClass("present");
    }
};

//event listener to save input
$('.saveBtn').on('click', function (event){
    event.preventDefault();
    let textInput = $(this).siblings().text();
    window.localStorage.setItem('savedItem', textInput)
})