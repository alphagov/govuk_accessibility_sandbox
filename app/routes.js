var express = require('express');
var router = express.Router();

var fs = require('fs');

router.get('/', function (req, res) {
  res.render('index');
});


// Example route: Passing data into a page
router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', { 'name' : 'Foo' });
});

// add your routes here

var renderAutocompletePage = function(params, callback){

  // Load register from JSON file

  var data = {};
  data.countries = JSON.parse(fs.readFileSync('app/views/patterns/autocomplete/data/country-records.json', 'utf8'));


  // Load additional country data from JSON file

  var extension = {};
  extension = JSON.parse(fs.readFileSync('app/views/patterns/autocomplete/data/country-records-extension.json', 'utf8'));


  // Merge the additional data into the register data

  for(var i = 0; i < data.countries.length; i++){

    for(var j = 0; j < extension.length; j++){

      if (data.countries[i].entry.country == extension[j].country){

          data.countries[i].entry.aliases = extension[j].aliases;  
          data.countries[i].entry.weighting = extension[j].weighting;

      }

    } 

  }

  // Sort the register alphabetically by country name

  data.countries.sort(function(a, b) {
    a = a.entry.name.toLowerCase();
    b = b.entry.name.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  })

  return callback(null, data);

}

router.get("/patterns/autocomplete/01/", function (req, res, next) {
  var params = {};

  renderAutocompletePage(params, function(error, data){
    return res.render('patterns/autocomplete/01/index', data);
  })

});

module.exports = router;