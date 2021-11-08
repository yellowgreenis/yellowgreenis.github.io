document.write("<link rel='stylesheet' type='text/css' href='/css/header.css'/>");



$(document).ready(function() {
	var url = document.location.href;
	var header = url.split("/")[3];
	var Header = header[0].toUpperCase() + header.slice(1, header.length);

	$("body").prepend(
		"<header>"+
			"<a href='/" + header + "/'>" + Header.replace(/_/g, " ") + "</a>"+
		"</header>");
});
