const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const uuid = require('uuid');
const api = require('./api');

app.set('port', (process.env.PORT || 8081));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));
app.use(morgan('dev'));
app.use(cors());
app.use((req, res, next) => {
  app.set('requestId', uuid.v4());
  console.log(app.get('requestId'));
  console.log(req.path);
  console.log(req.get('X-MyHeader') ? req.get('X-MyHeader') : 'Not set');
  next();
});

app.use('/api', api);

app.use((req, res) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.json(err);
});
// MongoDB connection

mongoose.connect('mongodb://127.0.0.1:27017/virtualstandups', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));
});
