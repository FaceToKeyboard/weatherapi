import axios from 'axios';
import express from 'express';

const weatherApi = {
  hostname: ''
}
const server = express();
server.use(express.json());

server.get('/local/:zipcode', async (req, res) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${req.params.zipcode}&appid=${process.env.API_KEY}`;
    const apiresponse = await axios.get(url);

    if (apiresponse.data) {
      const data = {
        city: apiresponse.data.name,
        conditions: apiresponse.data.weather[0].description,
        high_temp: Math.ceil(apiresponse.data.main.temp_max - 273),
        low_temp: Math.floor(apiresponse.data.main.temp_min - 273),
      }
      res.send(data);
    } else {
      res.status(502).send('Bad Gateway');
      console.log('API did not respond with data')
    }

  } catch(e) {
    console.log(`Error making API request: \n${e}`);
    res.status(502).send('Bad Gateway');
  }

});

export { server };