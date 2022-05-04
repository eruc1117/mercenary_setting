'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Mercenaries', [{
      name: '「天衝の二刃」ロレッタ',
      property_id: 5,
      weapon_id: 1,
      hp: 13290,
      attack: 9635,
      attack_speed: 2.32,
      range: 15,
      image: 'https://cdn.img-conv.gamerch.com/img.gamerch.com/xn--cckza4aydug8bd3l/1441003283.jpg',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: '「暁光の聖女」ミシェリア',
      property_id: 4,
      weapon_id: 5,
      hp: 6642,
      attack: 16605,
      attack_speed: 2.52,
      range: 185,
      image: 'https://cdn.img-conv.gamerch.com/img.gamerch.com/xn--cckza4aydug8bd3l/1438412237.jpg',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Mercenaries', null, {})
  }
}
