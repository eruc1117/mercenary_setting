'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Fixattributes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      property_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Properties',
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
      range: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Fixattributes')
  }
}
