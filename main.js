//Making a map and tiles
const mymap = L.map('issmap').setView([0, 0], 3);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tilesUrl = 'http://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tilesUrl, { attribution });
tiles.addTo(mymap);

//Making a marker with a custom icon
const myISSIcon = L.icon({
  iconUrl: './img/iss200.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

const markerISS = L.marker([0, 0], { icon: myISSIcon }).addTo(mymap);

markerISS.bindPopup('Soy la ISS').openPopup();

const api_urlISS = 'https://api.wheretheiss.at/v1/satellites/25544';

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

  document.getElementById('date').textContent = date;
  document.getElementById('altISS').textContent = altitude.toFixed(2);
  document.getElementById('latISS').textContent = latitude.toFixed(2);
  document.getElementById('lonISS').textContent = longitude.toFixed(2);
  document.getElementById('velISS').textContent = velocity.toFixed(2);
  return { latitude, longitude };
}
let whereIsISS = setInterval(getISS, 2000);



