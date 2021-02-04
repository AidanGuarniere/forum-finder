// requirements
const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const forumRoutes = require('./forum-routes.js');
const postRoutes = require('./post-routes.js');

router.use('/users', userRoutes);
router.use('/forums', forumRoutes);
router.use('/posts', postRoutes);


module.exports = router;