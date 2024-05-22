const mssql = require('mssql');
const pool = require('../database');

const addToWishlist = async (req, res) => {
    // Extracting data from the request body
    const { nCustId, nDesignId, nSizesQty } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('nCustId', mssql.NVarChar(250), nCustId)
            .input('nDesignId', mssql.NVarChar(250), nDesignId)
            .execute('SP_FavouriteAdd');

        const result = await request;
        console.log(result)

        const recordset = result.recordsets[0];
        if (result.returnValue !== 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json({ message: 'Added to wishlist successfully' });

    } catch (error) {
        console.log('Error adding to wishlist', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getWishlist = async (req, res) => {
    try {
        const { nCustId } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('nCustId', mssql.NVarChar(250), nCustId)
            .execute('SP_FavouriteList');

        // const result = request.recordset
        const result = request.recordset.map(record => ({
            NID: record.NID,
            nDesignId: record.nDesignId,
            cKarigarID: record.cKarigarID,
            cKarigarName: record.cKarigarName,
            cDesignNumber: record.cDesignNumber,
            cImages: record.cImages ? Buffer.from(record.cImages).toString('base64') : null,
            cCategoryID: record.cCategoryID,
            cCategoryName: record.cCategoryName,
            nActive: record.nActive,
            nIsCart: record.nIsCart,

        }));


        res.status(200).json({ Wishlist: result });

    } catch (error) {
        console.error('Error fetching Wishlist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteWishlist = async (req, res) => {
    try {
        const { nCustId, nDesignId } = req.query;

        const request = await pool.request()
            .input('nCustId', mssql.Int, nCustId)
            .input('nDesignId', mssql.Int, nDesignId)
            .execute('SP_FavouriteDelete');

        console.log(request)

        // Check if any rows affected to confirm deletion
        if (request.rowsAffected && request.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Removed from wishlist successfully' });
        } else {
            res.status(404).json({ error: 'Wishlist not found' });
        }
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    addToWishlist,
    getWishlist,
    deleteWishlist
};   