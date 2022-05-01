'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.belongsToMany(models.Mercenary, {
        through: models.UserMercenary,
        foreignKey: 'userId',
        as: 'UserMercenaryUser'
      })
      User.hasMany(models.Ornament, {
        foreignKey: 'userId'
      })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  return User
}
