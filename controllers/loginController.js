const mssql = require('mssql');
const pool = require('../database');
const { default: axios } = require('axios');


const authUser = async (req, res) => {
    // Extracting data from the request body
    const { cMobile, cPassword, nUserType } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('cMobile', mssql.NVarChar(250), cMobile)
            .input('cPassword', mssql.NVarChar(250), cPassword)
            .input('nUserType', mssql.NVarChar(250), nUserType)
            .execute('sp_Login');

        const result = await request;
        console.log(result)
        const recordset = result.recordsets[0];
        // console.log(recordset)
        if (result.returnValue === 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Please Check Username and Password!';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }


        res.status(200).json({ message: 'User authenticated successfully!', NID: result.recordset[0].NID });

    } catch (error) {
        console.log('Error authenticating user', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const authKarigar = async (req, res) => {
    // Extracting data from the request body
    const { cMobile, cPassword } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('cMobile', mssql.NVarChar(250), cMobile)
            .input('cPassword', mssql.NVarChar(250), cPassword)
            .input('nUserType', mssql.NVarChar(250), "3")
            .execute('sp_Login');

        const result = await request;
        console.log(result)
        const recordset = result.recordsets[0];
        // console.log(recordset)
        if (result.returnValue === 0) {
            const errorMessage = recordset && recordset.length > 0 ? recordset[0].cMessage : 'Please Check Username and Password!';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }

        res.status(200).json({ message: 'User authenticated successfully!', NID: recordset[0].NID, cKarigarName: recordset[0].cKarigarName });

    } catch (error) {
        console.log('Error authenticating user', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const authCustomer = async (req, res) => {
    // Extracting data from the request body
    const { cMobileNo, cPassword } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('cMobileNo', mssql.NVarChar(250), cMobileNo)
            .input('cPassword', mssql.NVarChar(250), cPassword)
            .execute('sp_LoginCustomer');

        const result = await request;
        console.log(result)
        //console.log(result)
        //console.log(`recordset: ${recordset["NID"]}`)
        if (result.returnValue === 0) {
            const errorMessage = result.recordset && result.recordset.length > 0 ? result.recordset[0].cMessage : 'Please Check Username and Password!';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }
        else {
            const recordset = result.recordset[0];
            const userid = recordset.NID;
            res.status(200).json({ message: 'User authenticated successfully!', nid: userid });
        }

    } catch (error) {
        console.log('Error authenticating user', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const verifyOTP = async (req, res) => {
    // Extracting data from the request body
    const { cMobileNo, cOTP, cMobUniqId } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('cMobileNo', mssql.NVarChar(250), cMobileNo)
            .input('cOTP', mssql.NVarChar(250), cOTP)
            .input('cMobUniqId', mssql.NVarChar(250), cMobUniqId)
            .execute('sp_OTPVerification');

        const result = await request;

        console.log(result);

        // Check the returnValue
        if (result.returnValue === 0) {
            // If returnValue is 0, send error message
            return res.status(400).json({ error: 'Please enter valid OTP!' });
        } else {
            // If returnValue is not 0, send success message
            return res.status(200).json({ message: 'User authenticated successfully!' });
        }
    } catch (error) {
        console.log('Error authenticating user', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const authCustomerNew = async (req, res) => {
    // Extracting data from the request body
    const { cMobileNo, cPassword, cMobUniqId } = req.body;

    try {
        // Executing the SP
        const request = pool.request()
            .input('cMobileNo', mssql.NVarChar(250), cMobileNo)
            .input('cPassword', mssql.NVarChar(250), cPassword)
            .input('cMobUniqId', mssql.NVarChar(250), cMobUniqId)
            .execute('sp_LoginCustomer_OTP');

        const result = await request;
        console.log(result)
        const smsApi = result.recordset[0].SMSApi;
        const isNewLogin = result.recordset[0].nIsNewLogin;

        // Check if smsApi exists before making the axios call
        if (smsApi) {
            const smsResponse = await axios.get(smsApi);
            console.log(smsApi);
            // Handle smsResponse if needed
        }

        const userid = result.recordset[0].NID;

        if (result.returnValue === 0) {
            const errorMessage = result.recordset && result.recordset.length > 0 ? result.recordset[0].AuthenticationStatus : 'Please Check Username and Password!';
            return res.status(result.returnValue || 400).json({ error: errorMessage });
        }
        else {
            const recordset = result.recordset[0];
            const userid = recordset.NID;
            // res.status(200).json({ message: 'User authenticated successfully!', nid: userid });
            res.status(200).json({ message: 'User authenticated successfully!', nid: userid, isNewLogin: isNewLogin });
        }
    } catch (error) {
        console.log('Error authenticating user', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    authUser,
    authCustomer,
    authCustomerNew,
    authKarigar,
    verifyOTP
};   