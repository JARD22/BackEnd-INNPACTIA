const {createPool}  = require('mysql');

const pool = createPool({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  connectionLimit:10  
});
 
pool.getConnection(function(err, connection) {

  if (err) {
    console.log(err);
    console.log('Error al conectar con la Base de datos');
  }else{
    console.log('***BASE DE DATOS CONECTADA***');
  }

});

module.exports=pool;