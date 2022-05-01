'use strict'

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Mercenaries',
      'image',
      {
        type: Sequelize.STRING,
        allowNull: false
      })
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Mercenaries', 'image')
  }
}
