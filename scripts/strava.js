let strava = require('strava-v3');
let leaderboard = require('./strava-leaderboard');

const ADHOC_CLUB_ID = "262781";

module.exports = function (robot) {
  robot.hear(/strava leaderboard distance/i, function (res) {
    strava.clubs.listActivities({ id: ADHOC_CLUB_ID }, function (err, payload) {
      if (!err) {
        // let leaderboard = new StravaLeaderboard(activities);
        res.send(leaderboard.most_distance(payload));
      }
      else {
        console.log(err);
      }
    });
  });

    robot.hear(/strava leaderboard longest/i, function (res) {
    strava.clubs.listActivities({ id: ADHOC_CLUB_ID }, function (err, payload) {
      if (!err) {
        // let leaderboard = new StravaLeaderboard(activities);

        res.send(leaderboard.longest_ride(payload));
      }
      else {
        console.log(err);
      }
    });
  });


  robot.hear(/strava leaderboard elevation/i, function (res) {
    strava.clubs.listActivities({ id: ADHOC_CLUB_ID }, function (err, payload) {
      if (!err) {
        // let leaderboard = new StravaLeaderboard(activities);

        res.send(leaderboard.most_elev_gain(payload));
      }
      else {
        console.log(err);
      }
    });
  });

}
