'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patient extends Model {
    static associate(models) {
      patient.belongsTo(models.Doctor, { foreignKey: "doctor_name", as: "doc_name" })
      patient.belongsTo(models.reception1, { foreignKey: "raddress", as: "address" })




      // patient.hasMany(models.Doctor,{foreignKey:"patient",as:"pat_id"})

    }
  }
  patient.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 25],
          msg: "enter valid name"
        },
        notNull: {
          msg: "name can not be empty"
        }
      }
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "sex can not be empty"
        }
      }
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 2],
          msg: "enter valid age"
        },
        notNull: {
          msg: "age can not be empty"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: {
          args: [10, 10],
          msg: "invalid phone number"
        }
      }
    },
    daignosis: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    appointmentdate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "invalid date"
        }
      }
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "please enter time"
        }
      }
    }, activeStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
    {
      sequelize,
      modelName: 'patient',
      tableName: 'patients'
    });
  return patient;
};