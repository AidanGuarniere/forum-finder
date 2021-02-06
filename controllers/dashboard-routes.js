const router = require('express').Router();
const sequelize = require('../config/connection');
const { Favorite, Forum, Post, User, Vote} = require('../models');

// The dashboard should only display posts created by the logged in user
router.get('/', (req, res) => {
    Forum.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'initial_message',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'],
            [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE forum.id = favorite.forum_id)'),'favorite_count'],
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
        // serialize data before passing to template
        const forums = dbForumData.map(forum => forum.get({ plain: true }));
        res.render('dashboard', { forums });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update the API endpoints to use the id from the session
router.get('/edit/:id', (req, res) => {
    Forum.findByPk(req.params.id, {
        attributes: [
            'id',
            'title',
            'initial_message',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'],
            [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE forum.id = favorite.forum_id)'),'favorite_count'],
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
        if (dbForumData) {
            const forum = dbForumData.get({ plain: true });

            res.render('edit-forum', { forum })
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;