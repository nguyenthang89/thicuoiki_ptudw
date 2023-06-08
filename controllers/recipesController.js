const controller = {};
const models = require('../models');
const Recipe = models.Recipe;
const sequlize = require('sequelize');
const Op = sequlize.Op;

controller.search = (keyword) => {
  return Recipe.findAll({
    where :{
      [Op.or]:{
        title: {
          [Op.iLike]: `%${keyword}%`
        },
        description: {
          [Op.iLike]: `%${keyword}%`
        }
      }
    }
  })
}

controller.getById = (id) => {
  return Recipe.findOne({
    where: { id: id },
    include: [{
      model: models.Ingredient,
      as: 'Ingredients'
    },
    {
      model: models.Direction,
      as: 'Directions',
      order: ['order']
    }]
  });
}

controller.getAll = (keyword) => {
  return Recipe.findAll({
    include: [
      {
        model: models.Ingredient,
        as: 'Ingredients',
        limit: 3
      }
    ]
  })
}
module.exports = controller;