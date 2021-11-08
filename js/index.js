document.write("<link rel='stylesheet' type='text/css' href='/css/index.css'/>");
document.write("<script type='text/javascript' src='/js/loading.js'></script>");
document.write("<script type='text/javascript' src='/js/section.js'></script>");
document.write("<script type='text/javascript' src='/js/header.js'></script>");
document.write("<script type='text/javascript' src='/js/navigator.js'></script>");



/*
var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches
if ( prefersDark ) {
	alert("Dark Mode");
} else {
	alert("Light Mode or Unknown");
}
*/



var pathname = window.location.pathname;
var cookie_scroll = "";
if ( document.cookie.indexOf("scroll=") != -1 ) {
	var cookie_scroll = document.cookie.split("scroll=")[1].split(";")[0];
	if ( cookie_scroll.split("_")[0] == window.location.pathname ) {
		cookie_scroll = cookie_scroll.split("_")[1];
//	} else {
//		cookie_scroll = "0";
	}
}

window.onbeforeunload = function() {
	document.cookie = "scroll=" + pathname + "_" + $(document).scrollTop() + "; max-age=5; secure";
}

function index_scroll() {
	if ( cookie_scroll != "" ) {
		$(document).scrollTop(cookie_scroll);
	}
/*
// delete cookie
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf("=");
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
*/
}

$(document).ready(function() {
// a
/* in /js/writing.js
	$("a[mv]").click(function() {
		var mv = $(this).attr("mv");
		var offsetup = $("[mvtarget=" + mv + "]").offset();
		$("html, body").animate({scrollTop : offsetup.top - 55}, 500);
	});
*/
	$("a").not(".linkto").each(function(ai, a) {
		if ( $(a).is("[href^='http']") ) {
			if ( $(a).is("[target]") == false ) {
				$(a).attr("target", "_blank");
			}

			if ( $(a).is("[title]") == false ) {
				$(a).attr("title", $(a).attr("href"));
			}
		} else {
			if ( $(a).is("[target]") == false ) {
				$(a).attr("target", "_self");
			}

			if ( $(a).is("[href]") ) {
				$(a).after("<span class='a_title' style='display: none'></span>");
				$(a).next().load( $(a).attr("href") + " h1", function() {
					if ( $(a).next().text() ) {
						$(a).attr("title", $(a).next().text() );
					} else if ( ($(a).is("[title]") == false) && ($(a).is("[download]") == false) ) {
						if ( $(a).text() ) {
							$(a).attr("title", $(a).text() );
						} else if ( $(a).is("href") ) {
							$(a).attr("title", $(a).attr("href") );
						}
					}
					$(a).next("span.a_title").remove();
				});
			}
		}
	});

// img
	$(".group_img").children("img").addClass("group_list");

	$("img").each(function(imgi, img) {
		if ( $(img).is("[alt]") == false ) {
			$(img).attr("alt", $(img).attr("src") );
		}
		if ( ($(img).is(".comment_img") == false) && ($(img).is("[title]") == false) ) {
			$(img).attr("title", $(img).attr("src") );
		}

		if ( ($(img).is("[src^='/']")) || ($(img).is("[src^='./']")) || ($(img).is("[src^='../']")) || ($(img).is("[src^='http']")) ) {
		} else if ( $(img).is("[src]") ) {
			var src = $(img).attr("src");
			var src_str = window.location.pathname.replace(/blog/, "media").split("/").slice(1, -1);
			$(img).attr("src", "/");
			for (var i = 0; i < src_str.length; i++) {
				$(img).attr("src", $(img).attr("src") + src_str[i] + "/");
			}
			$(img).attr("src", $(img).attr("src") + src);
		}
	});
	$("img").click(function() {
		location.href = $(this).attr("src");
	});
});
