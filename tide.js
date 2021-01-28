function getTideData(){
    req = new XMLHttpRequest();
    req.open("GET","./tideTable.txt", true);
    req.onload = function(){
        if (req.status >= 200 && req.status < 400) {
            tideData = (req.response);
            document.getElementById("tides").innerHTML = (tideData)
        }else{
            console.log("error")
        }
    }
    req.send();
}


getTideData();


function getWaveData(){
    waveReq = new XMLHttpRequest();
    waveReq.open("GET","./waveHeight.txt",true);
    waveReq.onload = function(){
        if (waveReq.status >=200 && waveReq.status < 400){
            waveData = waveReq.response.split(",");
            waveData.pop()
            showWaveData(waveData)
            console.log(waveData)
        }else{
            console.log("error")
        }
    }
    waveReq.send();
}
getWaveData();


function showWaveData(data){
    dayNum = 0
    var today = new Date()
    for (let i=0; i<data.length; i++){
        if(i%8==0){
            var dayList = ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"]
            date = new Date(today);
            date.setDate(date.getDate() + dayNum);
            console.log(date.getDate())
            var div= document.createElement("div1");
            var h1 = document.createElement("h1");
            var dateHeading = document.createElement("h1")
            dateHeading.setAttribute("id","date")
            dateHeading.appendChild(document.createTextNode(dayList[date.getDay()]+" "+date.getDate()));
            console.log(dateHeading);

            h1.appendChild(document.createTextNode(String(data[i])+"m"));
            div.appendChild(dateHeading)
            div.appendChild(h1)
            dayNum += 1
        }else{
            var h1 = document.createElement("h1");
            h1.appendChild(document.createTextNode(String(data[i])+"m"));
            div.appendChild(h1);
        };
        document.getElementById("waves").appendChild(div)
    }
}


function theme(){
    if (localStorage.theme == undefined){
        if (window.matchMedia){
            if(window.matchMedia("(prefers-color-scheme: dark)").matches){
                var elem = document.getElementsByTagName("body");
                elem[0].setAttribute("class","dark")
                //graphPrecipitation(xyData)
                document.getElementById("homeIcon").setAttribute("src","resources/weather-dark.png");
                document.getElementById("sailIcon").setAttribute("src","resources/sailboat-dark.png");
            }else{
                var elem = document.getElementsByTagName("body");
                elem[0].setAttribute("class","light")
                document.getElementById("homeIcon").setAttribute("src","resources/weather-light.png");
                document.getElementById("sailIcon").setAttribute("src","resources/sailboat-light.png");
                //graphPrecipitation(xyData)

            }
        }else{
            localStorage.theme = "light";
            theme();
        }
    }else{
        if(localStorage.theme != undefined){
            console.log("here")
            var elem = document.getElementsByTagName("body");
            elem[0].setAttribute("class",localStorage.theme)
            if (localStorage.theme=="dark"){
                document.getElementById("homeIcon").setAttribute("src","resources/weather-dark.png");
                document.getElementById("sailIcon").setAttribute("src","resources/sailboat-dark.png");
            }else{
                document.getElementById("homeIcon").setAttribute("src","resources/weather-light.png");
                document.getElementById("sailIcon").setAttribute("src","resources/sailboat-light.png");
            }
        }else{
            console.log("error")
            localStorage.theme = "light";
            theme();
        }
    }
}      


if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("./serviceWorker.js",{scope: './'})
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}
