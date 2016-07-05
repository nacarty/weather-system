var Lat;  //latitude
var Lon; //longitude

function stringifyJSON(someHtml_Id, someJSONdata)
{
      var p = document.getElementById(someHtml_Id);
             p.innerHTML = JSON.stringify(someJSONdata).split(",").join(",<br>");
  }
    
function displayLocation(data) 
{
    var weatherLocation = document.getElementById("weatherLocation");
    var locArr = data.results[0].formatted_address.split(',');
    var str = locArr.join('<br>');
    weatherLocation.innerHTML = str; 
    
}

function displayCoordinates(pos)
{
   var Lat = document.getElementById("latitude");
   var Lon = document.getElementById("longitude");
   var alt = document.getElementById("altitude");
  
    Lat.innerHTML += pos.coords.latitude;
    Lon.innerHTML += pos.coords.longitude;
    
    if (pos.coords.altitude!==null)
        alt.innerHTML += pos.coords.altitude;
    else 
        alt.innerHTML += "Altitude not evaluated...";
  
}

    
function displayMap(pos)  // uses script: maps.googleapis.com/maps/api/js
{
        var map = new google.maps.Map( document.getElementById("map"), { center: {lat: pos.coords.latitude, lng: pos.coords.longitude},   zoom: 12  });
        
}

function displayInformation(position) 
{
    displayCoordinates(position);
   
    jQuery.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&key=AIzaSyAmuPPhRj1fkH4bJ3ALbGxKh9xx57o9a2Y ", 
    function(data, textStatus, jqXHR)    //data, textStatus and jqXHR /xmlHTTPrequest returned by getJSON
    {
        displayLocation(data);
        displayMap(position);
        
   } ); //getJSON
         
         
     //now, get the weather forecast data from forecast.io
    jQuery.getJSON("https://api.forecast.io/forecast/c53da8b51881189a84ffc31c0d620d07/" + position.coords.latitude + "," + position.coords.longitude + "?units=auto&callback=?",
    function(data)
    {  
        
   /*   showTime(data.currently.time);
      $("#summary").html(data.currently.summary);
      $("#temperature").html(Math.round(data.currently.temperature));
      showUnits(data.flags.units);
      showIcon(data.currently.icon, "#icon");
      showBackground(data.currently.icon);
      $("#precipitation").html(Math.round(data.currently.precipProbability * 100) + "%");
      showWindSpeed(data.flags.units, data.currently.windSpeed);
      showDayByDayForecast(data.daily);  */
      }//function     
      ) ;   //getJSON */
}//showPosition 

function onError(err)
{
    var loc = document.getElementById("weatherLocation");
    loc.innerHTML = "There was an error<br>Error Code:"+err.code+"<br>"+err.message;
}

function getLocation() 
{
    var oneWeek = 604800000; //in milliseconds
    var positionOptions = {enableHighAccuracy : true, timeout: 60000, maximumAge:oneWeek }; //highAccuracy, timeOut, cache-Age
    
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(displayInformation); //can also take arguments "error" and "options = positionOptions"
    } 
    else 
    {
       Lat.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//getLocation();