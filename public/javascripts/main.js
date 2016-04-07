var WEATHERKEY = "7d58a7e8071fab8a";
var autoCompleteSearch = "http://autocomplete.wunderground.com/aq";
var cities = []

var searchCity = function(cityName){
  $.ajax({
    url: autoCompleteSearch,
    data: {
      query: cityName,
      cb: 'searchList'
       },
    dataType: 'jsonp',
    jsonp: 'cb'
  });
};

function searchList(data){
  
  var $resultTable = $('#city-search-results');

  $resultTable.html('');

  var cities = data.RESULTS;
  cities.forEach(function(city, index){

    var html = "<tr id='tr-" + index + "'>";
        html += "<td class='city'>" + city.name + "</td>";
        html += "<td class='country'>" + city.c+ "</td>";
        html += "<td><button>Check!</button></td>";
        html += "</tr>";

    $resultTable.append(html);
    $('tr#tr-' + index + " button").on('click', function(e) {
      showWeather(city)
    })
  });
};

var showWeather = function(city){

  var $resultTable = $('#city-weather-results');
  var zmw = city.zmw;

  $.ajax({              
    url: "http://api.wunderground.com/api/" + WEATHERKEY + "/conditions/q/zmw:" + zmw + ".json",
    data: {
      zmw: zmw
    },
    dataType: 'jsonp'
  }).done(function(res){
    
    var result = res.current_observation;

    console.log(result);
    
    var html = "<tr>";
        html += "<td class='city'>" + result.display_location.city + "</td>";
        html += "<td class='country'>" + result.display_location.country + "</td>";
        html += "<td class='temperature'>" + result.temperature_string + "</td>";
        html += "<td class='feels-like'>" + result.feelslike_string + "</td>";
        html += "<td class='weather'>" + result.weather + "</td>";
        html += "<td class='uv'>" + result.UV + "</td>";
        html += "<td class='humidity'>" + result.relative_humidity + "</td>";
        html += "<td class='rain'>" + result.percip_today_string + "</td>";
        html += "</tr>";
        
    $resultTable.append(html);

  });
  
};


$(document).ready(function(){

  $('#city-form').on('submit', function(event){
    event.preventDefault();
    var cityName = $('#city-name').val();
    searchCity(cityName);
  });

});


