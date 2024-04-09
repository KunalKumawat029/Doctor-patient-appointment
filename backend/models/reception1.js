'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reception1 extends Model {
    static associate(models) {
      // reception1.hasMany(models.patient,{foreignKey:"raddress", as:"address"})
      // reception1.hasMany(models.patient,{foreignKey:"doctor_name",as:"do_name"})
      reception1.belongsTo(models.Doctor, { foreignKey: "doctor", as: "doct_name" })
    }
  }
  reception1.init({
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
      validate: {
        notNull: {
          msg: "phone number must be requre !"
        },
        len: {
          args: [10, 10],
          msg: "incorrect phone number"
        }
      }

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "please enter valid email"
        }
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
    },
    raddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 15],
          msg: "enter valid address"
        },
        notNull: {
          msg: "address must be requre !"
        }
      }
    },
    activeStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
    {
      sequelize,
      modelName: 'reception1',
      tableName: 'reception1s'
    });
  return reception1;
};