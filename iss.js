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

const fetchCoordsByIP = function(ip, callback) {

  request(`https://ipwho.is/${ip}?output=json`, (error, response, body) => {
    if (error) return callback(error,null);


    if (JSON.parse(body).success === false) {
      const message = `Success status was ${JSON.parse(body).success}. Server messages says: ${JSON.parse(body).message} when fetching for IP ${JSON.parse(body).ip}`;
      callback(Error(message), null);
      return;
    }

    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;
    callback(null, {latitude, longitude});
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {

  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) return callback(error,null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`),null);
      return;
    }

    const parsed = JSON.parse(body).response;
    callback(null,parsed);

  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error,null);
      }
      fetchISSFlyOverTimes(coords, (error, nextPass) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPass);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};