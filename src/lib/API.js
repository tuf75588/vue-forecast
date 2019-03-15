import { options } from './config';
const WEATHER_API_URL = `https://api.darksky.net/forecast/${options.API_KEY}`;
const LOCATION_URL = `https://darksky.net/geo?q=`;
const ADDRESS_URL = `https://darksky.net/rgeo?hires=1`;
const proxy = 'https://cors-anywhere.herokuapp.com/';

function getWeatherData(lat, lon) {
  return fetch(`${proxy}${WEATHER_API_URL}/${lat},${lon}`).then((data) => data.json());
}

function getCoords(location) {
  return fetch(`${proxy}${LOCATION_URL}${location}`).then((res) => res.json());
}

function getAddress(lat, lon) {
  return fetch(`${proxy}${ADDRESS_URL}/&lat=${lat}&lon=${lon}`).then((res) => {
    return res.json();
  });
}

function getEmbedURL(lat, lng) {
  return `https://maps.darksky.net/@emoji,${lat},${lng},11?domain="+encodeURIComponent(window.location.href)+"&auth=1525213550_b5fc128e7789bb56048952cc704c8473&embed=true&amp;timeControl=false&amp;fieldControl=false&amp;defaultField=emoji`;
}
export default {
  getWeatherData,
  getCoords,
  getAddress,
  getEmbedURL
};
