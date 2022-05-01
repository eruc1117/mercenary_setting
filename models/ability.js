'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  Ability.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ability',
    tableName: 'Abilities',
    underscored: true
  })
  return Ability
}
