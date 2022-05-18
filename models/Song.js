const { sequelize, DataTypes } = require('../helpers/sequelizedb');

const Song = sequelize.define("song", {
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
  added: {
    type: DataTypes.DATE,
    required: true,
  },
  link: {
    type: DataTypes.STRING,
    required: false,
  },
  tags: {    
    type: DataTypes.ARRAY(DataTypes.STRING),
    required: true,
    default: null,
  },
  title: {
    type: DataTypes.STRING,
    required: true,
  },
  picurl: {
    type: DataTypes.STRING,
    required: false,
  },
  videourl: {
    type: DataTypes.STRING,
    required: false,
  },
  geniusurl: {
    type: DataTypes.STRING,
    required: false,
  },
  bookmark: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
  song: {
    type: DataTypes.STRING,
    required: true,
  },
  piano: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
  bass: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
  checked: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
  randomized: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
  level: {
    type: DataTypes.STRING,
    default: false,
  },
  lyrics: {
    type: DataTypes.STRING,
    default: false,
  },
});

module.exports = {
  Song
};

