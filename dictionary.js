require('dotenv').config()
const axios = require("axios");
const instance = axios.create({
    baseURL: 'https://od-api.oxforddictionaries.com',
    headers: {
        'baseURL' : 'https://od-api.oxforddictionaries.com',
        'Accept': 'application/json',
        'app_id': process.env.OXFORD_DICT_API_ID,
        'app_key': process.env.OXFORD_DICT_API_KEY
    }
});
  
  module.exports = instance;