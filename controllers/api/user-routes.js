// requirements
const router = require("express").Router();
const { User, Forum, Post, Favorite, Vote } = require("../../models");

// get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one user
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
        {
          model: Forum,
          attributes: [
            "id",
            "title",
            "initial_message",
            "created_at",
          ],
        },
        {
          model: Post,
          attributes: ["id", "post_text", "created_at"],
          include: {
            model: Forum,
            attributes: ["title"],
          },
        },
        {
          model: Forum,
          attributes: ["title"],
          through: Favorite,
          as: "favorite_forums",
        },
        {
          model: Post,
          attributes: ["post_text"],
          through: Vote,
          as: "voted_posts",
        },
      ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a user
router.post("/", (req, res) => {
  // expects {username: '', email: '@.', password: ''}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    // WAS: .then((dbUserData) => res.json(dbUserData))
    // This gives our server easy access to the user's user_id, username, and a Boolean describing whether or not the user is logged in.
    // We want to make sure the session is created before we send the response back, so we're wrapping the variables in a callback
    // The req.session.save() method will initiate the creation of the session and then run the callback function once complete.
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login route
router.post("/login", (req, res) => {
    // expects {email: '@.', password: ''}
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user with that email address!" });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password!" });
        return;
      }
  
      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });

// put new user data
router.put("/:id", (req, res) => {
  // expects {username: '', email: '@.', password: ''}

  // pass in req.body to only update what's passed through
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a user
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
