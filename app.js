const mongoose = require('mongoose');
const express = require('express');
const path = require('path')

const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors')

const db = require('./database/db');
const registration_routes = require('./routes/registration_routes');
const TouristRoutes =require('./routes/TouristRoutes');
const image_route=require('./routes/image_route');
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(image_route);
 
app.use(morgan('dev'));
app.use(express.json());



app.use(bodyParser.urlencoded({extended:false}));
app.use(registration_routes);
app.use(TouristRoutes);
 

app.listen(90);