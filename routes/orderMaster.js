const express = require('express');
const { addOrder, getOrder, getOrderById, getOrderAdminList, addOrderConfirmation } = require('../controllers/orderController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Order Master
 *   description: Operations for placing the order 
 */

/**
 * @swagger
 * /api/order/add:
 *   post:
 *     tags:
 *       - Order Master
 *     summary: Place new order 
 *     description: Place a new product in the cart.
 *     parameters:
 *       - in: query
 *         name: nCustId
 *         schema:
 *           type: string
 *         required: true
 *         description: Customer ID
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nSizes:
 *                 type: string  
 *     responses:
 *       200:
 *         description: Order placed successfully 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to place order
 */

router.post('/add', addOrder);

/**
 * @swagger
 * /api/order/addOrderConfirmation:
 *   post:
 *     tags:
 *       - Order Master
 *     summary: Confirm new order 
 *     description: Confirm a new product order. 
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Query:
 *                 type: string  
 *               nOrderId:
 *                 type: string  
 *               nUserId:
 *                 type: string  
 *     responses:
 *       200:
 *         description: Order placed successfully 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to place order
 */

router.post('/addOrderConfirmation', addOrderConfirmation);

/**
 * @swagger
 * /api/order/list:
 *   get:
 *     tags:
 *       - Order Master
 *     summary: Get a List of order
 *     description: Retrieve a list of orders from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: nCustId
 *         schema:
 *           type: string
 *         description: Search string to filter cart.
 *       - in: query
 *         name: cSearch
 *         schema:
 *           type: string
 *         description: Search string to filter cart.
 *       - in: query
 *         name: nKarigarId
 *         schema:
 *           type: string
 *         description: Search string to filter cart.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get cart
 */

router.get('/list', getOrder);

/**
 * @swagger
 * /api/order/getOrderAdminList:
 *   get:
 *     tags:
 *       - Order Master
 *     summary: Get a List of order
 *     description: Retrieve a list of orders from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: cType
 *         schema:
 *           type: string
 *         description: Search string to filter cart.
 *       - in: query
 *         name: cSearch
 *         schema:
 *           type: string
 *         description: Search string to filter cart.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get cart
 */

router.get('/getOrderAdminList', getOrderAdminList);

/**
 * @swagger
 * /api/order/listById:
 *   get:
 *     tags:
 *       - Order Master
 *     summary: Get order details by ID
 *     description: Retrieve detailed information about a size by its ID.
 *     parameters:
 *       - in: query
 *         name: nOrderId 
 *         schema:
 *           type: string
 *         description: nOrderId of the Order Details to retrieve.
 *         required: true
 *       - in: query
 *         name: nKarigarId 
 *         schema:
 *           type: string
 *         description: nKarigarId of the Order Details to retrieve based on karigar.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Order Details not found
 *       500:
 *         description: Failed to get order details
 */

router.get('/listById', getOrderById);

module.exports = router;