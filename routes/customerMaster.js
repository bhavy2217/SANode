const express = require('express');
const { addCustomer, getCustomer, getCustomerById, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Customer Master
 *   description: Operations related to add customer of the company 
 */

/**
 * @swagger
 * /api/customer/add:
 *   post:
 *     tags:
 *       - Customer Master
 *     summary: Add a New Customer
 *     description: Create a new customer record in the system.
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ccustomername: 
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
 *         description: Customer added successfully 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to add Customer
 */

router.post('/add', addCustomer);

/**
 * @swagger
 * /api/customer/list:
 *   get:
 *     tags:
 *       - Customer Master
 *     summary: Get a List of customer
 *     description: Retrieve a list of customers from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: cSearch
 *         schema:
 *           type: string
 *         description: Search string to filter customers.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get customers
 */

router.get('/list', getCustomer);

/**
 * @swagger
 * /api/customer/listById:
 *   get:
 *     tags:
 *       - Customer Master
 *     summary: Get Customer Details by ID
 *     description: Retrieve detailed information about a customer by its NID.
 *     parameters:
 *       - in: query
 *         name: NID 
 *         schema:
 *           type: string
 *         description: NID of the customer to retrieve.
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Failed to get customer details
 */

router.get('/listById', getCustomerById);

/**
 * @swagger
 * /api/customer/update/{NID}:
 *   put:
 *     tags:
 *       - Customer Master
 *     summary: Update an Existing customer
 *     description: Update an existing customer's information in the database.
 *     parameters:
 *       - in: path
 *         name: NID
 *         required: true
 *         description: NID of the customer to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               ccustomername: 
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
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Failed to update Customer 
 */

router.put('/update/:NID', updateCustomer);

/**
 * @swagger
 * /api/customer/delete/{NID}:
 *   delete:
 *     tags:
 *       - Customer Master
 *     summary: Delete a Customer
 *     description: Delete a customer from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: NID
 *         required: true
 *         description: NID of the Customer to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Failed to delete customer
 */

router.delete('/delete/:NID', deleteCustomer);


module.exports = router;