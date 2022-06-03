import fetch from 'node-fetch';

//TODO: type the event
exports.handler = async (event: any) => {
  let location = event.queryStringParameters.location;

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
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
