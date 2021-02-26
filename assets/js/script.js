//declare global variables
let todaysDate = $('#currentDay');
let mainArea = $('#main-content');
let hours = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
let browserStorage = window.localStorage;

//display current date in jumbotron
todaysDate.text(moment().format('dddd, MMMM Do'));

//display time blocks within main content div
for (var i = 0; i < hours.length; i++) {
   mainArea.append($('<div>').addClass('time-block').attr('id', 'hour-'+i));
   $('div.time-block').eq(i).append($('<div>').addClass('row'))
   $('div.row').eq(i).append($('<span>').addClass('hour').text(hours[i]).css('padding-top', '15px')).append($('<textarea>').addClass('description')).append($('<button>').addClass('saveBtn').html('<i class="bi bi-file-earmark-plus-fill"></i>'))
};

//color code time rows
let rowCount = mainArea.children().length;
let currentHour = moment().format('hh:mm A');
let currentTime = Date.parse(`01-01-20 ${currentHour}`);

for (var x = 0; x < rowCount; x++) {
    currentRow = $(`#hour-${x} > div > span`);
    rowTime = currentRow.text();
    checkTime = Date.parse(`01-01-20 ${rowTime}`);
    nextRow = $(`#hour-${x+1} > div > span`).text();
    nextHourCheck =Date.parse(`01-01-20 ${nextRow}`); 
    if (currentTime > checkTime && currentTime < nextHourCheck || checkTime === currentTime){
        currentRow.next($('textarea')).addClass("present");
    } else if ( checkTime < currentTime) {
       currentRow.next($('textarea')).addClass("past");
    }
    else if (checkTime > currentTime) {
        currentRow.next($('textarea')).addClass("future");
    } 
};


//display items already in local storage
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
});


//write local storage items to correct row on reload
let displayInfoArray =[];
if (browserStorage.length > 0) {
    displayInfoArray = JSON.parse(browserStorage.getItem('savedItems'));
    for (var i = 0; i < displayInfoArray.length; i++) {
        let targetRow = displayInfoArray[i].rowInputId;
        $(`#${targetRow}`).children().children('textarea').val(displayInfoArray[i].textInput)
    }
};

//replace save icon with x
let textAreaCount = $('textarea').length
for(var j=0; j < textAreaCount; j++) {
if ($('textarea').eq(j).val() !== '') {
    $('textarea').eq(j).next('button').html('<i>X</i>')
}
};

if ($('.saveBtn').text() === 'X') {
    $('.saveBtn').on('click', function(event){
        let textInput = $(this).siblings('textarea').val();
        let rowInputId = $(this).parent().parent().attr('id');
        savedInfoArray.pop({rowInputId, textInput});
    })
}

