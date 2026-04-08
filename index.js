const axios = require("axios");

const baseURL = `https://geocoding-api.open-meteo.com/v1/search`;

function obterCord(cidade) {
  const param = `?name=${cidade}&count=1&language=pt&format=json`;
  return axios.get(baseURL + param).then((resp) => {
    return {
      lat: resp.data.results[0].latitude,
      lon: resp.data.results[0].longitude,
    };
  });
}

let cidade = "Piracicaba";

obterCord(cidade)
  .then((coords) => console.log(`${cidade} (${coords.lat}, ${coords.lon})`))
  .catch((err) => console.log(err));