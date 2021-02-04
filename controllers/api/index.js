// requirements
const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const forumRoutes = require('./forum-routes.js');

router.use('/forums', forumRoutes);
router.use('/users', userRoutes);

module.exports = router;