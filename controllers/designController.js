const mssql = require('mssql');
const pool = require('../database');

const addDesign = async (req, res) => {
    const { ckarigarID, cdesignnumber, ccategoryID, nactive, cSizesRates } = req.body;

    try {
        // if (!req.files || !req.files.length) {
        //     return res.status(400).json({ error: 'No images uploaded' });
        // }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No images uploaded' });
        }

        const cimages = req.files['cimages'][0].buffer;
        const cFullSizeImage = req.files['cFullSizeImage'][0].buffer;
        const cThumb = req.files['cThumb'][0].buffer;

        // console.log('cimages', cimages)
        // console.log('cFullSizeImage', cFullSizeImage)
        // console.log('cThumb', cThumb)
        const request = pool.request();

        request.input('ckarigarID', mssql.BigInt, ckarigarID);
        request.input('cdesignnumber', mssql.NVarChar(250), cdesignnumber);
        request.input('cimages', mssql.VarBinary, cimages);
        request.input('cFullSizeImage', mssql.VarBinary, cFullSizeImage);
        request.input('cThumb', mssql.VarBinary, cThumb);
        request.input('ccategoryID', mssql.BigInt, ccategoryID);
        request.input('nactive', mssql.Int, nactive);
        request.input('cSizesRates', mssql.NVarChar('max'), cSizesRates);

        const result = await request.execute('sp_DesignAdd');

        const recordset = result.recordsets[0];
        if (result.returnValue !== 1) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json({ message: 'Design added successfully' });

    } catch (error) {
        console.log('Error adding the Design', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getDesign = async (req, res) => {
    try {
        const { cSearch } = req.query;

        const request = await pool.request()
            .input('cSearch', mssql.NVarChar(250), cSearch)
            .execute('sp_DesignList');

        const result = request.recordset.map(record => ({
            NID: record.NID,
            cKarigarID: record.cKarigarID,
            cKarigarName: record.cKarigarName,
            cDesignNumber: record.cDesignNumber,
            cImages: record.cImages ? Buffer.from(record.cImages).toString('base64') : null,
            cCategoryID: record.cCategoryID,
            cCategoryName: record.cCategoryName,
            nActive: record.nActive,
            cSizes: JSON.parse(record.cSizes)
        }));

        res.status(200).json({ design: result });

    } catch (error) {
        console.error('Error fetching karigar:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCustomerDashboard = async (req, res) => {
    try {
        const { cSearch, nCustId } = req.query;

        const request = await pool.request()
            .input('cSearch', mssql.NVarChar(250), cSearch)
            .input('nCustId', mssql.NVarChar(250), nCustId)
            .execute('sp_CustomerDashboard');

        const result = request.recordset.map(record => ({
            NID: record.NID,
            cKarigarID: record.cKarigarID,
            cKarigarName: record.cKarigarName,
            cDesignNumber: record.cDesignNumber,
            cImages: record.cImages ? Buffer.from(record.cImages).toString('base64') : null,
            cCategoryID: record.cCategoryID,
            cCategoryName: record.cCategoryName,
            nActive: record.nActive,
            cSizes: JSON.parse(record.cSizes),
            IsFavourite: record.IsFavourite,
            IsNew: record.isNew,
        }));

        res.status(200).json({ design: result });

    } catch (error) {
        console.error('Error fetching karigar:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getDesignById = async (req, res) => {
    try {
        const { NID } = req.query;

        // Executing the stored procedure to fetch design with the NID
        const request = await pool.request()
            .input('NID', mssql.NVarChar(250), NID)
            .execute('sp_DesignSearch');

        const result = request.recordset.map(record => ({
            NID: record.NID,
            cKarigarID: record.cKarigarID,
            cKarigarName: record.cKarigarName,
            cDesignNumber: record.cDesignNumber,
            cImages: record.cImages ? Buffer.from(record.cImages).toString('base64') : null,
            cCategoryID: record.cCategoryID,
            cCategoryName: record.cCategoryName,
            nActive: record.nActive,
            cSizes: JSON.parse(record.cSizes) // Parse cSizes from string to array
        }));

        // Check if no records found
        if (!request || !request.recordset || request.recordset.length === 0) {
            return res.status(404).json({ message: 'No design found' });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching design:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateDesign = async (req, res) => {
    const { NID } = req.params;
    const { ckarigarID, cdesignnumber, ccategoryID, nactive, cSizesRates } = req.body;

    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No images uploaded' });
        }

        const cimages = req.files['cimages'][0].buffer;
        const cFullSizeImage = req.files['cFullSizeImage'][0].buffer;
        const cThumb = req.files['cThumb'][0].buffer;

        const request = pool.request();

        request.input('NID', mssql.Int, NID)
        request.input('ckarigarID', mssql.BigInt, ckarigarID);
        request.input('cdesignnumber', mssql.NVarChar(250), cdesignnumber);
        request.input('cimages', mssql.VarBinary, cimages);
        request.input('cFullSizeImage', mssql.VarBinary, cFullSizeImage);
        request.input('cThumb', mssql.VarBinary, cThumb);
        request.input('ccategoryID', mssql.BigInt, ccategoryID);
        request.input('nactive', mssql.Int, nactive);
        request.input('cSizesRates', mssql.NVarChar('max'), cSizesRates);

        const result = await request.execute('sp_DesignUpdate');

        const recordset = result.recordsets[0];
        if (result.returnValue !== 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json({ message: 'Design updated successfully' });

    } catch (error) {
        console.log('Error adding the Design', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteDesign = async (req, res) => {
    try {
        const { NID } = req.params;

        // Execute the stored procedure to delete design
        const request = await pool.request()
            .input('NID', mssql.Int, NID)
            .execute('sp_DesignDelete');

        // Check if any rows affected to confirm deletion
        if (request.rowsAffected && request.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Design deleted successfully' });
        } else {
            res.status(404).json({ error: 'Design not found' });
        }
    } catch (error) {
        console.error('Error deleting the design:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    addDesign,
    getDesign,
    getDesignById,
    updateDesign,
    deleteDesign,
    getCustomerDashboard
};