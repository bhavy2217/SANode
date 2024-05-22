const express = require('express');
const { getCustomerDashboard } = require('../controllers/designController');
const { adminDashboard } = require('../controllers/adminDashboardController')
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Operations related to customer and admin of the company 
 */

/**
 * @swagger
 * /api/design/CustomerDashboard:
 *   get:
 *     tags:
 *       - Customer Dashboard
 *     summary: Get a List of Design
 *     description: Retrieve a list of design from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: cSearch
 *         schema:
 *           type: string
 *         description: Search string to filter design.
 *       - in: query
 *         name: nCustId
 *         schema:
 *           type: string
 *         description: Customer ID to search the specific data.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get design
 */

router.get('/CustomerDashboard', getCustomerDashboard);

/**
 * @swagger
 * /api/design/AdminDashboard:
 *   get:
 *     tags:
 *       - Admin Dashboard
 *     summary: Get data for Admin Dashboard
 *     description: Retrieve data for admin dashboard from database
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get design
 */

router.get('/AdminDashboard', adminDashboard);

module.exports = router;