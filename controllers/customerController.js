const mssql = require('mssql');
const pool = require('../database');


const addCustomer = async (req, res) => {
    // Extracting data from the request body
    const { ccustomername, cmobileno, cpassword, cmobileuniqid, nactive } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('ccustomername', mssql.NVarChar(250), ccustomername)
            .input('cmobileno', mssql.NVarChar(250), cmobileno)
            .input('cpassword', mssql.NVarChar(100), cpassword)
            .input('cmobileuniqid', mssql.NVarChar(250), cmobileuniqid)
            .input('nactive', mssql.NVarChar(250), nactive)
            .execute('SP_CustomerAdd');

        const result = await request;
        //console.log(result)

        const recordset = result.recordsets[0];
        //console.log(recordset); 
        if (result.returnValue == 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json({ message: 'Customer added successfully' });

    } catch (error) {
        console.log('Error adding the Customer', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCustomer = async (req, res) => {
    try {
        const { cSearch } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('cSearch', mssql.NVarChar(250), cSearch)
            .execute('SP_CustomerList');

        const result = request.recordset

        res.status(200).json({ customer: result });

    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const { NID } = req.query;

        // Executing the stored procedure to fetch customer with the NID
        const request = await pool.request()
            .input('NID', mssql.NVarChar(250), NID)
            .execute('SP_CustomerSearch');

        // Check if no records found
        if (!request || !request.recordset || request.recordset.length === 0) {
            return res.status(404).json({ message: 'No Customer found' });
        }

        // Extracting the first object from the array
        let customerData = request.recordset[0];

        // Sending the company data
        res.status(200).json(customerData);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCustomer = async (req, res) => {
    const { NID } = req.params;
    const { ccustomername, cmobileno, cpassword, cmobileuniqid, nactive } = req.body;
    try {

        // Executing the SP
        const request = await pool.request()
            .input('NID', mssql.Int, NID)
            .input('ccustomername', mssql.NVarChar(250), ccustomername)
            .input('cmobileno', mssql.NVarChar(250), cmobileno)
            .input('cpassword', mssql.NVarChar(100), cpassword)
            .input('cmobileuniqid', mssql.NVarChar(250), cmobileuniqid)
            .input('nactive', mssql.NVarChar(250), nactive)
            .execute('SP_CustomerUpdate');

        const result = await request;
        //console.log(result)

        const recordset = result.recordsets[0];
        //console.log(recordset); 
        if (result.returnValue == 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        // Responding with success message
        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        console.error('Error updating the customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const { NID } = req.params;

        // Execute the stored procedure to delete Customer
        const request = await pool.request()
            .input('NID', mssql.Int, NID)
            .execute('SP_CustomerDelete');

        // Check if any rows affected to confirm deletion
        if (request.rowsAffected && request.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Customer deleted successfully' });
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        console.error('Error deleting the customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    addCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};   