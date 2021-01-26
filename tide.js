function getTideData(){
    req = new XMLHttpRequest();
    req.open("GET","./tideTable.txt", true);
    req.onload = function(){
        if (req.status >= 200 && req.status < 400) {
            tideData = (req.response);
            document.getElementById("tides").innerHTML=(tideData)
        }else{
            console.log("error")
        }
    }
    req.send();
}


getTideData();
