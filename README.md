# Weather API sample

A very basic backend that makes use of of the API from openweathermap.org. Just practicing API development and testing.

Makes use of the API from https://openweathermap.org

## Installation

* Developed on node v17.4.0
* You will need to sign up and get an API key from openweathermap.org

1. `git clone https://github.com/FaceToKeyboard/weatherapi.git`
2. `npm install`
3. Create a `.env` text file in the root folder. Add your desired values for `SERVER_PORT` and `API_KEY`, e.g.

```
SERVER_PORT=3000
API_KEY='52a314cee9c65xxxxxxxxxxxxxxxxxxx'
```

3. `npm start`

## Example Usage

The server looks for a 5 digit zip code at `/local/[zipcode]`.

so you can open a web browser and try

`http://localhost:3000/local/80209`

to get a JSON response like:

```
{
  "city":"Denver",
  "conditions":"clear sky",
  "high_temp":11,
  "low_temp":-1
}
```

## Notes

Run tests using `npm test`