document.write("<link rel='stylesheet' type='text/css' href='/css/table.css'/>");

$(document).ready(function() {
	$("table").each(function(tablei, table) {
		$("table").wrapAll("<div class='table'></div>");
	});
});
