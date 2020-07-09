const cookieParser = require('cookie-parser');
const Session = require('../../models/session');

module.exports = function (router) {
  router.use(cookieParser());
  router.use(async (req, res) => {
    console.log(req.cookies);
  });
};
