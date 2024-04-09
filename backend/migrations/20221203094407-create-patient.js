'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      raddress: { 
        type : Sequelize.INTEGER,
        references : { model :'reception1s' , primaryKey: 'id'}
      },
      doctor_name: { 
        type : Sequelize.INTEGER,
        references : { model :'Doctors' , primaryKey: 'id'}
      }, 
      appointmentdate: {
        type: Sequelize.STRING
      },
      daignosis: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      activeStatus :{
        type :  Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('patients');
  }
};