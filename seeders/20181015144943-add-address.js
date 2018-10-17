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
  //  return queryInterface.bulkInsert('Addresses',[
  //    {
  //      address:"Số 4A, ngõ 6, đường Láng",
  //      createdAt:new Date(),
  //      updatedAt:new Date(),
  //      districtID:4
  //    },
  //    {
  //     address:"Số 4, đường Láng",
  //     createdAt:new Date(),
  //     updatedAt:new Date(),
  //     districtID:4
  //    },
  //    {
  //     address:"Số 10, ngõ 30, phố Chùa Bộc",
  //     createdAt:new Date(),
  //     updatedAt:new Date(),
  //     districtID:4
  //    }
  //    ,
  //    {
  //     address:"Số 10, Tây Sơn",
  //     createdAt:new Date(),
  //     updatedAt:new Date(),
  //     districtID:4
  //    }
  //    ,
  //    {
  //     address:"Số 80, đường Lê Văn Lương",
  //     createdAt:new Date(),
  //     updatedAt:new Date(),
  //     districtID:7
  //    },
  //    {
  //     address:"Số 20, Hoàng Ngân",
  //     createdAt:new Date(),
  //     updatedAt:new Date(),
  //     districtID:7
  //    }
  //  ])
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
