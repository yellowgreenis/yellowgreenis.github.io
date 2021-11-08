document.write("<script type='text/javascript' src='/js/comment.js'></script>");
document.write("<link rel='stylesheet' type='text/css' href='/css/writing.css'/>");
document.write("<script type='text/javascript' src='/js/table.js'></script>");
document.write("<script type='text/javascript' src='/js/codebox.js'></script>");
document.write("<script type='text/javascript' src='/js/imagebox.js'></script>");
document.write("<script type='text/javascript' src='/js/footnote.js'></script>");

function finish() {
	setTimeout(function() {
		$(top.document).find("#iframe").remove();
	}, 10);
	setTimeout(function() {
		parent.document.location.reload();
	}, 25);
}



$(document).ready(function() {
	$("h2").each(function(hi, h) {
		if ( hi == 0 ) {
			if ( $("#notice").length == 0 ) {
				$("#writingday").after("<div id='hlist'></div><hr/>");
			} else {
				$("#notice").after("<div id='hlist'></div><hr/>");
			}
		}
		$("#hlist").append("<a mv='h_" + (hi+1) + "' mvtarget='" + (hi+1) + "_h'>" + (hi+1) + ". " + $(h).text() + "</a>");
		$(h).attr("mv", (hi+1) + "_h");
		$(h).attr("mvtarget", "h_" + (hi+1));
		$(h).text( (hi+1) + ". " + $(h).text());
	});

	if ( $("#linkto") ) {
		$("#linkto").before("<hr/>");
	}
	$(".linkto").each(function(dli, dl) {
		$(dl).load( $(dl).attr("href") + " h1", function() {
			var text = $(dl).text();
			$(dl).attr("title", text);
			if ( $(dl).attr("to") == "next" ) {
				$(dl).text("다음 글 - " + text);
			} else if ( $(dl).attr("to") == "prev" ) {
				$(dl).text("이전 글 - " + text);
			} else {
				$(dl).text("참고 글 - " + text);
				$(dl).css("text-align", "center");
			}
		});
	});

	$("[excerpt]").each(function(ei, e) {
		var excerpt = $(e).attr("excerpt").split(" ");
		if ( excerpt.length != 1 ) {
			$(e).load( excerpt[0] + " #" + excerpt[1], function() {
				$(e).contents().contents().unwrap();
				$(e).contents().unwrap();
			});
		}
	});

	$("[mv]").click(function() {
		var mv = $(this).attr("mv");
		var offsetup = $("[mvtarget=" + mv + "]").offset();
		$("html, body").animate({scrollTop : offsetup.top - 55}, 500);
	});

	$("body").after(
		"<script type='text/javascript'>"+
			"$(document).ready(function() {"+
				"loading_end();"+
			"});"+
		"</script>");
});
