const Project = require('../../models/project');

module.exports = function (router) {
  // GET: List of active projects
  const qry = {
    isActive: { $eq: true }
  };

  router.get('/projects', (req, res) => {
    Project.find(qry)
      .sort({ name: 1 })
      .exec()
      .then((docs) => res.status(200)
        .json(docs))
      .catch((err) => res.status(500)
        .json({
          message: 'Error finding active projects',
          error: err
        }));
  });

  // POST: Create new project...
  router.post('/projects', (req, res) => {
    const project = new Project(req.body);
    // eslint-disable-next-line no-shadow,consistent-return
    project.save((err, project) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(project);
    });
  });
};
