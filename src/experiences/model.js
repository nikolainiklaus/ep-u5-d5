import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import UsersModel from "../users/model.js";

const ExperiencesModel = sequelize.define("experience", {
  experienceId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
});

UsersModel.hasMany(ExperiencesModel, {
  foreignKey: { name: "userId", allowNull: false },
});
ExperiencesModel.belongsTo(UsersModel, {
  foreignKey: { name: "userId", allowNull: false },
});

export default ExperiencesModel;
