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
   $('div.row').eq(i).append($('<span>').addClass('hour').text(hours[i])).append($('<textarea>').addClass('description')).append($('<button>').addClass('saveBtn'))
};
// let rowNumber = mainArea.children().length;
// for (var i = 0; i < rowNumber; i++){
//     $('div.time-block:eq(i)').append($('<div>').addClass('row'))
// }


//color code time rows

// for (var x = 0; x < rowNumber; x++) {
//     currentRow = $(`#hour-${x}`);
//     if (currentRow.text() > moment().format('hA')) {
//        currentRow.addClass(".past");
//     } else if (currentRow < moment().format('hA')){
//         currentRow.addClass(".future");
//     } else {
//         currentRow.addClass(".present")
//     }
// }

// 