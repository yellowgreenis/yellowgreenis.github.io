document.write("<link rel='stylesheet' type='text/css' href='/css/loading.css'/>");
document.write("<script type='text/javascript' src='/js/loading-end.js'></script>");



var loadingtext = "Loading...";
var loadingloop = setInterval(function() {
	if ( loadingtext == "Loading..." ) {
		loadingtext = "Loading.";
	} else {
		loadingtext = loadingtext + ".";
	}
	$("#loading").children("p").text(loadingtext);
}, 500);


$(document).ready(function() {
	$("body").prepend("<div id='loading'><p>Loading...</p></div>");
	$("html").css("overflow", "hidden");
});

