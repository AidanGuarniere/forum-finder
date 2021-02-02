// impost models
const User = require("./User");
const Forum = require("./Forum");
const Post = require("./Post");
const Favorite = require("./Favorite");


// User has many Forum
User.hasMany(Forum, {
  foreignKey: "user_id",
});

// Forum is owned by one User
Forum.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

// allow Forum to query User through Favorite as favorited_forums
User.belongsToMany(Forum, {
  through: Favorite,
  as: 'favorite_forums',
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// allow User to query Forum through Favorite as favorited_forums
Forum.belongsToMany(User, {
  through: Favorite,
  as: 'favorite_forums',
  foreignKey: 'forum_id',
  onDelete: 'SET NULL'
});

// Favorite is owned by one User
Favorite.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// Favorite is owned by one Forum
Favorite.belongsTo(Forum, {
  foreignKey: 'forum_id',
  onDelete: 'SET NULL'
});

// User has many Favorite
User.hasMany(Favorite, {
  foreignKey: 'user_id'
});

// Forum has many Favorite
Forum.hasMany(Favorite, {
  foreignKey: 'forum_id'
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
module.exports = { User, Forum, Post, Favorite};
