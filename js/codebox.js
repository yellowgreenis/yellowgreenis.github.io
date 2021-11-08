document.write("<link rel='stylesheet' type='text/css' href='/css/codebox.css'/>");

$(document).ready(function() {
	$("div.codebox").each(function(codeboxi, codebox) {
		var firstbox = $(codebox).children("div:first-child");

// empty line & tab key
		$(codebox).find("br").replaceWith("<p></p>");
		$(codebox).find("p").each(function(cpi, cp) {
			if ( $(cp).text() == "" ) {
				$(cp).html("&emsp;");
			} else {
				var html = $(cp).html().replace(/\t/g, "&emsp;"); // \t == Tab
				html = html.replace(/\\/g, "＼"); // Kor_Won == Reverse_Slash
				$(cp).html(html);
			}
		});

// line width
		$(codebox).children("div").each(function(wi, w) {
			var width = 0;
			$(w).children().each(function(wdi, wd) {
				var check = $(wd).css("width");
			});
		});

// copy btn
		$(codebox).prepend("<input value=\"Copy\" name=\"copy\" title=\"" + $(firstbox).attr("class") + " Copy\" copy=\"" + $(firstbox).attr("class") + "\" readonly/>");
		$(codebox).children("[name=copy]").click(function() {
			$(codebox).after("<textarea class=\"copy\" readonly></textarea>");
			$(this).nextAll("div." + $(this).attr("copy") ).children("p").each(function(rcpi, rcp) {
				var text = $(rcp).text();
				if ( " " == text ) {
					text = "";
				}

				if ( 0 == rcpi ) {
					$(codebox).next(".copy").text( $(codebox).next(".copy").text() + text);
				} else {
					$(codebox).next(".copy").text( $(codebox).next(".copy").text() + "\n" + text);
				}
			});
			var textplace = $(codebox).next(".copy").text().replace(/ /g, "	"); // &emsp; --> Tab
			$(codebox).next(".copy").text(textplace);
			var copy = $(codebox).next(".copy").text();
			$(codebox).next(".copy").select();
			document.execCommand("copy");
			$(codebox).next(".copy").remove();
//			alert( $(this).attr("copy") + "(이)가 복사되었습니다.");
			$(codebox).append("<span class=\"copy\"><span>" + $(codebox).children("[name=copy]").attr("copy") + "이/가 복사되었습니다.</span></span>");
			$(codebox).children("span.copy").css("z-index", $(codebox).find("p").css("z-index") + 2 );
			$(codebox).children("[name=copy]").css("display", "none");
			setTimeout(function() {
				$(codebox).children("span.copy").remove();
				$(codebox).children("[name=copy]").css("display", "");
			}, 1000);
		});

// tab btn
		$( $(codebox).children("div").get().reverse() ).each(function(cdi, cd) {
			var cname = $(cd).attr("class");
			$(codebox).prepend("<input type=\"button\" name=\"" + cname + "\" value=\"" + cname + "\"/>");
		});
		$(codebox).children("input:not([name=copy])").click(function() {
			var attr = $(this).attr("name");
			$(codebox).children("div").css("display", "none");
			$(this).nextAll("div."+attr).css("display", "block");
			$(this).nextAll("[name=copy]").attr("copy", attr);
			$(this).nextAll("[name=copy]").attr("title", attr + " Copy");
			if ( $(this).nextAll("[name=copy]").attr("copy") == "Result" ) {
				$(this).nextAll("[name=copy]").css("display", "none");
			} else {
				$(this).nextAll("[name=copy]").css("display", "");
			}
		});


// line number & pover
		$(codebox).children("div:not(.Result)").children("p").before("<span class=\"line-number\"></span><span class=\"pover\"></span>");
		$(codebox).children("div").each(function(rcdi, rcd) {
			var lncnt = $(rcd).find(".line-number").length;
			$(rcd).find(".line-number").each(function(lni, ln) {
				$(ln).text(lni + 1);
				if ( lni + 1 == lncnt ) {
					var dight = $(ln).text().length;
					$(ln).parent().children(".line-number").css("width", "calc(" + dight  + "ex + 1em)");
					$(ln).parent().children(".pover").css("width", "calc(100% - " + $(ln).css("width") + ")");
					$(ln).parent().children(".pover").css("height", $(ln).css("height") );
					$(ln).parent().children("p").css("padding-left", "calc(" + $(ln).css("width") + " + 3px)" );
					$(ln).parent().children(".pover").css("z-index", $(ln).next(".pover").next("p").css("z-index") - 1);
					$(ln).parent().children(".line-number").css("z-index", $(ln).next(".pover").next("p").css("z-index") + 1);
				}
			});
		});
		$(codebox).children("input:first-child").trigger("click");

// line number & pover move
		$(codebox).children("div").scroll(function() {
			var codeboxleft = $(this).scrollLeft(); // 현재  위치
			$(codebox).find("span.line-number").css("left", codeboxleft);
			$(codebox).find("span.pover").css("right", codeboxleft - codeboxleft*2);
		});
	});

// hover
	$("div.codebox").children("div:not(.Result)").find(".line-number").hover(function() {
		$(this).css("background-color", "#222");
		$(this).next(".pover").css("background-color", "#222");
	}, function() {
		$(this).css("background-color", "");
		$(this).next(".pover").css("background-color", "");
	});
	$("div.codebox").children("div:not(.Result)").find("p").hover(function() {
		$(this).prev(".pover").css("background-color", "#222");
		$(this).prev(".pover").prev(".line-number").css("background-color", "#222");
	}, function() {
		$(this).prev(".pover").css("background-color", "");
		$(this).prev(".pover").prev(".line-number").css("background-color", "");
	});
	$("div.codebox").children("div:not(.Result)").find(".pover").hover(function() {
		$(this).css("background-color", "#222");
		$(this).prev(".line-number").css("background-color", "#222");
	}, function() {
		$(this).css("background-color", "");
		$(this).prev(".line-number").css("background-color", "");
	});
});
