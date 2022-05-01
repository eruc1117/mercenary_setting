'use strict'

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Mercenaries',
      'img',
      {
        type: Sequelize.STRING,
        allowNull: false
      })
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Mercenaries', 'img')
  }
}
