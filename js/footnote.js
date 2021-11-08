document.write("<link rel='stylesheet' type='text/css' href='/css/footnote.css'/>");



$(document).ready(function() {
	function fnclose() {
		$("#fnbox").remove();
		$("#fnclose").remove();
		$("#fnback").remove();
		$("html").removeAttr("style");
	}

	var counter = 0;
	$(".fn").each(function(fi, f) {
		if ( fi == 0 ) {
			$("section").append("<div id='fn_list'></div>");
		}

		if ( $(f).is("[fn]") ) {
			var fn = $(f).attr("fn");
			$(f).removeAttr("fn");
			$(f).attr("wfn", fn);

			counter = counter + 1;
			var id = $("#fn_list").find("[wfn]").length + 1;
		} else {
			var id = fi + 1 - counter;
		}

		if ( $(f).is("[wfn]") ) {
			if ( $("#fn_list").find("span[wfn='" + fn + "']").length == 0 ) {
				$("#fn_list").append("<p><span id='" + id + "_wfn' wfn='" + fn + "'>" + fn + "</span><span class='fn_note'></span></p>");
			}
			$("#fn_list").find("span[wfn='" + fn + "']").append("<span>#" + ($("#fn_list").find("span[wfn='" + fn + "']").children("span").length + 1) + "</span>");
			$("#fn_list").find("span[wfn='" + fn + "']").next().append(" " + $(f).html() );
			$(f).attr("id", "wfn_" + $("#fn_list").find("span[wfn='" + fn + "']").attr("id").split("_")[0] + "-" + $("#fn_list").find("span[wfn='" + fn + "']").children("span").length );
		} else {
			$("#fn_list").append("<p><span id='" + id + "_fn' fn='" + id + "'>" + id + "</span><span class='fn_note'> " + $(f).html() + "</span></p>");
			$(f).attr("fn", id);
			$(f).attr("id", "fn_" + id);
		}
		$(f).html("");
	});

	$("#fn_list").find("img").each(function(flii, fli) {
		$(fli).after("<a href='" + $(fli).attr("src") + "' img>[이미지]</a>");
		$(fli).remove();
	});

	function fnbox(target) {
		var fnid = $(target).attr("id");
		if ( $(target).attr("id").match("^wfn_") ) {
			var lsid = fnid.split("_")[1].split("-")[0] + "_" + fnid.split("_")[0];
		} else {
			var lsid = fnid.split("_")[1] + "_" + fnid.split("_")[0];
		}

		$("#fnbox").html( $("span[id='" + lsid + "'").parent().html() );
		if ( $(target).attr("id").match("^wfn_") ) {
			$("#fnbox").children("span[id]").children("span").attr("fn", fnid.split("_")[1]);
		} else {
			$("#fnbox").children("span[id]").attr("fn", fnid.split("_")[1]);
		}

		$("#fnbox").children("span[id]").children("span").remove();
		$("#fnbox").children("span[id]").text( $("#fnbox").children("span[id]").text() );
		$("#fnbox").children("span[id]").removeAttr("id");

		$("#fnbox").find("a[img]").each(function(oai, oa) {
			$(oa).after("<img src='" + $(oa).attr("href") + "'/>");
			$(oa).remove();
			$("#fnbox").find("img").click(function() {
				var href = $(this).attr("src");
				fnclose();
				location.href = href;
			});
		});
	}

	$(".fn").hover(function() {
		if ( $(window).innerWidth() > "1340" ) {
			$(this).after("<div id='fnbox'></div>");
			fnbox(this);

			var document_top = $(document).scrollTop();
			var fn_top = $(this).offset().top;
			var fn_left = $(this).offset().left;
			var fn_width = $(this).outerWidth();
			var box_width = $("#fnbox").outerWidth();

			if ( fn_top - $("#fnbox").outerHeight() + parseFloat($(this).next().css("font-size"), 10)/10 >= document_top ) {
				$("#fnbox").css("top", "calc(" + fn_top + "px - " + $("#fnbox").outerHeight() + "px - .1em)");
			}

			if ( (fn_left+fn_width/2) - box_width/2 < 0 ) {
				$("#fnbox").css("left", "0px");
			} else if ( (fn_left+fn_width/2) + box_width/2 > $(window).innerWidth() ) {
				$("#fnbox").css("right", "0px");
			} else {
				$("#fnbox").css("left", ((fn_left+fn_width/2) - box_width/2) + "px");
			}
		}

		if ( $(window).innerWidth() > "1340" ) {
			$(window).resize(function() {
				if ( $(window).innerWidth() <= "1340" ) {
					fnclose();
				}
			});
		}
	}, function() {
		if ( $(window).innerWidth() > "1340" ) {
			fnclose();
		}
	});

	function fnmv(target, num) {
		if ( num ) {
			var offset_top = $("#" + target.split("_")[1] + "_" + target.split("_")[0] + "-" + num).offset().top;;
		} else {
			var offset_top = $("#" + target.split("_")[1] + "_" + target.split("_")[0]).offset().top;
		}
		$("html, body").animate({scrollTop : offset_top - 55}, 500);
	}

	$(".fn").click(function() {
		if ( $(window).innerWidth() <= "1340" ) {
			$(this).after("<div id='fnbox'></div><div id='fnclose'>닫기</div><div id='fnback'></div>");
			$("html").css("overflow", "hidden");
			fnbox(this);

			function resize() {
				var document_top = $(document).scrollTop();
				$("#fnbox").css("top", document_top + (($(window).innerHeight()-$("#fnbox").outerHeight()-$("#fnclose").outerHeight() ) / 2) + "px" );
				$("#fnclose").css("top", $("#fnbox").offset().top + $("#fnbox").outerHeight() + "px" );
				$("#fnback").css("top", document_top + "px" );
			}; resize();

			$(window).resize(function() {
				if ( $(window).innerWidth() <= "1340" ) {
					resize();
				} else if ( $(window).innerWidth() > "1340" ) {
					fnclose();
				}
			});

			$("#fnbox").children("span:first-child").click(function() {
				var target = $(this).parents("#fnbox").prev().attr("id").split("-")[0];
				fnclose();
				fnmv( target );
			})
			$("#fnclose").click(function() {
				fnclose();
			});
			$("#fnback").click(function() {
				fnclose();
			});
		} else if ( $(window).innerWidth() > "1340" ) {
			fnclose();
			if ( $(this).attr("id").match("^wfn_") ) {
				fnmv( $(this).attr("id").split("-")[0] );
			} else {
				fnmv( $(this).attr("id") );
			}
		}
	});

	$("#fn_list").find("span[fn]").click(function() {
		fnmv( $(this).attr("id") );
	});


	$("#fn_list").find("span[wfn]").children("span").click(function() {
		fnmv( $(this).parent().attr("id"), $(this).index() + 1 );
	});
});
