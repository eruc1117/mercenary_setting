'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  Level.init({
    name_id: DataTypes.INTEGER,
    boss_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Level',
    tableName: 'Levels',
    underscored: true
  })
  return Level
}
