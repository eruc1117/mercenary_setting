'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Levels', {
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
          model: 'LevelNames',
          key: 'id'
        }
      },
      boss_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Bosses',
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
    await queryInterface.dropTable('Levels')
  }
}
