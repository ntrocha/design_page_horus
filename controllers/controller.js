var con = require('../config/connection');
var func = require('../model/func');
module.exports = {

    index : function(req, res, next) {

        func.obtener(con, function(err, datos){
            console.log(datos[1]);
            res.render('index', {title: 'Horus GPS'});
        });
    },

    indexRead : function(req, res, next) {
        func.obtain(con, function(err, datos){
            console.log(datos);
            res.json(datos);
        });
    },

    indexRead2 : function(req, res, next) {
        func.obtain2(con, function(err, datos){
            console.log(datos);
            res.json(datos);
        });
    },

    indexRead3 : function(req, res, next) {
        func.obtain3(con, function(err, datos){
            console.log(datos);
            res.json(datos);
        });
    },

    historical : function(req, res, next) {

        func.obtener(con, function(err, datos){
            console.log(datos);
            res.render('historical', {title: 'Horus GPS'});
        });
    },

    historicalRead : async (req, res) => {
        const Since = req.query.Since;
        const Until = req.query.Until;
      
        console.log(Since);
      
        const query = `SELECT * FROM GPS_DATA WHERE Time BETWEEN ${Since} AND ${Until}`;
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
      },
    save: function(req, res){
        console.log(req.body);
        datos.obtainR(con,req.body, function(err, data){
            console.log(data);
            res.json(data);
    });
    },

    // make:function (req, res){
    //     res.render('json/rangejson');
    // },

    make2:function (req, res){
        res.render('datahistorical');
    },

}