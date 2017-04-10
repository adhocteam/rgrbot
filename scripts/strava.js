var strava = require('strava-v3');

const ADHOC_CLUB_ID = "262781";
const MILLISECONDS_PER_WEEK = 604800000;
const MILES_PER_METER = 0.000621371;

let processPayload = (res, payload) => {

  let memberDistances = payload.reduce((users, activity) => {
    if (users[activity.athlete.id] === undefined)
      users[activity.athlete.id] = {
        firstname: activity.athlete.firstname,
        lastname: activity.athlete.lastname,
        distance: 0,
      };

    if (Date.now() - MILLISECONDS_PER_WEEK < Date.parse(activity.start_date) && activity.type === "Ride")
      users[activity.athlete.id].distance += activity.distance;

    return users;
  }, {});

  var sortable = [];
  for (var member in memberDistances)
    sortable.push(memberDistances[member]);

  // sort by distance from high to low
  sortable.sort((a, b) => {
    if (a.distance < b.distance)
      return 1;
    if (a.distance > b.distance)
      return -1;
    return 0;
  });

  let output = "*Distance leaders over the past seven days*\n"
  for (let i = 0; i < sortable.length && i < 10; i++) {
    let distance = sortable[i].distance * MILES_PER_METER;
    if (distance > 0)
      output += ':place_' + i + 1 + ': ' + sortable[i].firstname + ' ' + sortable[i].lastname + ' (' + Number(distance).toFixed(2) + ' mi)';
  }

  res.send(output);
};

module.exports = function (robot) {
  robot.hear(/strava leaderboard distance/i, function (res) {
    strava.clubs.listActivities({ id: ADHOC_CLUB_ID }, function (err, payload) {
      if (!err) {
        processPayload(res, payload);
      }
      else {
        console.log(err);
      }
    });
  });
}
