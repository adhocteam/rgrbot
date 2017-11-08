var GitHubApi = require("github");

var githubCmsGov = new GitHubApi({
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

var githubCom = new GitHubApi({
    debug: true,
    protocol: "https",
    host: "api.github.com",
    pathPrefix: "",
    headers: {
	"user-agent": "rgrbot",
    },
    Promise: require('bluebird'),
    followRedirects: false,
    timeout: 5000,
});

githubCmsGov.authenticate({
    type: "basic",
    username: process.env.HUBOT_GITHUB_USER,
    password: process.env.HUBOT_GITHUB_TOKEN
});

githubCom.authenticate({
    type: "basic",
    username: process.env.HUBOT_GITHUB_USER2,
    password: process.env.HUBOT_GITHUB_TOKEN2
});

module.exports = function (robot) {
  robot.hear(/github.cms.gov\/(.*)\/(.*)\/pull\/([0-9]+)/i, function (res) {
    // console.log(res.match);
    let owner = res.match[1];
    let repo = res.match[2];
    let number = res.match[3];

    githubCmsGov.pullRequests.get({
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
    githubCmsGov.pullRequests.getAll({
      owner,
      repo: "qpp-ui",
      direction: "asc",
      state: "open",
      sort: "created",
    }, printPrs(res));

    githubCmsGov.pullRequests.getAll({
      owner,
      repo: "qpp-auth-service",
      direction: "asc",
      state: "open",
      sort: "created",
    }, printPrs(res));

    githubCmsGov.pullRequests.getAll({owner, repo: "pac-etl", direction: "asc", state: "open", sort: "created" }, printPrs(res));
    githubCmsGov.pullRequests.getAll({owner, repo: "qpp-netstorage", direction: "asc", state: "open", sort: "created" }, printPrs(res));
    githubCmsGov.pullRequests.getAll({owner, repo: "qpp-eligibility-service", direction: "asc", state: "open", sort: "created" }, printPrs(res));
    
    githubCmsGov.pullRequests.getAll({
      owner,
      repo: "qpp-deploy",
      direction: "asc",
      state: "open",
      sort: "created",
    }, printPrs(res));

    githubCom.pullRequests.getAll({
      owner: "CMSgov",
      repo: "qpp-style",
      direction: "asc",
      state: "open",
      sort: "created",
    }, printPrs(res));
  });

  robot.hear(/list open prs for (.*)\/(.*)/i, function (res) {
    let owner = res.match[1];
    let repo = res.match[2];
    
    if(owner === 'qpp') {
      githubCmsGov.pullRequests.getAll({
        owner,
        repo,
        direction: "asc",
        state: "open",
        sort: "created",
      }, printPrs(res));
    }
    
    if(owner === 'CMSgov') {
       githubCom.pullRequests.getAll({
        owner,
        repo,
        direction: "asc",
        state: "open",
        sort: "created",
      }, printPrs(res));
    }
    
  });
}

let printPrs = res => {
  return (err, response) => {
    if (!err) {
        let output = '';
        for (let i = 0; i < response.data.length; i++) {
          let data = response.data[i];
	  if (i === 0) {
	      output += `:github: *${data.head.repo.name}*\n`;
	  }
          output += `${data.title}, by ${data.user.login}.
  ↳ ${data.html_url}
  `;
        }
        res.send(output);
      } else {
        console.log(err);
      }
  }
}
