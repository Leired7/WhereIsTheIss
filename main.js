//Making a map and tiles
const mymap = L.map("issmap").setView([0, 0], 3);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tilesUrl = "http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg";
const tiles = L.tileLayer(tilesUrl, { attribution });
tiles.addTo(mymap);

//Making a marker with a custom icon
const myISSIcon = L.icon({
  iconUrl: "./img/iss200.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
const myCREWDRAGONIcon = L.icon({
  iconUrl: "./img/project.png",
  iconSize: [32, 32],
  iconAnchor: [32, 32],
});
const markerISS = L.marker([0, 0], { icon: myISSIcon }).addTo(mymap);
const markerCREWDRAGON = L.marker([0, 0], { icon: myCREWDRAGONIcon }).addTo(
  mymap
);

const api_urlISS = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;
async function getISS() {
  const response = await fetch(api_urlISS);
  const data = await response.json();
  const { latitude, longitude, velocity, altitude } = data;

  markerISS.setLatLng([latitude, longitude]);
  if (firstTime) {
    mymap.setView([latitude, longitude], 2);
    firstTime = false;
  }

  let unix_timestamp = data.timestamp;
  let date = new Date(unix_timestamp * 1000).toLocaleString();

  document.getElementById("date").textContent = date;
  document.getElementById("altISS").textContent = altitude.toFixed(2);
  document.getElementById("latISS").textContent = latitude.toFixed(2);
  document.getElementById("lonISS").textContent = longitude.toFixed(2);
  document.getElementById("velISS").textContent = velocity.toFixed(2);
  return { latitude, longitude };
}
let whereIsISS = setInterval(getISS, 1000);

const api_urlCREWDRAGON =
  "https://www.n2yo.com/rest/v1/satellite/positions/45623/41.702/-0.37739/0/2/&apiKey=LEDQ9T-YFY9GR-D8SHLA-4GB3";
async function getCREWDRAGON() {
  const response = await fetch(api_urlCREWDRAGON);
  const data = await response.json();
  const { satlatitude, satlongitude, sataltitude } = await data.positions[0];

  markerCREWDRAGON.setLatLng([satlatitude, satlongitude]);

  document.getElementById("altCREWDRAGON").textContent = sataltitude.toFixed(2);
  document.getElementById("latCREWDRAGON").textContent = satlatitude.toFixed(2);
  document.getElementById("lonCREWDRAGON").textContent = satlongitude.toFixed(
    2
  );

  console.log("data falcon", data);
  console.log("await satlatitude", satlatitude);
}
let whereIsCREWDRAGON = setInterval(getCREWDRAGON, 1000);
