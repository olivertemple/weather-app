function getData(){
    var req = new XMLHttpRequest();
    req.open("GET","https://api.openweathermap.org/data/2.5/onecall?lat=51.016685&lon=-4.206666&units=metric&appid=02d50df157b5697c98fc6534829593db",true);
    req.onload = function(){
        if (req.status >= 200 && req.status < 400) {
            data = JSON.parse(req.response);
            currentData = data.current;
            hourlyData = data.hourly;
            showCurrentData(data);
            showHourlyData(hourlyData);
            sortMin(data.minutely)
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
    deg.appendChild(degh1);

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
        if (String(hours).length == 1){
            hours = "0"+String(hours)
        }
        var time = document.createElement("h1");
        time.appendChild(document.createTextNode(hours+":00"))
        
        var itemTemp = Math.round(item.temp)
        var temp = document.createElement("h2");
        temp.appendChild(document.createTextNode(itemTemp+"\u02DA"));

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
        animationDuration: 1000,
        title:{
            text: "Precipitation over the next hour"},
            fontColor:"#FFFFFF",
        axisY:{
            title: "Precipitation (mm)",
            gridThickness: 0.2,
            titleFontColor:"white",
            labelFontColor:"white",
        },
        axisX:{
            title: "Time",
            titleFontColor:"white",
            labelFontColor:"white",
        },
        data: [
        {        
        type: "area",
        xValueType: "dateTime",
        dataPoints: min
        }]
        });
        chart.render();
}


function sortMin(data){
    var xyData = []
    data.forEach(function(item){
        xyData.push({"x":item.dt,"y":item.precipitation})
    })
    console.log(xyData)
}
getData();
