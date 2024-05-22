const mssql = require('mssql');
const pool = require('../database');

const addOrder = async (req, res) => {
    // Extracting data from the request body
    const { nCustId } = req.query;
    const { nSizes } = req.body;

    try {
        // Executing the SP 
        const request = pool.request()
            .input('nCustId', mssql.NVarChar(250), nCustId)
            .input('nSizes', mssql.NVarChar(mssql.MAX), JSON.stringify(nSizes))
            .execute('SP_OrderAdd');

        const result = await request;
        console.log(result)

        const recordset = result.recordsets[0];
        if (result.returnValue == 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        const OrderNo = result.recordset[0].cSrNo;

        console.log(OrderNo)

        res.status(200).json({ message: 'Order Placed Successfully', OrderNo: OrderNo });

    } catch (error) {
        console.log('Error placing order', error);
        res.status(500).json({ error: 'Error placing order' });
    }
};

const addOrderConfirmation = async (req, res) => {
    const { Query, nOrderId, nUserId } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('Query', mssql.NVarChar(250), Query)
            .input('nOrderId', mssql.NVarChar(250), nOrderId)
            .input('nUserId', mssql.NVarChar(250), nUserId)
            .execute('SP_OrderConfirmation');


        const result = await request;
        console.log(result)

        // const recordset = result.recordsets[0];
        // if (result.returnValue !== 1) {
        //     const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
        //     return res.status(result.returnValue || 400).json({ error: errorMessage });
        // }


        res.status(200).json({ message: 'Order Confirmed Successfully' });

    } catch (error) {
        console.log('Error confirming order', error);
        res.status(500).json({ error: 'Error confirming order' });
    }
};

const getOrder = async (req, res) => {
    try {
        const { nCustId, cSearch, nKarigarId } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('cSearch', mssql.NVarChar(250), cSearch)
            .input('nCustId', mssql.NVarChar(250), nCustId)
            .input('nKarigarId', mssql.NVarChar(250), nKarigarId)
            .execute('SP_OrderList');

        const result = request.recordset

        res.status(200).json({ order: result });

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOrderAdminList = async (req, res) => {
    try {
        const { cType, cSearch } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('cSearch', mssql.NVarChar(250), cSearch)
            .input('cType', mssql.NVarChar(250), cType)
            .execute('SP_OrderAdminList');

        const result = request.recordset

        res.status(200).json({ order: result });

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { nOrderId, nKarigarId } = req.query;

        // Executing the stored procedure to fetch staff with the NID
        const request = await pool.request()
            .input('nOrderId', mssql.NVarChar(250), nOrderId)
            .input('nKarigarId', mssql.NVarChar(250), nKarigarId)
            .execute('SP_OrderSearch');

        if (!request || !request.recordset || request.recordset.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        const result = request.recordset.map(record => ({
            nid: record.nid,
            cOrderNo: record.cOrderNo,
            cKarigarName: record.cKarigarName,
            cDesignNumber: record.cDesignNumber,
            cImages: record.cImages ? Buffer.from(record.cImages).toString('base64') : null,
            cSizes: JSON.parse(record.cSizes),
            isConfirmOrder: record.isConfirmOrder
        }));


        // Sending the company data
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    addOrder,
    getOrder,
    getOrderById,
    getOrderAdminList,
    addOrderConfirmation
};   