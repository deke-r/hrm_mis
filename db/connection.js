const mysql = require('mysql');
const util = require('util');
// const logger = require('../util/logger');

const createConnectionPool = async () => {
    const pool = mysql.createPool({
        user: 'root',
        password: '',
        host: 'localhost',
        database: 'hrm_2',
        timezone: 'GMT'
     
    });

    const getConnectionAsync = util.promisify(pool.getConnection).bind(pool);

    try {
        const connection = await getConnectionAsync();
        console.log('Connected to HRM database successfully...');
        connection.release();
        return pool;
    } catch (err) {
        console.error('Error connecting to HRM database:', err.message);
        // logger.error('Error connecting to CMS database:', err.message)
        throw err; 
    }
};

module.exports = createConnectionPool;



// user: 'root',
//         password: 'f3a54d600135878b36814c7462a87b16',
//         host: 'localhost',
//         port: '3306',
//         database: 'activityportal',