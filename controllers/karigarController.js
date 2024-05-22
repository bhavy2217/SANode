const mssql = require('mssql');
const pool = require('../database');

const addKarigar = async (req, res) => {
    // Extracting data from the request body
    const { ckarigarname, cdesignseriesno, cmobileno, cpassword, cmobileuniqid, nactive } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('ckarigarname', mssql.NVarChar(250), ckarigarname)
            .input('cdesignseriesno', mssql.NVarChar(mssql.MAX), cdesignseriesno)
            .input('cmobileno', mssql.NVarChar(250), cmobileno)
            .input('cpassword', mssql.NVarChar(100), cpassword)
            .input('cmobileuniqid', mssql.NVarChar(250), cmobileuniqid)
            .input('nactive', mssql.NVarChar(250), nactive)
            .execute('SP_KarigarAdd');

        const result = await request;
        console.log(result)

        const recordset = result.recordsets[0];
        if (result.returnValue == 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json({ message: 'Karigar added successfully' });

    } catch (error) {
        console.log('Error adding the Karigar', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getKarigar = async (req, res) => {
    try {
        const { Search } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('Search', mssql.NVarChar(250), Search)
            .execute('SP_KarigarList');

        const result = request.recordset

        res.status(200).json({ karigar: result });

    } catch (error) {
        console.error('Error fetching karigar:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getKarigarById = async (req, res) => {
    try {
        const { NID } = req.query;

        // Executing the stored procedure to fetch karigar with the NID
        const request = await pool.request()
            .input('NID', mssql.NVarChar(250), NID)
            .execute('SP_KarigarSearch');

        // Check if no records found
        if (!request || !request.recordset || request.recordset.length === 0) {
            return res.status(404).json({ message: 'No Karigar found' });
        }

        // Extracting the first object from the array
        let karigarData = request.recordset[0];

        // Sending the company data
        res.status(200).json(karigarData);
    } catch (error) {
        console.error('Error fetching karigars:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateKarigar = async (req, res) => {
    const { NID } = req.params;
    const { ckarigarname, cdesignseriesno, cmobileno, cpassword, cmobileuniqid, nactive } = req.body;
    try {

        // Executing the SP
        const request = await pool.request()
            .input('NID', mssql.Int, NID)
            .input('ckarigarname', mssql.NVarChar(250), ckarigarname)
            .input('cdesignseriesno', mssql.NVarChar(mssql.MAX), cdesignseriesno)
            .input('cmobileno', mssql.NVarChar(250), cmobileno)
            .input('cpassword', mssql.NVarChar(100), cpassword)
            .input('cmobileuniqid', mssql.NVarChar(250), cmobileuniqid)
            .input('nactive', mssql.NVarChar(250), nactive)
            .execute('SP_KarigarUpdate');

        const result = await request;

        const recordset = result.recordsets[0];
        if (result.returnValue == 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        // Responding with success message
        res.status(200).json({ message: 'Karigar updated successfully' });
    } catch (error) {
        console.error('Error updating the karigar:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteKarigar = async (req, res) => {
    try {
        const { NID } = req.params;

        // Execute the stored procedure to delete Karigar
        const request = await pool.request()
            .input('NID', mssql.Int, NID)
            .execute('SP_KarigarDelete');

        // Check if any rows affected to confirm deletion
        if (request.rowsAffected && request.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Karigar deleted successfully' });
        } else {
            res.status(404).json({ error: 'Karigar not found' });
        }
    } catch (error) {
        console.error('Error deleting the karigar:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    addKarigar,
    getKarigar,
    getKarigarById,
    updateKarigar,
    deleteKarigar
};   