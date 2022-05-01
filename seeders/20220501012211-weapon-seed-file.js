'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Weapons', [{
      name: '斬撃',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '突撃',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '打撃',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '弓矢',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '魔法',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: '銃弾',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: '回復',
      created_at: new Date(),
      updated_at: new Date()
    }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Weapons', null, {})
  }
}
