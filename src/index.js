const express = require('express');
const app = express();
const dotenv = require('dotenv').config({path:'C:/nodeProgramLaptop/enterprise-application/.env'})
let user = require('./routes/r-index');
const bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const port = process.env.port;
app.use(user);
app.listen(port);
console.log(`server listening on port  ${port}`);

module.exports=app;