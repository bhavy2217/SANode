// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require("./swagger");
// const karigarRouter = require("./routes/karigarMaster");
// const customerRouter = require("./routes/customerMaster");
// const sizeRouter = require("./routes/sizeMaster");
// const categoryRouter = require("./routes/categoryMaster");
// const designRouter = require("./routes/designMaster");
// const staffRouter = require("./routes/staffMaster");
// const multer = require('multer');

// const app = express();
// const PORT = process.env.PORT || 3032;

// // Enable CORS for all routes 
// app.use(
//     cors({ origin: ["http://localhost:3030", "http://localhost:3031", "https://sarrahapp.com"] })
// );

// // Middleware
// app.use(bodyParser.json());

// // Serve Swagger documentation
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Multer middleware for handling multipart form-data
// const upload = multer();

// // Routes
// app.use("/api/karigar", karigarRouter);
// app.use("/api/customer", customerRouter);
// app.use("/api/size", sizeRouter);
// app.use("/api/category", categoryRouter);
// app.use("/api/design", upload.array('cimages'), designRouter);
// app.use("/api/staff", staffRouter);

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
// const https = require('https');
// const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const karigarRouter = require('./routes/karigarMaster');
const customerRouter = require('./routes/customerMaster');
const sizeRouter = require('./routes/sizeMaster');
const categoryRouter = require('./routes/categoryMaster');
const designRouter = require('./routes/designMaster');
const staffRouter = require('./routes/staffMaster');
const loginRouter = require('./routes/loginMaster');
const dashbaordRouter = require('./routes/dashboard');
const cartRouter = require('./routes/cartMaster');
const wishlistRouter = require('./routes/wishlistMaster');
const orderRouter = require('./routes/orderMaster');
const dispatchRouter = require('./routes/dispatchMaster');
const multer = require('multer');

//---------------------------
const https = require('node:https');
const fs = require('node:fs');
//---------------------------

const app = express();
const PORT = process.env.PORT || 3032;

// Enable CORS for all routes
app.use(cors({ origin: ['http://localhost:3030', 'http://localhost:3031', 'http://localhost:3033', 'http://localhost:5173', 'https://sarrahapp.com', 'http://192.168.1.7:3030', 'http://192.168.1.7:8081', 'http://192.168.1.6:8081', 'http://192.168.1.6:3030'] }));
app.use(cors({ origin: '*' }));


// Middleware
app.use(bodyParser.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const upload = multer();

// Routes
app.use('/api/karigar', karigarRouter);
app.use('/api/customer', customerRouter);
app.use('/api/size', sizeRouter);
app.use('/api/category', categoryRouter);
app.use('/api/design', upload.fields([{ name: 'cimages' }, { name: 'cFullSizeImage' }, { name: 'cThumb' }]), designRouter);
// app.use('/api/design', upload.fields([{ name: 'cimages' }, { name: 'cFullSizeImage' }, { name: 'cThumb' }]), designRouter);
app.use('/api/staff', staffRouter);
app.use('/api/auth', loginRouter);
app.use('/api/design', dashbaordRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/order', orderRouter);
app.use('/api/dispatch', dispatchRouter);

// // HTTPS options
// const options = {
//     // key: fs.readFileSync('/path/to/private.key'),
//     // key: fs.readFileSync('C:/inetpub/wwwroot/sarrahapp.com/SarrahAdminAPI/sarrahapp.key'),
//     // cert: fs.readFileSync('C:/inetpub/wwwroot/sarrahapp.com/SarrahAdminAPI/sarrahapp_com.crt'),
//     cert: fs.readFileSync('sarrahapp_com.crt'),
// };

const options = {
  key: fs.readFileSync('private_key.pem'),
  cert: fs.readFileSync('SarrahApp.pem'),
};

// HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
