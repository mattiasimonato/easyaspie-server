// imports
const fetch = require('node-fetch');

const mapFoursquare = (googleData) => {
  console.log("FORESQUARE START")
  return new Promise((resolve, reject)=>{
    const nameQuery = googleData.result.name
      .split(' ')
      .map(el => `&query=${el}`)
      .join('');
    const googleLat = googleData.result.geometry.location.lat;
    const googleLng = googleData.result.geometry.location.lng;
    const url = `https://api.foursquare.com/v2/venues/search?ll=${googleLat},${googleLng}${nameQuery}&radius=100&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}&v=20171124`;
    try {
      fetch(url, {
        method: 'GET',
      })
        .then(data => data.json())
        .then(data => {
          if (data.meta.code === 200 && data.response.venues.length > 0) {
            resolve(data.response.venues[0].id);
          }
          resolve('NA');
        });
    } catch (err) {
      console.error(err);
      resolve('NA');
    }
  })

};

module.exports = mapFoursquare;
