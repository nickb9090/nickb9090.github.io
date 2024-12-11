const time_api_url = "https://www.timeapi.io/api/time/current/zone?timeZone=America%2FVancouver"

const date_time_element = document.getElementById('day');

const dice_a = document.getElementById('dice_a');
const dice_b = document.getElementById('dice_b');

const total_display = document.getElementById('total');
const result_message = document.getElementById('result');

const winning_message = "You Win: Try Again!";
const losing_message = "You didn't win: Try Again!";

// function for updating the date and time display
function getDateAndTime() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', time_api_url, false);
    xhr.send();

    if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);

        const date = '' + response.day + '/' + response.month + '/' + response.year;
        const time = response.time;

        date_time_element.textContent = date + ' at ' + time;
    } else {
        console.error('Failed to load posts:', xhr.statusText);
    }

    xhr.onerror = function () {
        console.error('Request failed');
    };
};

// variables for storing the state of the dice
var dice_a_value = Math.floor(Math.random() * 6 + 1);
var dice_b_value = Math.floor(Math.random() * 6 + 1);

// function for rolling the dice
function rollDice() {
    dice_a_value = Math.floor(Math.random() * 6 + 1);
    dice_b_value = Math.floor(Math.random() * 6 + 1);
    
    dice_a.setAttribute('src', 'dice-' + dice_a_value + '.svg');
    dice_b.setAttribute('src', 'dice-' + dice_b_value + '.svg');
};

// button click listener to roll the dice and update the results
document.getElementById('btn').addEventListener('click', function () {
    rollDice();
    var total = dice_a_value + dice_b_value;
    total_display.textContent = total;
    if (total >= 8) {
        result_message.textContent = winning_message;
    } else {
        result_message.textContent = losing_message;
    }
});

// update the date and time every second
window.setInterval(getDateAndTime, 1);