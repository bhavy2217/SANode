const express = require('express');
const { addDispatch, deleteDispatch, getDispatchList, getKarigarList, getKarigarDDL, getDispatchSearch, getDispatchDesignDetails, updateDispatch, getKarigarPendingList, receiveDispatch } = require('../controllers/dispatchContorller');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dispatch Order
 *   description: Operations related to dispatching the order 
 */

/**
 * @swagger
 * /api/dispatch/add:
 *   post:
 *     tags:
 *       - Dispatch Order
 *     summary: Dispath the order form karigar side
 *     description: Dispath the order form karigar side.
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nKarigarId: 
 *                 type: string  
 *               nOrderId:
 *                 type: string 
 *               nDesignId:
 *                 type: string
 *               nSizeId:
 *                 type: string
 *               nQty:
 *                 type: string
 *               dDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order dispatched succesfuly 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to dispatch the order
 */

router.post('/add', addDispatch);

/**
 * @swagger
 * /api/dispatch/receive:
 *   post:
 *     tags:
 *       - Dispatch Order
 *     summary: Dispath the order form karigar side
 *     description: Dispath the order form karigar side.
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cType: 
 *                 type: string  
 *               nDispatchId: 
 *                 type: string  
 *               nUserId:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Order dispatched succesfuly 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to dispatch the order
 */

router.post('/receive', receiveDispatch);

/**
 * @swagger
 * /api/dispatch/update:
 *   post:
 *     tags:
 *       - Dispatch Order
 *     summary: Dispath the order form karigar side
 *     description: Dispath the order form karigar side.
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NID: 
 *                 type: string  
 *               nQty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order dispatched succesfuly 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to dispatch the order
 */

router.post('/update', updateDispatch);

/**
 * @swagger
 * /api/dispatch/delete/{NID}:
 *   delete:
 *     tags:
 *       - Dispatch Order
 *     summary: Delete a Dispatch Order
 *     description: Delete a Dispatch Order from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: NID
 *         required: true
 *         description: NID of the Dispatch Order to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dispatch Order deleted successfully
 *       404:
 *         description: Dispatch Order not found
 *       500:
 *         description: Failed to delete Dispatch Order
 */

router.delete('/delete/:NID', deleteDispatch);

/**
 * @swagger
 * /api/dispatch/list:
 *   get:
 *     tags:
 *       - Dispatch Order
 *     summary: Get a List of Dispatch Order
 *     description: Retrieve a list of Dispatch Order from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: cSearch
 *         schema:
 *           type: string
 *         description: Search string to filter Dispatch Order.
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
 *         description: Failed to get Dispatch Order
 */

router.get('/list', getDispatchList);

/**
 * @swagger
 * /api/dispatch/search:
 *   get:
 *     tags:
 *       - Dispatch Order
 *     summary: Get a List of Dispatch Order
 *     description: Retrieve a list of Dispatch Order from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: nDesignId
 *         schema:
 *           type: string
 *         description: Search string to filter Dispatch Order.
 *       - in: query
 *         name: nKarigarId
 *         schema:
 *           type: string
 *         description: Search string to filter Dispatch Order.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get Dispatch Order
 */

router.get('/search', getDispatchSearch);

/**
 * @swagger
 * /api/dispatch/DispatchDesignDetails:
 *   get:
 *     tags:
 *       - Dispatch Order
 *     summary: Get a List of Dispatch Order
 *     description: Retrieve a list of Dispatch Order from the database, optionally filtered by search criteria.
 *     parameters:
 *       - in: query
 *         name: nOrderId
 *         schema:
 *           type: string
 *         description: Search string to filter Dispatch Order.
 *       - in: query
 *         name: nDesignId
 *         schema:
 *           type: string
 *         description: Search string to filter Dispatch Order.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get Dispatch Order
 */

router.get('/DispatchDesignDetails', getDispatchDesignDetails);

/**
 * @swagger
 * /api/dispatch/karigarlist:
 *   get:
 *     tags:
 *       - Dispatch Order
 *     summary: Get a List of Dispatch Order
 *     description: Retrieve a list of Dispatch Order from the database, optionally filtered by search criteria  
 *     parameters:
 *       - in: query
 *         name: cSearch
 *         schema:
 *           type: string
 *         description: Search string to filter Dispatch Order.
 *       - in: query
 *         name: cType
 *         schema:
 *           type: string
 *         description: Design OR Size.
 *       - in: query
 *         name: nKarigarId
 *         schema:
 *           type: string
 *         description: Search string to filter Dispatch Order.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get Dispatch Order
 */

router.get('/karigarlist', getKarigarList);

/**
 * @swagger
 * /api/dispatch/karigarpendinglist:
 *   get:
 *     tags:
 *       - Dispatch Order
 *     summary: Get a List of Dispatch Order
 *     description: Retrieve a list of Dispatch Order from the database, optionally filtered by search criteria  
 *     parameters:
 *       - in: query
 *         name: cSearch
 *         schema:
 *           type: string
 *         description: Search string to filter Dispatch Order.
 *       - in: query
 *         name: nKarigarId
 *         schema:
 *           type: string
 *         description: Search string to filter Dispatch Order.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get Dispatch Order
 */

router.get('/karigarpendinglist', getKarigarPendingList);

/**
 * @swagger
 * /api/dispatch/karigarDDL:
 *   get:
 *     tags:
 *       - Dispatch Order
 *     summary: Get a List of Dispatch Order
 *     description: Retrieve a list of Dispatch Order from the database, optionally filtered by search criteria  
 *     parameters:
 *       - in: query
 *         name: nCustId
 *         schema:
 *           type: string
 *         description: Search string to filter Dispatch Order.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Failed to get Dispatch Order
 */
router.get('/karigarDDL', getKarigarDDL);

module.exports = router;