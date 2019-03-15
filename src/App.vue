<template>
  <div id="app">
    <div class="home">
      <div class="col-8 offset-2">
        <h1 class="text-center">Emoji Weather with VueJS! 🌞😎</h1>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control mt-2"
            v-model="location"
            placeholder="Enter Location..."
          >
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary mt-2"
              type="button"
              id="button-addon2"
              @click="updateLocation"
            >Search</button>
          </div>
        </div>
      </div>
      <div class="col-8 offset-2 text-center">
        <h1 v-if="!forecast">Loading...</h1>
        <div class="card border-secondary mb-3">
          <div class="card-header">Current Weather for {{address.name}} {{address.street}}</div>

          <div class="card-body" v-if="forecast">
            <h4 class="card-title icon-temp">{{forecast.currently.summary}}</h4>
            <span class="emoji">{{icons[forecast.currently.icon]}}</span>
            <div class="card-text">{{forecast.currently.temperature}} ℉</div>
            <div
              class="card-text"
            >{{forecast.currently.precipProbability}} % Chance of precipitation</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-8 offset-2">
      <iframe id="map-embed-iframe" frameborder="0" height="500px" width="100%" :src="embedURL"></iframe>
    </div>
  </div>
</template>

<script>
import API from "./lib/API";
/* clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night */
export default {
  data() {
    return {
      embedURL: "",
      icons: {
        "clear-day": "😎",
        "clear-night": "🌃",
        rain: "☔",
        snow: "❄",
        sleet: "🍦",
        wind: "💨",
        fog: "🌁",
        cloudy: "☁☁",
        "partly-cloudy-day": "🌤🌤",
        "partly-cloudy-night": "⛅⛅"
      },
      location: localStorage.location || "",
      forecast: null,
      lat: localStorage.lat || "",
      lon: localStorage.lon || "",
      address: localStorage.address || ""
    };
  },
  name: "app",
  components: {},
  mounted() {
    this.loadWeather(
      localStorage.lat || "40.1196",
      localStorage.lon || "-75.1201"
    );
  },
  methods: {
    loadWeather(lat, lon) {
      localStorage.lat = lat;
      localStorage.lon = lon;
      this.embedURL = API.getEmbedURL(lat, lon);
      Promise.all([
        API.getWeatherData(lat, lon),
        API.getAddress(lat, lon)
      ]).then(data => {
        this.forecast = data[0];
        // this.address = [data[1].name, data[1].street].join(" ");
        this.address = data[1];
        localStorage.address = this.address;
      });
    },
    updateLocation() {
      localStorage.location = this.location;
      API.getCoords(this.location).then(res => {
        localStorage.address = this.address;
        this.loadWeather(res.latitude, res.longitude);
      });
    }
  }
};
</script>

<style>
body {
  font-size: 2em;
}
.icon-temp {
  font-size: 2em;
}
.emoji {
  font-size: 2em;
}
</style>
