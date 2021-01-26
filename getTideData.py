import requests
from bs4 import BeautifulSoup as bs

req = requests.get("https://www.tidetime.org/europe/united-kingdom/westward-ho.htm")
print(req)
soup = bs(req.text)
file = open("tideTable.txt", "w")
file.write(str(soup.find(id="tideTable")))
file.close()