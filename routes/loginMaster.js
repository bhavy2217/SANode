const express = require('express');
const { authUser, authCustomer, authCustomerNew, authKarigar, verifyOTP } = require('../controllers/loginController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Login
 *   description: Let user login to the system
 */


/**
 * @swagger
 * /api/auth/user:
 *   post:
 *     tags:
 *       - User Login
 *     summary: Let user login to the system
 *     description: Staff/ Admin login to the system
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cMobile: 
 *                 type: string  
 *               cPassword:
 *                 type: string
 *               nUserType:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully!
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Error authenticating user!
 */

router.post('/user', authUser);

/**
 * @swagger
 * /api/auth/karigar:
 *   post:
 *     tags:
 *       - User Login
 *     summary: Let user login to the system
 *     description: Staff/ Admin login to the system
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cMobile: 
 *                 type: string  
 *               cPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully!
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Error authenticating user!
 */

router.post('/karigar', authKarigar);


/**
 * @swagger
 * /api/auth/customer:
 *   post:
 *     tags:
 *       - User Login
 *     summary: Let customer login to the system
 *     description: Customer login to the system
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cMobileNo: 
 *                 type: string  
 *               cPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully!
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Error authenticating user!
 */

router.post('/customer', authCustomer);

/**
 * @swagger
 * /api/auth/customerNew:
 *   post:
 *     tags:
 *       - User Login
 *     summary: Let customer login to the system
 *     description: Customer login to the system
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cMobileNo: 
 *                 type: string  
 *               cPassword:
 *                 type: string
 *               cMobUniqId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully!
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Error authenticating user!
 */

router.post('/customerNew', authCustomerNew);

/**
 * @swagger
 * /api/auth/verifyOTP:
 *   post:
 *     tags:
 *       - User Login
 *     summary: Let customer login to the system
 *     description: Customer login to the system
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cMobileNo: 
 *                 type: string  
 *               cOTP:
 *                 type: string
 *               cMobUniqId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully!
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Error authenticating user!
 */

router.post('/verifyOTP', verifyOTP);

module.exports = router;