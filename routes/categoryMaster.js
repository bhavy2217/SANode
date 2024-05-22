const express = require('express');
const { addCategory, getCategory, getCategoryById, updateCategory, deleteCategory, getCategoryName } = require('../controllers/categoryController');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Category Master
 *   description: Operations related to add category of the product 
 */

/**
 * @swagger
 * /api/category/add:
 *   post:
 *     tags:
 *       - Category Master
 *     summary: Add a New category
 *     description: Create a new category name in the system.
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ccategoryname: 
 *                 type: string  
 *               cmultisizes:
 *                 type: string 
 *               nactive:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category added successfully 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to add category
 */

router.post('/add', addCategory);

/**
 * @swagger
 * /api/category/list:
 *   get:
 *     tags:
 *       - Category Master
 *     summary: Get a List of category
 *     description: Retrieve a list of category from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: cSearch
 *         schema:
 *           type: string
 *         description: Search string to filter category.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get category
 */

router.get('/list', getCategory);

/**
 * @swagger
 * /api/category/name:
 *   get:
 *     tags:
 *       - Category Master
 *     summary: Get a List of category
 *     description: Retrieve a list of category from the database, optionally filtered by search criteria.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get category
 */

router.get('/name', getCategoryName);

/**
 * @swagger
 * /api/category/listById:
 *   get:
 *     tags:
 *       - Category Master
 *     summary: Get Category Details by ID
 *     description: Retrieve detailed information about a Category by its ID.
 *     parameters:
 *       - in: query
 *         name: NID 
 *         schema:
 *           type: string
 *         description: NID of the Category to retrieve.
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Failed to get Category details
 */

router.get('/listById', getCategoryById);

/**
 * @swagger
 * /api/category/update/{NID}:
 *   put:
 *     tags:
 *       - Category Master
 *     summary: Update an Existing category
 *     description: Update an existing category's information in the database.
 *     parameters:
 *       - in: path
 *         name: NID
 *         required: true
 *         description: NID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
*               ccategoryname: 
 *                 type: string  
 *               cmultisizes:
 *                 type: string 
 *               nactive:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Failed to update Category 
 */

router.put('/update/:NID', updateCategory);

/**
 * @swagger
 * /api/category/delete/{NID}:
 *   delete:
 *     tags:
 *       - Category Master
 *     summary: Delete a Category
 *     description: Delete a category from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: NID
 *         required: true
 *         description: NID of the Category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Failed to delete category
 */

router.delete('/delete/:NID', deleteCategory);

module.exports = router;
