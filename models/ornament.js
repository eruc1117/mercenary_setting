'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ornament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Ornament.belongsTo(models.OrnamentName, { foreignKey: 'nameId' })
      Ornament.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  Ornament.init({
    name_id: DataTypes.INTEGER,
    ability_id: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ornament',
    tableName: 'Ornaments',
    underscored: true
  })
  return Ornament
}
