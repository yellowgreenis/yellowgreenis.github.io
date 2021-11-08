document.write("<link rel='stylesheet' type='text/css' href='/css/comment.css'/>");
document.write("<link rel='stylesheet' type='text/css' href='/css/guestbook.css'/>");



$(document).ready(function() {
	$("body").after(
		"<script type='text/javascript'>"+
			"$(document).ready(function() {"+
				"loading_end();"+
			"});"+
		"</script>");
});
