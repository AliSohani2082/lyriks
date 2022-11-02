const User = require('./models/User');
const axios = require('axios');

module.exports = () => {
  const axios = require("axios");

  const options = {
    method: 'GET',
    url: 'https://shazam-core.p.rapidapi.com/v1/charts/world',
    headers: {
      'X-RapidAPI-Key': 'f6f1f4d94cmsha8e8c405c983254p148569jsnbefc589959f1',
      'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
};
