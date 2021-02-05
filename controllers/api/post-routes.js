// requirements
const router = require('express').Router();
const sequelize = require("../../config/connection");
const { User, Forum, Post, Favorite, Vote } = require("../../models");

router.get('/', (req, res) => {
  Post.findAll({
      attributes: [
          "id",
          "post_text",
          "created_at",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
            ),
            "vote_count",
          ],
      ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects => {post_text: "This is the Post", user_id: 1, forum_id: 2}
  Post.create({
    post_text: req.body.post_text,
    user_id: req.body.user_id,
    forum_id: req.body.forum_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/vote', (req, res) => {
    // custom static method created in models/Post.js
    Post.vote({ ...req.body, user_id: req.body.user_id }, { Vote, Post, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No Post found with this id!' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
