// <span id="time">Output Point</span>

function time() {
	setTimeout("time()", 500);	// 1000 = 1 second

	var now = new Date();

	var year = now.getFullYear();	// .getFullYear = 2021 // .getYear = 121
	var month = now.getMonth()+1;	// 0~11 to 1~12
	var date = now.getDate();
	var day = now.getDay();		// 0~6
	var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];	// 0~6 to Sunday~Saturday

	var hours = now.getHours();	// 0~23
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	var milliseconds= "";
	var ap = "";

// 12 hour format
	if ( hours < 12 ) {
		ap = ' AM';
		if ( hours == 0 ) {
			hours = 12;
		}
	} else {
		ap = ' PM';
		if ( hours > 12 ) {
			hours = hours - 12;
		}
	}

/* // Milliseconds
	milliseconds = now.getMilliseconds();
	if ( milliseconds < 10 ) { milliseconds = "00" + milliseconds } else if ( milliseconds < 100 ) { milliseconds = "0" + milliseconds }
	milliseconds = ":" + milliseconds;
*/

	if ( month < 10 ) { month = "0" + month }
	if ( date < 10 ) { date = "0" + date }
	if ( hours < 10 ) { hours = "0" + hours }
	if ( minutes < 10 ) { minutes = "0" + minutes }
	if ( seconds < 10 ) { seconds = "0" + seconds }

	var output = week[day] + ", " + month + "/" + date + "/" + year + "<br/>" + hours + ":" + minutes + ":" + seconds + milliseconds + ap;
	$("#time").html(output);	// Output Point / ex) id="time"
}

$(document).ready(function() {
	time();
});
