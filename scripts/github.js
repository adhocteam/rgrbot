var GitHubApi = require("github");

var github = new GitHubApi({
    debug: true,
    protocol: "https",
    host: "github.cms.gov",
    pathPrefix: "/api/v3",
    headers: {
	"user-agent": "rgrbot",
    },
    Promise: require('bluebird'),
    followRedirects: false,
    timeout: 5000,
});

github.authenticate({
    type: "basic",
    username: process.env.HUBOT_GITHUB_USER,
    password: process.env.HUBOT_GITHUB_TOKEN
});

module.exports = function (robot) {
  robot.hear(/github.cms.gov\/(.*)\/(.*)\/pull\/([0-9]+)/i, function (res) {
    // console.log(res.match);
    let owner = res.match[1];
    let repo = res.match[2];
    let number = res.match[3];

    github.pullRequests.get({
      owner: owner,
      repo: repo,
      number: number
    }, (err, response) => {
      data = response.data;
      let output = '>>>:github: GitHub\n';
      output += '*' + data.title + '* by ' + data.user.login + ' · Pull Request #' + data.number + ' · ' + data.base.repo.full_name + '\n'
      output += data.base.repo.name + ' - ' + data.base.repo.description + '\n';
      res.send(output);
    });
  });

  robot.hear(/list open qpp prs/i, function (res) {
    let owner = "qpp";
    github.pullRequests.getAll({
      owner,
      repo: "qpp-ui",
      direction: "asc",
      state: "open",
      sort: "created",
    }, printPrs(res));

    github.pullRequests.getAll({
      owner,
      repo: "qpp-auth-service",
      direction: "asc",
      state: "open",
      sort: "created",
    }, printPrs(res));

    github.pullRequests.getAll({
      owner,
      repo: "qpp-deploy",
      direction: "asc",
      state: "open",
      sort: "created",
    }, printPrs(res));
  });

  robot.hear(/list open prs for (.*)\/(.*)/i, function (res) {
    let owner = res.match[1];
    let repo = res.match[2];

    github.pullRequests.getAll({
      owner,
      repo,
      direction: "asc",
      state: "open",
      sort: "created",
    }, printPrs(res));
  });
}

let printPrs = res => {
  return (err, response) => {
    if (!err) {
        let output = ':github:\n';
        for (let i = 0; i < response.data.length; i++) {
          let data = response.data[i];
          output += `${data.title}, by ${data.user.login}.
  ↳ ${data.url}
  `;
        }
        res.send(output);
      } else {
        console.log(err);
      }
  }
}
