'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {

    static associate(models) {
      Doctor.hasMany(models.patient, { foreignKey: "doctor_name", as: "doct_name" })
      Doctor.hasMany(models.reception1, { foreignKey: "doctor", as: "docto_name" })




    }
  }
  Doctor.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name can not be empty"
        }
      }

    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "please enter phone number"
        },
        len: {
          args: [10, 10],
          msg: "invalid phone number"
        }
      }
    }
    ,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "please enter valid email"
        },

      }

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be empty"
        },
        len: {
          args: [5, 10],
          msg: "password length should be 5 to 10 digits "
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Doctor',
    tableName: 'Doctors'
  });
  return Doctor;
};