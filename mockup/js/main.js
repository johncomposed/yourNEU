$(document).ready(function() {

	var data = {
		categories: []
	};

 	$.ajax({
		  url: '../data/nba.json',
		  type: "GET",
		  dataType: "json"
	}).done(function(nbaJSON) {
	  	$.ajax({
		    url: '../data/nhl.json',
		    type: "GET",
		    dataType: "json"
	  	}).done(function(nhlJSON) {
	  		data.categories.push(nbaJSON);
	  		data.categories.push(nhlJSON);
  			var source = $(".morphsearch-content").html();
			var template = Handlebars.compile(source);
			var html = template(data);
			$('.morphsearch-content').html(html);
	  	});
	});
});