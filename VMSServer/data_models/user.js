//user

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

var schemaOptions = {
  toObject: {
    virtuals: true
  }
  , toJSON: {
    virtuals: true
  }
};

// user Schema
let User = new Schema({
  User_ID: {
    type: Number
  },
  First_Name: {
    type: String,
    required: true
  },
  Vaccine_Name: {
    type: String,
    required: true
  },
  Dose_No: {
    type: Number,
    required: true
  }
}, schemaOptions,
  { collection: 'users' }
);

User
  .virtual('Full_Name')
  .get(function () {
    return this.First_Name + ' ' + this.Vaccine_Name;
  });

User.plugin(autoIncrement, { inc_field: 'User_ID' }); //auto increment value

module.exports = mongoose.model('User', User);

