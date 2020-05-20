const axios = require('axios').default;
const fs = require('fs');

const host = 'https://postman-web-property-assets.s3.amazonaws.com';

axios.get(`${host}/bff/manifest.json`)
  .then((response) => {
    fs.writeFile('bff.json', JSON.stringify({ ...response.data, host }), (err) => {
      if (err) {
        throw err;
      }
    });
  });
