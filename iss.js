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

  return request(`https://api.ipify.org?format=json`, function(error, response, body) {
    if (error) {
      callback(error,null);
    }

    const data = JSON.parse(body);
    callback(null, Object.values(data).toString());
  });
};

module.exports = { fetchMyIP };