const express=require('express');
const { TableInsert, GetTables, TableUpdate, DeleteTable } = require('../Controller/Admin/Table');
const { AdminLogin } = require('../Controller/Admin/Login');
const upload = require('../Middleware/upload'); // Adjust the path as necessary
const {CategoryInsert,GetCategory,DeleteCategory,UpdateCategory}=require("../Controller/Admin/Category");
const { addProduct, getProducts, deleteProduct, updateProduct } = require('../Controller/Admin/Product');
const { updateRequest } = require('../Controller/User/Request');
const router=express.Router();

router.post('/login',AdminLogin);
router.get('/gettable',GetTables);
router.post('/addtable',TableInsert);
router.put('/updatetable/:id',TableUpdate);
router.delete('/deletetable/:id',DeleteTable);

//Category
router.post('/insertcategory', upload.single('image'),CategoryInsert);
router.get('/getcategory', GetCategory);
router.delete('/deleteCategory/:id', DeleteCategory);
router.put('/updateCategory/:id', upload.single('image'),UpdateCategory);

//Product
router.post('/addproduct', upload.single('image'),addProduct);
router.get('/getproduct', getProducts);
router.delete('/deleteproduct/:id', deleteProduct);
router.put('/updateproduct/:id', upload.single('image'),updateProduct);

// Requests
router.put('/updateRequest/:id',updateRequest);


module.exports=router;

