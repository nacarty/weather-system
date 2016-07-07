var Lat;  //latitude
var Lon; //longitude

function stringifyJSON(someHtml_Id, someJSONdata)
{
      var p = document.getElementById(someHtml_Id);
             p.innerHTML = JSON.stringify(someJSONdata).split(",").join(",<br>");
  }
  
  function displayDate()
  {
      var Days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" ];
      var d = new Date();
      var hr = ''; 
      var min = '';
                          if (d.getHours()<10) 
                              hr =  "0"+ d.getHours(); 
                          else 
                              hr = d.getHours();
                      
                        if (d.getMinutes()<10) 
                            min =  "0"+ d.getMinutes(); 
                        else 
                            min = d.getMinutes();
                        
     var time = document.getElementById("theTime");
      time.innerHTML =  "<b>"+  Days[d.getDay()]+", "+hr+":"+min+"</b>";
  }
    
function displayLocation(data) 
{
    var weatherLocation = document.getElementById("weatherLocation");
    var str = data.results[0].formatted_address;
    
    weatherLocation.innerHTML = str; 
    
}

function displayCoordinates(pos)
{
   var Lat = document.getElementById("latlng");
  
    Lat.innerHTML = "Lat:"+ pos.coords.latitude.toFixed(2) + "<sup>o</sup> &nbsp&nbsp&nbsp Long:"+ pos.coords.longitude.toFixed(2)+"<sup>o</sup>";
     
}

    
function displayMap(pos)  // uses script: maps.googleapis.com/maps/api/js
{
      var myCenter = {lat: pos.coords.latitude, lng: pos.coords.longitude};
      var myMap = new google.maps.Map( document.getElementById("map"), { center:myCenter ,  scrollwheel:true,  zoom: 12  });
      var myMarker = new google.maps.Marker({   map: myMap,    position: myCenter,    title: 'Ur close here'  });

}

function displayInformation(position) 
{
    displayCoordinates(position); //position returned from getLocation();
    
   //get the name of the place
    jQuery.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&key=AIzaSyAmuPPhRj1fkH4bJ3ALbGxKh9xx57o9a2Y ", 
    function(data, textStatus, jqXHR)    //data, textStatus and jqXHR /xmlHTTPrequest returned by getJSON
    {
        displayLocation(data);
        displayDate();
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
