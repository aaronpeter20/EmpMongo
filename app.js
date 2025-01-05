const express = require('express');
const app = express();
const basicRoutes = require('./routes/basic');
const morgan=require('morgan');
const methodOverride = require("method-override");
require('dotenv').config();
require('./db/connection');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use('/', basicRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server running at Port ${process.env.PORT}`);
})