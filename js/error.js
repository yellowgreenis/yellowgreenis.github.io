document.write("<link rel='stylesheet' type='text/css' href='/css/index.css'/>");
document.write("<link rel='stylesheet' type='text/css' href='/css/error.css'/>");
document.write("<script type='text/javascript' src='/js/loading.js'></script>");
document.write("<script type='text/javascript' src='/js/section.js'></script>");
document.write("<script type='text/javascript' src='/js/header-error.js'></script>");
document.write("<script type='text/javascript' src='/js/navigator.js'></script>");
document.write("<script type='text/javascript' src='/js/a.js'></script>");
document.write("<script type='text/javascript' src='/js/time.js'></script>");

$(document).ready(function() {
	$("body").after(
		"<script type='text/javascript'>"+
			"$(document).ready(function() {"+
				"loading_end()"+
			"});"+
		"</script>");
});
