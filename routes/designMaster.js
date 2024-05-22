const express = require('express');
const { addDesign, getDesign, getDesignById, updateDesign, deleteDesign, getCustomerDashboard } = require('../controllers/designController');
const router = express.Router();

/**
 * @swagger
 * tags: 
 *   name: Design Master
 *   description: Operations related to add customer of the company 
 */

/**
 * @swagger
 * /api/design/add:
 *   post:
 *     tags:
 *       - Design Master
 *     summary: Add a New design
 *     description: Create a new design record in the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: ckarigarID
 *         type: string
 *         required: true
 *         description: The ID of the karigar.
 *       - in: formData
 *         name: cdesignnumber
 *         type: string
 *         required: true
 *         description: The design number.
 *       - in: formData
 *         name: ccategoryID
 *         type: string
 *         required: true
 *         description: The ID of the category.
 *       - in: formData
 *         name: nactive
 *         type: string
 *         required: true
 *         description: Active status.
 *       - in: formData
 *         name: cimages
 *         type: array  
 *         items:
 *           type: file
 *         required: true
 *         description: Image file(s) for the design.
 *       - in: formData
 *         name: cFullSizeImage
 *         type: array  
 *         items:
 *           type: file
 *         required: true
 *         description: Image file(s) for the design.
 *       - in: formData
 *         name: cThumb
 *         type: array  
 *         items:
 *           type: file
 *         required: true
 *         description: Image file(s) for the design.
 *       - in: formData
 *         name: cSizesRates
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             size:
 *               type: string
 *             price:
 *               type: string
 *         required: true 
 *     responses:
 *       200:
 *         description: Design added successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to add Design
 */

router.post('/add', addDesign);

/**
 * @swagger
 * /api/design/list:
 *   get:
 *     tags:
 *       - Design Master
 *     summary: Get a List of Design
 *     description: Retrieve a list of design from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: cSearch
 *         schema:
 *           type: string
 *         description: Search string to filter design.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get design
 */

router.get('/list', getDesign);


/**
 * @swagger
 * /api/design/listById:
 *   get:
 *     tags:
 *       - Design Master
 *     summary: Get Design Details by ID
 *     description: Retrieve detailed information about a design by its ID.
 *     parameters:
 *       - in: query
 *         name: NID 
 *         schema:
 *           type: string
 *         description: NID of the design to retrieve.
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Design not found
 *       500:
 *         description: Failed to get design details
 */

router.get('/listById', getDesignById);
/**
 * @swagger
 * /api/design/update/{NID}:
 *   put:
 *     tags:
 *       - Design Master
 *     summary: Update an Existing design
 *     description: Update an existing design's information in the database.
 *     parameters:
 *       - in: path
 *         name: NID
 *         required: true
 *         description: NID of the design to update
 *         schema:
 *           type: string
 *       - in: formData
 *         name: ckarigarID
 *         type: string
 *         required: true
 *         description: The ID of the karigar.
 *       - in: formData
 *         name: cdesignnumber
 *         type: string
 *         required: true
 *         description: The design number.
 *       - in: formData
 *         name: ccategoryID
 *         type: string
 *         required: true
 *         description: The ID of the category.
 *       - in: formData
 *         name: nactive
 *         type: string
 *         required: true
 *         description: Active status.
 *       - in: formData
 *         name: cimages
 *         type: array
 *         items:
 *           type: file
 *         required: true
 *         description: Image file(s) for the design.
 *       - in: formData
 *         name: cFullSizeImage
 *         type: array  
 *         items:
 *           type: file
 *         required: true
 *         description: Image file(s) for the design.
 *       - in: formData
 *         name: cThumb
 *         type: array  
 *         items:
 *           type: file
 *         required: true
 *         description: Image file(s) for the design.
 *       - in: formData
 *         name: cSizesRates
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             size:
 *               type: string
 *             price:
 *               type: string
 *         required: true 
 *     responses:
 *       200:
 *         description: Design updated successfully
 *       404:
 *         description: Design not found
 *       500:
 *         description: Failed to update Design 
 */


router.put('/update/:NID', updateDesign);

/**
 * @swagger
 * /api/design/delete/{NID}:
 *   delete:
 *     tags:
 *       - Design Master
 *     summary: Delete a design
 *     description: Delete a design from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: NID
 *         required: true
 *         description: NID of the design to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Design deleted successfully
 *       404:
 *         description: Design not found
 *       500:
 *         description: Failed to delete design
 */

router.delete('/delete/:NID', deleteDesign);

module.exports = router;