const axios = require('axios');
const express = require('express');

const weatherApi = {
  hostname: ''
}
const server = express();
server.use(express.json());

const apiRequest =  axios.create({

});

server.get('/local/:zipcode', async (req, res) => {
  const zipcode = req.params.zipcode;
  const re = /\D/;
  if (re.exec(zipcode) !== null || zipcode.length !== 5) return res.status(404).send('Bad Request');

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${req.params.zipcode}&appid=${process.env.API_KEY}`;
    const apiresponse = await axios.get(url);

    const data = {
      city: apiresponse.data.name ?? 'No data',
      conditions: apiresponse.data.weather?.[0].description ?? 'No data',
      high_temp: apiresponse.data.main?.temp_max ? Math.ceil(apiresponse.data.main.temp_max - 273) : 'No data',
      low_temp: apiresponse.data.main?.temp_max ? Math.floor(apiresponse.data.main.temp_min - 273) : 'No data',
    }
    return res.status(200).send(data);
  } catch(e) {
    // axios will throw an error if the server responded with a status
    // code that falls out of 2xx range,
    // as well as any other general error
    if (e.response) {
      // upstream responded with a status code
      // out of 2xx range
      console.log(e.response.data);
      console.log(e.response.status);
      console.log(e.response.headers);
      return res.status(e.response.status).send(e.response.data);
    } else if (e.request) {
      // The request was made but no response was received
      console.log(e.request);
      return res.status(504).send('API request timed out. Try again later.');
    } else {
      // Something happened in setting up the request that triggered an error
      console.log(`Error making API request: \n${e}`);
      return res.status(500).send('Internal server error.');
    }

  }
}); // end server.get()

// all other routes return 404
server.use((req, res) => {
  res.status(404).send('Not found');
});

module.exports = server;