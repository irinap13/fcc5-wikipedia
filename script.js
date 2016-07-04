$(document).ready(function() {
	$("#search-box").keyup(function(event) {
		if (event.keyCode == 13) {
			$("#search").trigger("click");
		}
	});

	$("#search").on("click", function() {
		var toSearch = encodeURI($("#search-box").blur().val());

		$.ajax({
			url: 'https://en.wikipedia.org/w/api.php',
			dataType: 'jsonp',
			data: {
				action: 'query',
				format: 'json',
				generator: 'search',
				gsrsearch: toSearch,
				gsrlimit: '10'
			},
			success: function(data) {
				$("#results ul").empty();
				var pages = data.query.pages;

				for (var page in pages) {
					$("#results ul").append(
						'<li class="col-xs-12 col-md-4"><a href="https://en.wikipedia.org/wiki/' + pages[page].title + '" target="_new" class="content-block"><h4>' + pages[page].title + '</h4></a></li>');
				}
			}
		});
	});
});