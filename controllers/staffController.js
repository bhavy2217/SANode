const mssql = require('mssql');
const pool = require('../database');


const addStaff = async (req, res) => {
    let { cStaffName, nType, cMobile, cPassword, nActive, cCustId } = req.body;

    cCustId = Array.isArray(cCustId) ? cCustId.join(',') : cCustId;

    console.log(cCustId)

    try {
        // Executing the SP
        const request = pool.request()
            .input('cStaffName', mssql.NVarChar(250), cStaffName)
            .input('nType', mssql.NVarChar(mssql.MAX), nType)
            .input('cMobile', mssql.NVarChar(250), cMobile)
            .input('cPassword', mssql.NVarChar(100), cPassword)
            .input('nActive', mssql.NVarChar(250), nActive)
            .input('nCustId', mssql.NVarChar(250), cCustId)
            .execute('SP_StaffAdd');

        const result = await request;
        console.log(result)

        const recordset = result.recordsets[0];
        if (result.returnValue == 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json({ message: 'Staff added successfully' });

    } catch (error) {
        console.log('Error adding the Staff', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getStaff = async (req, res) => {
    try {
        const { cSearch } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('cSearch', mssql.NVarChar(250), cSearch)
            .execute('SP_StaffList');

        const result = request.recordset

        res.status(200).json({ staff: result });

    } catch (error) {
        console.error('Error fetching staff:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getStaffDashboard = async (req, res) => {
    try {
        const { nStaffId, cSearch, nKarigarId } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('nStaffId', mssql.NVarChar(250), nStaffId)
            .input('cSearch', mssql.NVarChar(250), cSearch)
            .input('nKarigarId', mssql.NVarChar(250), nKarigarId)
            .execute('SP_StaffDashboard');

        // const result = request.recordset
        const result = request.recordset.map(record => ({
            nOrderId: record.nOrderId,
            nOrderNo: record.nOrderNo,
            dOrderDate: record.dOrderDate,
            designs: JSON.parse(record.designs),
        }));

        res.status(200).json({ dashboard: result });

    } catch (error) {
        console.error('Error fetching staff:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getStaffReportPending = async (req, res) => {
    try {
        const { nKarigarId } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('cType', mssql.NVarChar(250), 'pending')
            .input('nKarigarId', mssql.NVarChar(250), nKarigarId)
            .execute('SP_StaffReport');

        // const result = request.recordset
        const result = request.recordset.map(record => ({
            nOrderId: record.nOrderId,
            nOrderNo: record.nOrderNo,
            dOrderDate: record.dOrderDate,
            designs: JSON.parse(record.designs),
        }));

        res.status(200).json({ Report: result });

    } catch (error) {
        console.error('Error fetching staff:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getStaffReportReceived = async (req, res) => {
    try {
        const { nKarigarId, dFromDate, dToDate } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('cType', mssql.NVarChar(250), 'received')
            .input('nKarigarId', mssql.NVarChar(250), nKarigarId)
            .input('dFromDate', mssql.NVarChar(250), dFromDate)
            .input('dToDate', mssql.NVarChar(250), dToDate)
            .execute('SP_StaffReport');

        // const result = request.recordset
        const result = request.recordset.map(record => ({
            nOrderId: record.nOrderId,
            nOrderNo: record.nOrderNo,
            dOrderDate: record.dOrderDate,
            designs: JSON.parse(record.designs),
        }));

        res.status(200).json({ Report: result });

    } catch (error) {
        console.error('Error fetching staff:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getStaffById = async (req, res) => {
    try {
        const { NID } = req.query;

        // Executing the stored procedure to fetch staff with the NID
        const request = await pool.request()
            .input('NID', mssql.NVarChar(250), NID)
            .execute('SP_StaffSearch');

        if (!request || !request.recordset || request.recordset.length === 0) {
            return res.status(404).json({ message: 'No staff found' });
        }

        let staffData = request.recordset[0];

        if (staffData.nCustId) {
            staffData.cCustId = staffData.nCustId.split(',').map(id => id.trim());
        } else {
            staffData.cCustId = []; // Sending blank array if nCustId is null
        }

        delete staffData.nCustId;

        // Sending the company data
        res.status(200).json(staffData);
    } catch (error) {
        console.error('Error fetching staff:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const updateStaff = async (req, res) => {
    const { NID } = req.params;

    let { cStaffName, nType, cMobile, cPassword, nActive, cCustId } = req.body;

    cCustId = Array.isArray(cCustId) ? cCustId.join(',') : cCustId;
    try {

        // Executing the SP
        const request = await pool.request()
            .input('NID', mssql.Int, NID)
            .input('cStaffName', mssql.NVarChar(250), cStaffName)
            .input('nType', mssql.NVarChar(mssql.MAX), nType)
            .input('cMobile', mssql.NVarChar(250), cMobile)
            .input('cPassword', mssql.NVarChar(100), cPassword)
            .input('nActive', mssql.NVarChar(250), nActive)
            .input('nCustId', mssql.NVarChar(250), cCustId)
            .execute('SP_StaffUpdate');

        const result = await request;
        //console.log(result)

        const recordset = result.recordsets[0];
        if (result.returnValue == 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Unknown error';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        // Responding with success message
        res.status(200).json({ message: 'Staff updated successfully' });
    } catch (error) {
        console.error('Error updating the Staff:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteStaff = async (req, res) => {
    try {
        const { NID } = req.params;

        // Execute the stored procedure to delete Karigar
        const request = await pool.request()
            .input('NID', mssql.Int, NID)
            .execute('SP_StaffDelete');

        // Check if any rows affected to confirm deletion
        if (request.rowsAffected && request.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Staff deleted successfully' });
        } else {
            res.status(404).json({ error: 'Staff not found' });
        }
    } catch (error) {
        console.error('Error deleting the staff:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getKarigarDDL = async (req, res) => {
    try {
        const { nStaffId } = req.query;

        // Executing the stored procedure to fetch company
        const request = await pool.request()
            .input('nStaffId', mssql.NVarChar(250), nStaffId)
            .execute('SP_KarigarDDL');

        const result = request.recordset

        res.status(200).json({ karigar: result });

    } catch (error) {
        console.error('Error fetching karigar:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addStaff,
    getStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
    getStaffDashboard,
    getStaffReportPending,
    getStaffReportReceived,
    getKarigarDDL
}