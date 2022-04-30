'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ornaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'OrnamentNames',
          key: 'id'
        }
      },
      ability_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Abilities',
          key: 'id'
        }
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ornaments')
  }
}
