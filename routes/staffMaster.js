const express = require('express');
const { addStaff, getStaff, getStaffById, updateStaff, deleteStaff, getStaffDashboard, getStaffReportPending, getStaffReportReceived, getKarigarDDL } = require('../controllers/staffController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Staff Master
 *   description: Operations related to add staff of the company 
 */

/**
 * @swagger
 * /api/staff/add:
 *   post:
 *     tags:
 *       - Staff Master
 *     summary: Add a New staff
 *     description: Create a new staff record in the system.
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cStaffName: 
 *                 type: string  
 *               nType:
 *                 type: string 
 *               cMobile:
 *                 type: string 
 *               cPassword:
 *                 type: string 
 *               nActive:
 *                 type: string
 *               cCustId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Staff added successfully 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to add Staff
 */

router.post('/add', addStaff);

/**
 * @swagger
 * /api/staff/list:
 *   get:
 *     tags:
 *       - Staff Master
 *     summary: Get a List of staff
 *     description: Retrieve a list of staff from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: cSearch
 *         schema:
 *           type: string
 *         description: Search string to filter staff.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get staff
 */

router.get('/list', getStaff);

/**
 * @swagger
 * /api/staff/listById:
 *   get:
 *     tags:
 *       - Staff Master
 *     summary: Get Staff Details by ID
 *     description: Retrieve detailed information about a staff by its ID.
 *     parameters:
 *       - in: query
 *         name: NID 
 *         schema:
 *           type: string
 *         description: NID of the staff to retrieve.
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Failed to get staff details
 */

router.get('/listById', getStaffById);

/**
 * @swagger
 * /api/staff/dashboard:
 *   get:
 *     tags:
 *       - Staff Master
 *     summary: Get Staff Details by ID
 *     description: Retrieve detailed information about a staff by its ID.
 *     parameters:
 *       - in: query
 *         name: nStaffId 
 *         schema:
 *           type: string
 *       - in: query
 *         name: cSearch 
 *         schema:
 *           type: string
 *       - in: query
 *         name: nKarigarId 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Failed to get staff details
 */

router.get('/dashboard', getStaffDashboard);

/**
 * @swagger
 * /api/staff/StaffReportPending:
 *   get:
 *     tags:
 *       - Staff Master
 *     summary: Get Staff Details by ID
 *     description: Retrieve detailed information about a staff by its ID.
 *     parameters:
 *       - in: query
 *         name: nKarigarId  
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Failed to get staff details
 */

router.get('/StaffReportPending', getStaffReportPending);

/**
 * @swagger
 * /api/staff/StaffReportReceived:
 *   get:
 *     tags:
 *       - Staff Master
 *     summary: Get Staff Details by ID
 *     description: Retrieve detailed information about a staff by its ID.
 *     parameters:
 *       - in: query
 *         name: nKarigarId  
 *         schema:
 *           type: string
 *       - in: query
 *         name: dFromDate  
 *         schema:
 *           type: string
 *       - in: query
 *         name: dToDate  
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Failed to get staff details
 */

router.get('/StaffReportReceived', getStaffReportReceived);

/**
 * @swagger
 * /api/staff/update/{NID}:
 *   put:
 *     tags:
 *       - Staff Master
 *     summary: Update an Existing staff
 *     description: Update an existing staff's information in the database.
 *     parameters:
 *       - in: path
 *         name: NID
 *         required: true
 *         description: NID of the staff to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               cStaffName: 
 *                 type: string  
 *               nType:
 *                 type: string 
 *               cMobile:
 *                 type: string 
 *               cPassword:
 *                 type: string 
 *               nActive:
 *                 type: string
 *     responses:
 *       200:
 *         description: Staff updated successfully
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Failed to update staff
 */

router.put('/update/:NID', updateStaff);

/**
 * @swagger
 * /api/staff/delete/{NID}:
 *   delete:
 *     tags:
 *       - Staff Master
 *     summary: Delete a Staff
 *     description: Delete a staff from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: NID
 *         required: true
 *         description: NID of the staff to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff deleted successfully
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Failed to delete staff
 */

router.delete('/delete/:NID', deleteStaff);

/**
 * @swagger
 * /api/staff/karigarDDL:
 *   get:
 *     tags:
 *       - Karigar Dropdown
 *     summary: Get a List of karigar based on order
 *     description: Retrieve a list of Karigar based on Dispatch Order from the database
 *     parameters:
 *       - in: query
 *         name: nStaffId
 *         schema:
 *           type: string
 *         description: Search string to filter Dispatch Order.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get karigar
 */
router.get('/karigarDDL', getKarigarDDL);

module.exports = router; 