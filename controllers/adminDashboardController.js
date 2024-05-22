const mssql = require('mssql');
const pool = require('../database');
const { json } = require('body-parser');

const adminDashboard = async (req, res) => {
    try{
        const request = pool.request();
        const result = await request.execute('SP_AdminDashboard');
        console.log(result);

        const recordset = result.recordset.map(record => ({
            totalSales: record.totalSales,
            orders: record.orders,
            designs: record.designs, 
            pendingOrders: JSON.parse(record.pendingOrders)
        }));
        if (result.returnValue !== 1) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json(recordset);
    }
    catch (error){
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    adminDashboard
}