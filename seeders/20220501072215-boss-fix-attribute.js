'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('FixAttributes', [{
      name: 'ブートストラップ',
      image: 'https://cdn.img-conv.gamerch.com/img.gamerch.com/xn--cckza4aydug8bd3l/wikidb_thumbnail/1020585/individual_200.jpg?d=20210305011338&q=20',
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
