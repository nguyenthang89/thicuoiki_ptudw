'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
// const expressHandlebars = require('express-handlebars');
const expressHandlebars = require('express-handlebars');
// cau hinh public static folder
app.use(express.static(__dirname + '/public'));
// handlebars
app.engine('hbs', expressHandlebars.engine({
  layoutsDir:  __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  extname: 'hbs',
  defaultLayout: 'layout',
  runtimeOptions: { allowProtoPropertiesByDefault: true}
}));

app.set('view engine', 'hbs');

//routes

// app.get('/createTables', (req, routes)=>{
//   let models = require('./models');
//   models.sequelize.sync().then(() => {
//     // res.send('tables created!');
//     console.log("tables created!")
//   });
// });

app.get('/', (req, res)=> {
  res.render('index');
})
app.use('/recipes', require('./routes/recipesRouter'));

// app.use((req, res, next) => {
//   res.status(404).render('error', { message:'File not found!' });
// })
// app.use((error, req, res, next)=> {
//   console.log(error);
//   res.status(500).render('error', { message:'Internal server error' });;
// })
app.set('port', process.env.PORT || 5000);
app.listen(port, ()=> {
  console.log(`server is running on ${port}`);
});