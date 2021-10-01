const mysql = require('mysql')
const pool = mysql.createPool({
    host: '47.99.73.44',
    user: 'vision',
    password: 'huang@DATA.123',
    database: 'test',
    multipleStatements: true,
    connectTimeout: 30000,
    connectionLimit: 10,
})

/**
 * 连接数据库方法
 * @param query {String}
 * @param onSuccess {Function}
 * @param onError {Function}
 */
global.connect = (query, onSuccess = () => {}, onError = () => {}) => {
    console.log(`数据库指令：${query}`)
    pool.getConnection(function(err, connection) {
        if(err){
            onError(err)
        } else {
            connection.query(query, function(err, rows) {
                if(err) {
                    onError(err)
                } else {
                    onSuccess(rows)
                    connection.release()
                }
            })
        }
    })
}