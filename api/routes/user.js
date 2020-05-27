const User = require('../../models/user');

module.exports = function (router) {
  router.get('/user', async (req, res) => {
    try {
      const docs = await User.find({}).sort({ createdOn: -1 }).exec();
      res.status(200).json(docs);
    } catch (error) {
      res.status(500)
        .json({
          message: 'Error finding users',
          error
        });
    }
  });

  // POST: Get new meeting note document...
  router.post('/user', (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    // eslint-disable-next-line no-shadow,consistent-return
    user.save((err, note) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(user);
    });
  });
};
