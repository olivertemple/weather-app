function getData(){
    var req = new XMLHttpRequest();
   
    //req.open("GET","https://api.openweathermap.org/data/2.5/onecall?lat=51.03&lon=-4.18&units=metric&appid=02d50df157b5697c98fc6534829593db",true);
    req.open("GET","https://api.openweathermap.org/data/2.5/onecall?lat="+pos.Latitude+"&lon="+pos.Longitude+"&units=metric&appid=02d50df157b5697c98fc6534829593db",true);
    req.onload = function(){
        if (req.status >= 200 && req.status < 400) {
            data = JSON.parse(req.response);
            currentData = data.current;
            hourlyData = data.hourly;
            showCurrentData(data);
            showHourlyData(hourlyData);
            sortMin(data.minutely)
            showLongTermData(data)
            data.daily.forEach(function(day){
                sun(day)
            });
        }else{
            console.log("error");
        }
    } 
    req.send();
}

function showCurrentData(data){
    var currentData = data.current
    var url = "http://openweathermap.org/img/wn/"+currentData.weather[0].icon+"@2x.png"
    var temp = document.createElement("h1");
    temp.appendChild(document.createTextNode((Math.round(currentData.temp))+"\u02DA"));
    
    var img = document.createElement("img");
    img.src = url;

    var description = document.createElement("h3");
    description.appendChild(document.createTextNode(currentData.weather[0].description));
    
    var feelsLike = document.createElement("h2");
    feelsLike.appendChild(document.createTextNode("Feels like "));
    var span = document.createElement("span");
    span.appendChild(document.createTextNode(currentData.feels_like+"\u02DA"));
    feelsLike.appendChild(span);

    var maxTemp = data.daily[0].temp.max;
    var minTemp = data.daily[0].temp.min;

    var maxMin = document.createElement("div1")
    var max = document.createElement("h4");
    max.appendChild(document.createTextNode(maxTemp+"\u02DA"));
    var min = document.createElement("h4");
    min.appendChild(document.createTextNode(minTemp+"\u02DA"));
    maxMin.appendChild(max)
    maxMin.appendChild(min)


    document.getElementById("topSummary").appendChild(img);
    document.getElementById("topSummary").appendChild(temp);
    document.getElementById("topSummary").appendChild(maxMin)
    document.getElementById("description").appendChild(description);
    document.getElementById("feelsLike").appendChild(feelsLike);



    var windSpeed = currentData.wind_speed;
    var windGust = currentData.wind_gust;
    var windDeg = currentData.wind_deg;

    var speed = document.createElement("div2");
    var speedh1 = document.createElement("h2");
    var speedSpan = document.createElement("span");
    speedSpan.appendChild(document.createTextNode("m/s"));
    speedh1.appendChild(document.createTextNode(windSpeed));
    speedh1.appendChild(speedSpan);
    speed.appendChild(speedh1);

    var gust = document.createElement("div2");
    var gusth1 = document.createElement("h2");
    var gustSpan = document.createElement("span");
    gustSpan.appendChild(document.createTextNode("m/s"));
    gusth1.appendChild(document.createTextNode(windGust));
    gusth1.appendChild(gustSpan);
    gust.appendChild(gusth1);

    var deg = document.createElement("div2");
    var degh1 = document.createElement("h2");
    degh1.appendChild(document.createTextNode(windDeg+"\u02DA"));
    //deg.appendChild(degh1);
    var img = document.createElement("img");
    img.setAttribute("src","./resources/arrow-dark.png");
    img.setAttribute("style","transform: rotate("+(windDeg-90)+"deg)")
    img.setAttribute("id","windDirectionImage")
    deg.appendChild(img) 

    document.getElementById("wind").appendChild(speed);
    document.getElementById("wind").appendChild(gust);
    document.getElementById("wind").appendChild(deg);

}

function showHourlyData(hourlyData){
    var div = document.getElementById("hourly");
    hourlyData.forEach(function(item){
        var elem = document.createElement("div1");
        var img = document.createElement("img");
        
        img.setAttribute("src","http://openweathermap.org/img/wn/"+item.weather[0].icon+"@2x.png");

        var timeStamp = item.dt
        var date = new Date(timeStamp*1000);
        var hours = date.getHours();
        var day = date.getDay()
        var dayList = ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"]
        var dayString = dayList[day]

        if (String(hours).length == 1){
            hours = "0"+String(hours)
        }
        var time = document.createElement("h1");
        time.appendChild(document.createTextNode(hours+":00"))
        
        var dayHeading = document.createElement("h3");
        dayHeading.appendChild(document.createTextNode(dayString))


        var itemTemp = Math.round(item.temp)
        var temp = document.createElement("h2");
        temp.appendChild(document.createTextNode(itemTemp+"\u02DA"));

        elem.appendChild(dayHeading)
        elem.appendChild(img);
        elem.appendChild(temp);
        elem.appendChild(time);
        div.appendChild(elem);
    })
}

function graphPrecipitation(min){
    var chart = new CanvasJS.Chart("hour",{
        backgroundColor: "rgb(0,0,0,0)",
        zoomEnabled: false,
        animationEnabled: true,
        animationDuration: 800,
        height: 400,
        axisY:{
            title: "Precipitation (mm)",
            gridThickness: 0,
            titleFontColor:"white",
            labelFontColor:"white",
        },
        axisX:{
            labelFontColor:"white",
        },
        toolTip: {
            enabled: false,
        },
        data: [
        {        
        type: "splineArea",
        color: "rgba(65, 101, 142, 0.5)",
        xValueType: "dateTime",
        markerType:"none",
        lineColor:"rgba(65, 101, 142)",
        lineThickness: 5,
        dataPoints: min
        }],
        });
        chart.render();
}


function sortMin(data){
    xyData = []
    
    data.forEach(function(item){
        var timeStamp = item.dt
        var date = new Date(timeStamp*1000);
        var hours = date.getHours();
        xyData.push({"x":date,"y":item.precipitation})
    })
    graphPrecipitation(xyData);
}


function getWindDirection(data){
    var directions = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    var val = parseInt((data/22.5)+0.5);
    console.log(directions[(val%16)]);
}

function showLongTermData(data){
    var longTermData = data.daily;
    longTermData.forEach(function(day){
        var dayDiv = document.createElement("div2");
        var img = document.createElement("img");
        img.setAttribute("src","http://openweathermap.org/img/wn/"+day.weather[0].icon+"@2x.png");

        var date = new Date(day.dt * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var month = months[date.getMonth()]
        var dayNum = date.getDate();
        var dayList = ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"]
        var dayWord = dayList[date.getDay()]
        var dateHeading = document.createElement("h1");
        dateHeading.appendChild(document.createTextNode(dayWord + " " +dayNum+" "+month));

        var description = document.createElement("h2");
        var descriptionText = day.weather[0].description
        description.appendChild(document.createTextNode(descriptionText))


        var tempHeading = document.createElement("h3");
        var tempMax = Math.round(day.temp.max);
        var tempMin = Math.round(day.temp.min);
        var maxSpan = document.createElement("span")
        maxSpan.appendChild(document.createTextNode(tempMax+"\u02DA"));
        tempHeading.appendChild(maxSpan)
        tempHeading.appendChild(document.createTextNode(tempMin+"\u02DA"));


        
        dayDiv.appendChild(dateHeading)
        dayDiv.appendChild(img)
        dayDiv.appendChild(tempHeading)
        dayDiv.appendChild(description)
        document.getElementById("longTerm").appendChild(dayDiv)
    })
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }else{
        console.log("geolocation error, using bideford");
    }
}

function showPosition(position) {
    pos = ({"Latitude":position.coords.latitude, "Longitude":position.coords.longitude});
    console.log(pos)
    document.getElementById("location").appendChild(document.createTextNode((Math.round(pos.Latitude*100))/100+", "+((Math.round(pos.Longitude*100))/100))) 
    getData()
}

function showError(error) {
    console.log("geolocation error, using London UK");
    pos = ({"Latitude":51.5074, "Longitude":0.1278});
    document.getElementById("location").appendChild(document.createTextNode("Location error, using London UK")) 
    getData();
}


function sun(day){
    var sunrise = new Date(day.sunrise*1000);
    var sunset = new Date(day.sunset*1000);
    if (String(sunrise.getMinutes()).length < 2){
        var sunriseMins = ("0"+sunrise.getMinutes())
    }else{
        var sunriseMins = (sunrise.getMinutes())
    }
    if(String(sunrise.getHours()).length < 2){
        var sunriseHours = ("0"+sunrise.getHours())
    }else{
        var sunriseHours = sunrise.getHours()
    }
    var sunriseTime = (sunriseHours+":"+sunriseMins)

    if (String(sunset.getMinutes()).length < 2){
        var sunsetMins = ("0"+sunset.getMinutes())
    }else{
        var sunsetMins = (sunset.getMinutes())
    }
    if(String(sunset.getHours()).length < 2){
        var sunsetHours = ("0"+sunset.getHours())
    }else{
        var sunsetHours = sunset.getHours()
    }
    var sunsetTime = (sunsetHours+":"+sunsetMins)


    var div = document.createElement("div");
    div.setAttribute("id","sun")
    var sunriseDiv1 = document.createElement("div1");
    sunriseDiv1.setAttribute("id","sunrise")

    var sunsetDiv1 = document.createElement("div1");
    sunsetDiv1.setAttribute("id","sunset")

    var sunsetImg = document.createElement("img");
    sunsetImg.setAttribute("src","resources/sunset.png")

    var sunriseImg = document.createElement("img");
    sunriseImg.setAttribute("src","resources/sunrise.png")

    sunsetDiv1.appendChild(sunsetImg);
    sunriseDiv1.appendChild(sunriseImg);


    var sunriseHeading = document.createElement("h1");
    sunriseHeading.setAttribute("id","sunrise")
    sunriseHeading.appendChild(document.createTextNode(sunriseTime));
    var sunsetHeading = document.createElement("h1");
    sunsetHeading.setAttribute("id","sunset")
    sunsetHeading.appendChild(document.createTextNode(sunsetTime));

    var date = new Date(day.dt * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var month = months[date.getMonth()]
    var dayNum = date.getDate();
    var dayList = ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"]
    var dayWord = dayList[date.getDay()]
    var dateHeading = document.createElement("h2");
    dateHeading.appendChild(document.createTextNode(dayWord + " " +dayNum+" "+month));
    
    sunriseDiv1.appendChild(sunriseHeading);
    sunsetDiv1.appendChild(sunsetHeading);
    div.appendChild(dateHeading);
    div.appendChild(sunriseDiv1);
    div.appendChild(sunsetDiv1);

    document.getElementById("sunSection").appendChild(div)

}

