// impost models
const User = require("./User");
const Forum = require("./Forum");
const Post = require("./Post");


// User has many Forum
User.hasMany(Forum, {
  foreignKey: "user_id",
});

// Forum is owned by one User
Forum.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

// Post belongs to one User
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// Post belongs to one Forum
Post.belongsTo(Forum, {
  foreignKey: 'forum_id',
  onDelete: 'SET NULL'
});

// User has many Post
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// Forum has many Post
Forum.hasMany(Post, {
  foreignKey: 'forum_id'
});
module.exports = { User, Forum, Post};
