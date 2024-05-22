const mssql = require('mssql');
const pool = require('../database');

const addSize = async (req, res) => {
    // Extracting data from the request body
    const { cSizeName, nActive } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('cSizeName', mssql.NVarChar(250), cSizeName)
            .input('nActive', mssql.NVarChar(250), nActive)
            .execute('SP_SizeAdd');

        const result = await request;
        //console.log(result)

        const recordset = result.recordsets[0];
        if (result.returnValue == 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json({ message: 'Size added successfully' });

    } catch (error) {
        console.log('Error adding the Size', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSize = async (req, res) => {
    try {
        const { cSearch } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('cSearch', mssql.NVarChar(250), cSearch)
            .execute('SP_SizeList');

        const result = request.recordset

        res.status(200).json({ size: result });

    } catch (error) {
        console.error('Error fetching size:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSizeById = async (req, res) => {
    try {
        const { NID } = req.query;

        // Executing the stored procedure to fetch size with the NID
        const request = await pool.request()
            .input('NID', mssql.NVarChar(250), NID)
            .execute('SP_SizeSearch');

        // Check if no records found
        if (!request || !request.recordset || request.recordset.length === 0) {
            return res.status(404).json({ message: 'No Size found' });
        }

        // Extracting the first object from the array
        let sizeData = request.recordset[0];

        // Sending the size data
        res.status(200).json(sizeData);
    } catch (error) {
        console.error('Error fetching size:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateSize = async (req, res) => {
    const { NID } = req.params;
    const { cSizeName, nActive } = req.body;
    try {

        // Executing the SP
        const request = await pool.request()
            .input('NID', mssql.Int, NID)
            .input('cSizeName', mssql.NVarChar(250), cSizeName)
            .input('nActive', mssql.NVarChar(250), nActive)
            .execute('SP_SizeUpdate');

        const result = await request;
        //console.log(result)

        const recordset = result.recordsets[0];
        if (result.returnValue == 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        // Responding with success message
        res.status(200).json({ message: 'Size name updated successfully' });
    } catch (error) {
        console.error('Error updating the size:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteSize = async (req, res) => {
    try {
        const { NID } = req.params;

        // Execute the stored procedure to delete Size
        const request = await pool.request()
            .input('NID', mssql.Int, NID)
            .execute('SP_SizeDelete');

        // Check if any rows affected to confirm deletion
        if (request.rowsAffected && request.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Size deleted successfully' });
        } else {
            res.status(404).json({ error: 'Size not found' });
        }
    } catch (error) {
        console.error('Error deleting the Size:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    addSize,
    getSize,
    getSizeById,
    updateSize,
    deleteSize
};   