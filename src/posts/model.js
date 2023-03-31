import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import UsersModel from "../users/model.js";

const PostsModel = sequelize.define("post", {
  postId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  text: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
});

UsersModel.hasMany(PostsModel, {
  foreignKey: { name: "userId", allowNull: false },
});

PostsModel.belongsTo(UsersModel, {
  foreignKey: { name: "userId" },
  allowNull: false,
});

export default PostsModel;
