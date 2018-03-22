let mysql = require('mysql');
let config = require('../config');

const pool = mysql.createPool({
  host: config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE,
  port     : config.database.PORT
});
 let query = (sql ,values) => {
  return new Promise(( resolve, reject ) => {
    pool.getConnection( (err, connection) => {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
 }

let users = `create table if not exists users(
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            pass VARCHAR(100) NOT NULL,
            avator VARCHAR(100) NOT NULL,
            moment VARCHAR(100) NOT NULL,
            PRIMARY KEY (id)
            );`
let posts = `create table if not exists posts(
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            title TEXT(0) NOT NULL,
            content TEXT(0) NOT NULL,
            md TEXT(0) NOT NULL,
            uid VARCHAR(40) NOT NULL,
            moment VARCHAR(100) NOT NULL,
            comments VARCHAR(200) NOT NULL DEFAULT '0',
            pv VARCHAR(40) NOT NULL DEFAULT '0',
            avator VARCHAR(100) NOT NULL,
            PRIMARY KEY (id)
            );`
let comment = `create table if not exists comment(
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                content TEXT(0) NOT NULL,
              );`
let createTable = function (sql) {
  return query(sql,[]);
}
createTable(users);
createTable(posts);

// 注册用户
const insertData = (value) => {
  const _sql = 'insert into users set name=?,pass=?,avator=?,moment=?;'
  return query(_sql,value);
}

module.exports = {
  query,
  createTable,
  insertData,
}