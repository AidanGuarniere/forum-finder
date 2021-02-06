// impost models
const User = require("./User");
const Forum = require("./Forum");
const Post = require("./Post");
const Favorite = require("./Favorite");
const Vote = require("./Vote");

// User has many Forum
User.hasMany(Forum, {
  foreignKey: "user_id",
});

// Forum is owned by one User
Forum.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

// allow Forum to query User through Favorite as favorite_forums
User.belongsToMany(Forum, {
  through: Favorite,
  as: 'favorite_forums',
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// allow User to query Forum through Favorite as favorite_forums
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

// Post is owned by one User
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// Post is owned by one Forum
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

// allow Post to query User through Vote as voted_posts
User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// allow User to query Post through Vote as voted_posts
Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

// Vote is owned by one User
Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// Vote is owned by one Post
Vote.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

// User has many Vote
User.hasMany(Vote, {
  foreignKey: 'user_id'
});

// Post has many Vote
Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

module.exports = { User, Forum, Post, Favorite, Vote};