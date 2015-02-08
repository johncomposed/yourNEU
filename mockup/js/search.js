$(document).ready(function() {


// multiple datasets
// -----------------

var nbaTeams = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '../data/nba.json'
});

var nhlTeams = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '../data/nhl.json'
});

nbaTeams.initialize();
nhlTeams.initialize();

$('#multiple-datasets .morphsearch-input').typeahead( {
    highlight: false // does this even do anything?
},
{
  name: 'nba-teams',
  displayKey: 'name',
  source: nbaTeams.ttAdapter(),
  templates: {
    header: '<h3 class="league-name">NBA Teams</h3>',
    //suggestion: Handlebars.compile('<a href="{{url}}">{{name}}<./a><p>{{desc}}</p>')
    suggestion: Handlebars.compile('<a href="{{url}}">{{name}}</a>')
  }
},
{
  name: 'nhl-teams',
  displayKey: 'name',
  source: nhlTeams.ttAdapter(),
  templates: {
    header: '<h3 class="league-name">NHL Teams</h3>'
    //suggestion: Handlebars.compile('<a href="{{url}}">{{name}}</a>')
  }
});


});