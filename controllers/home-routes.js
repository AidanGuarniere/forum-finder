// This file will contain all of the user-facing routes, such as the homepage and login page.
// const homeRoutes = require('./home-routes.js');
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Favorite, Forum, User, Post, Vote } = require('../models');

/* 
When in the home-page, we'll want to find all available forums.
Need these forums to display their title. the amount of posts, number of votes
And if it's been favorited or not. So let's include those when we Forum.findAll
*/
// get all forums for homepage
router.get('/', (req, res) => {
  console.log('======================');
  console.log(req.session);

  // res.render("homepage",{message: 'hi, there!'});
  // res.send("this is a test");



  Forum.findAll({
    attributes: [
      'id',
      'title',
      // 'intial_message',
      'created_at',
      [
        sequelize.literal(
        '(SELECT COUNT(*) FROM favorite, forum WHERE forum.id = favorite.forum_id)'
        ), 
        'favorite_count'
      ]
    ],
    // include the post model, can possibly reference how many posts are within forum
    include: [
      {
        model: Post,
        attributes: [
          'id',
         'post_text', 
         'forum_id',
          'user_id',
           'created_at',
           [
            sequelize.literal(
              "(SELECT COUNT(*) FROM vote, post WHERE post.id = vote.post_id)"
            ),
            "vote_count",
          ]
        ],
           include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbForumData => {
       // Need the entire array of posts to be in the template.
      // That also means we'll need to serialize the entire array.
      // This will loop over and map each Sequelize object into a serialized version of itself, saving the results in a new forums array.
      const forums = dbForumData.map(forum => forum.get({ plain: true }));

       // Pass this data to the template
      res.render('homepage', { 
        forums,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// If looking for a specific forum, find that.
// If the user's at a specific forum, then present all the posts within this forum
// Route that renders login
// Login page doesn't need any variables, so we don't need to pass a second argument to the render() method.
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/forum/:id', (req, res) => {
  Forum.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'initial_message',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM forum WHERE forum.id = forum.forum_id)'
          ), 
          'favorite_count']
    ],
    include: [
      {
        model: Post,
        attributes: [
          'id',
           'post_text', 
           'forum_id', 
           'user_id', 
           'created_at',
           [
            sequelize.literal(
              "(SELECT COUNT(*) FROM vote, post WHERE post.id = vote.post_id)"
            ),
            "vote_count",
          ],
          ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbForumData => {
      // If the Forum doesn't exist, send error to user
      if (!dbForumData) {
        res.status(404).json({ message: 'No forum found with this id' });
        return;
      }

      // Serialize the data
      const forum = dbForumData.get({ plain: true });

      // Pass data to template (We made changes in 14.3.6, be sure to reference later)
      res.render('single-forum', { 
        forum,
        loggedIn: req.session.loggedIn
       });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
