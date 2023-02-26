/**
 * Make a single API request to retrieve the users's IP address.
 * Input:
 *  - A callback (to pass back an error or the IP string)
 * Return (via callback):
 *  - An error, if any (nullable)
 *  - The IP address as a string (null if error). Example " 162245144.188"
 */

const request = require('request');


const fetchMyIP = function(callback) {
  //user request to fetch IP address from JSON API
  //https://api.ipify.org?format=json

  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) return callback(error,null);

    //if non-200 status, assume server error
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response ${body}`), null);
      return;
    }

    //if no errors and status code is 200:
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };