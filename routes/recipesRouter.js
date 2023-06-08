const express = require('express');
const route = express.Router();
const controller = require('../controllers/recipesController');

route.get('/', async(req, res)=> {
  let keyword = req.query.keyword;
  let recipes = [];
  if(keyword && keyword.trim!=''){
    recipes = await controller.search(keyword);  
  }else{
    recipes = await controller.getAll();
    recipes.forEach((item, index)=> {
      item.showIngredients = (index%2);
    })
  }
  
  res.locals.recipes = recipes;
  res.render('recipes');
});

route.get('/:id', async(req, res)=> {
  let id = req.params.id;
  let recipe = await controller.getById(id);
  res.locals.recipe = recipe
  res.render('featured');
});

module.exports = route;