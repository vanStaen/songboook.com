const { sequelize, DataTypes } = require('../helpers/sequelizedb');

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  }, 
  avatar: {
    type: DataTypes.STRING,
    required: false,
  },
  emailSettings: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "{}",
  },
  profilSettings: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "{}",
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "en",
  },
  active: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: true,
  },
  verifiedEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = {
  User
};

