'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Fixattribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Fixattribute.belongsTo(models.Property, { foreignKey: 'propertyId' })
      Fixattribute.belongsTo(models.Skin, { foreignKey: 'skinId' })
      Fixattribute.hasMany(models.Boss, {
        foreignKey: 'fixattributeId'
      })
    }
  };
  Fixattribute.init({
    name: DataTypes.STRING,
    property_id: DataTypes.INTEGER,
    skin_id: DataTypes.INTEGER,
    range: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fixattribute',
    tableName: 'Fixattributes',
    underscored: true
  })
  return Fixattribute
}
