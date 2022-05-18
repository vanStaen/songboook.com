const { sequelize, DataTypes } = require('../helpers/sequelizedb');

const User = sequelize.define("user", {
  name: {
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
  active: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: true,
  },
});

module.exports = {
  User
};

