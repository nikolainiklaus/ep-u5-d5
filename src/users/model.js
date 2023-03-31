import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const UsersModel = sequelize.define("user", {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, // <-- This automagically generates a unique string every time we insert a new record
  },
  firstName: {
    type: DataTypes.STRING(50), // VARCHAR(50)
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(50), // VARCHAR(50)
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
});

export default UsersModel;
