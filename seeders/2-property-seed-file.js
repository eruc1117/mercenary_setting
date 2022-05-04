'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Properties', [{
      name: '炎',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '水',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '風',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '光',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '闇',
      created_at: new Date(),
      updated_at: new Date()
    }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Properties', null, {})
  }
}
