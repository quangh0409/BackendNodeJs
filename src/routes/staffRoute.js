const staffBuilder = require('../controllers/staffController');

module.exports = app => {
  app
    .route('/staffs')
    .get(staffBuilder.getAllStaffs)
    .post(staffBuilder.createStaff);

  app
    .route('/staffs/:staffId')
    .get(staffBuilder.getStaffById)
    .put(staffBuilder.updateStaff)
    .delete(staffBuilder.deleteStaff);
};