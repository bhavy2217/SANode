const express = require('express');
const { addSize, getSize, getSizeById, updateSize, deleteSize } = require('../controllers/sizeController');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Size Master
 *   description: Operations related to add size of the product 
 */

/**
 * @swagger
 * /api/size/add:
 *   post:
 *     tags:
 *       - Size Master
 *     summary: Add a New Size
 *     description: Create a new Size record in the system.
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cSizeName: 
 *                 type: string   
 *               nActive:
 *                 type: string
 *     responses:
 *       200:
 *         description: Size added successfully 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to add Size
 */

router.post('/add', addSize);

/**
 * @swagger
 * /api/size/list:
 *   get:
 *     tags:
 *       - Size Master
 *     summary: Get a List of size
 *     description: Retrieve a list of Size name from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: cSearch
 *         schema:
 *           type: string
 *         description: Search string to filter size name.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get size
 */

router.get('/list', getSize);

/**
 * @swagger
 * /api/size/listById:
 *   get:
 *     tags:
 *       - Size Master
 *     summary: Get Size Name by ID
 *     description: Retrieve detailed information about a size by its ID.
 *     parameters:
 *       - in: query
 *         name: NID 
 *         schema:
 *           type: string
 *         description: NID of the size name to retrieve.
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Size Name not found
 *       500:
 *         description: Failed to get size details
 */

router.get('/listById', getSizeById);

/**
 * @swagger
 * /api/size/update/{NID}:
 *   put:
 *     tags:
 *       - Size Master
 *     summary: Update an Existing size name
 *     description: Update an existing size's information in the database.
 *     parameters:
 *       - in: path
 *         name: NID
 *         required: true
 *         description: NID of the size to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               cSizeName: 
 *                 type: string   
 *               nActive:
 *                 type: string
 *     responses:
 *       200:
 *         description: Size updated successfully
 *       404:
 *         description: Size not found
 *       500:
 *         description: Failed to update Size 
 */

router.put('/update/:NID', updateSize);

/**
 * @swagger
 * /api/size/delete/{NID}:
 *   delete:
 *     tags:
 *       - Size Master
 *     summary: Delete a Size
 *     description: Delete a size from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: NID
 *         required: true
 *         description: NID of the size to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Size deleted successfully
 *       404:
 *         description: Size not found
 *       500:
 *         description: Failed to delete Size
 */

router.delete('/delete/:NID', deleteSize);


module.exports = router;