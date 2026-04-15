const axios = require("axios");

const baseURL = `https://geocoding-api.open-meteo.com/v1/search`;
const meteoURL = `https://api.open-meteo.com/v1/forecast`;

function obterCord(cidade) {
  const param = `?name=${cidade}&count=1&language=pt&format=json`;
  return axios.get(baseURL + param).then((resp) => {
    return {
      lat: resp.data.results[0].latitude,
      lon: resp.data.results[0].longitude,
    };
  });
}
async function obterCond(lat, lon) {
  const param = `?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,wind_speed_10m`;
  try {
    const resp = await axios.get(meteoURL + param);
    const atual = resp.data.current;
    console.log(
      `Temp: ${atual.temperature_2m}°C - sensação térmica: ${atual.apparent_temperature}°C`,
    );
    console.log(`Velocidade do Vento: ${atual.wind_speed_10m} km/h`);
  } catch (err) {
    console.log(err);
  }
}

let cidade = "Piracicaba";

obterCord(cidade)
  .then((coords) => {
    console.log(`${cidade} (${coords.lat}, ${coords.lon})`);
    obterCond(coords.lat, coords.lon);
  })
  .catch((err) => console.log(err));
