document.write("<link rel='stylesheet' type='text/css' href='/css/navigator.css'/>");



$(document).ready(function() {
	$("body").children("header").after(
		"<nav>"+
			"<a href='/'><img src='/media/svg/yellowgreen-white.svg'/></a>"+
			"<ul>"+
				// load /index.php
			"</ul>"+
			"<div>"+
				"<span>Font: <a href='http://www.bingfont.co.kr/bingfont.html#melona-regular' target='_blank' title='빙그레 메로나체 Regular'>BinggraeMelona</a>-<a href='http://www.bingfont.co.kr/bingfont.html#melona-bold' target='_blank' title='빙그레 메로나체 Blod'>Bold</a></span>"+
				"<span>© 2021. <a href='mailto:rlawnsgl191@gmail.com' title='Send Email'>yellowgreen</a></span>"+
			"</div>"+
		"</nav>");
	$("nav").children("ul").load("/ .navbox>a", function() {
		$("nav").children("ul").children("a").wrap("<li></li>");
		$("nav").children("ul").find("img").attr("width", "25px");
		$("nav").children("ul").find("a[href='/" + $(location).attr('pathname').split("/")[1] + "/']").css("color", "red");
		$("nav").children("ul").find("a[href='/" + $(location).attr('pathname').split("/")[1] + "/']").find("img").css("-webkit-filter", "opacity(.5) drop-shadow(0 0 0 red)");
		$("nav").children("ul").find("a[href='/" + $(location).attr('pathname').split("/")[1] + "/']").find("img").css("filter", "opacity(.5) drop-shadow(0 0 0 red)");
	});


	$.show = function() {
		$("nav").addClass("show");
		$("html").css("overflow", "hidden");
	}
	$.hide = function() {
		$("nav").removeClass("show");
		$("html").css("overflow", "");
	}

// navigator botton
	$("nav").prepend("<span id='navbtn'><div></div><div></div><div></div></span>");
	$("#navbtn").click(function() {
		if ( $("nav").hasClass("show") === true ) {
			$.hide();
		} else {
			$.show();
		}
	});

// navigator auto close
	$(window).resize(function() {
		if ( $("body").attr("type") == "b" ) {
			$.hide();
		}
	});
	$("nav").find("a:not([title='Send Email'])").click(function() {
		$.hide();
	});
});
