'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Mercenary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Mercenary.belongsTo(models.Weapon, { foreignKey: 'weaponId' })
      Mercenary.belongsTo(models.Property, { foreignKey: 'propertyId' })
      Mercenary.belongsToMany(models.User, {
        through: models.UserMercenary,
        foreignKey: 'mercenaryId',
        as: 'UserMercenaryMercenary'
      })
    }
  };
  Mercenary.init({
    name: DataTypes.STRING,
    propertyId: DataTypes.INTEGER,
    weaponId: DataTypes.INTEGER,
    hp: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    attackSpeed: DataTypes.INTEGER,
    range: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mercenary',
    tableName: 'Mercenaries',
    underscored: true
  })
  return Mercenary
}
