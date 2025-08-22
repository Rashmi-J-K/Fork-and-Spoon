const express=require('express');
const upload = require('../Middleware/upload'); // Adjust the path as necessary
const { UserRegister, UserLogin, GetOneUser, GetUser } = require('../Controller/User/RegisterLogin');
const { createCart, getAllCarts, updateCart, deleteCart, getCartById } = require('../Controller/User/Cart');
const router=express.Router();
const middleware = require('../Middleware/middleware'); // Adjust the path as necessary
const { addOrder, getOrders, updateOrder, deleteOrder, getOrdersByUserId } = require('../Controller/User/Order');
const { addRequest, getRequests, getRequestsByUserId, updateRequest } = require('../Controller/User/Request');

//user regiger/Login
router.post('/user-register', UserRegister);
router.post('/user-login', UserLogin);
router.get('/get-single-user',middleware,GetOneUser);
router.get('/get-user',GetUser);

// Cart
router.post('/addtocart', createCart);
router.get('/getcarts', getAllCarts);
router.get('/getCartById',middleware, getCartById);
router.delete('/deletecart/:id', deleteCart);
router.put('/updatecart/:id',updateCart);

// Order
router.post('/insertorder', addOrder);
router.get('/getorders', getOrders);
router.get('/getordersById',middleware, getOrdersByUserId);
router.delete('/deleteorder/:id', deleteOrder);
router.put('/updateorder/:id',updateOrder);

// Request
router.post('/addRequest', addRequest);
router.get('/getRequests', getRequests);
router.get('/getRequestsByUserId',middleware, getRequestsByUserId);
router.put('/updaterequest/:id', updateRequest);

module.exports=router;

