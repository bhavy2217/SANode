const mssql = require('mssql');
const config = {
    user: 'sa',
    password: 'Nenku@1234',
    server: '139.99.63.205',
    port: 37436,
    database: 'SS_Sarrah',
    options: {
        encrypt: false,
        crypto: { minVersion: 'TLSv1.2' }
    }
};
const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();
poolConnect.then(() => {
    console.log('Connected to MS SQL Server');
}).catch(err => {
    console.error('Error connecting to MS SQL Server:', err);
});
module.exports = pool;