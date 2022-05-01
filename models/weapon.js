'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Weapon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Weapon.hasMany(models.Mercenary, {
        foreignKey: 'weaponId'
      })
    }
  };
  Weapon.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Weapon',
    tableName: 'Weapons',
    underscored: true
  })
  return Weapon
}
