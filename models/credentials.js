'use strict'

const bcrypt = require('bcrypt');

const Sequelize = require('./index').Sequelize;
const Datatypes = require('./index').DataTypes;

const Credential = Sequelize.define('credentials', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    email: {
        type: Datatypes.STRING,
        unique: true, 
        validate: {
            isEmail: true
        }, 
        allowNull: false
    }, 
    password: {
        type: Datatypes.STRING,
        allowNull: false
    }, 
    type: {
        type: Datatypes.STRING, 
        allowNull: false
    },
    token: {
        type: Datatypes.TEXT,
        allowNull: true
    }
}, {
    hooks: {
      beforeCreate: (credential) => {
        credential.password = bcrypt.hashSync(credential.password, 10);
      }
    }   
});

// instance methods
Credential.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }


module.exports = Credential;