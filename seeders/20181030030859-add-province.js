'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Provinces',[
       {
        provinceName: 'Tp Hồ Chí Minh',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'An Giang',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'Bà Rịa-Vũng Tàu',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'Bạc Liêu',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'Bắc Kạn',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'Bắc Giang',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'Bắc Ninh',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'Bến Tre',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'Bình Dương',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'Bình Định',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'Bình Phước',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'Bình Thuận',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'Cà Mau',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'Cao Bằng',
        createdAt:new Date(),
        updatedAt:new Date()
       },
       {
        provinceName: 'Tp Cần Thơ',
        createdAt:new Date(),
        updatedAt:new Date()
       }
     ],{})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
