module.exports = {
    obtener: function(conexion, funcion){
        conexion.query("SELECT * FROM GPS_DATA", funcion);
    },
    obtain: function (conexion, funcion){
        conexion.query("SELECT * FROM GPS_DATA WHERE Plate='QID-550' ORDER BY ID DESC LIMIT 1", funcion);
    },
    obtain2: function (conexion, funcion){
        conexion.query("SELECT * FROM GPS_DATA WHERE Plate='UUZ-745' ORDER BY ID DESC LIMIT 1", funcion);
    },
    obtain3: function (conexion, funcion){
        conexion.query("SELECT sleep FROM SLEEP_DATA ORDER BY id DESC LIMIT 1", funcion);
    },

};