// impost models
const User = require("./User");
const Forum = require("./Forum");

// create associations
User.hasMany(Forum, {
  foreignKey: "user_id",
});

Forum.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

module.exports = { User, Forum};
