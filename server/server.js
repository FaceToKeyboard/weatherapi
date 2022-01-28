const axios = require('axios');
const express = require('express');

const weatherApi = {
  hostname: ''
}
const server = express();
server.use(express.json());

server.get('/local/:zipcode', async (req, res) => {
  const zipcode = req.params.zipcode;
  const re = /\D/;
  if (re.exec(zipcode) !== null || zipcode.length !== 5) return res.status(404).send('city not found');

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${req.params.zipcode}&appid=${process.env.API_KEY}`;
    const apiresponse = await axios.get(url);

    if (apiresponse.status === 200) {
      const data = {
        city: apiresponse.data.name ?? 'No data',
        conditions: apiresponse.data.weather?.[0].description ?? 'No data',
        high_temp: apiresponse.data.main?.temp_max ? Math.ceil(apiresponse.data.main.temp_max - 273) : 'No data',
        low_temp: apiresponse.data.main?.temp_max ? Math.floor(apiresponse.data.main.temp_min - 273) : 'No data',
      }
      res.status(200).send(data);
    } else {
      res.status(502).send('Bad Gateway');
      console.log('API did not respond with data')
    }

  } catch(e) {
    console.log(`Error making API request: \n${e}`);
    res.status(502).send('Bad Gateway');
  }

});

module.exports = server;