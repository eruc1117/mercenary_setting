'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Boss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  Boss.init({
    name_id: DataTypes.INTEGER,
    skin_id: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    range: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Boss',
    tableName: 'Bosses',
    underscored: true
  })
  return Boss
}
