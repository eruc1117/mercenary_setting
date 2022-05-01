'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('FixAttributes', [{
      name: 'ブートストラップ',
      image: 'https://メルクストーリア.gamerch.com/%E3%83%96%E3%83%BC%E3%83%88%E3%82%B9%E3%83%88%E3%83%A9%E3%83%83%E3%83%97',
      property_id: 5,
      skin_id: 2,
      range: 150,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FixAttributes', null, {})
  }
}
