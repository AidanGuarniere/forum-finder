// requirements
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create Forum model
class Forum extends Model {
  // static method for Favorite
  static favorite(body, models) {
    return models.Favorite.create({
      user_id: body.user_id,
      forum_id: body.forum_id,
    }).then(() => {
      return Forum.findOne({
        where: {
          id: body.forum_id,
        },
        attributes: [
          "id",
          "title",
          "initial_message",
          "created_at",
          // favorite count
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM favorite WHERE forum.id = favorite.forum_id)"
            ),
            "favorite_count",
          ],
        ],
        include: [
          {
            model: models.Post,
            attributes: [
              "id",
              "post_text",
              "forum_id",
              "user_id",
              "created_at",
            ],
            include: {
              model: models.User,
              attributes: ["username"],
            },
          },
        ],
      });
    });
  }
}

// define Forum columns
Forum.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    initial_message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "forum",
  }
);

module.exports = Forum;
