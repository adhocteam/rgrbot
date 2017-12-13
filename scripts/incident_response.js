const incident_plan = `
*1. Establish incident response team and assign Incident Commander*

*2. Create a copy of the QPPFE Incident Response Template:* https://docs.google.com/document/d/1d1vjbKokJ7ogFGPItrDj7xtXoOHLo-aSv7kFz6JKhKU/copy

*3. Report the active incident to Product Owner and appropriate team(s) as needed (see Resources below):*
- PagerDuty
- Email 
- HipChat
- Slack

*4. Establish lines of communication (video and/or phone)*

*Resources:* QPP's Incident Response Plan Documentation
`;

module.exports = function (robot) {
    robot.hear(/activate incident response/i, function (res) {
        res.send(incident_plan);
    });
};  
