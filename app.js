var con = require('./config/connection');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

//ubicacion de las rutas:
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var historicalRouter = require('./routes/historical');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use( express.static( "public" ) );
//url de la ruta registrada:
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/historical', historicalRouter);

//API historical
app.get("/datajson", async (req, res) => {
  const Since = req.query.Since;
  const Until = req.query.Until;

  console.log(Since);

  const query = `SELECT * FROM GPS_DATA WHERE Plate='QID-550' AND Time BETWEEN ${Since} AND ${Until}`;
  console.log(query);
  con.query(query,(err, result) => {
    if (!err) {
      console.log(result);
      return res.send(result).status(200);
    } else {
      console.log(`Ha ocurrido el siguiente ${err}`);
      return res.status(500);
    }
  })
});

app.get("/datajson2", async (req, res) => {
  const Since2 = req.query.Since2;
  const Until2 = req.query.Until2;

  console.log(Since2);

  const query2 = `SELECT * FROM GPS_DATA WHERE Plate='UUZ-745' AND Time BETWEEN ${Since2} AND ${Until2}`;
  console.log(query2);
  con.query(query2,(err, result) => {
    if (!err) {
      console.log(result);
      return res.send(result).status(200);
    } else {
      console.log(`Ha ocurrido el siguiente ${err}`);
      return res.status(500);
    }
  })
});

app.get("/datajs", async (req, res) => {
  const Lat = parseFloat(req.query.Lat);
  const Lng = parseFloat(req.query.Lng);

  console.log("Prueba 1");

  const query2 = `SELECT * FROM GPS_DATA WHERE Latitude BETWEEN ${Lat} AND ${
    Lat + 0.034
    } AND Longitude BETWEEN ${Lng} AND ${Lng + 0.034}`;

  console.log(query2);
  con.query(query2,(err, result) => {
    if (!err) {
      console.log(result);
      return res.send(result).status(200);
    } else {
      console.log(`Ha ocurrido el siguiente ${err}`);
      return res.status(500);
    }
  })
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
