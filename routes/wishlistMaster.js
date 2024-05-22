const express = require('express');
const { addToWishlist, getWishlist, deleteWishlist } = require('../controllers/wishlistController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Operations related to adding the product to the wishlist 
 */

/**
 * @swagger
 * /api/wishlist/add:
 *   post:
 *     tags:
 *       - Wishlist
 *     summary: Add new product to the wishlist
 *     description: Add a new product in the wishlist.
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
 *     responses:
 *       200:
 *         description: Item added to wishlist succesfuly 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to add item to the wishlist
 */

router.post('/add', addToWishlist);

/**
 * @swagger
 * /api/wishlist/list:
 *   get:
 *     tags:
 *       - Wishlist
 *     summary: Get a List of wishlist
 *     description: Retrieve a list of wishlist from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: nCustId
 *         schema:
 *           type: string
 *         description: Search string to filter wishlist.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get wishlist
 */

router.get('/list', getWishlist);

/**
 * @swagger
 * /api/wishlist/delete:
 *   delete:
 *     tags:
 *       - Wishlist
 *     summary: Delete data from wishlist
 *     description: Delete a data from wishlist by its ID.
 *     parameters:
 *       - in: query
 *         name: nCustId
 *         required: true
 *         description: NID of the wishlist to delete
 *         schema:
 *           type: string
 *       - in: query
 *         name: nDesignId
 *         required: true
 *         description: Design id of the wishlist to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Removed from wishlist
 *       404:
 *         description: No items found in wishlist
 *       500:
 *         description: Failed to remove from wishlist
 */

router.delete('/delete', deleteWishlist);
module.exports = router;