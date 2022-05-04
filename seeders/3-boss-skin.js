'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Skins', [{
      name: '特硬',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '硬い',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '通常',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '柔らかい',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '超柔',
      created_at: new Date(),
      updated_at: new Date()
    }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Skins', null, {})
  }
}
