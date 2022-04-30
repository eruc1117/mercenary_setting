'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bosses', {
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
          model: 'BossNames',
          key: 'id'
        }
      },
      skin_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Skins',
          key: 'id'
        }
      },
      attack: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      range: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Bosses')
  }
}
