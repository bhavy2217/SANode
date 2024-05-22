const mssql = require('mssql');
const pool = require('../database');

const addCart = async (req, res) => {
    // Extracting data from the request body
    const { nCustId, nDesignId, nSizesQty } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('nCustId', mssql.NVarChar(250), nCustId)
            .input('nDesignId', mssql.NVarChar(mssql.MAX), nDesignId)
            .input('nSizesQty', mssql.NVarChar(mssql.MAX), JSON.stringify(nSizesQty))
            .execute('SP_CartAdd');

        const result = await request;
        console.log(result)

        const recordset = result.recordsets[0];
        if (result.returnValue !== 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json({ message: 'Added to cart successfully' });

    } catch (error) {
        console.log('Error adding to cart', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addCartDashboard = async (req, res) => {
    // Extracting data from the request body
    const { nCustId, nDesignId, nSizesQty } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('nCustId', mssql.NVarChar(250), nCustId)
            .input('nDesignId', mssql.NVarChar(mssql.MAX), nDesignId)
            .input('nSizesQty', mssql.NVarChar(mssql.MAX), JSON.stringify(nSizesQty))
            .execute('SP_CartAddDashboard');

        const result = await request;
        console.log(result)

        const recordset = result.recordsets[0];
        if (result.returnValue !== 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json({ message: 'Added to cart successfully' });

    } catch (error) {
        console.log('Error adding to cart', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCart = async (req, res) => {
    try {
        const { nCustId } = req.query;

        console.log(req.query);
        console.log(nCustId);

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('nCustId', mssql.NVarChar(250), nCustId)
            .execute('SP_CartList');

        console.log(request)

        // const result = request.recordset
        const result = request.recordset.map(record => ({
            nCartId: record.nCartId,
            nDesignId: record.nDesignId,
            cKarigarID: record.cKarigarID,
            cKarigarName: record.cKarigarName,
            cDesignNumber: record.cDesignNumber,
            cImages: record.cImages ? Buffer.from(record.cImages).toString('base64') : null,
            cCategoryID: record.cCategoryID,
            cCategoryName: record.cCategoryName,
            nActive: record.nActive,
            cSizes: JSON.parse(record.cSizes)
        }));


        res.status(200).json({ Cart: result });

    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteCart = async (req, res) => {
    try {
        const { nCartId } = req.params;

        // Execute the stored procedure to delete Category
        const request = await pool.request()
            .input('nCartId', mssql.Int, nCartId)
            .execute('SP_CartDelete');

        console.log(request)

        // Check if any rows affected to confirm deletion
        res.status(200).json({ message: 'Cart deleted successfully' });
        // if (request.rowsAffected && request.rowsAffected[0] > 0) {
        // } else {
        //     res.status(404).json({ error: 'Cart not found' });
        // }
    } catch (error) {
        console.error('Error deleting the cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    addCart,
    addCartDashboard,
    getCart,
    deleteCart
};   