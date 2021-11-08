document.write("<link rel='stylesheet' type='text/css' href='/css/header.css'/>");



$(document).ready(function() {
	$("body").prepend(
		"<header>"+
			"<a href='/'>Home</a>"+
		"</header>");
});
