const mssql = require('mssql');
const pool = require('../database');

const addCategory = async (req, res) => {
    // Extracting data from the request body
    const { ccategoryname, cmultisizes, nactive } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('ccategoryname', mssql.NVarChar(250), ccategoryname)
            .input('cmultisizes', mssql.NVarChar(mssql.MAX), cmultisizes)
            .input('nactive', mssql.NVarChar(250), nactive)
            .execute('SP_CategoryAdd');

        const result = await request;
        console.log(result)

        const recordset = result.recordsets[0];
        if (result.returnValue !== 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json({ message: 'Category added successfully' });

    } catch (error) {
        console.log('Error adding the Category', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCategory = async (req, res) => {
    try {
        const { cSearch } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('cSearch', mssql.NVarChar(250), cSearch)
            .execute('SP_CategoryList');

        const result = request.recordset

        res.status(200).json({ Category: result });

    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCategoryName = async (req, res) => {
    try {

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .execute('SP_CategoryNames');

        const result = request.recordset.map(record => ({
            NID: record.NID,
            cCategoryName: record.cCategoryName,
            cThumb: record.cThumb ? Buffer.from(record.cThumb).toString('base64') : null
        }))

        res.status(200).json({ CategoryName: result });

    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { NID } = req.query;

        // Executing the stored procedure to fetch category with the NID
        const request = await pool.request()
            .input('NID', mssql.NVarChar(250), NID)
            .execute('SP_CategorySearch');

        // Check if no records found
        if (!request || !request.recordset || request.recordset.length === 0) {
            return res.status(404).json({ message: 'No Category found' });
        }

        // Extracting the first object from the array
        let categoryData = request.recordset[0];

        // Sending the company data
        res.status(200).json(categoryData);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateCategory = async (req, res) => {
    const { NID } = req.params;
    const { ccategoryname, cmultisizes, nactive } = req.body;
    try {

        // Executing the SP
        const request = await pool.request()
            .input('NID', mssql.Int, NID)
            .input('ccategoryname', mssql.NVarChar(250), ccategoryname)
            .input('cmultisizes', mssql.NVarChar(250), cmultisizes)
            .input('nactive', mssql.NVarChar(250), nactive)
            .execute('SP_CategoryUpdate');

        await request;

        // Responding with success message
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating the category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { NID } = req.params;

        // Execute the stored procedure to delete Category
        const request = await pool.request()
            .input('NID', mssql.Int, NID)
            .execute('SP_CategoryDelete');

        // Check if any rows affected to confirm deletion
        if (request.rowsAffected && request.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        console.error('Error deleting the category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    addCategory,
    getCategory,
    getCategoryName,
    getCategoryById,
    updateCategory,
    deleteCategory
};   