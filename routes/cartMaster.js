const express = require('express');
const { addCart, addCartDashboard, getCart, deleteCart } = require('../controllers/cartController');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Cart Master
 *   description: Operations related to add the product to the cart 
 */

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     tags:
 *       - Cart Master
 *     summary: Add new product to cart
 *     description: Add a new product in the cart.
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nCustId: 
 *                 type: string  
 *               nDesignId:
 *                 type: string 
 *               nSizesQty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item added to cart succesfuly 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to add item to the cart
 */

router.post('/add', addCart);

/**
 * @swagger
 * /api/cart/addDashboard:
 *   post:
 *     tags:
 *       - Cart Master
 *     summary: Add new product to cart
 *     description: Add a new product in the cart.
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nCustId: 
 *                 type: string  
 *               nDesignId:
 *                 type: string 
 *               nSizesQty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item added to cart succesfuly 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to add item to the cart
 */

router.post('/addDashboard', addCartDashboard);

/**
 * @swagger
 * /api/cart/list:
 *   get:
 *     tags:
 *       - Cart Master
 *     summary: Get a List of cart
 *     description: Retrieve a list of cart from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: nCustId
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

router.get('/list', getCart);


/**
 * @swagger
 * /api/cart/delete/{nCartId}:
 *   delete:
 *     tags:
 *       - Cart Master
 *     summary: Delete a Cart
 *     description: Delete a cart from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: nCartId
 *         required: true
 *         description: NID of the cart to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Failed to delete cart
 */

router.delete('/delete/:nCartId', deleteCart);

module.exports = router;