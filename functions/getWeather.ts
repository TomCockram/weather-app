import fetch from 'node-fetch';

//TODO: type the location
exports.handler = async (location: any) => {
  let latitude = location.queryStringParameters.latitude;
  let longitude = location.queryStringParameters.longitude;
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}q=${latitude},${longitude}`
    );
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'failed fetching data' }),
    };
  }
};
