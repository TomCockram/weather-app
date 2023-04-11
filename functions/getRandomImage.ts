import fetch from 'node-fetch';

//TODO: type the location
exports.handler = async (event: any) => {
  let location = event.queryStringParameters.location;
  console.log(location);

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&orientation=landscape&query=${location}`
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
