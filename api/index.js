const express = require('express');

const router = express.Router();

require('./routes/standup')(router);
require('./routes/project')(router);
require('./routes/team')(router);
require('./routes/user')(router);

module.exports = router;
