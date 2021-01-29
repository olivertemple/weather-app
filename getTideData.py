import requests
from bs4 import BeautifulSoup as bs

req = requests.get("https://www.tidetime.org/europe/united-kingdom/westward-ho.htm")
print(req)
soup = bs(req.text)
file = open("tideTable.txt", "w")
file.write(str(soup.find(id="tideTable")))
file.close()


waveReq = requests.get("https://www.windfinder.com/forecast/westward_ho")
print(waveReq)
soup1 = bs(waveReq.text)
divs = soup1.findAll("div",{"class":"data-waveheight data--major weathertable__cell"})
print(divs)
spans = []

waveFile = open("waveHeight.txt","w")
for item in divs:
    spans.append(item.findAll("span",{"class":"units-wh"}))

for item in spans:
    waveFile.write(item[0].text+",")

waveFile.close()