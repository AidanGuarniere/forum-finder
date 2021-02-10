// This file will contain all of the user-facing routes, such as the homepage and login page.

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Favorite, Forum, Post, User, Vote} = require('../models');

/* 
When in the home-page, we'll want to find all available forums.
Need these forums to display their title. the amount of posts, number of votes
And if it's been favorited or not. So let's include those when we Forum.findAll
*/

// At the homepage find all the available forums
router.get('/', (req, res) => {
    console.log(req.session);

    Forum.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'],
            [sequelize.literal('(SELECT COUNT(*) FROM favorite, forum WHERE forum.id = favorite.forum_id)'),'favorite_count'],
        ],
        // Include the post model, can possibly reference how many posts are within forum
        include: [
            {
                model: Post,
                attributes: ['id', 'post_text', 'forum_id', 'user_id', 'created_at'],
                include: {
                    model: User, 
                    attributes: ['username']
                }
            },
            {
                mode: User,
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
        res.render('homepage', { forums });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// If looking for a specific forum, find that. 
// If the user's at a specific forum, then present all the posts within this forum
router.get('/forums/:id', (req, res) => {
    Forum.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'],
            [sequelize.literal('(SELECT COUNT(*) FROM favorite, forum WHERE forum.id = favorite.forum_id)'),'favorite_count'],
        ],
        include: [
            {
                model: Post,
                attributes: ['id', 'post_text', 'forum_id', 'user_id', 'created_at'],
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
            res.status(404).json({ message: 'No forum with this id found' });
            return;
        }

        // Serialize this data
        const forum = dbForumData.get({ plain: true });

        // Pass this data to the template
        res.render('single-forum', { forum });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route that renders login
// Login page doesn't need any variables, so we don't need to pass a second argument to the render() method.
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;