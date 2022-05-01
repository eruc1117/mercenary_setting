'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Mercenaries', {
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
      weapon_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Weapons',
          key: 'id'
        }
      },
      hp: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      attack: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      attack_speed: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      range: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Mercenaries')
  }
}
