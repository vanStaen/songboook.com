const { sequelize, DataTypes } = require('../helpers/sequelizedb');
const { User } = require("./User");

const Book = sequelize.define("book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: true,
  },
  cover: {
    type: DataTypes.STRING,
    required: false,
  },
  title: {
    type: DataTypes.STRING,
    required: false,
  },
  description: {
    type: DataTypes.STRING,
    required: false,
  },
  // songs: id, checked, randomized, bookmarked 
  songs: { 
    type: DataTypes.STRING,
    required: false,
  },
});

User.hasMany(Book);
Book.belongsTo(User);

module.exports = {
  Book
};

