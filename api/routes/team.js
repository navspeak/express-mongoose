const TeamMember = require('../../models/teamMember');

module.exports = function (router) {
  // GET: the 12 newest stand-up meeting notes
  router.get('/team', (req, res) => {
    TeamMember.find().sort({ name: 1 }).exec()
      .then((members) => res.status(200)
        .json(members))
      .catch((error) => {
        res.status(500).json({
          message: "Can't find team members",
          error
        });
      });
  });

  // POST:  new meeting notes
  router.post('/team', (req, res) => {
    const member = new TeamMember(req.body);
    member.save((err, note) => {
      if (err) {
        res.send(400).json(err);
      }
      res.status(200).json(member);
    });
  });
};
