document.write("<link rel='stylesheet' type='text/css' href='/css/downloads.css'/>");
document.write("<script type='text/javascript' src='/js/table.js'></script>");
document.write("<script type='text/javascript' src='/js/codebox.js'></script>");



function mvlight(lightag) {
	$.lighton = function() {
		$("#" + lightag).css("color", "red");
		var blinkon = setInterval(function() {
			$("#" + lightag).css("color", "red");
		}, 1000);
		setTimeout(function() {
			clearTimeout(blinkon);
		}, 2500);
	}
	$.lightoff = function() {
		$("#" + lightag).css("color", "");
		var blinkoff = setInterval(function() {
			$("#" + lightag).css("color", "");
		}, 1000);
		setTimeout(function() {
			clearTimeout(blinkoff);
		}, 2500);
	}

	var offsetup = $("#" + lightag).offset();
	$('html, body').animate({scrollTop : offsetup.top - 55}, 500);
	setTimeout(function() {
		$.lighton();
	}, 250);
	setTimeout(function() {
		$.lightoff();
	}, 750);
}

function mvup(mvui) {
	var offsetdown = $("#" + mvui).offset();
	$('html, body').animate({scrollTop : offsetdown.top - 55}, 500);
}

$(document).ready(function() {
	$("table").find("tr").each(function(tri, tr) {
		if ( tri == 0 ) {
			$(tr).prepend("<th></th>")
		} else {
			$(tr).children("td:first-child").html("<a title='Download' href='./file/" + $(tr).children("td:first-child").text() + $(tr).children("td:last-child").text() + "' download>" + $(tr).children("td:first-child").text() + "</a>");
			$(tr).prepend("<td><span title='View Description' id='" + tri + "_mv' class='mvtag' onclick=\"mvlight('mv_" + tri + "')\">" + tri + "</span></td>");

			$("[" + $(tr).children("td:nth-child(2)").text() + "]").prepend("<p id='mv_" + tri + "' class='mvtag' onclick=\"mvlight('" + tri + "_mv')\">" + tri + ". " + $(tr).children("td:nth-child(2)").text() + "</p>");
		}
	});

	$("body").after(
		"<script type='text/javascript'>"+
			"$(document).ready(function() {"+
				"loading_end()"+
			"});"+
		"</script>");
});
