const MILLISECONDS_PER_WEEK = 604800000;
const MILLISECONDS_PER_MONTH = 30 * 24 * 60 * 60 * 1000;
const MILES_PER_METER = 0.000621371;
const FEET_PER_METER = 3.28084;

let Humanize = require('humanize-plus');

const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const isInCurrentMonth = (date) => {
  let currentMonth = new Date().getMonth();
  let activityMonth = new Date(Date.parse(date)).getMonth();
  return (currentMonth === activityMonth) ? true : false;
}

module.exports = {
    monthly_run_distance (activities) {
    let memberTotalDistances = activities.reduce((users, activity) => {
      if (users[activity.athlete.id] === undefined)
        users[activity.athlete.id] = {
          firstname: activity.athlete.firstname,
          lastname: activity.athlete.lastname,
          distance: 0,
        };

      if (isInCurrentMonth(activity.start_date) && activity.type === "Run")
        users[activity.athlete.id].distance += activity.distance;

      return users;
    }, {});

    var sortable = [];
    for (var member in memberTotalDistances)
      sortable.push(memberTotalDistances[member]);

    // sort by distance from high to low
    sortable.sort((a, b) => {
      if (a.distance < b.distance)
        return 1;
      if (a.distance > b.distance)
        return -1;
      return 0;
    });

    let output = `:runner: *Distance leaders over the month of ${Months[new Date().getMonth()]}*\n`;
    let place_num = 0;
    for (let i = 0; i < sortable.length && i < 10; i++) {
      let distance = sortable[i].distance * MILES_PER_METER;
      if (distance > 0) {
        place_num++;
        output += ':place_' + place_num + ': ' + sortable[i].firstname + ' ' + sortable[i].lastname + ' (' + Number(distance).toFixed(2) + ' mi)\n';
      }
    }
    return output;
  },

  monthly_distance (activities) {
    let memberTotalDistances = activities.reduce((users, activity) => {
      if (users[activity.athlete.id] === undefined)
        users[activity.athlete.id] = {
          firstname: activity.athlete.firstname,
          lastname: activity.athlete.lastname,
          distance: 0,
        };

      if (isInCurrentMonth(activity.start_date) && activity.type === "Ride")
        users[activity.athlete.id].distance += activity.distance;

      return users;
    }, {});

    var sortable = [];
    for (var member in memberTotalDistances)
      sortable.push(memberTotalDistances[member]);

    // sort by distance from high to low
    sortable.sort((a, b) => {
      if (a.distance < b.distance)
        return 1;
      if (a.distance > b.distance)
        return -1;
      return 0;
    });

    let output = `:bicyclist: *Distance leaders over the month of ${Months[new Date().getMonth()]}*\n`;
    let place_num = 0;
    for (let i = 0; i < sortable.length && i < 10; i++) {
      let distance = sortable[i].distance * MILES_PER_METER;
      if (distance > 0) {
        place_num++;
        output += ':place_' + place_num + ': ' + sortable[i].firstname + ' ' + sortable[i].lastname + ' (' + Number(distance).toFixed(2) + ' mi)\n';
      }
    }
    return output;
  },

  most_distance: activities => {
    let memberTotalDistances = activities.reduce((users, activity) => {
      if (users[activity.athlete.id] === undefined)
        users[activity.athlete.id] = {
          firstname: activity.athlete.firstname,
          lastname: activity.athlete.lastname,
          distance: 0,
        };

      if (Date.now() - MILLISECONDS_PER_MONTH < Date.parse(activity.start_date) && activity.type === "Ride")
        users[activity.athlete.id].distance += activity.distance;

      return users;
    }, {});

    var sortable = [];
    for (var member in memberTotalDistances)
      sortable.push(memberTotalDistances[member]);

    // sort by distance from high to low
    sortable.sort((a, b) => {
      if (a.distance < b.distance)
        return 1;
      if (a.distance > b.distance)
        return -1;
      return 0;
    });

    let output = ":bicyclist: *Distance leaders over the past thirty days*\n";
    let place_num = 0;
    for (let i = 0; i < sortable.length && i < 10; i++) {
      let distance = sortable[i].distance * MILES_PER_METER;
      if (distance > 0) {
        place_num++;
        output += ':place_' + place_num + ': ' + sortable[i].firstname + ' ' + sortable[i].lastname + ' (' + Number(distance).toFixed(2) + ' mi)\n';
      }
    }
    return output;
  },

  longest_ride: activities => {
    let memberDistances = activities.reduce((users, activity) => {
      if (users[activity.athlete.id] === undefined)
        users[activity.athlete.id] = {
          firstname: activity.athlete.firstname,
          lastname: activity.athlete.lastname,
          longest_distance: 0,
        };

      if (Date.now() - MILLISECONDS_PER_MONTH < Date.parse(activity.start_date) && activity.type === "Ride") {
        let d = users[activity.athlete.id].longest_ride;
        users[activity.athlete.id].longest_ride = d > activity.distance ? d : activity.distance;
      }

      return users;

    }, {});

    var sortable = [];
    for (var member in memberDistances)
      sortable.push(memberDistances[member]);

    // sort by distance from high to low
    sortable.sort((a, b) => {
      if (a.longest_ride < b.longest_ride)
        return 1;
      if (a.longest_ride > b.longest_ride)
        return -1;
      return 0;
    });

    let output = ":bicyclist: *Longest ride leaders over the past thirty days*\n";
    let place_num = 0;
    for (let i = 0; i < sortable.length && i < 10; i++) {
      let distance = sortable[i].longest_ride * MILES_PER_METER;
      if (distance > 0) {
        place_num++;
        output += ':place_' + place_num + ': ' + sortable[i].firstname + ' ' + sortable[i].lastname + ' (' + Number(distance).toFixed(2) + ' mi)\n';
      }
    }
    return output;
  },

  most_elev_gain: activities => {
    let memberTotalElevGains = activities.reduce((users, activity) => {
      if (users[activity.athlete.id] === undefined)
        users[activity.athlete.id] = {
          firstname: activity.athlete.firstname,
          lastname: activity.athlete.lastname,
          elevation_gain: 0,
        };

      if (Date.now() - MILLISECONDS_PER_MONTH < Date.parse(activity.start_date) && activity.type === "Ride")
        users[activity.athlete.id].elevation_gain += activity.total_elevation_gain;

      return users;

    }, {});

    var sortable = [];
    for (var member in memberTotalElevGains)
      sortable.push(memberTotalElevGains[member]);

    sortable.sort((a, b) => {
      if (a.elevation_gain < b.elevation_gain)
        return 1;
      if (a.elevation_gain > b.elevation_gain)
        return -1;
      return 0;
    });

    let output = ":bicyclist: *Total elevation gain leaders over the past thirty days*\n";
    let place_num = 0;
    for (let i = 0; i < sortable.length && i < 10; i++) {
      let distance = sortable[i].elevation_gain * FEET_PER_METER;
      if (distance > 0) {
        place_num++;
        output += ':place_' + place_num + ': ' + sortable[i].firstname + ' ' + sortable[i].lastname + ' (' + Humanize.formatNumber(distance, 2) + ' ft)\n';
      }
    }
    return output;
  }
}
