// const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP: ", ip);
// });

// fetchCoordsByIP('209.121.228.154', (error, data) => {
//     if (error) {
//         console.log("Failed to capture coordinates: ", error);
//         return;
//     }

//     console.log("Coordinates successfully captured: ", data);
// });

// const { fetchISSFlyOverTimes } = require('./iss');

// const starterCoords = { latitude: 49.2827291, longitude: -123.1207375 }

// fetchISSFlyOverTimes(starterCoords, (error, passTime) => {
//     if (error) {
//         console.log("It didn't work ", error);
//         return;
//     }

//     console.log('It worked! Returned flyover times; ', passTime);
// });

const { nextISSTimesForMyLocation }  = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duratinon = pass.duration;
    console.log(`Next pass at ${datetime} for ${duratinon} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
