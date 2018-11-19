
var db = null
var ms = require('mysql');
var config = require('../config').dbconfig;

function Table(tablename, pool, fields) {
    this.tablename = tablename;
    this.pool = pool;
    this.fields = fields;
}

/*
    function:
        insert

    param: 
        values - JSON object
        callback(err,results) - callback함수
    
    description:
        해당 values를 table에 삽입한다.
*/
Table.prototype.insert = function (values, callback) {
    var sql = "INSERT INTO " + this.tablename + " SET ?";
    this.pool.getConnection(function (err, conn) {
        if (err)
            throw err;


        conn.query(sql, [values], function (err, results) {
            if (err)
                callback(err, null)
            else
                callback(null, results)

            conn.release();
        });
    })
}
/**
 *  function:
 *      select
 *  
 *  params:
 *      where - 조건(JSON OBJECT)
 *      callback(err,results) - 콜백함수
 * 
 *  description:
 *      where 조건에 의거하여 DB로 부터 가져온다.
 */
Table.prototype.select = function (where, callback) {
    var sql = "SELECT * FROM " + this.tablename + " WHERE 1=1 ";
    for (var e in where) {
        sql = sql + " and " + e + " = " + this.pool.escape(where[e])
    }
    this.pool.getConnection(function (err, conn) {



        console.log(sql);
        conn.query(sql, function (err, results) {
            if (err)
                callback(err, null)
            else
                callback(null, results)

            conn.release()
        })
    });
}





function DB() {
    this.pool = ms.createPool(config);
    this.tables = []
}

/*
    function : makeTable

    add table
*/
DB.prototype.makeTable = function (key, tablename, fields) {
    console.log(tablename);
    this.tables.push([key, new Table(tablename, this.pool, fields)]);
}
DB.prototype.getTable = function (key) {
    for (var i in this.tables) {

        if (this.tables[i][0] == key)
            return this.tables[i][1]
    }
}

exports.getInstace = function () {
    if (db == null)
        db = new DB();
    return db;
}