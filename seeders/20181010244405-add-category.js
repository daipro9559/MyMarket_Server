'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        categoryName: 'Đồ điện tử,công nghệ',
        imagePath: '/image/category/electronic_category.jpg',
        createdAt:'2018-10-08 23:16:04',
        updatedAt:'2018-10-08 23:16:04'
      },
      {
        categoryName: 'Bất động sản, nhà trọ',
        imagePath: '/image/category/property_category.jpg',
        createdAt:'2018-10-08 23:16:04',
        updatedAt:'2018-10-08 23:16:04'
      },
      {
        categoryName: 'Ôtô, xe máy',
        imagePath: '/image/category/car_category.jpg',
        createdAt:'2018-10-08 23:16:04',
        updatedAt:'2018-10-08 23:16:04'
      },
      {
        categoryName: 'Quần áo thời trang',
        imagePath: '/image/category/fashion_category.jpg',
        createdAt:'2018-10-08 23:16:04',
        updatedAt:'2018-10-08 23:16:04'
      },
      {
        categoryName: 'Thú cưng',
        imagePath: '/image/category/pet_category.jpg',
        createdAt:'2018-10-08 23:16:04',
        updatedAt:'2018-10-08 23:16:04'
      },
      {
        categoryName: 'Đồ trẻ em',
        imagePath: '/image/category/baby_category.jpg',
        createdAt:'2018-10-08 23:16:04',
        updatedAt:'2018-10-08 23:16:04'
      },
      {
        categoryName: 'Đồ thể thao',
        imagePath: '/image/category/sport_category.jpg',
        createdAt:'2018-10-08 23:16:04',
        updatedAt:'2018-10-08 23:16:04'
      },
      {
        categoryName: 'Cho tặng bạn',
        imagePath: '/image/category/free_category.jpg',
        createdAt:'2018-10-08 23:16:04',
        updatedAt:'2018-10-08 23:16:04'
      },
      {
        categoryName: 'Đồ gia dụng',
        imagePath: '/image/category/houseware_category.jpg',
        createdAt:'2018-10-08 23:16:04',
        updatedAt:'2018-10-08 23:16:04'
      },
      {
        categoryName: 'Đồ nội thất',
        imagePath: '/image/category/furniture_category.jpg',
        createdAt:'2018-10-08 23:16:04',
        updatedAt:'2018-10-08 23:16:04'
      }], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
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
