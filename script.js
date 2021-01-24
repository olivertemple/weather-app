function getData(){
    var req = new XMLHttpRequest();
    req.open("GET","https://api.openweathermap.org/data/2.5/onecall?lat=51.016685&lon=-4.206666&units=metric&appid=02d50df157b5697c98fc6534829593db",true);
    req.onload = function(){
        if (req.status >= 200 && req.status < 400) {
            data = JSON.parse(req.response)
            currentData = data.current
            showCurrentData(currentData);
            console.log(currentData);
        }else{
            console.log("error")
        }
    } 
    req.send();
}

function showCurrentData(currentData){
    var url = "http://openweathermap.org/img/wn/"+currentData.weather[0].icon+"@2x.png"
    var temp = document.createElement("h1");
    temp.appendChild(document.createTextNode((Math.round(currentData.temp))+"\u02DA"));
    
    var img = document.createElement("img");
    img.src = url

    var description = document.createElement("h3")
    description.appendChild(document.createTextNode(currentData.weather[0].description));
    
    var feelsLike = document.createElement("h2");
    feelsLike.appendChild(document.createTextNode("Feels like "));
    var span = document.createElement("span");
    span.appendChild(document.createTextNode(currentData.feels_like+"\u02DA"))
    feelsLike.appendChild(span)

    document.getElementById("topSummary").appendChild(img)
    document.getElementById("topSummary").appendChild(temp)

    document.getElementById("feelsLike").appendChild(feelsLike)



    var windSpeed = currentData.wind_speed;
    var windGust = currentData.wind_gust;
    var windDeg = currentData.wind_deg;

    var speed = document.createElement("div2");
    var speedh1 = document.createElement("h2");
    var speedSpan = document.createElement("span");
    speedSpan.appendChild(document.createTextNode("m/s"))
    speedh1.appendChild(document.createTextNode(windSpeed));
    speedh1.appendChild(speedSpan)
    speed.appendChild(speedh1);

    var gust = document.createElement("div2");
    var gusth1 = document.createElement("h2");
    var gustSpan = document.createElement("span");
    gustSpan.appendChild(document.createTextNode("m/s"))
    gusth1.appendChild(document.createTextNode(windGust));
    gusth1.appendChild(gustSpan)
    gust.appendChild(gusth1)

    var deg = document.createElement("div2");
    var degh1 = document.createElement("h2");
    degh1.appendChild(document.createTextNode(windDeg+"\u02DA"));
    deg.appendChild(degh1)

    document.getElementById("wind").appendChild(speed);
    document.getElementById("wind").appendChild(gust);
    document.getElementById("wind").appendChild(deg);

}
getData();
