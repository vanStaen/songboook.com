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
    defaultValue: true,
  },
  artist: {
    type: DataTypes.STRING,
    required: true,
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
    defaultValue: [],
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
  song: {
    type: DataTypes.STRING,
    required: true,
  },
  piano: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  bass: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  level: {
    type: DataTypes.STRING,
    defaultValue: false,
  },
  lyrics: {
    type: DataTypes.STRING,
    defaultValue: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    required: true,
  },
});

module.exports = {
  Song
};

