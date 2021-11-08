document.write("<link rel='stylesheet' type='text/css' href='/css/blog.css'/>");



$(document).ready(function() {
	$("section").prepend(
			"<div class='selectbox' disable>"+
			"</div>");



// param
	var url = window.location.href;
	function param_get(get) {
		if ( url.split("?")[1] ) {
			var param = url.split("?")[1];
			for (var i = 0; i<param.split("&").length; i++) {
				if ( param.split("&")[i].startsWith(get + "=") ) {
					return param.split("&")[i].split("=")[1];
					break;
				}
			}
		} else {
			var param = "";
		}
	}
	var param_cat = param_get("cat");
	var param_hashtag = param_get("tag");
	var param_page = param_get("page");



	var count = $("section").find("li").length;
	$("section").find("li").each(function(suli, sul) {
		$(sul).html("<p></p><div></div><span class='category'></span><span class='hashtag'></span>");

		if ( $(sul).is("[page]") ) {
			if ( $(sul).attr("page") == "index" ) {
				var page = "";
			} else {
				var page = $(sul).attr("page") + "/";
			}
		} else {
			var page = "empty/";
		}
		$(sul).attr("mv", "/blog/" + page.toLowerCase());

		$(sul).children("p").load( $(sul).attr("mv") + " h1", function() {
			$(sul).find("p").html("<b>" + $(sul).find("h1").text() + "</b>");
		});
		$(sul).children("div").load( $(sul).attr("mv") + " h1 ~ *", function() {
			var writingday = $(sul).find("#writingday").text();
			$(sul).find("#writingday").remove();
			$(sul).find("#notice").remove();
			$(sul).find("h2").remove();
			$(sul).find("span.fn").remove();
			$(sul).find(".table").remove();
			$(sul).find(".codebox").remove();
			$(sul).children("div").children().after("<span> </span>");
			$(sul).children("div").html( $(sul).children("div").text() );
			$(sul).children("div").prepend("<span>" + writingday + " </span>");
//			if ( count == suli+1 ) {
			if ( 0 == suli ) {
				$("body").after(
					"<script type='text/javascript'>"+
						"$(document).ready(function() {"+
							"loading_end()"+
						"});"+
					"</script>");
			}
		});

		$.setcategory = function(name, list, tag, to) {
			for (var i = 0; i<list.length; i++) {
				if ( $("select[name=" + name + "]").length == 0 ) {
					$(".selectbox").append(
						"<select name='" + name + "'>"+
							"<option value='All' selected>All (" + name[0].toUpperCase() + name.slice(1, name.length) + ")</option>"+
						"</select>");
				}

				$("select[name=" + name + "]").children().not("[value=All]").each(function(soi, so) {
					if ( list[i] == $(so).attr("value") ) {
						$("select[name=" + name + "]").attr("already", "");
					}
				});
				if ( $("select[name=" + name + "]").is("[already]") ) {
					$("select[name=" + name + "]").removeAttr("already");
				} else {
					var option_list = $("select[name=" + name + "]").children("option").length;
					$("select[name=" + name + "]").attr("insert", "");
					for (ii = 0; ii<option_list; ii++) {
						if ( ii != 0 ) {
							var option_a = $("select[name=" + name + "]").children("option:nth-child(" + (ii+1) + ")").attr("value");
							var option_b = list[i];
							if ( option_a > option_b ) {
								$("select[name=" + name + "]").children("option:nth-child(" + (ii+1) + ")").before("<option value='" + list[i] + "'>" + tag + list[i].replace(/_/g, to) + "</option>");
								$("select[name=" + name + "]").removeAttr("insert");
								break;
							}
						}
					}
					if ( $("select[name=" + name + "]").is("[insert]") ) {
						$("select[name=" + name + "]").append("<option value='" + list[i] + "'>" + tag + list[i].replace(/_/g, to) + "</option>");
					}
				}
			}
		}

		if ( $(sul).is("[category]") ) {
			var category = $(sul).attr("category").split(" ");
			for (var i = 0; i<category.length; i++) {
				if ( i == 0 ) {
					$(sul).children(".category").text("Category : ");
				} else {
					$(sul).children(".category").append(", ");
				}
				$(sul).children(".category").append("<span>" + category[i].replace(/_/g, " ") + "</span>");
			}

			$.setcategory("category", category, "", " ");
		}

		if ( $(sul).is("[hashtag]") ) {
			var hashtag = $(sul).attr("hashtag").split(" ");
			for (var i = 0; i<hashtag.length; i++) {
				if ( i == 0 ) {
					$(sul).children(".hashtag").text(" | ");
				} else {
					$(sul).children(".hashtag").append(" ");
				}
				$(sul).children(".hashtag").append("<span>#" + hashtag[i].replace(/_/g, "_") + "</span>");
			}

			$.setcategory("hashtag", hashtag, "#", "_");
		}
	});

	if ( $(".selectbox").children().length ) {
		$(".selectbox").removeAttr("disable");
	}
	$("section").find("li").children().not("span").click(function() {
		location.href = $(this).parent().attr("mv");
	});

	$("[name=category]").change(function() {
		$("[name=hashtag]").children().not("[value=All]").css("display", "none");
		$("section").find("li").removeAttr("style");
		$(".category").find("*").css("color", "");
		$(".hashtag").find("*").css("color", "");
		if ( $(this).val() != "All" ) {
			var val = $(this).val();
			$("section").find("li").removeAttr("disable");
			$("section").find("li").not("[category~=" + val + "]").attr("disable", "");
			$("section").find("li").not("[category~=" + val + "]").css("display", "none");
			$(".category").find("*").each(function(cai, ca) {
				if ( $(ca).text() == val.replace(/_/g, " ") ) {
					$(ca).css("color", "white");
					$(ca).parent().next(".hashtag").children("*").each(function(capi, cap) {
						$("[name=hashtag]").children().each(function(capoi, capo) {
							if ( $(cap).text() == $(capo).text() ) {
								$(capo).css("display", "");
							}
						});
					});
				}
			});
		} else {
			$("[name=hashtag]").children().removeAttr("style");
			$("section").find("li").removeAttr("disable");
		}
		$("[name=hashtag]").val("All").prop("selected", true);
	});

	$("[name=hashtag]").change(function() {
		var val = $(this).val();
		$(".hashtag").find("*").css("color", "");
		$("section").find("li").each(function(sli, sl) {
			if ( $(sl).is("[disable]") ) {
			} else {
				$(sl).removeAttr("style");
				if ( val != "All" ) {
					$("section").find("li").not("[hashtag~=" + val + "]").css("display", "none");
					$(sl).find(".hashtag").find("*").each(function(pai, pa) {
						if ( "#" + val.replace(/_/g, "_") == $(pa).text() ) {
							$(pa).css("color", "white");
						}
					});
				}
			}
		});
	});

	if ( (param_cat != "") && (param_cat !== undefined) ) {
		$("select[name=category]").val(param_cat).trigger('change');
	}
	if ( (param_hashtag != "") && (param_hashtag !== undefined) ) {
		$("select[name=hashtag]").val(param_hashtag).trigger('change');
	}

// List Reverse
	$(".selectbox").after("<span id='reverse'><span title='Reverse'>Reverse &#8645;</span></span>");
	$("#reverse").children().click(function() {
		$("section").find("ul").after("<div id='rev_html' style='display: none'></div>");
		$("section").find("li").each(function(revi, rev) {
			var rev_cat = $(rev).attr("category");
			var rev_hashtag = $(rev).attr("hashtag");
			var rev_pag = $(rev).attr("page");
			var rev_mv = $(rev).attr("mv");
			if ( $(rev).is("[disable]") ) {
				var disable = "disable ";
			} else {
				var disable = "";
			}
			if ( $(rev).is("[style]") ) {
				var style = "style='display: none'";
			} else {
				var style = "";
			}
			$("#rev_html").prepend("<li category='" + rev_cat + "' hashtag='" + rev_hashtag + "' page='" + rev_pag + "' mv='" + rev_mv + "' " + disable + style + ">" + $(rev).html() + "</li>");
		});
		$("section").find("ul").html( $("#rev_html").html() );
		$("#rev_html").remove();

		if ( $("#reverse").children("span").is("[style]") ) {
			$("#reverse").children("span").removeAttr("style");
		} else {
			$("#reverse").children("span").attr("style", "color: var(--color)");
		}
		$("section").find("li").children().not("span").click(function() {
			window.parent.location.href = $(this).parent().attr("mv");
		});
	});
});
