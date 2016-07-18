var myCenter;
 var myMap;
 var myMarker;
 var globalDateString;
var Lat;  //latitude
var Lon; //longitude
var toCelsius = true;
var globalWeatherData = {}; //weather data from forecast.io
var globalLocationData ={}; //google API data
var globalTempC = 0;
var globalFeelLikeC = 0;
var globalTempF = 0;
var globalFeelLikeF = 0;
var globalRecCounter = -2;
var globalHourlySize = 0;
var globalFormattedAddress ='';

//var dataIndex = -1;

function stringifyJSON(someHtml_Id, someJSONdata)
{
     var p = document.getElementById(someHtml_Id);
             p.innerHTML = JSON.stringify(someJSONdata).split(",").join(",<br>");
  }
  
  function setGlobalTemperature(t, f)
  {
      globalTempC = Math.round(t);
      globalTempF = Math.round(t*1.8 + 32);
      globalFeelLikeC = Math.round( f);
     globalFeelLikeF = Math.round( f*1.8 + 32);
     
     displayTemperature();

  }
   
function toggleTemperature()     
{  
     var d = $("#unit1");
     
     toCelsius = !(toCelsius);
     
    if (toCelsius===true)
    {
     $(d).removeClass("wi-fahrenheit");
     $(d).addClass("wi-celsius");
    }
    else
    {
    $(d).removeClass("wi-celsius");
    $(d).addClass("wi-fahrenheit");
     }     
      
     displayTemperature();
     displayDailyInfo(toCelsius);
     
      if (globalRecCounter === -1) //globalRecCounter controlled by displayInformation(direction)
          obj = globalWeatherData.currently;
      else
          obj = globalWeatherData.hourly.data[globalRecCounter];
      
     displaySummary(obj.summary);         
  }

function displayLocation(data) 
{
    globalFormattedAddress = data.results[1].formatted_address;
    
    $("#weatherLocation").empty().append(globalFormattedAddress); 
    
}

function displayCoordinates(pos)
{
   Lat = pos.coords.latitude.toFixed(2);
   Lon =  pos.coords.longitude.toFixed(2);
  
    $("#latlng").empty().append("Lat:"+ Lat + "<sup>o</sup> &nbsp&nbsp&nbsp Long:"+ Lon +"<sup>o</sup>");
    
 }

    
function displayMap(pos)  // uses script: maps.googleapis.com/maps/api/js
{
    //document.getElementById("map")
      myCenter = {lat: pos.coords.latitude, lng: pos.coords.longitude};
      myMap = new google.maps.Map( document.getElementById("map"), { center:myCenter ,  scrollwheel:true,  zoom: 12  });
      
    }

  function displaySummary(s)
 {
     var t;
     var f;
     
      $("#summary").empty().append(s);     
      myMarker = new google.maps.Marker({map:myMap, position: myCenter});
      
      
     if (toCelsius) 
     { 
         t = globalTempC.toString() + '&deg;C';
         f = globalFeelLikeC.toString() + '&deg;C';
     }
     else { 
         t = globalTempF.toString() + '&deg;F';
         f = globalFeelLikeF.toString() + '&deg;F';
     }
     
      var myString =  '<div id="content">'+
      '<div id="FCC-weathermap-challenge-note"></div>'+
      '<h5 style = "color:darkseagreen">'+globalFormattedAddress+'</h5>'+
      '<div id="bodyContent">'+
     ' <h6>You are near Latitude '+Lat+'&deg; and Longitiude'+Lon+'&deg;.</h6>'+
      '<p><b>At this time - '+globalDateString+' - </b>the temperature is <b>'+t+' </b>, and it sure feels like ' +f+
      ' around here. </p>'+
      '<p>Whatever you do, enjoy the outdoors and be careful!</p></div></div>';
      
      var infowindow = new google.maps.InfoWindow({content: myString });
      infowindow.open(myMap, myMarker);
  }
  
  function displayDate(time)
  {
    
    var d = new Date(time*1000); 
    var timePart = d.toLocaleTimeString();
    var datePart = d.getDate();
    var monthPart = d.getMonth();
    var dayPart = d.getDay();


      var Days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" ];
      var Months = ["January","February", "March", "April", "May", "June","July","August", "September","October","November","December"];
      globalDateString = Days[dayPart]+" "+Months[monthPart]+" "+ datePart+",  "+d.getFullYear()+", "+timePart;
                        
     $("#theTime").empty().append( "<b>"+ globalDateString +"</b>");
  }
  
    
  function displayTemperature()
  {
      var  temp = globalTempC,   feel = globalFeelLikeC;
      
      if (!toCelsius)
      {
          temp = globalTempF;
          feel = globalFeelLikeF;
      }
      
      $("#temp").empty().append(temp);
      $("#feelsLike").empty().append("&nbsp;"+feel+"&deg;");      
      
    }
    
  
  function  displayPrecipitation(p)
  {
      $("precipAmt").empty().append(Math.round(p)+"mm");
      
  }  
  
   function  displayPressure(p)
  {
      $("#pressureAmt").empty().append(p.toFixed(0));
      
  }
  
  function  displayWindSpeed(w)
  {
      $("#windSpeed").empty().append(Math.round(w*3.6).toString() +"kmh");     
  }

function  displayWindDirection(d)
  {
      $("#theDirection").empty().append(d.toString() +"&deg;");     
  }
  
  function  displayHumidity(h)
  {
      $("#humidity").empty().append(Math.round(h*100) +"&#37;");     
  }

function displayCloudCover(c)
 {
      $("#cloudCover").empty().append(Math.round(c*100) +"&#37;");     
  }
  
function displayVisibility(v)
 {
      $("#visibility").empty().append(Math.round(v).toString() +"km");     
  }
  
function displayIcon(icn, callType)
 {
    var icon;
    
     switch(icn) {
     case "clear-day":
        icon = "wi-day-sunny";
        break;
     case "clear-night":
        icon = "wi-night-clear";
        break;
       case "snow":
        icon = "wi-snow";
        break;
        case "sleet":
        icon = "wi-sleet";
        break;
        case "rain":
        icon = "wi-rain";
        break;
         case "wind":
        icon = "wi-strong-wind";
        break;
         case "fog":
        icon = "wi-fog";
        break;
         case "cloudy":
        icon = "wi-cloudy";
        break;
         case "partly-cloudy-night":
        icon = "wi-night-partly-cloudy";
        break;
         case "partly-cloudy-day":
        icon = "wi-day-cloudy";
        break;
         case "hail":
        icon = "wi-hail";
        break;
         case "thunderstorm":
       icon = "wi-thunderstorm";
        break;
         case "tornado":
        icon = "wi-tornado";
        break;
       case "hurricane":
        icon = "wi-hurricane";
       break;
     default:
         icon = "wi-na";
 } 
 
 /*This function is used both to (i) print the weatherIcon  or (ii) return the value of the icon. This is a cheap work-around
  to use the function in different ways. The function is called by displayInformation(0) as well as displayDailyInfo(1)*/
                                                                
 if (callType === 0)
     $("#weatherIcon").empty().append('<i class="wi '+icon+' "></i>');
  else
       return icon;
  }
     
 function  displayInformation(direction)
  {      
      var obj ={};
      var shouldDisplay = false;
      
      if  (direction === -2)   //the initial call after data gathered from forecast.io
      {   
          globalRecCounter = -1;
          obj = globalWeatherData.currently;
          shouldDisplay = true;
      }
      
       
     else if  ( ( (globalRecCounter === -1) && (direction === -1) ) || ((globalRecCounter === (globalHourlySize - 1)) &&(direction === 1)))
    {
         shouldDisplay = false;
     }
      
      else //display new information
      {
       globalRecCounter += direction;  //direction = -1 or +1
       
      if (globalRecCounter === -1)
          obj = globalWeatherData.currently;
      else
          obj = globalWeatherData.hourly.data[globalRecCounter];
      
     shouldDisplay = true;
  }
      
      if (shouldDisplay)
      {
     displayDate(obj.time);   
     
     setGlobalTemperature(obj.temperature, obj.apparentTemperature);
     
     displayPrecipitation(obj.precipIntensity);
     displayPressure(obj.pressure);
     displayWindSpeed(obj.windSpeed);
     displayWindDirection(obj.windBearing);
     displayHumidity(obj.humidity);
     displayCloudCover(obj.cloudCover);
     displayVisibility(obj.visibility);
     displaySummary(obj.summary);
     displayIcon(obj.summary,0);
     displayIcon(obj.icon, 0);     
     }
  }
  
  function theDay(time)
  {
      var d = new Date(time*1000); 
      var indx = d.getDay();

      var Days = ["SUN","MON","TUE","WED","THUR","FRI","SAT" ];
   
      return Days[indx];
  }
  
  function theTemp(t, celsius)
  {
      
     if (celsius === true)
         return t.toFixed(0).toString() + '&deg;';
     else 
          return (t*1.8+32).toFixed(0).toString() + '&deg;';
  }
  
function theMoon(m)
{
    var f =  0.017857 ;     // f = half of (1 /28)
    
    if (m < f)
        return 'wi-moon-new';
    else if ( (f <= m) && (m < 3*f) )
        return 'wi-moon-waxing-crescent-1';
     else if ( (3*f <= m) && (m < 5*f) )
        return 'wi-moon-waxing-crescent-2';
     else if ( (5*f <= m) && (m < 7*f) )
        return 'wi-moon-waxing-crescent-3';
     else if ( (7*f <= m) && (m < 9*f) )
        return 'wi-moon-waxing-crescent-4';
     else if ( (9*f <= m) && (m < 11*f) )
        return 'wi-moon-waxing-crescent-5';
     else if ( (11*f <= m) && (m < 13*f) )
        return 'wi-moon-waxing-crescent-6';
     else if ( (13*f<= m) && (m < 15*f) )
        return 'wi-moon-first-quarter';
     else if ( (15*f<= m) && (m < 17*f) )
        return 'wi-moon-waxing-gibbous-1';
     else if ( (17*f <= m) && (m < 19*f) )
        return 'wi-moon-waxing-gibbous-2';
     else if ( (19*f<= m) && (m < 21*f) )
        return 'wi-moon-waxing-gibbous-3';
     else if ( (21*f <= m) && (m < 23*f) )
        return 'wi-moon-waxing-gibbous-4';
     else if ( (23*f <= m) && (m < 25*f) )
        return 'wi-moon-waxing-gibbous-5';
     else if ( (25*f <= m) && (m < 27*f) )
        return 'wi-moon-waxing-gibbous-6';
    else if ( (27*f <= m) && (m < 29*f) )
        return 'wi-moon-full';    
    else if ( (29*f <= m) && (m < 31*f) )
        return 'wi-moon-waning-gibbous-1';
     else if ( (31*f <= m) && (m < 33*f) )
        return 'wi-moon-waning-gibbous-2';
     else if ( (33*f <= m) && (m < 35*f) )
        return 'wi-moon-waning-gibbous-3';
     else if ( (35*f<= m) && (m < 37*f) )
        return 'wi-moon-waning-gibbous-4';
     else if ( (37*f <= m) && (m < 39*f) )
        return 'wi-moon-waning-gibbous-5';
     else if ( (39*f <= m) && (m < 41*f) )
        return 'wi-moon-waning-gibbous-6';
     else if ( (41*f <= m) && (m < 43*f) )
        return 'wi-moon-last-quarter';
    else if ( (43*f <= m) && (m < 45*f) )
        return 'wi-moon-waning-crescent-1';
     else if ( (45*f <= m) && (m < 47*f) )
        return 'wi-moon-waning-crescent-2';
     else if ( (47*f <= m) && (m < 49*f) )
        return 'wi-moon-waning-crescent-3';
     else if ( (49*f <= m) && (m < 51*f) )
        return 'wi-moon-waning-crescent-4';
     else if ( (51*f<= m) && (m < 53*f) )
        return 'wi-moon-waning-crescent-5';
     else if ( (53*f <= m) && (m < 55*f) )
        return 'wi-moon-waning-crescent-6';
    else 
        return 'wi-moon-new';
        
}

  function displayDailyInfo(unit) 
  {
      var HTMLstr = [];
          
      var d = globalWeatherData.daily.data;
      var len = d.length;
   
      
   HTMLstr[0] = "<div class = 'tabular'  style = 'color: darkseagreen; font-weight:900'><h5 ><i class = 'fa fa-calendar'></i></h5><h5><i class = 'fa fa-info-circle'></i></h5> <h5><i class = 'wi wi-thermometer'></i>-Mx</h5><h6><i class = 'wi wi-thermometer-exterior'></i>-Mn</h6><h6><i class = 'wi wi-strong-wind'></i></h6><h5><i class = 'wi wi-moon-full' ></i></h5></div> ";
  
   for (var i = 0; i < len ; i++)
      {                 
      HTMLstr[i+1]   =   "<div class = 'tabular'><h5   style = 'color: darkseagreen; font-weight:900'>"+theDay(d[i].time)+"</h5><h5><i class = 'wi "+
              displayIcon(d[i].icon, 1)+ "'></i></h5><h6>"+
                theTemp(d[i].temperatureMax, unit)+"</h5><h6>"+theTemp(d[i].temperatureMin, unit)+"</h6><h5>"
              +Math.round(d[i].windSpeed*3.6).toString()+'kh'+"</h6><h5><i class = 'wi "+theMoon(d[i].moonPhase)+ "'></i></h5></div> ";   
      }
      
            $("#dailyDetails").empty().append(HTMLstr.join(""));
   }

function retrieveInformation(position) 
{
    displayCoordinates(position); //position returned from getLocation();
    
   //get the name of the place
    jQuery.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&key=AIzaSyAmuPPhRj1fkH4bJ3ALbGxKh9xx57o9a2Y ", 
    function(data, textStatus, jqXHR)    //data, textStatus and jqXHR /xmlHTTPrequest returned by getJSON
    {
        globalLocationData = data;
        displayLocation(data);
        displayDate();
        displayMap(position);        
   } ); //getJSON
                 
     //now, get the weather forecast data from forecast.io
    jQuery.getJSON("https://api.forecast.io/forecast/c53da8b51881189a84ffc31c0d620d07/" + position.coords.latitude + "," + position.coords.longitude + "?units=auto&callback=?",
    function(data)
    {  
     globalWeatherData = data;
     globalHourlySize = data.hourly.data.length;
     
     displayInformation(-2);
     displayDailyInfo(toCelsius);
   
     
         }//function     
      ) ;   //getJSON */
}//showPosition 


function onError(err)
{
    $("#weatherLocation").empty().append("There was an error<br>Error Code:"+err.code+"<br>"+err.message);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getLocation()  //see your implementation of getLocation() on codepen.io. geolocation does not work in Chrome 5.0 or higher if not secure.
{
    var oneWeek = 604800000; //in milliseconds
    var positionOptions = {enableHighAccuracy : true, timeout: 60000, maximumAge:oneWeek }; //highAccuracy, timeOut, cache-Age
    
    if (navigator.geolocation) 
    {
        //getCurrentPosition() can also take an argument like the positionOptions object above
        navigator.geolocation.getCurrentPosition(retrieveInformation, getAlternativeLocation ); //can also take arguments "error" and "options = positionOptions"
    } 
    else  //alternatively, you may use ip-api.com
    {
       onError("Geolocation is not supported by this browser. Hold on...");
       getAlternativeLocation({'code':'Browser' , 'message':'Geolocation not supported'});       
    }
}

function getAlternativeLocation(err)
{
   onError('Geolocation error: ('+err.code+ ') '+err.message);
  
    var position = {'coords':{'latitude':0, 'longitude':0}};
  
    $.getJSON("http://ip-api.com/json/?callback=?", 
     function(data)
     { 
      
         if (data.status === "success")
         {
          position.coords.latitude = data.lat;
         position.coords.longitude = data.lon;
           

         retrieveInformation(position);
         }

         else
           onError(data.message);

    }
  );
}