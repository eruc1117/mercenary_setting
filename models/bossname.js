'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class BossName extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      BossName.hasMany(models.Boss, {
        foreignKey: 'nameId'
      })
    }
  };
  BossName.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BossName',
    tableName: 'BossNames',
    underscored: true
  })
  return BossName
}
