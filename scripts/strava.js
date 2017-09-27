let strava = require('strava-v3');
let leaderboard = require('./strava-leaderboard');

const ADHOC_CLUB_ID = "262781";
const perPage = 200;

const getClubActivitiesByPage = (clubId, page, totalActivities) => {
  return new Promise((resolve, reject) => {
    strava.clubs.listActivities({ id: clubId, per_page: perPage, page }, (err, activities) => {
      if (err) {
        reject(err);
      }
      else {
        if (activities.length > 0) {
          let newTotal = totalActivities.concat(activities);
          resolve(getClubActivitiesByPage(clubId, page + 1, newTotal));
        }
        else {
          resolve(totalActivities);
        }
      }
    });
  });
}

const getClubActivities = (clubId) => {
  return getClubActivitiesByPage(clubId, 1, []);
}

module.exports = function (robot) {
  robot.hear(/strava leaderboard distance/i, function (res) {
    getClubActivities(ADHOC_CLUB_ID)
      .then((activities) => {
        res.send(leaderboard.most_distance(activities));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  robot.hear(/strava leaderboard longest/i, function (res) {
    getClubActivities(ADHOC_CLUB_ID)
      .then((activities) => {
        res.send(leaderboard.longest_ride(activities));
      })
      .catch((err) => {
        console.log(err);
      });
  });


  robot.hear(/strava leaderboard elevation/i, function (res) {
    getClubActivities(ADHOC_CLUB_ID)
      .then((activities) => {
        res.send(leaderboard.most_elev_gain(activities));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  robot.hear(/strava monthly distance/i, function (res) {
    getClubActivities(ADHOC_CLUB_ID)
      .then((activities) => {
        res.send(leaderboard.monthly_distance(activities));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  robot.hear(/strava monthly bike elevation over distance/i, function (res) {
    getClubActivities(ADHOC_CLUB_ID)
      .then((activities) => {
        res.send(leaderboard.monthly_bike_elev_over_distance(activities));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  robot.hear(/strava monthly run distance/i, function (res) {
    getClubActivities(ADHOC_CLUB_ID)
      .then((activities) => {
        res.send(leaderboard.monthly_run_distance(activities));
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
