var mysql = require('mysql');
var con = mysql.createConnection({
    host:'database-mysql-design.cpvucarfpwnw.us-east-1.rds.amazonaws.com',
    user:'admin',
    password:'Nd200117',
    database:'GPS'
});

con.connect(
    (err) => {
        if (!err) {
            console.log('Established connection');
    } else {
            console.log('Connection error: '+ err);
    }
}
);
module.exports = con;
