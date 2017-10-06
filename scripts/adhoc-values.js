const values = `
:adhoc: *Our core values*:
:construction_worker: Work on things that matter.
:trophy: Build great teams.
:heart: Empathize with & advocate for users.
:success-kid: Enable the customer to succeed.
:arrow_forward: Embrace simplicity.
:raised_hands: Cultivate humility & accountability.
`;

module.exports = function (robot) {
    robot.hear(/adhoc core values/i, function (res) {
        res.send(values);
    });
};  