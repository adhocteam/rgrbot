const incident_plan = `
*1. Establish incident response team and assign Incident Commander*

*2. Create a copy of the QPPFE Incident Response Template:* https://docs.google.com/document/d/1d1vjbKokJ7ogFGPItrDj7xtXoOHLo-aSv7kFz6JKhKU/copy

*3. Report the active incident to Product Owner and appropriate team(s) as needed:*
- PagerDuty
- Email
-- Subject line = "[Active Incident] {description}"
-- To = 
`Koh, David (CMS/) <David.Koh@cms.hhs.gov>; Haselton, Scott (CMS/OA) <Scott.Haselton@cms.hhs.gov>; lucas.brown@cms.hhs.gov <lucas.brown@cms.hhs.gov>; Verch, Shaun (CMS/CTR) <Shaun.Verch@cms.hhs.gov>; Walter, Stephen J. (CMS/OEDA) <stephen.walter@cms.hhs.gov>; Natalie Medler <natalie.medler@us.pwc.com>; Woods, Shamika <shwoods@qssinc.com>; Kahler, Constance <ckahler@qssinc.com>; Slay, Amanda <Amanda.Slay@ventech.hcqis.org>; Sanchez, Yadira (CMS/OEDA) <Yadira.Sanchez@cms.hhs.gov>; Abrams, Adrien (CMS/OEDA) <Adrien.Abrams@cms.hhs.gov>; Heller, Adam  (CMS/CCSQ) <Adam.Heller@cms.hhs.gov>; Ostrow, Stan (CMS/CCSQ) <Stan.Ostrow@cms.hhs.gov>`
- HipChat
- Slack

*4. Establish lines of communication (video and/or phone)*
`;

module.exports = function (robot) {
    robot.hear(/activate incident response/i, function (res) {
        res.send(values);
    });
};  
