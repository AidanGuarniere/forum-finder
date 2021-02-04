// requirements
const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Forum, User, Post, Favorite, Vote } = require("../../models");

// get all forums
router.get("/", (req, res) => {
  console.log("======================");
  Forum.findAll({
    attributes: [
      "id",
      "title",
      "initial_message",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM Favorite WHERE forum.id = Favorite.forum_id)"
        ),
        "favorite_count",
      ],
    ],
    include: [
      {
        model: Post,
        attributes: ["id", "post_text", "forum_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbForumData) => res.json(dbForumData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one forum
router.get("/:id", (req, res) => {
  Forum.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "initial_message",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM Favorite WHERE forum.id = favorite.forum_id)"
        ),
        "favorite_count",
      ],
    ],
    include: [
      {
        model: Post,
        attributes: ["id", "post_text", "forum_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbForumData) => {
      if (!dbForumData) {
        res.status(404).json({ message: "No Forum found with this id" });
        return;
      }
      res.json(dbForumData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new forum
router.post("/", (req, res) => {
  // expects {initial_message: '_', title: '_', user_id: _}
  Forum.create({
    initial_message: req.body.initial_message,
    title: req.body.title,
    user_id: req.body.user_id,
  })
    .then((dbForumData) => res.json(dbForumData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/favorite", (req, res) => {
  // custom static method created in models/Forum.js
  Forum.favorite(
    { ...req.body, user_id: req.body.user_id },
    { Favorite, Post, User }
  )
    .then((updatedFavoriteData) => res.json(updatedFavoriteData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// put new forum data
router.put("/:id", (req, res) => {
  Forum.update(
    {
      title: req.body.title,
      initial_message: req.body.initial_message,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbForumData) => {
      if (!dbForumData) {
        res.status(404).json({ message: "No Forum found with this id" });
        return;
      }
      res.json(dbForumData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a forum
router.delete("/:id", (req, res) => {
  console.log("id", req.params.id);
  Forum.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbForumData) => {
      if (!dbForumData) {
        res.status(404).json({ message: "No Forum found with this id" });
        return;
      }
      res.json(dbForumData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
