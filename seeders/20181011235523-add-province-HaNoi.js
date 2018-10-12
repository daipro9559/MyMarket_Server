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
      provinceName: 'Hà Nội',
      createdAt:new Date(),
      updatedAt:new Date()
     }
   ],{}).then(()=>{
     return queryInterface.bulkInsert('Districts',[
       {
         districtName:'Quận Ba Đình',
         provinceID:1,
         createdAt:new Date(),
         updatedAt: new Date()
       },
       {
        districtName:'Quận Hoàn Kiếm',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       } ,
       {
        districtName:'Quận Hai Bà Trưng',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Quận Đống Đa',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       } ,
       {
        districtName:'Quận Tây Hồ',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Quận Cầu Giấy',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Quận Thanh Xuân',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Quận Hoàn Kiếm',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Quận Hoàng Mai',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Quận Long Biên',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Quận Bắc Từ Liêm',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Quận Nam Từ Liêm',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Quận Thanh Trì',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Quận Hà Đông',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Gia Lâm',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Đông Anh',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Sóc Sơn',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Thị xã Sơn Tây',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Ba Vì',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Phúc Thọ',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Thạch Thất',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Quốc Oai',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Chương Mỹ',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Đan Phương',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Hoài Đức',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Thanh Oai',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Mỹ Đức',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Ứng Hòa',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Thường Tín',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Phú Xuyên',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       },
       {
        districtName:'Huyện Mê Linh',
        provinceID:1,
        createdAt:new Date(),
        updatedAt: new Date()
       }

     ],{})
   })
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
