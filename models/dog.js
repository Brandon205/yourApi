'use strict';
module.exports = (sequelize, DataTypes) => {
  const dog = sequelize.define('dog', {
    firstName: DataTypes.STRING,
    breed: DataTypes.STRING,
    mainColor: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  dog.associate = function(models) {
    // associations can be defined here
  };
  return dog;
};