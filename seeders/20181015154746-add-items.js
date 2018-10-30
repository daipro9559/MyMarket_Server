'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      */
    //   return queryInterface.bulkInsert('Items', [
    //     {
    //     name: 'Iphone 5S 16G',
    //     price: 3000000,
    //     description:"Iphone 5S 16G. Máy mới keng zin đét còn bảo hành của Techone 2 tháng.đầy đủ hộp và phụ kiện và giấy mua bán như lúc đầu.calling 0987608098",
    //     imagePath:"images/items/2018/10/15/1_1.JPG",
    //     createdAt:new Date(),
    //     updatedAt:new Date(),
    //     categoryID:1,
    //     addressID:1,
    //     userID:2,
    //     needToSale:1
    //   },{
    //     name: 'Iphone 6S Plus',
    //     price: 5000000,
    //     description:"Muốn để lại iphone 6s plus màu grey,32g hình thức mày nhìn đẹp không lỗi lầm gì, dùng nguyên zin, máy mình có bộ nhớ trong 32G, phụ kiện máy có hộp sạc cáp tai nghe và qua lấy sim, màn hình máy mình đã dán cường lực đầy đủ, mình đã sắm thêm ốp lưng cho máy để thêm phần yên tâm, iCloud mình đang gỡ sạch sẽ, máy có chức năng mở khóa bằng vân tay rất nhanh nhạy, máy mình dùng chính chủ, nguyên zin 100%, không hỏng hóc hay sửa chữa dù là nhẹ, xem xong đảm bảo sẽ ưng luôn. Máy màu gôn cầm trên tay rất Sang, liên hệ mình trực tiếp cho nhanh được việc cả hai bên, mình xin cảm ơn",
    //     imagePath:"images/items/2018/10/15/1_2.jpg",
    //     createdAt:new Date(),
    //     updatedAt:new Date(),
    //     categoryID:1,
    //     addressID:2,
    //     userID:2,
    //     needToSale:1
    //   },{
    //     name: 'Sony Xperia z3 veron',
    //     price: 1000000,
    //     description:"má y hình thức vẫn dep ai cần alo ko fix mhe",
    //     imagePath:"images/items/2018/10/16/1_3.jpg",
    //     createdAt:new Date(),
    //     updatedAt:new Date(),
    //     categoryID:1,
    //     addressID:3,
    //     userID:2,
    //     needToSale:1
    //   },{
    //     name: 'Galaxy note edge màn cong',
    //     price: 1400000,
    //     description:"Mình cần bán galaxy note edge. Màn hình cong.Bị vỡ 1 đường kính như hình ảnh. Dùng vẫn bình thường không lo nhé. Máy vẫn dùng tốt nay bán lại cho ai cần. Liên hệ trực tiếp nhé",
    //     imagePath:"images/items/2018/10/16/1_2.jpg",
    //     createdAt:new Date(),
    //     updatedAt:new Date(),
    //     categoryID:1,
    //     addressID:4,
    //     userID:2,
    //     needToSale:1
    //   },{
    //     name: 'Bán dàn sony HCD-VP100',
    //     price: 1000000,
    //     description:"Dàn sony hcd-vp100 nguyên bản,hình thức còn đẹp,mọi chức năng hoạt động bình thường mỗi cd thò ra thụt vào khó khăn,bass sâu tép eng éc,thùng còn như mới ai cần liên hệ long 0934230189.mình ở trần khát chân hà nội,cảm ơn chợ tốt!giá hữu nghị 1 củ chẵn.",
    //     imagePath:"images/items/2018/10/16/1_4.jpg",
    //     createdAt:new Date(),
    //     updatedAt:new Date(),
    //     categoryID:1,
    //     addressID:5,
    //     userID:2,
    //     needToSale:1
    //   },{
    //     name: 'Bay nhanh màn samsung 19',
    //     price: 600000,
    //     description:"cần bán màn samsung 19' có fix nhẹ xăng xe",
    //     imagePath:"images/items/2018/10/16/1_5.jpg",
    //     createdAt:new Date(),
    //     updatedAt:new Date(),
    //     categoryID:1,
    //     addressID:6,
    //     userID:2,
    //     needToSale:1
    //   },{
    //     name: 'Cpu g2030 socket 1155',
    //     price: 290000,
    //     description:"Nâng cấp lên i3 nên còn thừa con g2030 2 nhân, tốc độ 3.0ghz. Đang chạy ổn định, chân socket vàng óng(ảnh chụp máy đểu và ánh sáng buổi tối nên có thể có bóng). Ai cần liên hệ mọi hình thức nhé.. Địa chỉ ban ngày mình ở ngõ 149 Giảng Võ, tối ở ngõ 1160 Đường Láng.",
    //     imagePath:"images/items/2018/10/16/1_7.jpg",
    //     createdAt:new Date(),
    //     updatedAt:new Date(),
    //     categoryID:1,
    //     addressID:7,
    //     userID:2,
    //     needToSale:1
    //   },{
    //     name: 'Xe điện m133',
    //     price: 4000000,
    //     description:"Xe chạy êm mượt đầy đủ đèm còi phụ kiện, còn bảo hành nên anh chị em yên tâm khi mua tại cửa hàng,về giá cả siêu hợp lý ae mua liên hệ ngay nhé ",
    //     imagePath:"images/items/2018/10/16/1_8.jpg",
    //     createdAt:new Date(),
    //     updatedAt:new Date(),
    //     categoryID:1,
    //     addressID:8,
    //     userID:2,
    //     needToSale:1
    //   }
    // ], {});
    
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
