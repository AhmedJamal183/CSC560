
const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  DBconfig = require('./config/VMSDB'),
  userController = require('./controllers/user.controller')


const app = express();
var port = process.env.PORT || 4300;

app.use(cors());
app.use(bodyParser.json());


mongoose.Promise = global.Promise;
mongoose.connect(DBconfig.ConnectionString).then(
  () => { console.log('VMS Database is connected') },
  err => { console.log('Can not connect to the VMS database' + err) }
);

mongoose.set('debug', true);

app.use('/users', userController);


var server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});