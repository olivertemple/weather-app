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