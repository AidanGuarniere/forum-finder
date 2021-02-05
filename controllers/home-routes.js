// const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { Favorite, Forum, Post, User, Vote} = require('../models')

// // We'll want to display our forums to the homepage
// // I believe the code should go in this order:
// // Forums -> Include Display Posts within the Forum -> Include User who created Post

// /*
// EDIT: 
// Since this is the home route we should likely display just the forums available
// Anything pertaining to the post or the user should be left for the FORUM-ROUTES instead.
// However what we can include is amount of posts in forum
// */

// // When in the homepage find all the available forums
// router.get('/', (req, res) => {
//     Forum.findAll({
//         attributes: [ 'id', 'title', 'initial_message', 'user_id' ],
//         // Include the post model, can possibly reference how many posts are within forum
//         include: [
//             {
//                 model: Post,
//                 attributes: [ 'id', 'post_text', 'user_id', 'post_id' ],
//             },
//         ]
//     })
//     .then(dbForumsData => {
//         const forums = dbForumsData.map(forum => forum.get({ plain: true }));

//         res.render('homepage', {
//             forums,
//             loggedIn: req.session.loggedIn
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// /* 
// If looking for a specific forum, find that.
// If the user's at a specific forum, 
// then present all the posts within this forum
// */
// router.get('/forums/:id', (req, res) => {
//     Forum.findOne({
//         where: {
//             id: req.params.id
//         },
//         attributes: [ 'id', 'title', 'initial_message', 'user_id' ],
//         include: [
//             {
//                 model: Post,
//                 attributes: [ 'id', 'post_text', 'user_id', 'post_id' ],
//             }
//         ]
//     })
//     .then(dbForumsData => {
        
//         // If the Forum doesn't exist, send error to user
//         if (!dbForumsData) {
//             res.status(404).json({ message: 'This forum does not exist' });
//             return;
//         }

//         // We'll need to serialize this data
//         // THEN pass that data to the template (WHEN READY)
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// })
// module.exports = router;