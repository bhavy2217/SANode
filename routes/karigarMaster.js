const express = require('express');
const router = express.Router();
const { addKarigar, getKarigar, getKarigarById, updateKarigar, deleteKarigar } = require('../controllers/karigarController');

/**
 * @swagger
 * tags:
 *   name: Karigar Master
 *   description: Operations related to add karigar of the company 
 */

/**
 * @swagger
 * /api/karigar/add:
 *   post:
 *     tags:
 *       - Karigar Master
 *     summary: Add a New Karigar
 *     description: Create a new karigar record in the system.
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ckarigarname: 
 *                 type: string  
 *               cdesignseriesno:
 *                 type: string 
 *               cmobileno:
 *                 type: string 
 *               cpassword:
 *                 type: string 
 *               cmobileuniqid:
 *                 type: string 
 *               nactive:
 *                 type: string
 *     responses:
 *       200:
 *         description: Karigar added successfully 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to add Karigar
 */

router.post('/add', addKarigar);

/**
 * @swagger
 * /api/karigar/list:
 *   get:
 *     tags:
 *       - Karigar Master
 *     summary: Get a List of karigar
 *     description: Retrieve a list of karigars from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: Search
 *         schema:
 *           type: string
 *         description: Search string to filter karigars.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get karigars
 */

router.get('/list', getKarigar); 

/**
 * @swagger
 * /api/karigar/listById:
 *   get:
 *     tags:
 *       - Karigar Master
 *     summary: Get Karigar Details by ID
 *     description: Retrieve detailed information about a karigar by its ID.
 *     parameters:
 *       - in: query
 *         name: NID 
 *         schema:
 *           type: string
 *         description: NID of the karigar to retrieve.
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Karigar not found
 *       500:
 *         description: Failed to get karigar details
 */

router.get('/listById', getKarigarById);

/**
 * @swagger
 * /api/karigar/update/{NID}:
 *   put:
 *     tags:
 *       - Karigar Master
 *     summary: Update an Existing karigar
 *     description: Update an existing karigar's information in the database.
 *     parameters:
 *       - in: path
 *         name: NID
 *         required: true
 *         description: NID of the karigar to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               ckarigarname: 
 *                 type: string  
 *               cdesignseriesno:
 *                 type: string 
 *               cmobileno:
 *                 type: string 
 *               cpassword:
 *                 type: string 
 *               cmobileuniqid:
 *                 type: string 
 *               nactive:
 *                 type: string
 *     responses:
 *       200:
 *         description: Karigar updated successfully
 *       404:
 *         description: Karigar not found
 *       500:
 *         description: Failed to update Karigar 
 */

router.put('/update/:NID', updateKarigar);

/**
 * @swagger
 * /api/karigar/delete/{NID}:
 *   delete:
 *     tags:
 *       - Karigar Master
 *     summary: Delete a Karigar
 *     description: Delete a karigar from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: NID
 *         required: true
 *         description: NID of the karigar to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Karigar deleted successfully
 *       404:
 *         description: Karigar not found
 *       500:
 *         description: Failed to delete karigar
 */

router.delete('/delete/:NID', deleteKarigar);


module.exports = router;
