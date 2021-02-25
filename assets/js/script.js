//declare variables
let todaysDate = $('#currentDay');
let mainArea = $('#main-content');
let hours = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
let browserStorage = window.localStorage;

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
    if (moment(currentRow.text())._i < moment().format('HHmm')) {
       currentRow.next($('textarea')).addClass("past");
    } else if (moment(currentRow.text())._i > moment().format('HHmm')){
        currentRow.next($('textarea')).addClass("future");
    } else {
        currentRow.next($('textarea')).addClass("present");
    }
};

let savedInfoArray =[];
if(browserStorage.length > 0){
     savedInfoArray = JSON.parse(browserStorage.getItem('savedItems'))
} 

//event listener to save input
$('.saveBtn').on('click', function (event){
    event.preventDefault();
    let textInput = $(this).siblings('textarea').val();
    let rowInputId = $(this).parent().parent().attr('id');
    savedInfoArray.push({rowInputId, textInput});
    browserStorage.setItem('savedItems', JSON.stringify(savedInfoArray))
})

let displayInfoArray =[];
//write local storage items to correct row
if (browserStorage.length > 0) {
    displayInfoArray = JSON.parse(browserStorage.getItem('savedItems'));
    for (var i = 0; i < displayInfoArray.length; i++) {
        let targetRow = displayInfoArray[i].rowInputId;
        console.log(targetRow);
        $(`#${targetRow}`).children().children('textarea').val(displayInfoArray[i].textInput)
    }
}