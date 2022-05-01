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
      Boss.belongsTo(models.Fixattribute, { foreignKey: 'fixattributeId' })
    }
  };
  Boss.init({
    fixattribute_id: DataTypes.INTEGER,
    attack: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Boss',
    tableName: 'Bosses',
    underscored: true
  })
  return Boss
}
