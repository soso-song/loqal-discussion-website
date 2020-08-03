'use strict';
const mongoose = require('mongoose');

//Uncomment this line to connect to cloud library? - this is the way it was before
//const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://niconicolii:niconicolii@loqal.tfeww.mongodb.net/LOQAL?retryWrites=true&w=majority'

//This allows you to connect to local library
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/LoqalAPI'
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

module.exports = { mongoose }