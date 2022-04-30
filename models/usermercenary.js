'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserMercenary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  UserMercenary.init({
    userId: DataTypes.INTEGER,
    mercenaryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserMercenary',
    tableName: 'UserMercenaries',
    underscored: true
  })
  return UserMercenary
}
