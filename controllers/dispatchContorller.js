const mssql = require('mssql');
const pool = require('../database');


const addDispatch = async (req, res) => {
    // Extracting data from the request body
    const { nKarigarId, nOrderId, nDesignId, nSizeId, nQty, dDate } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('nKarigarId', mssql.NVarChar(250), nKarigarId)
            .input('nOrderId', mssql.NVarChar(250), nOrderId)
            .input('nDesignId', mssql.NVarChar(250), nDesignId)
            .input('nSizeId', mssql.NVarChar(250), nSizeId)
            .input('nQty', mssql.NVarChar(250), nQty)
            .input('dDate', mssql.NVarChar(250), dDate)
            .execute('SP_DispatchAdd');

        const result = await request;
        console.log(result)

        const recordset = result.recordsets[0];
        if (result.returnValue !== 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json({ message: 'Order Dispatched Succesfully' });

    } catch (error) {
        console.log('Error Dispatching the order', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const receiveDispatch = async (req, res) => {
    // Extracting data from the request body
    const { cType, nDispatchId, nUserId } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('cType', mssql.NVarChar(250), cType)
            .input('nDispatchId', mssql.NVarChar(250), nDispatchId)
            .input('nUserId', mssql.NVarChar(250), nUserId)
            .execute('SP_DispatchReceive');

        const result = await request;

        const recordset = result.recordset[0];
        console.log(result)
        // if (result.returnValue !== 0) {
        //     const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
        //     return res.status(result.returnValue || 400).json({ error: errorMessage });
        // }

        res.status(200).json({ message: recordset.cSuccess });

    } catch (error) {
        console.log('Error Received the order', error);
        res.status(500).json({ error: 'Error Receiving the order' });
    }
};

const updateDispatch = async (req, res) => {
    // Extracting data from the request body
    const { NID, nQty } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('nKarigarId', mssql.NVarChar(250), NID)
            .input('nQty', mssql.NVarChar(250), nQty)
            .execute('SP_DispatchUpdate');

        const result = await request;
        console.log(result)

        const recordset = result.recordsets[0];
        if (result.returnValue !== 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json({ message: 'Order quantity changed Succesfully' });

    } catch (error) {
        console.log('Error Dispatching the order', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteDispatch = async (req, res) => {
    try {
        const { NID } = req.params;

        // Execute the stored procedure to delete Category
        const request = await pool.request()
            .input('NID', mssql.Int, NID)
            .execute('SP_DispatchDelete');

        console.log(request)

        // Check if any rows affected to confirm deletion
        if (request.rowsAffected && request.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Dispatched order deleted successfully' });
        } else {
            res.status(404).json({ error: 'Dispatched order not found' });
        }
    } catch (error) {
        console.error('Error deleting the Dispatched order:', error);
        res.status(500).json({ error: 'Error deleting the Dispatched order' });
    }
};

const getDispatchList = async (req, res) => {
    try {
        const { nStaffId, cSearch } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('cSearch', mssql.NVarChar(250), cSearch)
            .input('nStaffId', mssql.NVarChar(250), nStaffId)
            .execute('SP_StaffDashboard');

        const result = request.recordset

        res.status(200).json({ order: result });

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getDispatchSearch = async (req, res) => {
    try {
        const { nDesignId, nKarigarId } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('nDesignId', mssql.NVarChar(250), nDesignId)
            .input('nKarigarId', mssql.NVarChar(250), nKarigarId)
            .execute('SP_DispatchSearch');

        console.log(request)

        // const result = request.recordset
        const result = request.recordset.map(record => ({
            dDate: record.dDate,
            cDesignNumber: record.cDesignNumber,
            cImages: record.cImages ? Buffer.from(record.cImages).toString('base64') : null,
            orders: JSON.parse(record.orders),
            nDesignId: record.nDesignId
        }));


        res.status(200).json({ order: result });

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getDispatchDesignDetails = async (req, res) => {
    try {
        const { nDesignId, nOrderId } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('nDesignId', mssql.NVarChar(250), nDesignId)
            .input('nOrderId', mssql.NVarChar(250), nOrderId)
            .execute('SP_DispatchDesignDetails');

        console.log(request)

        // const result = request.recordset
        const result = request.recordset.map(record => ({
            nOrderId: record.nOrderId,
            nOrderNo: record.nOrderNo,
            cDesignId: record.cDesignId,
            cDesignNumber: record.cDesignNumber,
            cImages: record.cImages ? Buffer.from(record.cImages).toString('base64') : null,
            cSizes: JSON.parse(record.cSizes),
            cDispatchHistory: JSON.parse(record.cDispatchHistory),
            nDesignId: record.nDesignId
        }));


        res.status(200).json({ order: result });

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getKarigarList = async (req, res) => {
    try {
        const { cType, cSearch, nKarigarId } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('cSearch', mssql.NVarChar(250), cSearch)
            .input('cType', mssql.NVarChar(250), cType)
            .input('nKarigarId', mssql.NVarChar(250), nKarigarId)  
            .execute('SP_KarigarDashboard');

        const result = request.recordset

        res.status(200).json({ order: result });

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getKarigarPendingList = async (req, res) => {
    try {
        const { cSearch, nKarigarId } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('cSearch', mssql.NVarChar(250), cSearch)
            .input('cType', mssql.NVarChar(250), 'Pending')
            .input('nKarigarId', mssql.NVarChar(250), nKarigarId)
            .execute('SP_KarigarDashboard');

        // const result = request.recordset
        const result = request.recordset.map(record => ({
            nOrderId: record.nOrderId,
            nOrderNo: record.nOrderNo,
            dOrderDate: record.dOrderDate,
            designs: JSON.parse(record.designs)
        }));


        res.status(200).json({ order: result });

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getKarigarDDL = async (req, res) => {
    try {
        const { nCustId } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('nCustId', mssql.NVarChar(250), nCustId)
            .execute('SP_KarigarDDL');

        const result = request.recordset

        res.status(200).json({ karigar: result });

    } catch (error) {
        console.error('Error fetching karigar:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addDispatch,
    deleteDispatch,
    getDispatchList,
    getKarigarList,
    getKarigarDDL,
    getDispatchSearch,
    getDispatchDesignDetails,
    updateDispatch,
    getKarigarPendingList,
    receiveDispatch
};   