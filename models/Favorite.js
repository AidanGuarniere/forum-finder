// requirements
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create Favorite model
class Favorite extends Model {}

// define Favorite columns
Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    forum_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "forum",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "favorite",
  }
);

module.exports = Favorite;