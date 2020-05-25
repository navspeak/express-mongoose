const Standup = require('../../models/standup');

module.exports = function (router) {
// GET: the 12 newest stand-up meeting notes
  router.get('/standup', async (req, res) => {
    try {
      const docs = await Standup.find().sort({ createdOn: -1 }).exec();
      res.status(200).json(docs);
    } catch (error) {
      res.status(500)
        .json({
          message: 'Error finding standup meeting notes',
          error
        });
    }
  });

  // POST: Get new meeting note document...
  router.post('/standup', (req, res) => {
    console.log(req.body);
    const note = new Standup(req.body);
    // eslint-disable-next-line no-shadow,consistent-return
    note.save((err, note) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(note);
    });
  });
};
